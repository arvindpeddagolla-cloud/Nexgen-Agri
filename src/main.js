import { farmState } from './data.js';
import { translations } from './i18n.js';
import { sound } from './audio.js';

// Global navigation router
window.navigateTo = function(screenName) {
  sound.tap();
  farmState.currentTab = screenName;

  const screens = {
    'login': document.getElementById('screen-login'),
    'dashboard': document.getElementById('screen-dashboard'),
    'farm-zones': document.getElementById('screen-zones'),
    'crop-ai-scanner': document.getElementById('screen-crop-ai'),
    'irrigation-telemetry': document.getElementById('screen-irrigation'),
    'agri-settings': document.getElementById('screen-more')
  };

  // Hide all screens
  Object.values(screens).forEach(screen => {
    if (screen) {
      screen.classList.add('hidden');
      screen.classList.remove('flex');
    }
  });

  // Show selected screen
  const targetScreen = screens[screenName] || screens['dashboard'];
  if (targetScreen) {
    targetScreen.classList.remove('hidden');
    targetScreen.classList.add('flex');
  }

  // Scroll to top of viewport
  const viewport = document.getElementById('screen-viewport');
  if (viewport) viewport.scrollTop = 0;

  // Update header and bottom nav visibility based on login state
  const header = document.getElementById('global-header');
  const nav = document.getElementById('global-nav-bar');

  if (screenName === 'login') {
    if (header) header.classList.add('hidden');
    if (nav) nav.classList.add('hidden');
  } else {
    if (header) header.classList.remove('hidden');
    if (nav) nav.classList.remove('hidden');
  }

  // Update nav active states
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('data-nav') === screenName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Re-render screen-specific components if needed
  if (screenName === 'farm-zones') {
    renderZoneCards('all');
  } else if (screenName === 'crop-ai-scanner') {
    renderDiagnosticsHistory();
  }
};

// Language switcher
window.setLanguage = function(lang) {
  farmState.selectedLanguage = lang;
  sound.tap();
  
  const dict = translations[lang] || translations.en;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update language buttons styling
  document.querySelectorAll('.lang-switch-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('bg-primary', 'text-on-primary', 'font-bold');
      btn.classList.remove('text-on-surface-variant');
    } else {
      btn.classList.remove('bg-primary', 'text-on-primary', 'font-bold');
      btn.classList.add('text-on-surface-variant');
    }
  });

  const langNames = { en: "English", hi: "हिंदी (Hindi)", te: "తెలుగు (Telugu)" };
  showToast(`Language set to ${langNames[lang] || lang}`);
};

// Toast notification helper
window.showToast = function(msg, icon = 'check_circle') {
  const toast = document.getElementById('global-toast');
  const toastText = document.getElementById('toast-text');
  const toastIcon = document.getElementById('toast-icon');
  if (!toast || !toastText) return;

  toastText.textContent = msg;
  if (toastIcon) toastIcon.textContent = icon;

  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
};

// Toggle Desktop Mockup Frame vs Fullscreen Mobile view
function initFrameToggle() {
  const toggleBtn = document.getElementById('toggle-frame-btn');
  const frameText = document.getElementById('frame-mode-text');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sound.tap();
      document.body.classList.toggle('fullscreen-mobile');
      const isFull = document.body.classList.contains('fullscreen-mobile');
      if (frameText) {
        frameText.textContent = isFull ? "Phone Frame" : "Fit View";
      }
      showToast(isFull ? "Switched to Full Screen Mobile View" : "Switched to Phone Simulator Frame");
    });
  }

  const themeBtn = document.getElementById('toggle-theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      sound.tap();
      document.body.classList.toggle('dark-theme');
      document.documentElement.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark-theme');
      showToast(isDark ? "Dark Telemetry Theme Enabled" : "High Sunlight Contrast Theme Enabled");
    });
  }

  const soundBtn = document.getElementById('toggle-sound-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      sound.enabled = !sound.enabled;
      soundBtn.innerHTML = `<span class="material-symbols-outlined text-[15px]">${sound.enabled ? 'volume_up' : 'volume_off'}</span><span>Sound ${sound.enabled ? 'ON' : 'OFF'}</span>`;
      soundBtn.className = `hover:text-white flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-slate-800/80 ${sound.enabled ? 'text-emerald-300' : 'text-slate-400'}`;
      if (sound.enabled) sound.tap();
      showToast(`Audio & Haptic Feedback ${sound.enabled ? 'Enabled' : 'Muted'}`);
    });
  }

  const logoutBtn = document.getElementById('quick-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.logoutFarmer();
    });
  }
}

// Authentication Logic
function initAuth() {
  const loginForm = document.getElementById('login-form');
  const biometricBtn = document.getElementById('biometric-login-btn');
  const togglePwdBtn = document.getElementById('toggle-pwd-btn');
  const pwdInput = document.getElementById('input-password');
  const eyeIcon = document.getElementById('eye-icon');
  const scanQrBtn = document.getElementById('scan-qr-btn');

  if (togglePwdBtn && pwdInput && eyeIcon) {
    togglePwdBtn.addEventListener('click', () => {
      sound.tap();
      const isPwd = pwdInput.type === 'password';
      pwdInput.type = isPwd ? 'text' : 'password';
      eyeIcon.textContent = isPwd ? 'visibility_off' : 'visibility';
    });
  }

  if (scanQrBtn) {
    scanQrBtn.addEventListener('click', () => {
      sound.cameraShutter();
      showToast('QR Code Scanned: Node Sector 4 Bound', 'qr_code_2');
      const nodeInput = document.getElementById('input-node-id');
      if (nodeInput) nodeInput.value = 'NODE-PUNJAB-04-A (Verified)';
    });
  }

  if (biometricBtn) {
    biometricBtn.addEventListener('click', () => {
      sound.tap();
      showToast('Scanning Fingerprint / Face ID...', 'fingerprint');
      setTimeout(() => {
        sound.success();
        showToast('Identity Verified: Ramesh Patel (Kisan ID: RP-7492-PB)', 'verified');
        setTimeout(() => {
          farmState.authenticated = true;
          navigateTo('dashboard');
        }, 800);
      }, 900);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('login-submit-btn');
      const originalText = submitBtn.innerHTML;
      sound.tap();
      submitBtn.innerHTML = `<span class="material-symbols-outlined animate-spin text-[18px]">sync</span><span>Authenticating LoRa Mesh...</span>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        sound.success();
        submitBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">check_circle</span><span>Authenticated!</span>`;
        submitBtn.classList.replace('bg-primary', 'bg-secondary');
        showToast('Connected to Sector 4 Edge Gateway (LoRa Mesh)', 'check_circle');

        setTimeout(() => {
          farmState.authenticated = true;
          submitBtn.innerHTML = originalText;
          submitBtn.classList.replace('bg-secondary', 'bg-primary');
          submitBtn.disabled = false;
          navigateTo('dashboard');
        }, 600);
      }, 1000);
    });
  }
}

// Zone selection in dashboard
window.selectDashboardZone = function(zoneKey) {
  sound.tap();
  const zone = farmState.zones[zoneKey];
  if (!zone) return;

  const titleEl = document.getElementById('dash-drawer-title');
  const descEl = document.getElementById('dash-drawer-desc');
  
  if (titleEl && descEl) {
    titleEl.textContent = `Zone ${zone.id}: ${zone.name}`;
    descEl.textContent = `${zone.statusText} • Soil: ${zone.moisture}% • Health: ${zone.health}%`;
  }
  showToast(`Selected Zone ${zone.id} Telemetry Matrix`);
};

// Motor Toggle Logic
window.toggleMotorState = function(motorId) {
  const motor = farmState.motors[motorId];
  if (!motor) return;

  motor.running = !motor.running;
  const statusEl = document.querySelector(`.motor-status-${motorId}`);
  const dotEl = document.querySelector(`.motor-dot-${motorId}`);

  if (motor.running) {
    sound.motor();
    motor.status = "RUNNING";
    motor.psi = 42;
    if (statusEl) {
      statusEl.textContent = "RUNNING";
      statusEl.className = `text-xs font-extrabold text-secondary motor-status-${motorId}`;
    }
    if (dotEl) {
      dotEl.className = `w-2.5 h-2.5 rounded-full bg-secondary animate-ping motor-dot-${motorId}`;
    }
    showToast(`${motor.name} Activated • 42 PSI Nominal Flow`, 'water_drop');
  } else {
    sound.tap();
    motor.status = "OFF";
    motor.psi = 0;
    if (statusEl) {
      statusEl.textContent = "OFF";
      statusEl.className = `text-xs font-extrabold text-on-surface motor-status-${motorId}`;
    }
    if (dotEl) {
      dotEl.className = `w-2.5 h-2.5 rounded-full bg-outline-variant motor-dot-${motorId}`;
    }
    showToast(`${motor.name} Stopped Gracefully`, 'power_settings_new');
  }
};

// Emergency Cutoff Modal
window.showEmergencyModal = function() {
  sound.alert();
  const modal = document.getElementById('emergency-modal');
  if (modal) modal.classList.add('show');
};

window.hideEmergencyModal = function() {
  sound.tap();
  const modal = document.getElementById('emergency-modal');
  if (modal) modal.classList.remove('show');
};

window.executeEmergencyStop = function() {
  sound.alert();
  hideEmergencyModal();
  
  // Cut all motors
  Object.keys(farmState.motors).forEach(id => {
    const motor = farmState.motors[id];
    motor.running = false;
    motor.status = "EMERGENCY OFF";
    const statusEl = document.querySelector(`.motor-status-${id}`);
    const dotEl = document.querySelector(`.motor-dot-${id}`);
    if (statusEl) {
      statusEl.textContent = "STOPPED";
      statusEl.className = `text-xs font-extrabold text-error motor-status-${id}`;
    }
    if (dotEl) {
      dotEl.className = `w-2.5 h-2.5 rounded-full bg-error motor-dot-${id}`;
    }
  });

  showToast('⚠️ ALL MOTORS AND VALVES ISOLATED VIA LORA MESH', 'warning');
};

// Quick Start Pump action
window.quickStartPump = function(label) {
  sound.motor();
  showToast(`Starting ${label} • Valve #4 opened`, 'water_drop');
};

window.dismissActionCard = function(btn) {
  sound.tap();
  const card = btn.closest('.bg-surface-container-low');
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.96)';
    card.style.transition = 'all 0.2s ease';
    setTimeout(() => {
      card.remove();
      showToast('Priority action deferred by 1 hour');
    }, 200);
  }
};

// Render Zone Cards on Zones screen
function renderZoneCards(filterKey = 'all') {
  const container = document.getElementById('zone-cards-container');
  if (!container) return;

  const entries = Object.entries(farmState.zones).filter(([k, z]) => {
    return filterKey === 'all' || k === filterKey;
  });

  container.innerHTML = entries.map(([key, zone]) => `
    <div class="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm border border-outline-variant/30 relative overflow-hidden flex flex-col gap-2 transition-all">
      <div class="absolute top-0 left-0 right-0 h-1 ${zone.status === 'Urgent' || zone.status === 'Alert' ? 'bg-error' : 'bg-secondary'}"></div>
      
      <div class="flex items-start justify-between">
        <div>
          <div class="flex items-center gap-1.5">
            <h3 class="font-extrabold text-sm text-primary">Zone ${zone.id}</h3>
            <span class="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${zone.status === 'Urgent' || zone.status === 'Alert' ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'}">
              ${zone.status}
            </span>
          </div>
          <span class="text-xs text-on-surface-variant">${zone.crop}</span>
        </div>
        <div class="text-right text-[10px]">
          <span class="text-secondary font-bold flex items-center justify-end gap-0.5">
            <span class="material-symbols-outlined text-[13px]">battery_5_bar</span> ${zone.battery}%
          </span>
          <span class="text-on-surface-variant font-mono">${zone.node}</span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-1.5 bg-surface-container-low rounded-xl p-2 text-center text-xs">
        <div>
          <span class="text-[9px] text-on-surface-variant block">Crop Health</span>
          <span class="font-extrabold text-on-surface text-xs">${zone.health}%</span>
        </div>
        <div>
          <span class="text-[9px] ${zone.moisture < 35 ? 'text-error font-bold' : 'text-on-surface-variant'} block">Moisture</span>
          <span class="font-extrabold text-xs ${zone.moisture < 35 ? 'text-error' : 'text-on-surface'}">${zone.moisture}%</span>
        </div>
        <div>
          <span class="text-[9px] text-on-surface-variant block">Pest Risk</span>
          <span class="font-extrabold text-xs ${zone.pest === 'HIGH' ? 'text-error' : 'text-secondary'}">${zone.pest}</span>
        </div>
      </div>

      <div class="flex items-center justify-between pt-0.5">
        <span class="text-[11px] font-semibold text-on-surface-variant truncate max-w-[60%]">
          ${zone.statusText}
        </span>
        <button class="px-2.5 py-1 rounded-lg ${zone.status === 'Urgent' ? 'bg-error text-white' : 'bg-primary text-on-primary'} text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95" onclick="openZoneDetailsModal('${key}')">
          <span>Action</span>
          <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Zone modal details
window.openZoneDetailsModal = function(zoneKey) {
  sound.tap();
  const zone = farmState.zones[zoneKey];
  if (!zone) return;

  const modal = document.getElementById('zone-details-sheet');
  const title = document.getElementById('modal-zone-title');
  const subtitle = document.getElementById('modal-zone-subtitle');
  const moisture = document.getElementById('modal-zone-moisture');
  const temp = document.getElementById('modal-zone-temp');
  const advice = document.getElementById('modal-zone-advice');

  if (title) title.textContent = `Zone ${zone.id}: ${zone.name}`;
  if (subtitle) subtitle.textContent = `${zone.crop} • ${zone.node}`;
  if (moisture) moisture.textContent = `${zone.moisture}%`;
  if (temp) temp.textContent = `${zone.temp}°C`;
  if (advice) advice.textContent = zone.statusText;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeZoneModal = function() {
  sound.tap();
  const modal = document.getElementById('zone-details-sheet');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.triggerZoneAction = function(actionType) {
  closeZoneModal();
  if (actionType === 'irrigate') {
    navigateTo('irrigation-telemetry');
    showToast('Directed to Smart Irrigation Telemetry');
  } else {
    navigateTo('crop-ai-scanner');
    showToast('Launching Crop AI Scanner Diagnostic');
  }
};

// 7-day chart daily insights
window.showChartDayInsight = function(day, temp, risk, advice) {
  sound.tap();
  const msgEl = document.getElementById('chart-insight-msg');
  if (msgEl) {
    msgEl.innerHTML = `<strong>${day} (${temp}):</strong> ${risk} — ${advice}`;
  }
  showToast(`${day} Forecast: ${temp} • ${risk}`);
};

// Crop AI Screen Helpers
window.switchCropFeed = function(feedType) {
  sound.tap();
  const leafBtn = document.getElementById('feed-btn-leaf');
  const droneBtn = document.getElementById('feed-btn-drone');
  const img = document.getElementById('scanner-image');

  if (feedType === 'leaf') {
    if (leafBtn) {
      leafBtn.className = "flex-1 py-1.5 px-2 rounded-lg bg-surface-container-lowest text-primary font-bold shadow-xs transition-all flex items-center justify-center gap-1";
    }
    if (droneBtn) {
      droneBtn.className = "flex-1 py-1.5 px-2 rounded-lg text-on-surface-variant font-medium hover:text-on-surface transition-all flex items-center justify-center gap-1";
    }
    if (img) {
      img.src = "https://images.unsplash.com/photo-1592417817098-8f3d6eb2251e?w=800&auto=format&fit=crop&q=80";
    }
    showToast('Switched to Leaf Cam #2 (Zone A Tomato)');
  } else {
    if (droneBtn) {
      droneBtn.className = "flex-1 py-1.5 px-2 rounded-lg bg-surface-container-lowest text-primary font-bold shadow-xs transition-all flex items-center justify-center gap-1";
    }
    if (leafBtn) {
      leafBtn.className = "flex-1 py-1.5 px-2 rounded-lg text-on-surface-variant font-medium hover:text-on-surface transition-all flex items-center justify-center gap-1";
    }
    if (img) {
      img.src = "https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=800&auto=format&fit=crop&q=80";
    }
    showToast('Switched to Drone Sweep #4 Canopy View');
  }
};

window.triggerCameraCapture = function() {
  sound.cameraShutter();
  showToast('High-Res Leaf Frame Captured. Neural Model Inferencing...', 'photo_camera');
  setTimeout(() => {
    sound.success();
    showToast('Analysis Complete: 91% Match with Early Blight Stage II', 'verified');
  }, 1200);
};

window.handleSampleUpload = function(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    sound.cameraShutter();
    const img = document.getElementById('scanner-image');
    if (img) img.src = e.target.result;
    showToast('Sample Loaded. Computing multi-spectral vegetation indices...', 'upload_file');
    setTimeout(() => {
      sound.success();
      showToast('Diagnostic Complete: Crop sample evaluated', 'verified');
    }, 1000);
  };
  reader.readAsDataURL(file);
};

window.logScanResult = function(btn) {
  sound.success();
  const original = btn.innerHTML;
  btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">check_circle</span><span>Logged</span>`;
  showToast('Scan log written to local encrypted database');
  setTimeout(() => { btn.innerHTML = original; }, 2000);
};

window.queueSchedule = function(btn) {
  sound.tap();
  const original = btn.innerHTML;
  btn.innerHTML = `<span class="material-symbols-outlined text-[16px] text-secondary">done</span><span>Queued</span>`;
  showToast('Pruning and fungicide spray added to farm calendar');
  setTimeout(() => { btn.innerHTML = original; }, 2000);
};

window.consultKvk = function() {
  sound.tap();
  showToast('Calling Kisan Call Centre (1800-180-1551)...', 'support_agent');
  setTimeout(() => {
    window.location.href = 'tel:18001801551';
  }, 800);
};

function renderDiagnosticsHistory() {
  const list = document.getElementById('diagnostics-history-list');
  if (!list) return;

  list.innerHTML = farmState.diagnosticsHistory.map(item => `
    <div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-2 border border-outline-variant/20">
      <div class="flex items-center gap-2.5 min-w-0">
        <img src="${item.image}" alt="${item.title}" class="w-11 h-11 rounded-lg object-cover shrink-0" />
        <div class="flex flex-col truncate">
          <span class="font-bold text-xs text-primary truncate">${item.title}</span>
          <span class="text-[11px] text-on-surface-variant flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full ${item.status === 'Review' ? 'bg-error' : (item.status === 'Healthy' ? 'bg-secondary' : 'bg-amber-500')}"></span>
            ${item.disease} (${item.confidence})
          </span>
          <span class="text-[9px] text-on-surface-variant font-mono">${item.time} • ${item.source}</span>
        </div>
      </div>
      <span class="px-2 py-0.5 rounded-full ${item.statusColor} text-[10px] font-bold shrink-0">
        ${item.status}
      </span>
    </div>
  `).join('');
}

// Emergency Slide to Confirm on Irrigation Screen
function initSlideOverride() {
  const track = document.getElementById('pump-slider-track');
  const knob = document.getElementById('pump-slider-knob');
  const fill = document.getElementById('pump-slider-fill');
  const label = document.getElementById('pump-slider-label');

  if (!track || !knob) return;

  let isDragging = false;
  let startX = 0;
  let maxDrag = 0;

  function setMax() {
    maxDrag = track.clientWidth - knob.clientWidth - 8;
  }
  setMax();
  window.addEventListener('resize', setMax);

  function startDrag(e) {
    isDragging = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX) - knob.offsetLeft;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', endDrag);
  }

  function onMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let newX = clientX - startX;
    newX = Math.max(0, Math.min(newX, maxDrag));

    knob.style.transform = `translateX(${newX}px)`;
    if (fill) fill.style.width = `${newX + 36}px`;

    if (newX >= maxDrag * 0.9) {
      triggerPumpOverride();
      endDrag();
    }
  }

  function endDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', endDrag);

    if (!knob.classList.contains('override-active')) {
      knob.style.transform = 'translateX(0px)';
      if (fill) fill.style.width = '40px';
    }
  }

  function triggerPumpOverride() {
    sound.motor();
    knob.classList.add('override-active');
    knob.style.transform = `translateX(${maxDrag}px)`;
    knob.innerHTML = '<span class="material-symbols-outlined text-[18px]">check</span>';
    knob.className = "relative z-10 w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center shadow-md";
    if (label) {
      label.textContent = "OVERRIDE ENGAGED (45M)";
      label.className = "absolute inset-0 flex items-center justify-center text-xs text-error font-extrabold pointer-events-none";
    }
    showToast('⚡ MANUAL OVERRIDE ENGAGED: Pump #1 Activated for 45 Mins', 'bolt');
  }

  knob.addEventListener('mousedown', startDrag);
  knob.addEventListener('touchstart', startDrag, { passive: true });

  const irrigateTrigger = document.getElementById('irrigate-now-trigger');
  if (irrigateTrigger) {
    irrigateTrigger.addEventListener('click', () => {
      sound.motor();
      irrigateTrigger.innerHTML = `<span class="material-symbols-outlined animate-spin text-[18px]">sync</span><span>Starting Zone B Valve...</span>`;
      setTimeout(() => {
        sound.success();
        irrigateTrigger.innerHTML = `<span class="material-symbols-outlined text-[18px]">check_circle</span><span>Zone B Irrigating (35m)</span>`;
        irrigateTrigger.classList.replace('bg-primary', 'bg-sky-700');
        showToast('Zone B Smart Drip Irrigation In Progress (35m)', 'water_drop');
      }, 1000);
    });
  }
}

// Camera snapshot simulation in dashboard
window.triggerSnapshot = function() {
  sound.cameraShutter();
  showToast('Snapshot saved to diagnostic telemetry archive', 'photo_camera');
};

window.switchCameraFeed = function() {
  sound.tap();
  showToast('Switched to Wide-Angle Perimeter Lens (Cam #03)', 'switch_camera');
};

window.toggleThermalNIR = function() {
  sound.tap();
  const feed = document.getElementById('dashboard-cam-feed');
  const btn = document.getElementById('toggle-nir-btn');
  if (feed) {
    feed.classList.toggle('nir-thermal-filter');
    const isNir = feed.classList.contains('nir-thermal-filter');
    if (btn) {
      if (isNir) {
        btn.classList.replace('bg-emerald-900/90', 'bg-amber-600');
        btn.classList.replace('text-emerald-300', 'text-white');
      } else {
        btn.classList.replace('bg-amber-600', 'bg-emerald-900/90');
        btn.classList.replace('text-white', 'text-emerald-300');
      }
    }
    showToast(isNir ? 'NIR False-Color Thermal Mode Activated' : 'Standard RGB Optical Mode', 'thermostat');
  }
};

// Export farm report
window.exportFarmReport = function() {
  sound.success();
  showToast('Exporting 7-Day Farm Telemetry & Irrigation Audit (PDF)...', 'download');
};

// Logout
window.logoutFarmer = function() {
  sound.tap();
  farmState.authenticated = false;
  navigateTo('login');
  showToast('Farmer terminal locked securely');
};

// Init app event listeners
document.addEventListener('DOMContentLoaded', () => {
  initFrameToggle();
  initAuth();
  initSlideOverride();

  // Language pill buttons
  document.querySelectorAll('.lang-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang) window.setLanguage(lang);
    });
  });

  // Filter chips in dashboard
  document.querySelectorAll('#dash-filter-chips .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      sound.tap();
      document.querySelectorAll('#dash-filter-chips .filter-chip').forEach(c => {
        c.className = "filter-chip px-3 py-1 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-all";
      });
      chip.className = "filter-chip active px-3 py-1 rounded-full text-xs font-bold bg-primary text-on-primary shadow-xs whitespace-nowrap transition-all";
      showToast(`Filter: ${chip.textContent.trim()}`);
    });
  });

  // Zone filter pills in Zones screen
  document.querySelectorAll('#zone-filter-pills .zone-filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      sound.tap();
      document.querySelectorAll('#zone-filter-pills .zone-filter-pill').forEach(p => {
        p.className = "zone-filter-pill px-3 py-1 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant hover:text-on-surface transition-all shrink-0 flex items-center gap-1";
      });
      pill.className = "zone-filter-pill active px-3 py-1 rounded-full text-xs font-bold bg-primary text-on-primary transition-all shrink-0 flex items-center gap-1";
      const filter = pill.getAttribute('data-filter');
      renderZoneCards(filter);
    });
  });

  // Clock in status bar
  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const timeEl = document.getElementById('status-time');
    if (timeEl) timeEl.textContent = `${hours}:${minutes}`;
  }
  updateTime();
  setInterval(updateTime, 30000);

  // Start on login screen
  navigateTo('login');
});
