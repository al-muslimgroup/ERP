/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * Mobile-First Ergonomic Camera QR & Barcode Scanner Modal Component
 * Optimized for Factory Floor Handheld Smart Phones
 */

let activeScanner = null;
let scanAudio = null;
let isTorchOn = false;

function playScanBeep() {
  try {
    if (!scanAudio) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        const audioCtx = new AudioContextClass();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.value = 880; // A5 note
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      }
    }
    if (navigator.vibrate) {
      navigator.vibrate([80, 40, 80]);
    }
  } catch (_) {}
}

export function renderQrScannerModal() {
  return `
    <div class="modal-overlay qr-scanner-modal-overlay" id="modal-qr-scanner-overlay" style="z-index: 10050; background: rgba(0, 0, 0, 0.92); backdrop-filter: blur(8px); padding: 0;">
      
      <div class="qr-scanner-modal-card" style="display: flex; flex-direction: column; background: #0b1120; border: 1.5px solid #38bdf8; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.9);">
        
        <!-- Header -->
        <div class="qr-scanner-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.12); background: #0f172a; flex-shrink: 0;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 20px; width: 36px; height: 36px; border-radius: 8px; background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; display: flex; align-items: center; justify-content: center;">
              📷
            </div>
            <div>
              <h3 style="margin: 0; font-size: 15px; font-weight: 800; color: #fff; line-height: 1.2;">Scan Machine QR Code</h3>
              <div style="font-size: 11px; color: #38bdf8; margin-top: 1px;">Point camera at QR / Barcode tag</div>
            </div>
          </div>
          
          <button type="button" id="btn-close-qr-scanner" class="btn btn-ghost" style="font-size: 18px; color: #94a3b8; width: 42px; height: 42px; padding: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.06);" aria-label="Close Scanner">
            ✕
          </button>
        </div>

        <!-- Camera Viewport Area -->
        <div class="qr-scanner-viewport-wrap" style="position: relative; flex: 1; min-height: 320px; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          
          <!-- Scanner Container for Html5Qrcode -->
          <div id="qr-reader-container" style="width: 100%; height: 100%; position: absolute; inset: 0;"></div>

          <!-- Crosshair / Aiming Box -->
          <div class="qr-aiming-box" style="position: absolute; width: min(72vw, 250px); height: min(72vw, 250px); border: 2.5px solid #38bdf8; border-radius: 18px; box-shadow: 0 0 0 4000px rgba(0,0,0,0.55); pointer-events: none; display: flex; align-items: center; justify-content: center;">
            <!-- Laser scanning sweep -->
            <div class="qr-scanline" style="width: 90%; height: 2.5px; background: linear-gradient(90deg, transparent, #38bdf8, #67e8f9, #38bdf8, transparent); box-shadow: 0 0 10px #38bdf8; animation: qrScanline 1.8s infinite ease-in-out;"></div>
            
            <!-- Corner accent brackets -->
            <div style="position: absolute; top: -3px; left: -3px; width: 18px; height: 18px; border-top: 4px solid #fff; border-left: 4px solid #fff; border-top-left-radius: 8px;"></div>
            <div style="position: absolute; top: -3px; right: -3px; width: 18px; height: 18px; border-top: 4px solid #fff; border-right: 4px solid #fff; border-top-right-radius: 8px;"></div>
            <div style="position: absolute; bottom: -3px; left: -3px; width: 18px; height: 18px; border-bottom: 4px solid #fff; border-left: 4px solid #fff; border-bottom-left-radius: 8px;"></div>
            <div style="position: absolute; bottom: -3px; right: -3px; width: 18px; height: 18px; border-bottom: 4px solid #fff; border-right: 4px solid #fff; border-bottom-right-radius: 8px;"></div>
          </div>

          <!-- Camera Loading Indicator -->
          <div id="qr-camera-loading" style="position: absolute; color: #fff; font-size: 13px; text-align: center; pointer-events: none; z-index: 10;">
            <div style="font-size: 36px; margin-bottom: 10px; animation: spin 2s infinite linear; display: inline-block;">⚙️</div>
            <div style="font-weight: 700; color: #38bdf8;">Initializing Camera Sensor...</div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Please grant camera permission if prompted</div>
          </div>

          <!-- Error Alert View -->
          <div id="qr-camera-error" style="display: none; position: absolute; inset: 0; background: rgba(15,23,42,0.96); padding: 24px; text-align: center; flex-direction: column; align-items: center; justify-content: center; gap: 14px; z-index: 20;">
            <div style="font-size: 42px;">📷⚠️</div>
            <div style="color: #f87171; font-weight: 800; font-size: 15px;" id="qr-camera-error-msg">Camera Access Blocked or Not Available</div>
            <div style="color: #cbd5e1; font-size: 12.5px; line-height: 1.5; max-width: 320px;">
              Please grant camera permission in your phone browser or use manual search below.
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 8px;">
              <label class="btn btn-primary btn-sm" style="cursor: pointer; padding: 10px 16px; font-weight: 700;">
                📁 Upload QR Image
                <input type="file" id="file-qr-upload" accept="image/*" style="display: none;" />
              </label>
              <button type="button" id="btn-qr-error-manual" class="btn btn-secondary btn-sm" style="padding: 10px 16px; font-weight: 700;">
                🔎 Manual Search
              </button>
            </div>
          </div>

          <!-- Helpful floor hint pill -->
          <div style="position: absolute; bottom: 12px; z-index: 5; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 6px 14px; font-size: 11px; color: #cbd5e1; pointer-events: none; text-align: center;">
            💡 Hold phone 6-12 inches away from tag
          </div>
        </div>

        <!-- Camera Controls Bar -->
        <div class="qr-scanner-controls" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; gap: 8px; background: #0f172a; border-top: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;">
          
          <div style="display: flex; gap: 8px; align-items: center;">
            <!-- Torch / Flashlight Toggle -->
            <button type="button" id="btn-qr-torch" class="btn btn-secondary btn-sm" style="min-height: 42px; min-width: 44px; padding: 6px 12px; font-weight: 700; font-size: 12px; display: inline-flex; align-items: center; gap: 5px;" title="Toggle Flashlight / Torch">
              🔦 <span class="btn-text-torch">Torch</span>
            </button>

            <!-- Flip Camera -->
            <button type="button" id="btn-qr-switch-camera" class="btn btn-secondary btn-sm" style="min-height: 42px; min-width: 44px; padding: 6px 12px; font-weight: 700; font-size: 12px; display: inline-flex; align-items: center; gap: 5px;" title="Switch Camera">
              🔄 <span class="btn-text-flip">Flip</span>
            </button>

            <!-- File Upload -->
            <label class="btn btn-secondary btn-sm" style="min-height: 42px; padding: 6px 12px; font-weight: 700; font-size: 12px; cursor: pointer; margin: 0; display: inline-flex; align-items: center; gap: 5px;" title="Upload QR Photo">
              📁 <span class="btn-text-file">File</span>
              <input type="file" id="file-qr-upload-btn" accept="image/*" style="display: none;" />
            </label>
          </div>

          <!-- Fallback to manual search -->
          <button type="button" id="btn-qr-manual-fallback" class="btn btn-ghost btn-sm" style="min-height: 42px; font-size: 12.5px; color: #38bdf8; font-weight: 800; padding: 6px 12px;">
            🔎 Search
          </button>
        </div>

      </div>

    </div>

    <style>
      @keyframes qrScanline {
        0% { transform: translateY(-90px); opacity: 0.2; }
        50% { opacity: 1; }
        100% { transform: translateY(90px); opacity: 0.2; }
      }

      /* Desktop layout */
      .qr-scanner-modal-card {
        width: 95%;
        max-width: 500px;
        border-radius: 16px;
        max-height: 88vh;
      }
      .qr-scanner-viewport-wrap {
        height: 420px;
      }

      /* Mobile layout (<= 640px) */
      @media (max-width: 640px) {
        .qr-scanner-modal-overlay {
          padding: 0 !important;
        }
        .qr-scanner-modal-card {
          width: 100vw !important;
          max-width: 100vw !important;
          height: 100% !important;
          height: 100dvh !important;
          max-height: 100dvh !important;
          border-radius: 0 !important;
          border: none !important;
        }
        .qr-scanner-viewport-wrap {
          height: auto !important;
          flex: 1 1 auto !important;
        }
        .qr-scanner-controls {
          padding-bottom: max(16px, env(safe-area-inset-bottom, 16px)) !important;
        }
        .qr-scanner-header {
          padding-top: max(12px, env(safe-area-inset-top, 12px)) !important;
        }
      }
    </style>
  `;
}

export async function initQrScannerModalEvents({ onScanSuccess, onManualSearchRequest }) {
  const overlay = document.getElementById('modal-qr-scanner-overlay');
  const closeBtn = document.getElementById('btn-close-qr-scanner');
  const loadingEl = document.getElementById('qr-camera-loading');
  const errorEl = document.getElementById('qr-camera-error');
  const errorMsgEl = document.getElementById('qr-camera-error-msg');
  const flipBtn = document.getElementById('btn-qr-switch-camera');
  const torchBtn = document.getElementById('btn-qr-torch');
  const manualBtn = document.getElementById('btn-qr-manual-fallback');
  const errorManualBtn = document.getElementById('btn-qr-error-manual');
  const fileUploadInp = document.getElementById('file-qr-upload');
  const fileUploadBtnInp = document.getElementById('file-qr-upload-btn');

  let currentCameraIndex = 0;
  let availableCameras = [];
  let isScanningActive = false;
  isTorchOn = false;

  const destroyScanner = async () => {
    if (activeScanner && isScanningActive) {
      try {
        await activeScanner.stop();
        activeScanner.clear();
      } catch (_) {}
      activeScanner = null;
      isScanningActive = false;
    }
  };

  const closeScannerModal = async () => {
    await destroyScanner();
    if (overlay) overlay.remove();
  };

  if (closeBtn) closeBtn.addEventListener('click', closeScannerModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeScannerModal();
    });
  }

  const triggerManualFallback = async () => {
    await closeScannerModal();
    if (onManualSearchRequest) onManualSearchRequest();
  };

  if (manualBtn) manualBtn.addEventListener('click', triggerManualFallback);
  if (errorManualBtn) errorManualBtn.addEventListener('click', triggerManualFallback);

  // Handle successful scan
  const handleDecoded = async (decodedText) => {
    if (!decodedText) return;
    playScanBeep();
    await closeScannerModal();
    if (onScanSuccess) onScanSuccess(decodedText);
  };

  // Image file QR decoding fallback
  const handleFileUpload = async (file) => {
    if (!file || typeof Html5Qrcode === 'undefined') return;
    try {
      if (loadingEl) {
        loadingEl.style.display = 'block';
        loadingEl.querySelector('div:nth-child(2)').textContent = 'Analyzing Photo...';
      }
      const html5Qr = new Html5Qrcode('qr-reader-container');
      const result = await html5Qr.scanFile(file, true);
      if (result) {
        handleDecoded(result);
      }
    } catch (err) {
      if (loadingEl) loadingEl.style.display = 'none';
      alert('Could not detect QR code in uploaded image: ' + (err.message || 'Unrecognized barcode'));
    }
  };

  if (fileUploadInp) fileUploadInp.addEventListener('change', (e) => handleFileUpload(e.target.files[0]));
  if (fileUploadBtnInp) fileUploadBtnInp.addEventListener('change', (e) => handleFileUpload(e.target.files[0]));

  // Torch / Flashlight Toggle Controller
  if (torchBtn) {
    torchBtn.addEventListener('click', async () => {
      try {
        const videoEl = document.querySelector('#qr-reader-container video');
        if (videoEl && videoEl.srcObject) {
          const track = videoEl.srcObject.getVideoTracks()[0];
          if (track) {
            isTorchOn = !isTorchOn;
            await track.applyConstraints({
              advanced: [{ torch: isTorchOn }]
            });
            torchBtn.style.background = isTorchOn ? '#fbbf24' : '';
            torchBtn.style.color = isTorchOn ? '#000' : '';
            torchBtn.style.borderColor = isTorchOn ? '#f59e0b' : '';
            return;
          }
        }
        // Fallback via activeScanner.applyVideoConstraints
        if (activeScanner && typeof activeScanner.applyVideoConstraints === 'function') {
          isTorchOn = !isTorchOn;
          await activeScanner.applyVideoConstraints({
            advanced: [{ torch: isTorchOn }]
          });
          torchBtn.style.background = isTorchOn ? '#fbbf24' : '';
          torchBtn.style.color = isTorchOn ? '#000' : '';
        } else {
          alert('Flashlight torch is not supported on this camera/browser.');
        }
      } catch (err) {
        console.warn('Torch toggle not supported:', err);
        alert('Flashlight torch is not available on this camera hardware.');
      }
    });
  }

  // Initialize Html5Qrcode
  if (typeof Html5Qrcode === 'undefined') {
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) {
      errorEl.style.display = 'flex';
      errorMsgEl.textContent = 'Camera scanner library not loaded. Please use Manual Search.';
    }
    return;
  }

  try {
    activeScanner = new Html5Qrcode('qr-reader-container');

    try {
      availableCameras = await Html5Qrcode.getCameras();
    } catch (_) {
      availableCameras = [];
    }

    const startCamera = async (cameraIdOrFacing) => {
      if (loadingEl) loadingEl.style.display = 'block';
      if (errorEl) errorEl.style.display = 'none';

      const config = {
        fps: 20,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const minDim = Math.min(viewfinderWidth, viewfinderHeight);
          const boxSize = Math.max(200, Math.floor(minDim * 0.75));
          return { width: boxSize, height: boxSize };
        },
        aspectRatio: window.innerWidth <= 640 ? undefined : 1.0
      };

      try {
        if (cameraIdOrFacing) {
          await activeScanner.start(cameraIdOrFacing, config, handleDecoded, () => {});
        } else {
          await activeScanner.start({ facingMode: 'environment' }, config, handleDecoded, () => {});
        }
        isScanningActive = true;
        if (loadingEl) loadingEl.style.display = 'none';
      } catch (err) {
        console.warn('Camera environment start failed, trying user camera fallback:', err);
        try {
          await activeScanner.start({ facingMode: 'user' }, config, handleDecoded, () => {});
          isScanningActive = true;
          if (loadingEl) loadingEl.style.display = 'none';
        } catch (err2) {
          console.error('All camera attempts failed:', err2);
          if (loadingEl) loadingEl.style.display = 'none';
          if (errorEl) {
            errorEl.style.display = 'flex';
            errorMsgEl.textContent = err2.message || 'Camera permission denied or camera in use.';
          }
        }
      }
    };

    // Camera flip button
    if (flipBtn && availableCameras.length > 1) {
      flipBtn.addEventListener('click', async () => {
        await destroyScanner();
        activeScanner = new Html5Qrcode('qr-reader-container');
        currentCameraIndex = (currentCameraIndex + 1) % availableCameras.length;
        startCamera(availableCameras[currentCameraIndex].id);
      });
    }

    // Default start with rear camera
    await startCamera(availableCameras.length > 0 ? availableCameras[0].id : null);

  } catch (initErr) {
    console.error('Failed to initialize Html5Qrcode:', initErr);
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) {
      errorEl.style.display = 'flex';
      errorMsgEl.textContent = initErr.message || 'Camera sensor initialization failed.';
    }
  }
}
