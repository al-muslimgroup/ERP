/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * Email Configuration Component (Admin Panel)
 * High-performance, user-friendly SMTP setup and testing with instant feedback.
 */

import { emailService } from '../services/emailService.js';
import { authService } from '../services/authService.js';
import { state } from '../state.js';

export function renderEmailConfigView() {
  const config = emailService.getConfig();
  const isConfigured = emailService.isEmailConfigured();
  const emailLogs = emailService.getEmailLogs();
  const activeUser = authService.getCurrentUser();

  return `
    <div class="page-view" style="gap: 20px; max-width: 1200px; margin: 0 auto; width: 100%;">
      
      <!-- Top Header Banner -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(2, 132, 199, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); display: flex; align-items: center; justify-content: center; font-size: 24px;">
            ✉️
          </div>
          <div>
            <h1 style="font-size: 20px; font-weight: 800; color: #fff; margin: 0; display: flex; align-items: center; gap: 10px;">
              Email Configuration
              <span id="header-config-badge" class="badge ${isConfigured ? 'badge-active' : 'badge-maint'}" style="font-size: 11px; padding: 3px 9px;">
                ${isConfigured ? '🟢 Configured & Active' : '🟡 Not Configured'}
              </span>
            </h1>
            <p style="font-size: 12px; color: var(--text-secondary); margin-top: 3px; margin-bottom: 0;">
              Configure outgoing SMTP mail server for automated notifications and password recovery.
            </p>
          </div>
        </div>

        <div style="display: flex; gap: 10px; align-items: center;">
          <button type="button" id="btn-open-test-email-modal" class="btn btn-secondary btn-sm" style="font-weight: 700; border-color: rgba(56, 189, 248, 0.4); color: #38bdf8;">
            🧪 Send Test Email
          </button>
          <button type="button" id="btn-save-email-config" class="btn btn-primary btn-sm" style="font-weight: 700; background: linear-gradient(135deg, #0284c7, #0369a1);">
            💾 Save Configuration
          </button>
        </div>
      </div>

      <!-- Quick Guidance & Important Notice -->
      <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: flex-start; gap: 12px;">
        <span style="font-size: 20px; line-height: 1;">💡</span>
        <div style="font-size: 12.5px; color: #e2e8f0; line-height: 1.5;">
          <strong style="color: #38bdf8;">Important Note (Gmail / Google Workspace):</strong><br/>
          Google disables regular password logins for SMTP. To connect, open 
          <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline; font-weight: 700;">
            Google App Passwords
          </a> 
          while logged into your sender account and generate a <strong>16-character App Password</strong> for this system.
          <div style="margin-top: 5px; color: #a5f3fc; font-size: 12px;">
            ✅ <strong>Password Reset Notice:</strong> Email configuration is 100% optional! Users and admins can reset passwords instantly on-screen using the 6-digit OTP code on the login page without needing an email server.
          </div>
        </div>
      </div>

      <!-- Main Form & Settings Grid -->
      <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; align-items: start;">
        
        <!-- Left: SMTP Form Card -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);">
          
          <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 14px; margin-bottom: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h2 style="font-size: 15px; font-weight: 800; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
                ⚙️ SMTP Server Settings
              </h2>
              <span style="font-size: 11.5px; color: var(--text-muted);">Quick Presets below:</span>
            </div>

            <!-- Quick Preset Buttons -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button type="button" class="btn btn-secondary btn-sm btn-preset-smtp" data-host="smtp.gmail.com" data-port="587" data-enc="TLS" style="font-size: 11px; padding: 4px 10px;">
                🔴 Gmail (587 TLS)
              </button>
              <button type="button" class="btn btn-secondary btn-sm btn-preset-smtp" data-host="smtp.office365.com" data-port="587" data-enc="TLS" style="font-size: 11px; padding: 4px 10px;">
                🔵 Outlook / Office 365
              </button>
              <button type="button" class="btn btn-secondary btn-sm btn-preset-smtp" data-host="smtp.mail.yahoo.com" data-port="587" data-enc="TLS" style="font-size: 11px; padding: 4px 10px;">
                🟣 Yahoo Mail
              </button>
            </div>
          </div>

          <form id="form-email-config" style="display: flex; flex-direction: column; gap: 16px;">
            
            <!-- Sender Information Row -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #cbd5e1;">
                  From Name <span class="req">*</span>
                </label>
                <input 
                  type="text" 
                  id="cfg-from-name" 
                  class="form-control" 
                  placeholder="e.g. Al-Muslim ERP System" 
                  value="${config.fromName || 'Al-Muslim ERP System'}" 
                  required 
                />
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">Display name shown in recipient inbox.</div>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #cbd5e1;">
                  From Email <span class="req">*</span>
                </label>
                <input 
                  type="email" 
                  id="cfg-from-email" 
                  class="form-control" 
                  placeholder="e.g. maint.dept2023@gmail.com" 
                  value="${config.fromEmail || ''}" 
                  required 
                />
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">Sender address for outgoing emails.</div>
              </div>
            </div>

            <!-- Server Connection Row -->
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #cbd5e1;">
                  SMTP Host <span class="req">*</span>
                </label>
                <input 
                  type="text" 
                  id="cfg-smtp-host" 
                  class="form-control" 
                  placeholder="smtp.gmail.com" 
                  value="${config.smtpHost || ''}" 
                  required 
                  style="font-family: var(--font-mono); font-size: 13px;"
                />
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">SMTP Server address (e.g. smtp.gmail.com).</div>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #cbd5e1;">
                  SMTP Port <span class="req">*</span>
                </label>
                <input 
                  type="number" 
                  id="cfg-smtp-port" 
                  class="form-control" 
                  placeholder="587" 
                  value="${config.smtpPort || '587'}" 
                  required 
                  style="font-family: var(--font-mono); font-size: 13px;"
                />
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">Standard: 587 (TLS), 465 (SSL).</div>
              </div>
            </div>

            <!-- Authentication Row -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #cbd5e1;">
                  SMTP Username <span class="req">*</span>
                </label>
                <input 
                  type="text" 
                  id="cfg-smtp-user" 
                  class="form-control" 
                  placeholder="e.g. maint.dept2023@gmail.com" 
                  value="${config.smtpUser || ''}" 
                  required 
                  style="font-family: var(--font-mono); font-size: 13px;"
                />
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">Your email or SMTP username.</div>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #cbd5e1;">
                  SMTP Password / App Password <span class="req">*</span>
                </label>
                <div style="position: relative;">
                  <input 
                    type="password" 
                    id="cfg-smtp-pass" 
                    class="form-control" 
                    placeholder="••••••••••••••••" 
                    value="${config.smtpPass || ''}" 
                    style="padding-right: 38px; font-size: 13px;"
                  />
                  <span id="btn-toggle-smtp-pass" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; opacity: 0.7; font-size: 14px;" title="Toggle Password Visibility">👁️</span>
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">16-char Google App Password (no spaces).</div>
              </div>
            </div>

            <!-- Encryption Method -->
            <div class="form-group">
              <label class="form-label" style="font-size: 12px; font-weight: 700; color: #cbd5e1; margin-bottom: 8px;">
                Encryption Protocol <span class="req">*</span>
              </label>
              <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #fff; cursor: pointer; background: var(--bg-card); border: 1px solid var(--border-color); padding: 10px 18px; border-radius: var(--radius-md);">
                  <input 
                    type="radio" 
                    name="cfg-encryption" 
                    id="enc-tls"
                    value="TLS" 
                    ${config.encryption === 'TLS' || !config.encryption ? 'checked' : ''} 
                    style="cursor: pointer;"
                  />
                  <span>🔒 <strong>TLS / STARTTLS</strong> (Port 587 - Recommended)</span>
                </label>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #fff; cursor: pointer; background: var(--bg-card); border: 1px solid var(--border-color); padding: 10px 18px; border-radius: var(--radius-md);">
                  <input 
                    type="radio" 
                    name="cfg-encryption" 
                    id="enc-ssl"
                    value="SSL" 
                    ${config.encryption === 'SSL' ? 'checked' : ''} 
                    style="cursor: pointer;"
                  />
                  <span>🛡️ <strong>SSL</strong> (Port 465)</span>
                </label>
              </div>
            </div>

            <!-- Live Status / Result Alert Box -->
            <div id="inline-test-status-alert" style="display: none; padding: 12px 16px; border-radius: 8px; font-size: 12.5px; line-height: 1.4;"></div>

            <!-- Form Action Footer -->
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--border-color); margin-top: 6px; flex-wrap: wrap; gap: 10px;">
              <button type="button" id="btn-clear-email-config" class="btn btn-ghost btn-sm" style="color: #f87171;">
                🗑️ Clear Configuration
              </button>
              
              <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <button type="button" id="btn-quick-verify-connection" class="btn btn-secondary btn-sm" style="font-weight: 700; border-color: rgba(56, 189, 248, 0.4); color: #38bdf8;">
                  ⚡ Quick Test Handshake
                </button>
                <button type="button" id="btn-test-email-inline" class="btn btn-secondary btn-sm" style="font-weight: 700;">
                  🧪 Send Test Email
                </button>
                <button type="submit" class="btn btn-primary btn-sm" style="font-weight: 700; background: linear-gradient(135deg, #0284c7, #0369a1); padding: 8px 20px;">
                  💾 Save Configuration
                </button>
              </div>
            </div>

          </form>
        </div>

        <!-- Right: Status Card & Instructions -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Status Summary Card -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 14px; font-weight: 800; color: #38bdf8; margin: 0 0 12px 0; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
              📊 Service Status &amp; Diagnostics
            </h3>

            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12.5px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--text-muted);">Configuration State:</span>
                <span class="badge ${isConfigured ? 'badge-active' : 'badge-inactive'}">
                  ${isConfigured ? 'Configured' : 'Incomplete'}
                </span>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--text-muted);">Active Protocol:</span>
                <strong style="color: #fff;">${config.encryption || 'TLS'} (${config.smtpPort || '587'})</strong>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--text-muted);">Sender Identity:</span>
                <span style="color: #38bdf8; font-family: var(--font-mono); font-size: 11.5px;">${config.fromEmail || 'Not set'}</span>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--text-muted);">Last Test Status:</span>
                <span class="badge ${config.lastTestStatus === 'SUCCESS' ? 'badge-active' : (config.lastTestStatus === 'FAILED' ? 'badge-breakdown' : 'badge-idle')}">
                  ${config.lastTestStatus === 'SUCCESS' ? 'Passed' : (config.lastTestStatus === 'FAILED' ? 'Failed' : 'Never Tested')}
                </span>
              </div>

              ${config.lastTestedAt ? `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted);">Last Tested At:</span>
                  <span style="font-size: 11px; color: var(--text-secondary);">${new Date(config.lastTestedAt).toLocaleString()}</span>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Step-by-Step Google App Password Guide -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 14px; font-weight: 800; color: #fff; margin: 0 0 10px 0; display: flex; align-items: center; gap: 8px;">
              🔑 Google App Password Setup Guide
            </h3>
            
            <ol style="margin: 0; padding-left: 20px; font-size: 12px; color: var(--text-secondary); line-height: 1.6;">
              <li>Log into your sender Google account at <a href="https://myaccount.google.com" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">myaccount.google.com</a>.</li>
              <li>Under <strong>Security</strong>, turn on <strong>2-Step Verification</strong> if not already enabled.</li>
              <li>Navigate to <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">myaccount.google.com/apppasswords</a>.</li>
              <li>Enter <strong>ERP Mailer</strong> as the app name and click <strong>Create</strong>.</li>
              <li>Copy the generated <strong>16-character code</strong> and paste it into the SMTP Password field above.</li>
            </ol>
          </div>

        </div>

      </div>

      <!-- Outgoing Email Activity History -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 14px;">
          <div>
            <h3 style="font-size: 15px; font-weight: 800; color: #fff; margin: 0;">
              📨 Outgoing Email Activity Log
            </h3>
            <div style="font-size: 11.5px; color: var(--text-secondary); margin-top: 2px;">
              History of test messages, reset links, and system notifications dispatched.
            </div>
          </div>

          ${emailLogs.length > 0 ? `
            <button id="btn-clear-email-logs" class="btn btn-ghost btn-sm" style="font-size: 11.5px; color: #94a3b8;">
              Clear Logs
            </button>
          ` : ''}
        </div>

        <div style="overflow-x: auto;">
          <table class="table" style="width: 100%; margin: 0; font-size: 12.5px; border-collapse: collapse;">
            <thead>
              <tr style="background: rgba(30, 41, 59, 0.6); border-bottom: 1px solid var(--border-color);">
                <th style="width: 45px; text-align: center; padding: 10px;">Sl.</th>
                <th style="padding: 10px;">Subject / Type</th>
                <th style="padding: 10px;">Recipient Email</th>
                <th style="width: 90px; padding: 10px;">Status</th>
                <th style="width: 170px; padding: 10px;">Dispatched At</th>
                <th style="text-align: center; width: 70px; padding: 10px;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${emailLogs.length === 0 ? `
                <tr>
                  <td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 12px;">
                    No outgoing emails logged yet. Click "Send Test Email" or "Quick Test Handshake" to verify connectivity.
                  </td>
                </tr>
              ` : emailLogs.map((log, idx) => `
                <tr>
                  <td style="text-align: center; color: var(--text-muted); font-size: 11.5px;">${idx + 1}</td>
                  <td>
                    <div style="font-weight: 700; color: #fff; font-size: 12.5px;">${log.subject || 'System Notification'}</div>
                    <div style="font-size: 10.5px; color: #38bdf8; font-family: var(--font-mono);">${log.type || 'NOTIFICATION'}</div>
                  </td>
                  <td>
                    <div style="font-family: var(--font-mono); font-size: 12px; color: #e2e8f0;">${log.to}</div>
                    ${log.recipientName ? `<div style="font-size: 10.5px; color: var(--text-muted);">${log.recipientName}</div>` : ''}
                  </td>
                  <td>
                    <span class="badge ${log.status === 'SENT' ? 'badge-active' : 'badge-breakdown'}" style="font-size: 10px;">
                      ${log.status || 'SENT'}
                    </span>
                  </td>
                  <td style="font-size: 11.5px; color: var(--text-secondary);">
                    ${new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td style="text-align: center;">
                    <button class="btn btn-secondary btn-sm btn-view-mail-content" data-id="${log.id}" style="padding: 3px 8px; font-size: 11px;">
                      👁️ View
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

/**
 * Helper to read current input values directly from the active form
 */
function readCurrentFormConfig() {
  const fromName = document.getElementById('cfg-from-name')?.value?.trim() || 'Al-Muslim ERP System';
  const fromEmail = document.getElementById('cfg-from-email')?.value?.trim().toLowerCase() || '';
  const smtpHost = document.getElementById('cfg-smtp-host')?.value?.trim() || '';
  const smtpPort = document.getElementById('cfg-smtp-port')?.value?.trim() || '587';
  const smtpUser = document.getElementById('cfg-smtp-user')?.value?.trim() || '';
  const smtpPass = document.getElementById('cfg-smtp-pass')?.value?.trim() || '';
  const encryption = document.querySelector('input[name="cfg-encryption"]:checked')?.value || 'TLS';

  return {
    fromName,
    fromEmail,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass,
    encryption
  };
}

export function initEmailConfigEvents() {
  const form = document.getElementById('form-email-config');
  const modalOverlay = document.getElementById('modal-test-email-overlay');

  // 1. Preset Buttons (1-click fill for Gmail, Outlook, Yahoo)
  document.querySelectorAll('.btn-preset-smtp').forEach(btn => {
    btn.addEventListener('click', () => {
      const host = btn.getAttribute('data-host');
      const port = btn.getAttribute('data-port');
      const enc = btn.getAttribute('data-enc');

      const inpHost = document.getElementById('cfg-smtp-host');
      const inpPort = document.getElementById('cfg-smtp-port');
      const radTls = document.getElementById('enc-tls');
      const radSsl = document.getElementById('enc-ssl');

      if (inpHost) inpHost.value = host;
      if (inpPort) inpPort.value = port;
      if (enc === 'SSL' && radSsl) radSsl.checked = true;
      else if (radTls) radTls.checked = true;

      // Also suggest From Email username if empty
      const inpUser = document.getElementById('cfg-smtp-user');
      const inpFrom = document.getElementById('cfg-from-email');
      if (inpFrom && inpFrom.value && (!inpUser || !inpUser.value)) {
        inpUser.value = inpFrom.value;
      }

      if (window.__erpApp?.showToast) {
        window.__erpApp.showToast('ℹ️ Preset Applied', `${host}:${port} (${enc}) selected.`, 'info');
      }
    });
  });

  // 2. Save Configuration Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        const currentConfig = readCurrentFormConfig();
        emailService.saveConfig(currentConfig);

        if (window.__erpApp?.showToast) {
          window.__erpApp.showToast('✅ Configuration Saved', 'SMTP settings saved successfully.', 'success');
        }

        const badge = document.getElementById('header-config-badge');
        if (badge) {
          badge.className = 'badge badge-active';
          badge.textContent = '🟢 Configured & Active';
        }
      } catch (err) {
        if (window.__erpApp?.showToast) {
          window.__erpApp.showToast('❌ Error Saving Email Config', err.message, 'danger');
        } else {
          alert('Error: ' + err.message);
        }
      }
    });
  }

  // Top header save button
  const btnSaveTop = document.getElementById('btn-save-email-config');
  if (btnSaveTop && form) {
    btnSaveTop.addEventListener('click', () => {
      form.requestSubmit();
    });
  }

  // 3. Toggle Password Visibility
  const btnTogglePass = document.getElementById('btn-toggle-smtp-pass');
  const inputPass = document.getElementById('cfg-smtp-pass');
  if (btnTogglePass && inputPass) {
    btnTogglePass.addEventListener('click', () => {
      if (inputPass.type === 'password') {
        inputPass.type = 'text';
        btnTogglePass.textContent = '🙈';
      } else {
        inputPass.type = 'password';
        btnTogglePass.textContent = '👁️';
      }
    });
  }

  // 4. Quick Test Handshake Button (Fast inline test in 1-2s, no modal!)
  const btnQuickVerify = document.getElementById('btn-quick-verify-connection');
  const inlineStatusBox = document.getElementById('inline-test-status-alert');
  if (btnQuickVerify) {
    btnQuickVerify.addEventListener('click', async () => {
      const activeConfig = readCurrentFormConfig();

      if (!activeConfig.smtpHost || !activeConfig.smtpUser) {
        if (inlineStatusBox) {
          inlineStatusBox.style.display = 'block';
          inlineStatusBox.style.background = 'rgba(239, 68, 68, 0.15)';
          inlineStatusBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
          inlineStatusBox.style.color = '#f87171';
          inlineStatusBox.innerHTML = '❌ Please enter SMTP Host and Username first.';
        }
        return;
      }

      const origText = btnQuickVerify.textContent;
      try {
        btnQuickVerify.disabled = true;
        btnQuickVerify.textContent = '⏳ Testing connection...';

        if (inlineStatusBox) {
          inlineStatusBox.style.display = 'block';
          inlineStatusBox.style.background = 'rgba(56, 189, 248, 0.15)';
          inlineStatusBox.style.border = '1px solid rgba(56, 189, 248, 0.4)';
          inlineStatusBox.style.color = '#38bdf8';
          inlineStatusBox.textContent = `Connecting to ${activeConfig.smtpHost}:${activeConfig.smtpPort}...`;
        }

        const res = await emailService.verifyConnection(activeConfig);

        if (inlineStatusBox) {
          inlineStatusBox.style.background = 'rgba(16, 185, 129, 0.15)';
          inlineStatusBox.style.border = '1px solid rgba(16, 185, 129, 0.4)';
          inlineStatusBox.style.color = '#34d399';
          inlineStatusBox.innerHTML = `✅ <strong>Success!</strong> ${res.message}`;
        }

        if (window.__erpApp?.showToast) {
          window.__erpApp.showToast('✅ SMTP Connected', 'Connection handshake verified successfully!', 'success');
        }
      } catch (err) {
        if (inlineStatusBox) {
          inlineStatusBox.style.background = 'rgba(239, 68, 68, 0.15)';
          inlineStatusBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
          inlineStatusBox.style.color = '#f87171';
          inlineStatusBox.innerHTML = `❌ <strong>Connection Failed:</strong> ${err.message}`;
        }

        if (window.__erpApp?.showToast) {
          window.__erpApp.showToast('❌ Connection Failed', err.message, 'danger');
        }
      } finally {
        btnQuickVerify.disabled = false;
        btnQuickVerify.textContent = origText;
      }
    });
  }

  // Ensure any stale modal is cleanly removed
  document.getElementById('modal-test-email-overlay')?.remove();

  // 5. Open Dynamic Test Email Modal (Created only when requested, destroyed on close)
  const openTestEmailModal = () => {
    document.getElementById('modal-test-email-overlay')?.remove();
    const currentConfig = readCurrentFormConfig();
    const defaultRecipient = currentConfig.fromEmail || 'maint.dept2023@gmail.com';

    const modalHtml = `
      <div class="modal-overlay" id="modal-test-email-overlay" style="z-index: 10050;">
        <div class="modal-card" style="width: 480px; max-width: 95vw; background: linear-gradient(145deg, #0f172a, #1e293b); border: 1.5px solid rgba(56, 189, 248, 0.4); border-radius: var(--radius-xl); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7); overflow: hidden;">
          
          <!-- Modal Header -->
          <div style="background: linear-gradient(135deg, #0284c7, #0369a1); padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.15);">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 22px;">🧪</span>
              <div>
                <h2 style="font-size: 15px; font-weight: 800; color: #fff; margin: 0;">Send SMTP Test Email</h2>
                <div style="font-size: 11px; color: #e0f2fe;">Live SMTP handshake &amp; delivery test</div>
              </div>
            </div>
            <button type="button" id="btn-close-test-email-modal" class="btn btn-ghost btn-sm" style="color: #fff; font-size: 18px; padding: 2px 6px;">✕</button>
          </div>

          <!-- Modal Body -->
          <form id="form-send-test-email" style="padding: 22px; display: flex; flex-direction: column; gap: 16px;">
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 14px; font-size: 12px;">
              <div style="color: var(--text-muted); font-size: 11px; font-weight: 700; text-transform: uppercase;">Outgoing Sender:</div>
              <div id="modal-gateway-sender" style="color: #38bdf8; font-family: var(--font-mono); margin-top: 2px; font-weight: 700;">
                ${currentConfig.fromName} &lt;${currentConfig.fromEmail || 'Not set'}&gt;
              </div>
              <div id="modal-gateway-server" style="color: var(--text-secondary); font-size: 11px; margin-top: 2px;">
                Server: ${currentConfig.smtpHost || 'N/A'}:${currentConfig.smtpPort || '587'} (${currentConfig.encryption || 'TLS'})
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size: 12px; font-weight: 700; color: #fff;">
                Recipient Email Address <span class="req">*</span>
              </label>
              <input 
                type="email" 
                id="inp-test-recipient-email" 
                class="form-control" 
                placeholder="e.g. maint.dept2023@gmail.com" 
                value="${defaultRecipient}" 
                required 
                style="font-size: 13px;"
              />
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">
                A test verification packet will be delivered to this address.
              </div>
            </div>

            <div id="test-email-status-alert" style="display: none; padding: 12px 14px; border-radius: 6px; font-size: 12px; line-height: 1.4;"></div>

            <div style="display: flex; justify-content: flex-end; gap: 10px; padding-top: 10px; border-top: 1px solid var(--border-color);">
              <button type="button" id="btn-cancel-test-email" class="btn btn-secondary btn-sm" style="font-weight: 600;">Cancel</button>
              <button type="submit" id="btn-execute-send-test" class="btn btn-primary btn-sm" style="font-weight: 700; background: linear-gradient(135deg, #0284c7, #0369a1);">
                🚀 Send Test Email
              </button>
            </div>
          </form>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const overlay = document.getElementById('modal-test-email-overlay');
    const closeBtn = document.getElementById('btn-close-test-email-modal');
    const cancelBtn = document.getElementById('btn-cancel-test-email');

    const removeModal = () => {
      overlay?.remove();
    };

    closeBtn?.addEventListener('click', removeModal);
    cancelBtn?.addEventListener('click', removeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) removeModal();
    });

    const formTest = document.getElementById('form-send-test-email');
    if (formTest) {
      formTest.addEventListener('submit', async (e) => {
        e.preventDefault();
        const targetEmail = document.getElementById('inp-test-recipient-email')?.value?.trim();
        const statusBox = document.getElementById('test-email-status-alert');
        const submitBtn = document.getElementById('btn-execute-send-test');
        const activeCfg = readCurrentFormConfig();

        if (!targetEmail) {
          alert('Please enter a recipient email.');
          return;
        }

        try {
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '⏳ Sending test email...';
          }

          if (statusBox) {
            statusBox.style.display = 'block';
            statusBox.style.background = 'rgba(56, 189, 248, 0.15)';
            statusBox.style.border = '1px solid rgba(56, 189, 248, 0.4)';
            statusBox.style.color = '#38bdf8';
            statusBox.textContent = `Connecting to ${activeCfg.smtpHost} and dispatching test email to ${targetEmail}...`;
          }

          const res = await emailService.sendTestEmail(targetEmail, activeCfg);

          if (statusBox) {
            statusBox.style.background = 'rgba(16, 185, 129, 0.15)';
            statusBox.style.border = '1px solid rgba(16, 185, 129, 0.4)';
            statusBox.style.color = '#34d399';
            statusBox.innerHTML = `✅ <strong>Success!</strong> ${res.message}`;
          }

          if (window.__erpApp?.showToast) {
            window.__erpApp.showToast('✅ SMTP Test Succeeded', `Test email delivered to ${res.recipient}.`, 'success');
          }

          setTimeout(() => {
            removeModal();
            if (window.__erpApp?.renderMainContent) {
              window.__erpApp.renderMainContent();
            }
          }, 1500);

        } catch (err) {
          if (statusBox) {
            statusBox.style.display = 'block';
            statusBox.style.background = 'rgba(239, 68, 68, 0.15)';
            statusBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
            statusBox.style.color = '#f87171';
            statusBox.innerHTML = `❌ <strong>Test Failed:</strong> ${err.message}`;
          }

          if (window.__erpApp?.showToast) {
            window.__erpApp.showToast('❌ SMTP Test Failed', err.message, 'danger');
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '🚀 Send Test Email';
          }
        }
      });
    }
  };

  const btnOpenTestModal = document.getElementById('btn-open-test-email-modal');
  if (btnOpenTestModal) {
    btnOpenTestModal.addEventListener('click', openTestEmailModal);
  }

  const btnTestInline = document.getElementById('btn-test-email-inline');
  if (btnTestInline) {
    btnTestInline.addEventListener('click', openTestEmailModal);
  }

  // 7. Clear Configuration
  const btnClear = document.getElementById('btn-clear-email-config');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear the email configuration? Automated email delivery will be disabled.')) {
        emailService.clearConfig();
        if (window.__erpApp?.showToast) {
          window.__erpApp.showToast('🗑️ Cleared', 'Email configuration has been reset.', 'info');
        }
        if (window.__erpApp?.renderMainContent) {
          window.__erpApp.renderMainContent();
        }
      }
    });
  }

  // 8. Clear Email Activity Logs
  const btnClearLogs = document.getElementById('btn-clear-email-logs');
  if (btnClearLogs) {
    btnClearLogs.addEventListener('click', () => {
      if (confirm('Clear outgoing email activity history?')) {
        emailService.clearEmailLogs();
        if (window.__erpApp?.renderMainContent) {
          window.__erpApp.renderMainContent();
        }
      }
    });
  }

  // 9. View Mail Content modal
  document.querySelectorAll('.btn-view-mail-content').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const logs = emailService.getEmailLogs();
      const mail = logs.find(l => l.id === id);
      if (mail) {
        alert(`Subject: ${mail.subject}\nTo: ${mail.to}\nDate: ${new Date(mail.timestamp).toLocaleString()}\n\nContent:\n${mail.content}`);
      }
    });
  });
}
