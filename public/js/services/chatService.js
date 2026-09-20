/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * Agent Chat Persistence Service
 * 
 * Dual-layer storage: localStorage for instant reads + server file persistence
 * Manages conversation CRUD, auto-save, and sync with server
 */

const CHAT_STORAGE_KEY = 'al_muslim_chat_history';
const CHAT_ACTIVE_KEY = 'al_muslim_chat_active_id';

function getApiEndpoint(path) {
  if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
    return 'http://localhost:3030' + path;
  }
  return path;
}

function generateId() {
  return 'chat-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}

function generateMsgId() {
  return 'msg-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 6);
}

class ChatService {
  constructor() {
    this._conversations = [];
    this._initialized = false;
    this._persistDebounce = null;
    this._listeners = [];
  }

  /**
   * Initialize: Load from localStorage first (instant), then sync with server
   */
  async init() {
    if (this._initialized) return;

    // 1. Load from localStorage (instant)
    this._loadFromLocalStorage();

    // 2. Sync with server (async, merges server data)
    try {
      await this._syncFromServer();
    } catch (e) {
      console.warn('[ChatService] Server sync failed, using localStorage data:', e.message);
    }

    this._initialized = true;
    console.log(`[ChatService] Initialized with ${this._conversations.length} conversations.`);
  }

  /**
   * Get all conversations, sorted by most recent first
   */
  getAllConversations() {
    return [...this._conversations].sort((a, b) => {
      const da = new Date(b.updatedAt || b.createdAt);
      const db = new Date(a.updatedAt || a.createdAt);
      return da - db;
    });
  }

  /**
   * Get a single conversation by ID
   */
  getConversation(id) {
    return this._conversations.find(c => c.id === id) || null;
  }

  /**
   * Create a new conversation
   */
  createConversation(title = null) {
    const now = new Date().toISOString();
    const conv = {
      id: generateId(),
      title: title || `Chat ${this._conversations.length + 1}`,
      createdAt: now,
      updatedAt: now,
      messages: []
    };
    this._conversations.push(conv);
    this._saveActiveId(conv.id);
    this._persistAll();
    this._notifyListeners();
    return conv;
  }

  /**
   * Add a message to a conversation
   */
  addMessage(conversationId, role, content) {
    const conv = this._conversations.find(c => c.id === conversationId);
    if (!conv) return null;

    const msg = {
      id: generateMsgId(),
      role, // 'user' or 'agent'
      content,
      timestamp: new Date().toISOString()
    };

    conv.messages.push(msg);
    conv.updatedAt = new Date().toISOString();

    // Auto-title from first user message
    if (conv.messages.filter(m => m.role === 'user').length === 1 && role === 'user') {
      conv.title = content.length > 50 ? content.substring(0, 50) + '…' : content;
    }

    this._persistAll();
    this._notifyListeners();
    return msg;
  }

  /**
   * Rename a conversation
   */
  renameConversation(id, newTitle) {
    const conv = this._conversations.find(c => c.id === id);
    if (!conv) return false;
    conv.title = newTitle;
    conv.updatedAt = new Date().toISOString();
    this._persistAll();
    this._notifyListeners();
    return true;
  }

  /**
   * Delete a conversation
   */
  deleteConversation(id) {
    const idx = this._conversations.findIndex(c => c.id === id);
    if (idx === -1) return false;
    this._conversations.splice(idx, 1);
    
    // Clear active ID if it was the deleted one
    if (this._getActiveId() === id) {
      this._saveActiveId(null);
    }
    
    this._persistAll();
    this._notifyListeners();
    return true;
  }

  /**
   * Get last active conversation ID
   */
  getActiveConversationId() {
    return this._getActiveId();
  }

  /**
   * Set active conversation ID
   */
  setActiveConversationId(id) {
    this._saveActiveId(id);
  }

  /**
   * Subscribe to changes
   */
  onChange(callback) {
    this._listeners.push(callback);
    return () => {
      this._listeners = this._listeners.filter(cb => cb !== callback);
    };
  }

  // ─── Private Methods ─────────────────────────────

  _notifyListeners() {
    this._listeners.forEach(cb => {
      try { cb(); } catch (e) { console.error('[ChatService] Listener error:', e); }
    });
  }

  _loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem(CHAT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this._conversations = parsed;
        }
      }
    } catch (e) {
      console.warn('[ChatService] localStorage parse failed, starting fresh:', e.message);
      this._conversations = [];
    }
  }

  _saveToLocalStorage() {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this._conversations));
    } catch (e) {
      console.error('[ChatService] localStorage save failed:', e.message);
    }
  }

  _getActiveId() {
    try {
      return localStorage.getItem(CHAT_ACTIVE_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  _saveActiveId(id) {
    try {
      if (id) {
        localStorage.setItem(CHAT_ACTIVE_KEY, id);
      } else {
        localStorage.removeItem(CHAT_ACTIVE_KEY);
      }
    } catch (e) {}
  }

  /**
   * Debounced persist to both localStorage and server
   */
  _persistAll() {
    // Immediate localStorage save
    this._saveToLocalStorage();

    // Debounced server persist (150ms, matching existing ERP pattern)
    if (this._persistDebounce) clearTimeout(this._persistDebounce);
    this._persistDebounce = setTimeout(() => {
      this._persistToServer();
    }, 150);
  }

  async _persistToServer() {
    try {
      const url = getApiEndpoint('/api/chat/history');
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this._conversations)
      });
      if (!response.ok) {
        console.warn('[ChatService] Server persist failed:', response.status);
      }
    } catch (e) {
      console.warn('[ChatService] Server persist error:', e.message);
    }
  }

  async _syncFromServer() {
    const url = getApiEndpoint('/api/chat/history');
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) return;

    const data = await response.json();
    if (data && data.status === 'ok' && Array.isArray(data.conversations)) {
      const serverConvs = data.conversations;

      if (serverConvs.length > 0) {
        // Merge: server conversations take priority, local-only ones are kept
        const mergedMap = new Map();
        
        // Add local conversations first
        this._conversations.forEach(c => {
          if (c && c.id) mergedMap.set(c.id, c);
        });
        
        // Server conversations override local ones (server is authoritative)
        serverConvs.forEach(c => {
          if (c && c.id) {
            const local = mergedMap.get(c.id);
            if (local) {
              // Keep the one with more messages or more recent update
              const serverMsgCount = (c.messages || []).length;
              const localMsgCount = (local.messages || []).length;
              if (serverMsgCount >= localMsgCount) {
                mergedMap.set(c.id, c);
              }
            } else {
              mergedMap.set(c.id, c);
            }
          }
        });

        this._conversations = Array.from(mergedMap.values());
        this._saveToLocalStorage();
      } else if (this._conversations.length > 0) {
        // Local has data but server is empty — push local to server
        await this._persistToServer();
      }
    }
  }

  /**
   * Force immediate flush (used on beforeunload)
   */
  flushImmediate() {
    this._saveToLocalStorage();
    // Synchronous-like persist via sendBeacon if available
    try {
      const url = getApiEndpoint('/api/chat/history');
      const blob = new Blob([JSON.stringify(this._conversations)], { type: 'application/json' });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, blob);
      }
    } catch (e) {}
  }
}

export const chatService = new ChatService();

// Register unload handler for zero data loss
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => chatService.flushImmediate());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') chatService.flushImmediate();
  });
}
