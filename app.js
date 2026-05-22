/**
 * SCAT Investigation Wizard — Application Logic
 * Fixed: type coercion bugs, localStorage restore, nav button rendering
 */

// ── STATE ─────────────────────────────────────────────────────────────────────
const state = {
  currentStep: 0,
  incidentInfo: { title:'', date:'', location:'', description:'', severity:'', investigator:'' },
  selectedIncident: null,  // number or null
  selectedUAs: [],         // array of numbers
  selectedUCs: [],
  selectedRCs: [],
  selectedCAs: [],
  darkMode: false,
  searchQueries: { ua:'', uc:'', rc:'', ca:'' },
};

const STEPS = [
  { id: 'intro',    label: 'Informasi',           icon: '📝' },
  { id: 'incident', label: 'Tipe Kejadian',        icon: '⚠️' },
  { id: 'direct',   label: 'Penyebab Langsung',    icon: '🔍' },
  { id: 'root',     label: 'Akar Penyebab',        icon: '🌱' },
  { id: 'action',   label: 'Tindakan Perbaikan',   icon: '🛡️' },
  { id: 'report',   label: 'Laporan',              icon: '📊' },
];

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  initDarkMode();
  renderApp();
  document.getElementById('btn-dark-mode').addEventListener('click', toggleDarkMode);
  document.getElementById('btn-reset').addEventListener('click', confirmReset);
});

// ── DARK MODE ─────────────────────────────────────────────────────────────────
function initDarkMode() {
  if (localStorage.getItem('scat-dark') === 'true') {
    state.darkMode = true;
    document.documentElement.classList.add('dark');
    document.getElementById('btn-dark-mode').textContent = '☀️';
  }
}
function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  document.documentElement.classList.toggle('dark', state.darkMode);
  localStorage.setItem('scat-dark', state.darkMode);
  document.getElementById('btn-dark-mode').textContent = state.darkMode ? '☀️' : '🌙';
}

// ── STORAGE ───────────────────────────────────────────────────────────────────
function saveToStorage() {
  localStorage.setItem('scat-state', JSON.stringify({
    currentStep:      state.currentStep,
    incidentInfo:     state.incidentInfo,
    selectedIncident: state.selectedIncident,
    selectedUAs:      state.selectedUAs,
    selectedUCs:      state.selectedUCs,
    selectedRCs:      state.selectedRCs,
    selectedCAs:      state.selectedCAs,
    selectedCAItems:  state.selectedCAItems || {},
  }));
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem('scat-state');
    if (!raw) return;
    const p = JSON.parse(raw);
    state.currentStep      = p.currentStep || 0;
    state.incidentInfo     = Object.assign({}, state.incidentInfo, p.incidentInfo || {});
    // FIX: coerce all IDs to numbers to avoid type mismatch on .includes()
    state.selectedIncident = p.selectedIncident != null ? Number(p.selectedIncident) : null;
    state.selectedUAs      = (p.selectedUAs || []).map(Number);
    state.selectedUCs      = (p.selectedUCs || []).map(Number);
    state.selectedRCs      = (p.selectedRCs || []).map(Number);
    state.selectedCAs      = (p.selectedCAs || []).map(Number);
    state.selectedCAItems  = p.selectedCAItems || {};
  } catch(e) { console.warn('Storage load error', e); }
}

function confirmReset() {
  if (!confirm('Reset semua data investigasi? Tindakan ini tidak dapat dibatalkan.')) return;
  localStorage.removeItem('scat-state');
  state.currentStep      = 0;
  state.incidentInfo     = { title:'', date:'', location:'', description:'', severity:'', investigator:'' };
  state.selectedIncident = null;
  state.selectedUAs      = [];
  state.selectedUCs      = [];
  state.selectedRCs      = [];
  state.selectedCAs      = [];
  state.selectedCAItems  = {};  // Reset CA items selection
  state.searchQueries    = { ua:'', uc:'', rc:'', ca:'' };
  renderApp();
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function goToStep(step) {
  if (step < 0 || step >= STEPS.length) return;
  if (step > state.currentStep && !validateCurrentStep()) return;
  state.currentStep = step;
  saveToStorage();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function jumpToStep(i) {
  // Only allow jumping backward (forward requires validation)
  if (i < state.currentStep) {
    state.currentStep = i;
    saveToStorage();
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function validateCurrentStep() {
  const id = STEPS[state.currentStep].id;
  let msg = null;
  if (id === 'intro') {
    if (!state.incidentInfo.title.trim())  msg = 'Judul insiden wajib diisi';
    else if (!state.incidentInfo.date)     msg = 'Tanggal kejadian wajib diisi';
    else if (!state.incidentInfo.severity) msg = 'Tingkat keparahan wajib dipilih';
  } else if (id === 'incident') {
    if (!state.selectedIncident) msg = 'Pilih tipe kejadian terlebih dahulu';
  } else if (id === 'direct') {
    if (!state.selectedUAs.length && !state.selectedUCs.length)
      msg = 'Pilih minimal satu penyebab langsung';
  } else if (id === 'root') {
    if (!state.selectedRCs.length) msg = 'Pilih minimal satu akar penyebab';
  } else if (id === 'action') {
    // Check if user selected at least 1 CA with at least 1 item
    const hasSelection = state.selectedCAs.some(caId => {
      const caKey = 'ca' + caId;
      const items = state.selectedCAItems && state.selectedCAItems[caKey] || [];
      return items.length > 0;
    });
    
    // Also check if any CA has items selected (even if CA not in selectedCAs)
    const hasItemsDirectly = state.selectedCAItems && Object.values(state.selectedCAItems).some(items => items.length > 0);
    
    if (!hasSelection && !hasItemsDirectly) msg = 'Pilih minimal satu area dan item tindakan perbaikan';
  }
  if (msg) { showToast(msg, 'error'); return false; }
  return true;
}

// ── RENDER ENGINE ─────────────────────────────────────────────────────────────
function renderApp() {
  renderProgress();
  renderStepContent();
  // Nav buttons rendered INSIDE step-content-wrapper; re-bind after innerHTML set
  renderNavButtons();
}

function renderProgress() {
  const pct = state.currentStep / (STEPS.length - 1) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('completion-pct').textContent = Math.round(pct) + '%';

  document.getElementById('progress-bar').innerHTML = STEPS.map((s, i) => {
    const st = i < state.currentStep ? 'done' : i === state.currentStep ? 'active' : 'pending';
    const dot = st === 'done' ? '✓' : (i + 1);
    return `
      <div class="step-indicator ${st}" onclick="jumpToStep(${i})" title="${s.label}">
        <div class="step-dot">${dot}</div>
        <span class="step-label-text">${s.label}</span>
      </div>
      ${i < STEPS.length - 1 ? '<div class="step-connector"></div>' : ''}
    `;
  }).join('');
}

function renderNavButtons() {
  const stepId  = STEPS[state.currentStep].id;
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  btnPrev.style.display = state.currentStep === 0 ? 'none' : 'flex';
  btnNext.style.display = stepId === 'report'     ? 'none' : 'flex';

  // Clone to remove stale listeners
  const newPrev = btnPrev.cloneNode(true);
  const newNext = btnNext.cloneNode(true);
  btnPrev.replaceWith(newPrev);
  btnNext.replaceWith(newNext);

  newPrev.addEventListener('click', () => goToStep(state.currentStep - 1));
  newNext.addEventListener('click', () => goToStep(state.currentStep + 1));

  const labels = {
    intro:    'Pilih Tipe Kejadian →',
    incident: 'Identifikasi Penyebab →',
    direct:   'Analisis Akar Penyebab →',
    root:     'Rancang Tindakan Perbaikan →',
    action:   'Lihat Laporan Final →',
  };
  const lbl = newNext.querySelector('.btn-label');
  if (lbl) lbl.textContent = labels[stepId] || 'Lanjut →';
}

function renderStepContent() {
  const stepId = STEPS[state.currentStep].id;
  const renders = {
    intro:    renderStepIntro,
    incident: renderStepIncident,
    direct:   renderStepDirect,
    root:     renderStepRoot,
    action:   renderStepAction,
    report:   renderStepReport,
  };
  const html = renders[stepId] ? renders[stepId]() : '';
  document.getElementById('step-content').innerHTML = html;
  if (stepId === 'intro') bindIntroEvents();
}

// ── STEP 0: INCIDENT INFO ─────────────────────────────────────────────────────
function renderStepIntro() {
  const I = state.incidentInfo;
  const sevOptions = ['Hampir Terjadi (Near Miss)','Ringan','Sedang','Berat','Fatal'];
  return `
    <div class="step-header">
      <div class="step-tag">LANGKAH 1 / 6</div>
      <h2 class="step-title">Informasi Kejadian</h2>
      <p class="step-desc">Isi informasi dasar mengenai insiden yang akan diinvestigasi.</p>
    </div>
    <div class="form-grid">
      <div class="form-group span-2">
        <label class="form-label">Judul Insiden <span class="req">*</span></label>
        <input id="f-title" type="text" class="form-input"
          placeholder="Contoh: Kecelakaan kerja di area produksi unit 3"
          value="${escHtml(I.title)}">
      </div>
      <div class="form-group">
        <label class="form-label">Tanggal Kejadian <span class="req">*</span></label>
        <input id="f-date" type="date" class="form-input" value="${I.date}">
      </div>
      <div class="form-group">
        <label class="form-label">Lokasi Kejadian</label>
        <input id="f-location" type="text" class="form-input"
          placeholder="Contoh: Area Gudang B, Lantai 2" value="${escHtml(I.location)}">
      </div>
      <div class="form-group">
        <label class="form-label">Nama Investigator</label>
        <input id="f-investigator" type="text" class="form-input"
          placeholder="Nama / Tim Investigasi" value="${escHtml(I.investigator)}">
      </div>
      <div class="form-group">
        <label class="form-label">Tingkat Keparahan <span class="req">*</span></label>
        <div class="severity-grid">
          ${sevOptions.map((s, i) => `
            <button class="severity-btn ${I.severity === s ? 'selected' : ''}"
              data-sev="${s}">
              <span class="sev-dot sev-${i}"></span>${s}
            </button>`).join('')}
        </div>
      </div>
      <div class="form-group span-2">
        <label class="form-label">Deskripsi Singkat Kejadian</label>
        <textarea id="f-desc" class="form-input form-textarea"
          placeholder="Deskripsikan kejadian secara singkat dan faktual...">${escHtml(I.description)}</textarea>
      </div>
    </div>    
  `;
}

function bindIntroEvents() {
  const fields = ['title','date','location','investigator','desc'];
  fields.forEach(f => {
    const el = document.getElementById('f-' + f);
    if (el) el.addEventListener('input', () => {
      state.incidentInfo[f] = el.value;
      saveToStorage();
    });
  });
  document.querySelectorAll('.severity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.incidentInfo.severity = btn.dataset.sev;
      document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      saveToStorage();
    });
  });
}

// ── STEP 1: INCIDENT TYPE ─────────────────────────────────────────────────────
function renderStepIncident() {
  return `
    <div class="step-header">
      <div class="step-tag">LANGKAH 2 / 6</div>
      <h2 class="step-title">Tipe Kejadian</h2>
      <p class="step-desc">Pilih satu tipe kejadian yang paling sesuai. Pilihan ini menentukan penyebab langsung yang relevan.</p>
    </div>
    <div class="incidents-grid">
      ${Object.entries(SCAT_DATA.incidentTypes).map(([id, inc]) => {
        const badge = getRiskBadge(inc.risk);
        const sel   = state.selectedIncident === Number(id);
        return `
          <div class="incident-card ${sel ? 'selected' : ''}"
            onclick="selectIncident(${id})">
            <div class="incident-inner">
              <div class="incident-icon">${inc.icon}</div>
              <div class="incident-body">
                <div class="incident-name">${inc.name}</div>
                <div class="incident-desc">${inc.desc}</div>
              </div>
              <span class="risk-badge ${badge.cls}">${badge.label}</span>
            </div>
            ${sel ? '<div class="check-mark">✓</div>' : ''}
          </div>`;
      }).join('')}
    </div>
  `;
}

// ── STEP 2: DIRECT CAUSES ─────────────────────────────────────────────────────
function renderStepDirect() {
  if (!state.selectedIncident) return '<p class="empty-msg">Pilih tipe kejadian terlebih dahulu.</p>';
  const uas = getUAsForIncident(state.selectedIncident);
  const ucs = getUCsForIncident(state.selectedIncident);
  const qUA = state.searchQueries.ua;
  const qUC = state.searchQueries.uc;
  const fUA = uas.filter(x => x.name.toLowerCase().includes(qUA.toLowerCase()));
  const fUC = ucs.filter(x => x.name.toLowerCase().includes(qUC.toLowerCase()));
  const inc = SCAT_DATA.incidentTypes[state.selectedIncident];

  return `
    <div class="step-header">
      <div class="step-tag">LANGKAH 3 / 6</div>
      <h2 class="step-title">Penyebab Langsung</h2>
      <p class="step-desc">Identifikasi tindakan dan kondisi tidak aman untuk kejadian
        <strong>${inc ? inc.name : ''}</strong>. Pilih semua yang relevan.</p>
    </div>

    <div class="direct-section">
      <div class="section-header-row">
        <div class="section-title-badge ua-badge">
          🚷 Tindakan Tidak Aman
          ${state.selectedUAs.length ? `<span class="count-pill">${state.selectedUAs.length}</span>` : ''}
        </div>
        <input type="text" class="search-input" placeholder="Cari..."
          value="${escHtml(qUA)}" oninput="updateSearch('ua', this.value)">
      </div>
      <div class="causes-grid">
        ${fUA.length ? fUA.map(ua => causePill(ua.id, ua.name, state.selectedUAs, 'toggleUA')).join('') : '<p class="empty-msg">Tidak ada hasil.</p>'}
      </div>
    </div>

    ${ucs.length ? `
    <div class="direct-section">
      <div class="section-header-row">
        <div class="section-title-badge uc-badge">
          ⚠️ Kondisi Tidak Aman
          ${state.selectedUCs.length ? `<span class="count-pill">${state.selectedUCs.length}</span>` : ''}
        </div>
        <input type="text" class="search-input" placeholder="Cari..."
          value="${escHtml(qUC)}" oninput="updateSearch('uc', this.value)">
      </div>
      <div class="causes-grid">
        ${fUC.length ? fUC.map(uc => causePill(uc.id, uc.name, state.selectedUCs, 'toggleUC')).join('') : '<p class="empty-msg">Tidak ada hasil.</p>'}
      </div>
    </div>` : ''}
  `;
}

function causePill(id, name, selectedArr, toggleFn) {
  const sel = selectedArr.includes(id);
  return `
    <div class="cause-card ${sel ? 'selected' : ''}" onclick="${toggleFn}(${id})">
      <div class="cause-check ${sel ? 'checked' : ''}">${sel ? '✓' : ''}</div>
      <span class="cause-text">${name}</span>
    </div>`;
}

// ── STEP 3: ROOT CAUSES ───────────────────────────────────────────────────────
function renderStepRoot() {
  const rcs = getRCsForIncident(state.selectedIncident);
  const q   = state.searchQueries.rc;
  const f   = rcs.filter(x => x.name.toLowerCase().includes(q.toLowerCase()));
  const personal = f.filter(x => x.category === 'personal');
  const system   = f.filter(x => x.category === 'system');

  return `
    <div class="step-header">
      <div class="step-tag">LANGKAH 4 / 6</div>
      <h2 class="step-title">Akar Penyebab (Root Cause)</h2>
      <p class="step-desc">Identifikasi faktor mendasar yang memungkinkan penyebab langsung terjadi.</p>
    </div>
    <div class="search-bar-full">
      <span>🔍</span>
      <input type="text" class="search-input-full" placeholder="Cari akar penyebab..."
        value="${escHtml(q)}" oninput="updateSearch('rc', this.value)">
    </div>
    ${personal.length ? `
    <div class="rc-section">
      <div class="rc-section-label personal-label">👤 Faktor Personal</div>
      <div class="causes-grid">
        ${personal.map(rc => causePill(rc.id, rc.name, state.selectedRCs, 'toggleRC')).join('')}
      </div>
    </div>` : ''}
    ${system.length ? `
    <div class="rc-section">
      <div class="rc-section-label system-label">🏭 Faktor Pekerjaan / Sistem</div>
      <div class="causes-grid">
        ${system.map(rc => causePill(rc.id, rc.name, state.selectedRCs, 'toggleRC')).join('')}
      </div>
    </div>` : ''}
  `;
}

// ── STEP 4: CORRECTIVE ACTIONS ────────────────────────────────────────────────
function renderStepAction() {
  const cas = getCAsForRCs(state.selectedRCs);
  const q   = state.searchQueries.ca;
  const f   = cas.filter(x => x.name.toLowerCase().includes(q.toLowerCase()));

  return `
    <div class="step-header">
      <div class="step-tag">LANGKAH 5 / 6</div>
      <h2 class="step-title">Area Tindakan Perbaikan</h2>
      <p class="step-desc">Pilih area dan item tindakan perbaikan yang akan ditindaklanjuti berdasarkan akar penyebab.</p>
    </div>
    <div class="search-bar-full">
      <span>🔍</span>
      <input type="text" class="search-input-full" placeholder="Cari area atau item tindakan..."
        value="${escHtml(q)}" oninput="updateSearch('ca', this.value)">
    </div>
    <div class="ca-grid">
      ${f.map(ca => {
        // Get selected items for this CA
        const caKey = 'ca' + ca.id;
        const selectedItems = state.selectedCAItems && state.selectedCAItems[caKey] || [];
        const allItems = ca.items;
        const hasSelection = selectedItems.length > 0;
        
        return `
          <div class="ca-card ${hasSelection ? 'selected' : ''}">
            <div class="ca-header" onclick="toggleCA(${ca.id})">
              <div class="ca-check ${hasSelection ? 'checked' : ''}">${hasSelection ? '✓' : ''}</div>
              <div class="ca-num">${String(ca.id).padStart(2,'0')}</div>
              <div class="ca-name">${ca.name}</div>
            </div>
            <div class="ca-items">
              ${allItems.map((item, idx) => {
                const itemKey = caKey + '.' + idx;
                const itemSel = selectedItems.includes(itemKey);
                return `
                  <div class="ca-item ${itemSel ? 'selected' : ''}" onclick="toggleCAItem('${itemKey}', ${ca.id})">
                    <div class="ca-item-check ${itemSel ? 'checked' : ''}">${itemSel ? '✓' : ''}</div>
                    <span class="ca-item-text">${item}</span>
                  </div>`;
              }).join('')}
            </div>
          </div>`;
      }).join('')}
    </div>
  `;
}

// ── STEP 5: FINAL REPORT ──────────────────────────────────────────────────────
function renderStepReport() {
  const I       = state.incidentInfo;
  const inc     = SCAT_DATA.incidentTypes[state.selectedIncident];
  const badge   = inc ? getRiskBadge(inc.risk) : null;

  // FIX: map IDs (numbers) to names/objects — use Number() coercion to be safe
  const uaNames = state.selectedUAs.map(id => SCAT_DATA.unsafeActions[Number(id)]).filter(Boolean);
  const ucNames = state.selectedUCs.map(id => SCAT_DATA.unsafeConditions[Number(id)]).filter(Boolean);
  const rcObjs  = state.selectedRCs.map(id => SCAT_DATA.rootCauses[Number(id)]).filter(Boolean);
  
  // Get CAs that have selected items (not just from state.selectedCAs)
  const allCAs = getCAsForRCs(state.selectedRCs);
  const caObjs = allCAs.filter(ca => {
    const caKey = 'ca' + ca.id;
    const selectedItems = state.selectedCAItems && state.selectedCAItems[caKey] || [];
    return selectedItems.length > 0;
  });

  const now = new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });

  // Build SCAT chain summary
  const chainItems = [];
  if (inc)         chainItems.push(`<strong>${inc.name}</strong>`);
  if (uaNames.length) chainItems.push(`${uaNames.length} Tindakan Tidak Aman`);
  if (ucNames.length) chainItems.push(`${ucNames.length} Kondisi Tidak Aman`);
  if (rcObjs.length)  chainItems.push(`${rcObjs.length} Akar Penyebab`);
  if (caObjs.length)  chainItems.push(`${caObjs.length} Area Perbaikan`);

  return `
    <div id="report-print">

      <!-- REPORT HEADER -->
      <div class="report-header">
        <div class="report-logo">
          <div class="report-logo-mark">SCAT</div>
          <div class="report-logo-sub">Systematic Cause Analysis Technique v8.1</div>
        </div>
        <div class="report-meta">
          <div class="report-meta-item">
            <span class="meta-label">TANGGAL LAPORAN</span>
            <span class="meta-value">${now}</span>
          </div>
          ${I.investigator ? `
          <div class="report-meta-item">
            <span class="meta-label">INVESTIGATOR</span>
            <span class="meta-value">${escHtml(I.investigator)}</span>
          </div>` : ''}
        </div>
      </div>

      <!-- TITLE BLOCK -->
      <div class="report-title-section">
        <h1 class="report-main-title">${escHtml(I.title || 'Laporan Investigasi SCAT')}</h1>
        <div class="report-tags">
          ${I.date     ? `<span class="report-tag">📅 ${formatDate(I.date)}</span>` : ''}
          ${I.location ? `<span class="report-tag">📍 ${escHtml(I.location)}</span>` : ''}
          ${I.severity ? `<span class="report-tag severity-tag">⚡ ${escHtml(I.severity)}</span>` : ''}
        </div>
        ${I.description ? `<p class="report-desc">${escHtml(I.description)}</p>` : ''}
      </div>

      <!-- SCAT CHAIN SUMMARY BAR -->
      <div class="scat-chain">
        <div class="chain-label">Rantai Analisa SCAT</div>
        <div class="chain-steps">
          ${[
            { label: 'Tipe Kejadian', count: inc ? 1 : 0, color: '#F97316' },
            { label: 'Tindakan Tidak Aman', count: uaNames.length, color: '#DC2626' },
            { label: 'Kondisi Tidak Aman', count: ucNames.length, color: '#D97706' },
            { label: 'Akar Penyebab', count: rcObjs.length, color: '#7C3AED' },
            { label: 'Area Perbaikan', count: caObjs.length, color: '#15803D' },
          ].map(c => `
            <div class="chain-step">
              <div class="chain-count" style="color:${c.color}">${c.count}</div>
              <div class="chain-step-label">${c.label}</div>
            </div>
          `).join('<div class="chain-arrow">→</div>')}
        </div>
      </div>

      <div class="report-body">

        <!-- 1. TIPE KEJADIAN -->
        <div class="report-section">
          <div class="report-section-header">
            <span class="rs-num">01</span>
            <h3 class="rs-title">Tipe Kejadian</h3>
          </div>
          ${inc ? `
          <div class="incident-report-card">
            <div class="irc-icon">${inc.icon}</div>
            <div class="irc-info">
              <div class="irc-name">${inc.name}</div>
              <div class="irc-desc">${inc.desc}</div>
            </div>
            <span class="risk-badge ${badge.cls} lg">${badge.label}</span>
          </div>` : '<p class="empty-msg">Tidak ada data.</p>'}
        </div>

        <!-- 2. PENYEBAB LANGSUNG -->
        <div class="report-section">
          <div class="report-section-header">
            <span class="rs-num">02</span>
            <h3 class="rs-title">Penyebab Langsung</h3>
          </div>
          <div class="report-cols">
            <div>
              <div class="report-sub-title ua-color">🚷 Tindakan Tidak Aman (${uaNames.length})</div>
              ${uaNames.length
                ? `<ul class="report-list">${uaNames.map(n => `<li>${n}</li>`).join('')}</ul>`
                : `<p class="empty-msg">Tidak ada yang dipilih</p>`}
            </div>
            <div>
              <div class="report-sub-title uc-color">⚠️ Kondisi Tidak Aman (${ucNames.length})</div>
              ${ucNames.length
                ? `<ul class="report-list">${ucNames.map(n => `<li>${n}</li>`).join('')}</ul>`
                : `<p class="empty-msg">Tidak ada yang dipilih</p>`}
            </div>
          </div>
        </div>

        <!-- 3. AKAR PENYEBAB -->
        <div class="report-section">
          <div class="report-section-header">
            <span class="rs-num">03</span>
            <h3 class="rs-title">Akar Penyebab (Root Cause)</h3>
            <span class="rs-count">${rcObjs.length} teridentifikasi</span>
          </div>
          ${rcObjs.length ? `
          <div class="rc-group">
            ${['personal','system'].map(cat => {
              const group = rcObjs.filter(r => r.category === cat);
              if (!group.length) return '';
              return `
                <div class="rc-cat-group">
                  <div class="rc-cat-header">${cat === 'personal' ? '👤 Faktor Personal' : '🏭 Faktor Sistem/Pekerjaan'}</div>
                  <ul class="report-list">
                    ${group.map(r => `<li>${r.name}</li>`).join('')}
                  </ul>
                </div>`;
            }).join('')}
          </div>` : '<p class="empty-msg">Tidak ada yang dipilih</p>'}
        </div>

        <!-- 4. TINDAKAN PERBAIKAN -->
        <div class="report-section">
          <div class="report-section-header">
            <span class="rs-num">04</span>
            <h3 class="rs-title">Rekomendasi Tindakan Perbaikan</h3>
            <span class="rs-count">${caObjs.length} area dengan item dipilih</span>
          </div>
          ${caObjs.length ? `
          <div class="ca-report-grid">
            ${caObjs.map(ca => {
              // Get selected items for this CA
              const caKey = 'ca' + ca.id;
              const selectedItems = state.selectedCAItems && state.selectedCAItems[caKey] || [];
              const allItems = ca.items;
              
              console.log('[DEBUG] CA', ca.id, 'selectedItems:', selectedItems, 'allItems:', allItems);
              
              // Show only selected items
              const itemsToShow = selectedItems.map(key => {
                const idx = parseInt(key.split('.')[1]);
                return allItems[idx];
              }).filter(Boolean);
              
              return `
              <div class="ca-report-card">
                <div class="ca-report-header">
                  <span class="ca-report-num">${String(ca.id).padStart(2,'0')}</span>
                  ${ca.name}
                  <span class="ca-item-count">${selectedItems.length}/${allItems.length}</span>
                </div>
                <ul class="ca-report-items">
                  ${itemsToShow.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>`}).join('')}
          </div>` : '<p class="empty-msg">Tidak ada item yang dipilih</p>'}
        </div>

      </div><!-- end report-body -->

      <div class="report-footer">
        <p>Dokumen ini dihasilkan menggunakan SCAT Investigation Wizard berdasarkan Panduan SCAT v8.1</p>
        <p>Harap verifikasi seluruh temuan bersama tim HSE sebelum implementasi tindakan perbaikan.</p>
      </div>
    </div><!-- end report-print -->

    <!-- ACTION BUTTONS (outside print area) -->
    <div class="report-actions no-print">
      <button class="action-btn print-btn" onclick="window.print()">🖨️ Cetak / Export PDF</button>
      <button class="action-btn restart-btn" onclick="confirmReset()">🔄 Mulai Investigasi Baru</button>
    </div>
  `;
}

// ── SELECTION HANDLERS ────────────────────────────────────────────────────────
function selectIncident(id) {
  const numId = Number(id);
  if (state.selectedIncident !== numId) {
    state.selectedIncident = numId;
    // Reset all downstream when incident changes
    state.selectedUAs = [];
    state.selectedUCs = [];
    state.selectedRCs = [];
    state.selectedCAs = [];
  }
  saveToStorage();
  renderStepContent();
}

function toggleUA(id) { state.selectedUAs = toggleArr(state.selectedUAs, Number(id)); saveToStorage(); renderStepContent(); }
function toggleUC(id) { state.selectedUCs = toggleArr(state.selectedUCs, Number(id)); saveToStorage(); renderStepContent(); }
function toggleRC(id) { state.selectedRCs = toggleArr(state.selectedRCs, Number(id)); saveToStorage(); renderStepContent(); }
function toggleCA(id) { 
  state.selectedCAs = toggleArr(state.selectedCAs, Number(id)); 
  saveToStorage(); 
  renderStepContent(); 
}

function toggleCAItem(itemKey, caId) {
  // Initialize selectedCAItems if not exists
  if (!state.selectedCAItems) state.selectedCAItems = {};
  
  // Get current selected items for this CA
  const caKey = 'ca' + caId;
  if (!state.selectedCAItems[caKey]) state.selectedCAItems[caKey] = [];
  
  // Toggle the item
  const items = state.selectedCAItems[caKey];
  if (items.includes(itemKey)) {
    state.selectedCAItems[caKey] = items.filter(i => i !== itemKey);
  } else {
    state.selectedCAItems[caKey] = [...items, itemKey];
  }
  
  saveToStorage();
  renderStepContent();
}

function toggleArr(arr, val) {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
}

function updateSearch(key, val) {
  state.searchQueries[key] = val;
  renderStepContent();
}

// ── UTILITIES ─────────────────────────────────────────────────────────────────
function escHtml(s) {
  return String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(ds) {
  try { return new Date(ds).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }); }
  catch { return ds; }
}

let _toastTimer;
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast toast-${type} show`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}
