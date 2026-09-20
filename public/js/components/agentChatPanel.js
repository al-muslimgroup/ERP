/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * Agent Chat Panel Component
 * 
 * Slide-out right-side drawer with:
 *  - History View: list of all conversations with title, date, preview, rename, delete
 *  - Active Chat View: full message thread with input area
 */

import { chatService } from '../services/chatService.js';
import { state } from '../state.js';
import { authService } from '../services/authService.js';

// ─── Contextual ERP Agent Responses (100% English) ───
const AGENT_RESPONSES = [
  "I am the Al-Muslim Group Maintenance Department ERP AI Assistant. I can help you with Machine Inventory, Transfers, Spare Parts, Preventive Maintenance, and Reports.",
  "To inspect machinery, navigate to 'Machine Inventory' in the sidebar. You can view Serial Numbers, Brands, Models, and Physical Locations.",
  "To relocate equipment, open 'Machine Transfers' and click 'Request Machine Transfer'. It will follow the configured approval workflow.",
  "To check maintenance schedules, visit the 'Preventive Machine Maintenance' section to view machine-specific intervals and inspection checklists.",
  "For replacement components, browse the 'Spare Parts Catalog' to inspect parts history and replacement logs.",
  "To generate summaries or analytics, visit 'Reports & Analytics' to export data to Excel or view live uptime metrics.",
  "From the Dashboard, you can monitor factory-wide machine health, uptime %, and floor-wise machine distribution.",
  "I am ready to help! Ask me anything about machines, relocations, maintenance intervals, or manpower allocations.",
  "In ENT Lab Management, master boards and machine connection lifecycles are actively monitored.",
  "In Tools & Equipment, mechanic kits, tool allocations, and replacement audit logs are tracked."
];

function getAgentResponse(userMessage) {
  const lower = (userMessage || '').toLowerCase();
  
  if (lower.includes('machine') && (lower.includes('transfer') || lower.includes('move') || lower.includes('relocate'))) {
    return "To transfer a machine:\n1. Open 'Machine Transfers' from the sidebar.\n2. Click the 'Request Machine Transfer' button.\n3. Search and select the machine by Serial Number.\n4. Select the target destination floor and line.\n5. Attach supporting document (if required) and submit.\n\nThe request will progress through the configured approval workflow. 🔄";
  }
  if (lower.includes('spare') || lower.includes('parts') || lower.includes('component')) {
    return "Spare Parts Management:\n• Open 'Spare Parts Catalog' to browse all active parts.\n• Check machine history to see fitted replacement parts.\n• Generate spare parts consumption reports from Reports & Analytics. ⚙️";
  }
  if (lower.includes('report') || lower.includes('export') || lower.includes('excel')) {
    return "Reports & Excel Export:\n• Open 'Reports & Analytics' from the sidebar.\n• View Machine Reports, Transfer History, and Spare Parts Analytics.\n• Use the Excel Export Center to download filtered worksheets with custom date ranges. 📊";
  }
  if (lower.includes('maintenance') || lower.includes('preventive') || lower.includes('pm')) {
    return "Preventive Maintenance (PM):\n• Open 'Preventive Machine Maintenance' to inspect active schedules.\n• View Overdue, Upcoming, and Completed maintenance tickets.\n• Check health compliance scores and PM logs on the Dashboard. 🛡️";
  }
  if (lower.includes('dashboard') || lower.includes('kpi') || lower.includes('status')) {
    return "Dashboard Features:\n• Total machine count and live operational status distribution.\n• Floor and unit-level machine distribution breakdown.\n• Factory uptime, health metrics, and pending transfer approvals. 🏠";
  }
  if (lower.includes('help') || lower.includes('what can you do')) {
    return "Here is what I can assist you with:\n\n🔧 Machine Inventory — Search, edit, and track assets\n🔄 Machine Transfers — Approval workflow and gate pass tracking\n⚙️ Spare Parts — Catalog and parts replacement records\n🛡️ Preventive Maintenance — PM schedules and inspection checklists\n📊 Reports & Excel — Analytics and data export\n👥 Manpower — Employee line placement\n🧰 Tools & Equipment — Mechanic allocation\n\nFeel free to ask any question! 😊";
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hello! Welcome to Al-Muslim Group Maintenance Department ERP. I am your AI Assistant, ready to help you with machines, relocations, spare parts, and reports. How can I assist you today?";
  }
  if (lower.includes('manpower') || lower.includes('employee') || lower.includes('operator')) {
    return "Manpower Management:\n• Manage active and inactive maintenance mechanics.\n• Record employee transfers and leave logs.\n• Track floor and line placement per shift. 👥";
  }
  if (lower.includes('tool') || lower.includes('equipment') || lower.includes('kit')) {
    return "Tools & Equipment:\n• Master inventory of specialized factory tools.\n• Track tool allocations per mechanic.\n• Review tool replacement and inspection history. 🧰";
  }
  
  // Random contextual response
  return AGENT_RESPONSES[Math.floor(Math.random() * AGENT_RESPONSES.length)];
}

// ─── Utility ───
function formatDateTime(isoStr) {
  try {
    const d = new Date(isoStr);
    const now = new Date();
    const diffMs = now - d;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (e) {
    return '';
  }
}

function formatTimestamp(isoStr) {
  try {
    const d = new Date(isoStr);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch (e) {
    return '';
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ─── Panel State ───
let _currentView = 'history'; // 'history' | 'chat'
let _activeConvId = null;
let _isTyping = false;

export function toggleAgentPanel() {
  const isOpen = state.get('agentPanelOpen');
  state.set('agentPanelOpen', !isOpen);
}

export function openAgentPanel() {
  state.set('agentPanelOpen', true);
}

export function closeAgentPanel() {
  state.set('agentPanelOpen', false);
}

// ─── Render Functions ───

export function renderAgentChatPanel() {
  const isOpen = state.get('agentPanelOpen');
  if (!isOpen) return '';

  return `
    <div class="agent-chat-backdrop" id="agent-chat-backdrop"></div>
    <aside class="agent-chat-panel open" id="agent-chat-panel">
      ${_currentView === 'history' ? renderHistoryView() : renderChatView()}
    </aside>
  `;
}

function renderHistoryView() {
  const conversations = chatService.getAllConversations();

  return `
    <div class="acp-header">
      <div class="acp-header-left">
        <span class="acp-header-icon">🤖</span>
        <span class="acp-header-title">Agent Chat</span>
      </div>
      <div class="acp-header-actions">
        <button class="acp-btn acp-btn-new" id="acp-btn-new-chat" title="Start a new chat">
          <span>＋</span> New Chat
        </button>
        <button class="acp-btn-icon acp-btn-close" id="acp-btn-close" title="Close Panel">✕</button>
      </div>
    </div>
    <div class="acp-body">
      ${conversations.length === 0 ? renderEmptyState() : renderConversationList(conversations)}
    </div>
  `;
}

function renderEmptyState() {
  return `
    <div class="acp-empty-state">
      <div class="acp-empty-icon">💬</div>
      <h3 class="acp-empty-title">No Chat History</h3>
      <p class="acp-empty-text">
        Click "New Chat" to start a conversation with the AI Assistant.
        Ask any question about machines, transfers, spare parts, or maintenance!
      </p>
      <button class="acp-btn acp-btn-new acp-empty-btn" id="acp-btn-new-chat-empty">
        <span>＋</span> Start New Chat
      </button>
    </div>
  `;
}

function renderConversationList(conversations) {
  return `
    <div class="acp-conv-list" id="acp-conv-list">
      ${conversations.map(conv => {
        const lastMsg = conv.messages && conv.messages.length > 0 
          ? conv.messages[conv.messages.length - 1] 
          : null;
        const preview = lastMsg 
          ? (lastMsg.content.length > 60 ? lastMsg.content.substring(0, 60) + '…' : lastMsg.content) 
          : 'No messages yet';
        const msgCount = (conv.messages || []).length;
        const roleIcon = lastMsg ? (lastMsg.role === 'agent' ? '🤖' : '👤') : '💬';

        return `
          <div class="acp-conv-card" data-conv-id="${conv.id}" id="acp-conv-${conv.id}">
            <div class="acp-conv-card-main" data-conv-open="${conv.id}">
              <div class="acp-conv-icon">${roleIcon}</div>
              <div class="acp-conv-info">
                <div class="acp-conv-title">${escapeHtml(conv.title)}</div>
                <div class="acp-conv-preview">${escapeHtml(preview)}</div>
                <div class="acp-conv-meta">
                  <span>${formatDateTime(conv.updatedAt || conv.createdAt)}</span>
                  <span class="acp-conv-badge">${msgCount} msg${msgCount !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            <div class="acp-conv-actions">
              <button class="acp-conv-action-btn" data-conv-rename="${conv.id}" title="Rename Chat">✏️</button>
              <button class="acp-conv-action-btn acp-conv-del-btn" data-conv-delete="${conv.id}" title="Delete Chat">🗑️</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderChatView() {
  const conv = chatService.getConversation(_activeConvId);
  if (!conv) {
    _currentView = 'history';
    return renderHistoryView();
  }

  const user = authService.getCurrentUser();
  const userName = user?.name || 'User';

  return `
    <div class="acp-header acp-chat-header">
      <div class="acp-header-left">
        <button class="acp-btn-icon acp-btn-back" id="acp-btn-back" title="Back to Chat History">←</button>
        <span class="acp-chat-title" id="acp-chat-title" title="Double-click to rename">${escapeHtml(conv.title)}</span>
      </div>
      <div class="acp-header-actions">
        <button class="acp-btn-icon acp-btn-close" id="acp-btn-close" title="Close Panel">✕</button>
      </div>
    </div>
    <div class="acp-messages" id="acp-messages">
      ${conv.messages.length === 0 ? `
        <div class="acp-welcome-msg">
          <div class="acp-welcome-icon">🤖</div>
          <p>Welcome, <strong>${escapeHtml(userName)}</strong>!</p>
          <p>I am your Al-Muslim ERP AI Assistant. How can I help you today?</p>
        </div>
      ` : ''}
      ${conv.messages.map(msg => `
        <div class="acp-msg ${msg.role === 'user' ? 'acp-msg-user' : 'acp-msg-agent'}">
          <div class="acp-msg-avatar">${msg.role === 'user' ? userName.charAt(0) : '🤖'}</div>
          <div class="acp-msg-bubble">
            <div class="acp-msg-content">${escapeHtml(msg.content).replace(/\n/g, '<br>')}</div>
            <div class="acp-msg-time">${formatTimestamp(msg.timestamp)}</div>
          </div>
        </div>
      `).join('')}
      ${_isTyping ? `
        <div class="acp-msg acp-msg-agent">
          <div class="acp-msg-avatar">🤖</div>
          <div class="acp-msg-bubble acp-typing-bubble">
            <div class="acp-typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
    <div class="acp-input-area" id="acp-input-area">
      <textarea 
        class="acp-input" 
        id="acp-input" 
        placeholder="Type your question..." 
        rows="1"
        maxlength="2000"
      ></textarea>
      <button class="acp-send-btn" id="acp-send-btn" title="Send message">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  `;
}

// ─── Event Binding ───

export function initAgentChatPanelEvents() {
  const panel = document.getElementById('agent-chat-panel');
  const backdrop = document.getElementById('agent-chat-backdrop');
  if (!panel) return;

  const closePanel = () => {
    state.set('agentPanelOpen', false);
  };

  const rerenderPanel = () => {
    const layer = document.getElementById('agent-panel-layer');
    if (layer) {
      layer.innerHTML = renderAgentChatPanel();
      initAgentChatPanelEvents();
    }
  };

  // Close handlers
  if (backdrop) backdrop.addEventListener('click', closePanel);
  panel.querySelectorAll('#acp-btn-close').forEach(btn => {
    btn.addEventListener('click', closePanel);
  });

  // ESC key to close
  const escHandler = (e) => {
    if (e.key === 'Escape' && state.get('agentPanelOpen')) {
      closePanel();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  // ─── History View Events ───
  if (_currentView === 'history') {
    // New Chat buttons
    const newChatBtns = panel.querySelectorAll('#acp-btn-new-chat, #acp-btn-new-chat-empty');
    newChatBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const conv = chatService.createConversation('New Conversation');
        _activeConvId = conv.id;
        _currentView = 'chat';
        rerenderPanel();
      });
    });

    // Open conversation
    panel.querySelectorAll('[data-conv-open]').forEach(card => {
      card.addEventListener('click', () => {
        const convId = card.getAttribute('data-conv-open');
        _activeConvId = convId;
        _currentView = 'chat';
        rerenderPanel();
      });
    });

    // Rename conversation
    panel.querySelectorAll('[data-conv-rename]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const convId = btn.getAttribute('data-conv-rename');
        const conv = chatService.getConversation(convId);
        if (!conv) return;
        const newName = prompt('Enter a new title for this chat:', conv.title);
        if (newName && newName.trim()) {
          chatService.renameConversation(convId, newName.trim());
          rerenderPanel();
        }
      });
    });

    // Delete conversation
    panel.querySelectorAll('[data-conv-delete]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const convId = btn.getAttribute('data-conv-delete');
        if (confirm('Delete this conversation? This action cannot be undone.')) {
          chatService.deleteConversation(convId);
          if (_activeConvId === convId) {
            _activeConvId = null;
            _currentView = 'history';
          }
          rerenderPanel();
        }
      });
    });
  }

  // ─── Chat View Events ───
  if (_currentView === 'chat') {
    // Back button
    const backBtn = panel.querySelector('#acp-btn-back');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        _currentView = 'history';
        _activeConvId = null;
        rerenderPanel();
      });
    }

    // Chat title double-click rename
    const titleEl = panel.querySelector('#acp-chat-title');
    if (titleEl) {
      titleEl.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const conv = chatService.getConversation(_activeConvId);
        if (!conv) return;
        const newName = prompt('Enter a new title for this chat:', conv.title);
        if (newName && newName.trim()) {
          chatService.renameConversation(_activeConvId, newName.trim());
          rerenderPanel();
        }
      });
    }

    // Send message
    const input = panel.querySelector('#acp-input');
    const sendBtn = panel.querySelector('#acp-send-btn');
    const messagesContainer = panel.querySelector('#acp-messages');

    const scrollToBottom = () => {
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    };
    scrollToBottom();

    // Focus input
    if (input) {
      setTimeout(() => input.focus(), 100);
      
      // Auto-resize textarea
      input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
      });

      // Enter to send (Shift+Enter for newline)
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    const sendMessage = () => {
      if (!input) return;
      const text = input.value.trim();
      if (!text || _isTyping) return;

      input.value = '';
      input.style.height = 'auto';

      // Add user message
      chatService.addMessage(_activeConvId, 'user', text);
      rerenderPanel();

      // Simulate agent response with typing indicator
      _isTyping = true;
      rerenderPanel();

      setTimeout(() => {
        const responseText = getAgentResponse(text);
        chatService.addMessage(_activeConvId, 'agent', responseText);
        _isTyping = false;
        rerenderPanel();
      }, 600 + Math.random() * 400);
    };

    if (sendBtn) {
      sendBtn.addEventListener('click', sendMessage);
    }
  }
}
