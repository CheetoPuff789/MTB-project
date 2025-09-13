// Simple static data for parks and trails
// In a future iteration, this can be replaced with a backend/API.

const DATA = {
  parks: [
    {
      id: 'park-angel-fire',
      name: 'Angel Fire Bike Park',
      location: 'Angel Fire, New Mexico, USA',
      downhill: true,
      description: 'Largest bike park in the Rockies with extensive trail network.',
      trails: [
        // Trails intentionally left blank until verified
      ],
    },
    {
      id: 'park-whistler',
      name: 'Whistler Mountain Bike Park',
      location: 'Whistler, British Columbia, Canada',
      downhill: true,
      description: 'Iconic lift-access park with world-class flow and tech trails across multiple zones.',
      trails: [
        { id: 'w-b-line', name: 'B-Line', difficulty: 'Blue', downhill: true, length_km: 5.0, elevation_drop_m: 350, description: 'Rolling blue flow; great for warmups.' },
        { id: 'w-a-line', name: 'A-Line', difficulty: 'Black', downhill: true, length_km: 4.8, elevation_drop_m: 370, description: 'Famous jump line with big senders and fast berms.' },
      ],
    },
    {
      id: 'park-bentonville',
      name: 'Bentonville Trail System',
      location: 'Bentonville, Arkansas, USA',
      downhill: false,
      description: 'Extensive pedal-access trail network with progressive features and skills parks.',
      trails: [
        { id: 'bv-slaughter-pen', name: 'Slaughter Pen Loop', difficulty: 'Blue', downhill: false, length_km: 15.2, elevation_drop_m: 90, description: 'Mix of flow and XC singletrack close to town.' },
        { id: 'bv-coler-fireline', name: 'Coler Fire Line', difficulty: 'Black', downhill: true, length_km: 1.2, elevation_drop_m: 120, description: 'Shuttle-style jump line with optional big features.' },
        { id: 'bv-oz', name: 'The All-American', difficulty: 'Green', downhill: false, length_km: 6.4, elevation_drop_m: 65, description: 'Beginner-friendly loop with optional features.' },
      ],
    },
    {
      id: 'park-park-city',
      name: 'Park City Trails',
      location: 'Park City, Utah, USA',
      downhill: false,
      description: 'IMBA Gold Level trails with everything from mellow XC to techy steeps. Pedal and some shuttle options.',
      trails: [
        { id: 'pc-mid-mtn', name: 'Mid Mountain', difficulty: 'Blue', downhill: false, length_km: 38.0, elevation_drop_m: 500, description: 'Traversing alpine singletrack with great views.' },
        { id: 'pc-johns', name: 'John’s Trail', difficulty: 'Black', downhill: false, length_km: 6.8, elevation_drop_m: 430, description: 'Rooty, tight, and technical in spots.' },
      ],
    },
    {
      id: 'park-queenstown',
      name: 'Queenstown Bike Park',
      location: 'Queenstown, Otago, New Zealand',
      downhill: true,
      description: 'Gondola-accessed bike park with a wide range of trails overlooking Lake Wakatipu.',
      trails: [
        { id: 'qt-hammy', name: 'Hammys', difficulty: 'Green', downhill: true, length_km: 6.0, elevation_drop_m: 450, description: 'Beginner-friendly flow with generous berms.' },
        { id: 'qt-fern-hill', name: 'Fernhill Loop', difficulty: 'Black', downhill: false, length_km: 7.0, elevation_drop_m: 600, description: 'Backcountry-style pedal with steep sections.' },
      ],
    },
  ],
};

// DOM elements
const els = {
  tabParks: document.getElementById('tabParks'),
  tabTrails: document.getElementById('tabTrails'),
  addBtn: document.getElementById('addBtn'),
  adminBtn: document.getElementById('adminBtn'),
  userBtn: document.getElementById('userBtn'),
  q: document.getElementById('q'),
  downhill: document.getElementById('downhill'),
  difficulty: document.getElementById('difficulty'),
  difficultyWrap: document.getElementById('difficultyWrap'),
  parkWrap: document.getElementById('parkWrap'),
  parkSelect: document.getElementById('parkSelect'),
  resultsMeta: document.getElementById('resultsMeta'),
  results: document.getElementById('results'),
  dialog: document.getElementById('detailDialog'),
  detailTitle: document.getElementById('detailTitle'),
  detailSummary: document.getElementById('detailSummary'),
  detailMeta: document.getElementById('detailMeta'),
  detailDescription: document.getElementById('detailDescription'),
  reviewList: document.getElementById('reviewList'),
  reviewForm: document.getElementById('reviewForm'),
  reviewName: document.getElementById('reviewName'),
  reviewRating: document.getElementById('reviewRating'),
  reviewComment: document.getElementById('reviewComment'),
  clearReviewsBtn: document.getElementById('clearReviewsBtn'),
  // Submit & Review
  submitDialog: document.getElementById('submitDialog'),
  submitForm: document.getElementById('submitForm'),
  submitType: document.getElementById('submitType'),
  submitDownhill: document.getElementById('submitDownhill'),
  submitName: document.getElementById('submitName'),
  submitLocationWrap: document.getElementById('submitLocationWrap'),
  submitDifficultyWrap: document.getElementById('submitDifficultyWrap'),
  submitDifficulty: document.getElementById('submitDifficulty'),
  submitLocation: document.getElementById('submitLocation'),
  submitTrailParkRow: document.getElementById('submitTrailParkRow'),
  submitTrailPark: document.getElementById('submitTrailPark'),
  submitLength: document.getElementById('submitLength'),
  submitDrop: document.getElementById('submitDrop'),
  submitDescription: document.getElementById('submitDescription'),
  reviewDialog: document.getElementById('reviewDialog'),
  reviewListPanel: document.getElementById('reviewListPanel'),
  // Auth
  authDialog: document.getElementById('authDialog'),
  authForm: document.getElementById('authForm'),
  authName: document.getElementById('authName'),
  authEmail: document.getElementById('authEmail'),
  signOutBtn: document.getElementById('signOutBtn'),
};

const state = {
  tab: 'parks', // 'parks' | 'trails'
  filters: {
    q: '',
    downhill: 'any', // any|yes|no
    difficulty: 'any',
    park: 'any',
  },
  currentEntity: null, // { type: 'park'|'trail', parkId, trailId? }
  user: null, // { id, name, email }
};

// Local identity (demo only)
const USER_KEY = 'user:profile';
function loadUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch { return null; }
}
function saveUser(user) {
  state.user = user;
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
  renderUserButton();
}
function renderUserButton() {
  if (!els.userBtn) return;
  if (state.user) {
    els.userBtn.textContent = state.user.name || 'Account';
    els.userBtn.title = state.user.email || '';
  } else {
    els.userBtn.textContent = 'Sign in';
    els.userBtn.title = 'Set your display name';
  }
}
function openAuthDialog(message) {
  const existing = loadUser();
  if (existing) {
    els.authName.value = existing.name || '';
    els.authEmail.value = existing.email || '';
  } else {
    els.authForm && els.authForm.reset();
  }
  if (message) els.authDialog.dataset.message = message; else delete els.authDialog.dataset.message;
  els.authDialog.showModal();
}

// Utilities
const byName = (a, b) => a.name.localeCompare(b.name);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const fmtKm = (n) => {
  if (!Number.isFinite(n)) return '';
  const s = n.toFixed(2).replace(/\.0+$/, '').replace(/\.(\d)0$/, '.$1');
  return `${s} km`;
};
const fmtMeters = (n) => `${n|0} m`;
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

function starString(avg) {
  const full = Math.floor(avg);
  const half = avg - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// Data normalization helpers
function allParks() { return [...DATA.parks].sort(byName); }
function allParksMerged() {
  // Base + approved customs are already in DATA
  const base = DATA.parks.map(p => ({ ...p, verified: true }));
  const pendingParks = getPending()
    .filter(it => it.kind === 'park')
    .map(it => ({ ...it.data, verified: false }));
  return [...base, ...pendingParks].sort(byName);
}
function allTrails() {
  return DATA.parks
    .flatMap(p => p.trails.map(t => ({ ...t, parkId: p.id, parkName: p.name, parkDownhill: p.downhill, location: p.location, verified: true })))
    .sort(byName);
}
function allTrailsMerged() {
  const base = allTrails(); // includes verified:true
  const parksMerged = allParksMerged();
  const pendingTrails = getPending()
    .filter(it => it.kind === 'trail')
    .map(it => {
      const t = it.data;
      const park = parksMerged.find(p => p.id === t.parkId);
      return {
        ...t,
        parkName: park ? park.name : 'Unknown park',
        location: park ? park.location : '',
        parkDownhill: park ? park.downhill : undefined,
        verified: false,
      };
    });
  return [...base, ...pendingTrails].sort(byName);
}

// Local reviews storage
function reviewsKey(entity) {
  if (entity.type === 'park') return `reviews:park:${entity.parkId}`;
  return `reviews:trail:${entity.trailId}`;
}
function getReviews(entity) {
  try {
    const raw = localStorage.getItem(reviewsKey(entity));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function addReview(entity, review) {
  const list = getReviews(entity);
  list.push(review);
  localStorage.setItem(reviewsKey(entity), JSON.stringify(list));
}
function clearReviews(entity) {
  localStorage.removeItem(reviewsKey(entity));
}
function avgRating(reviews) {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length;
}

// Renderers
function renderFiltersVisibility() {
  const isTrails = state.tab === 'trails';
  if (els.difficultyWrap) els.difficultyWrap.classList.toggle('hidden', !isTrails);
  // Park dropdown removed from filters; guard if present
  if (els.parkWrap) els.parkWrap.classList.add('hidden');
}

function populateParkSelect() {
  if (!els.parkSelect) return;
  els.parkSelect.innerHTML = '<option value="any">Any</option>' + allParksMerged().map(p => `<option value="${p.id}">${p.name}${p.verified ? '' : ' (pending)'} </option>`).join('');
}

function renderResults() {
  const q = state.filters.q.trim().toLowerCase();
  const downhill = state.filters.downhill;

  if (state.tab === 'parks') {
    let items = allParksMerged();
    if (q) items = items.filter(p => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    if (downhill !== 'any') items = items.filter(p => p.downhill === (downhill === 'yes'));

    els.resultsMeta.textContent = `${items.length} park${items.length === 1 ? '' : 's'} found`;
    els.results.innerHTML = items.map(p => renderParkCard(p)).join('');
  } else {
    let items = allTrailsMerged();
    if (q) items = items.filter(t => t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q) || t.parkName.toLowerCase().includes(q));
    if (downhill !== 'any') items = items.filter(t => t.downhill === (downhill === 'yes'));
    if (state.filters.difficulty !== 'any') items = items.filter(t => t.difficulty === state.filters.difficulty);
    // Park dropdown removed; keep logic but it remains 'any' with no effect
    if (state.filters.park !== 'any') items = items.filter(t => t.parkId === state.filters.park);

    els.resultsMeta.textContent = `${items.length} trail${items.length === 1 ? '' : 's'} found`;
    els.results.innerHTML = items.map(t => renderTrailCard(t)).join('');
  }

  // Bind click handlers
  document.querySelectorAll('[data-entity]').forEach(el => {
    el.addEventListener('click', () => {
      const { entity, id, parkId } = el.dataset;
      if (entity === 'park') openParkDetail(id);
      else openTrailDetail(parkId, id);
    });
  });
}

function renderParkCard(p) {
  const entity = { type: 'park', parkId: p.id };
  const revs = getReviews(entity);
  const avg = avgRating(revs);
  const rating = revs.length ? `${avg.toFixed(1)} • ${revs.length} review${revs.length === 1 ? '' : 's'}` : 'No reviews yet';
  const trailsCount = allTrailsMerged().filter(t => t.parkId === p.id).length;
  return `
    <li class="card" data-entity="park" data-id="${p.id}">
      <h3>${p.name}</h3>
      <div class="muted">${p.location}</div>
      <div class="chip-row">
        <span class="chip ${p.downhill ? 'downhill' : 'not-downhill'}">${p.downhill ? 'Downhill' : 'Pedal Access'}</span>
        <span class="chip">${trailsCount} trail${trailsCount === 1 ? '' : 's'}</span>
        ${p.verified ? '' : '<span class="chip pending" title="Awaiting verification">Verification pending</span>'}
      </div>
      <div class="muted stars" title="Average rating">${starString(avg)} <span class="muted">${rating}</span></div>
    </li>
  `;
}

function renderTrailCard(t) {
  const entity = { type: 'trail', parkId: t.parkId, trailId: t.id };
  const revs = getReviews(entity);
  const avg = avgRating(revs);
  const rating = revs.length ? `${avg.toFixed(1)} • ${revs.length} review${revs.length === 1 ? '' : 's'}` : 'No reviews yet';
  const diffClass = t.difficulty.startsWith('Double') ? 'Double' : t.difficulty;
  return `
    <li class="card" data-entity="trail" data-id="${t.id}" data-park-id="${t.parkId}">
      <h3>${t.name}</h3>
      <div class="muted">${t.parkName} • ${t.location}</div>
      <div class="chip-row">
        <span class="badge ${diffClass}">${t.difficulty}</span>
        <span class="chip ${t.downhill ? 'downhill' : 'not-downhill'}">${t.downhill ? 'Downhill' : 'Pedal Access'}</span>
        ${t.length_km ? `<span class="chip">${fmtKm(t.length_km)}</span>` : ''}
        ${t.elevation_drop_m ? `<span class="chip">↓ ${fmtMeters(t.elevation_drop_m)}</span>` : ''}
        ${t.verified ? '' : '<span class="badge pending" title="Awaiting verification">Pending</span>'}
      </div>
      <div class="muted stars" title="Average rating">${starString(avg)} <span class="muted">${rating}</span></div>
    </li>
  `;
}

// Detail view
function openParkDetail(parkId) {
  const park = allParksMerged().find(p => p.id === parkId);
  if (!park) return;
  state.currentEntity = { type: 'park', parkId };
  const revs = getReviews(state.currentEntity);
  els.detailTitle.textContent = park.name;
  els.detailSummary.innerHTML = `
    <span class="chip ${park.downhill ? 'downhill' : 'not-downhill'}">${park.downhill ? 'Downhill' : 'Pedal Access'}</span>
    <span class="chip">${park.location}</span>
    <span class="chip">${allTrailsMerged().filter(t => t.parkId === park.id).length} trail(s)</span>
    ${park.verified ? '' : '<span class="chip pending">Verification pending</span>'}
  `;
  const baseMeta = revs.length ? `${avgRating(revs).toFixed(1)} average from ${revs.length} review${revs.length === 1 ? '' : 's'}` : 'No reviews yet';
  els.detailMeta.innerHTML = park.verified ? baseMeta : `${baseMeta} • <span class="badge pending">Unverified</span>`;
  els.detailDescription.textContent = park.description || '';
  renderReviews(revs);
  attachDialog();
  els.dialog.showModal();
}

function openTrailDetail(parkId, trailId) {
  const t = allTrailsMerged().find(x => x.id === trailId && x.parkId === parkId);
  if (!t) return;
  state.currentEntity = { type: 'trail', parkId, trailId };
  const revs = getReviews(state.currentEntity);
  els.detailTitle.textContent = `${t.name} — ${t.parkName}`;
  const diffClass = t.difficulty.startsWith('Double') ? 'Double' : t.difficulty;
  els.detailSummary.innerHTML = `
    <span class="badge ${diffClass}">${t.difficulty}</span>
    <span class="chip ${t.downhill ? 'downhill' : 'not-downhill'}">${t.downhill ? 'Downhill' : 'Pedal Access'}</span>
    <span class="chip">${t.location}</span>
    ${t.length_km ? `<span class="chip">${fmtKm(t.length_km)}</span>` : ''}
    ${t.elevation_drop_m ? `<span class="chip">↓ ${fmtMeters(t.elevation_drop_m)}</span>` : ''}
    ${t.verified ? '' : '<span class="chip pending">Verification pending</span>'}
  `;
  const baseMeta = revs.length ? `${avgRating(revs).toFixed(1)} average from ${revs.length} review${revs.length === 1 ? '' : 's'}` : 'No reviews yet';
  els.detailMeta.innerHTML = t.verified ? baseMeta : `${baseMeta} • <span class="badge pending">Unverified</span>`;
  els.detailDescription.textContent = t.description || '';
  renderReviews(revs);
  attachDialog();
  els.dialog.showModal();
}

function renderReviews(list) {
  if (!list.length) {
    els.reviewList.innerHTML = '<li class="muted">No reviews yet — be the first to review.</li>';
    return;
  }
  els.reviewList.innerHTML = list.map(r => `
    <li class="review">
      <div class="stars" aria-label="Rating">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <div class="byline">${r.name ? r.name + ' • ' : ''}${new Date(r.date).toLocaleDateString()}</div>
      <div class="comment">${escapeHtml(r.comment)}</div>
    </li>
  `).join('');
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function attachDialog() {
  // Reset form
  els.reviewForm.reset();

  // Submit handler
  els.reviewForm.onsubmit = (e) => {
    e.preventDefault();
    if (!state.currentEntity) return;
    const rating = clamp(parseInt(els.reviewRating.value, 10), 1, 5);
    const comment = els.reviewComment.value.trim();
    const name = els.reviewName.value.trim();
    if (!rating || !comment) return;
    const review = { rating, comment, name, date: new Date().toISOString() };
    addReview(state.currentEntity, review);
    renderReviews(getReviews(state.currentEntity));
    els.detailMeta.textContent = `${avgRating(getReviews(state.currentEntity)).toFixed(1)} average from ${getReviews(state.currentEntity).length} review${getReviews(state.currentEntity).length === 1 ? '' : 's'}`;
    els.reviewForm.reset();
  };

  // Clear button
  els.clearReviewsBtn.onclick = () => {
    if (!state.currentEntity) return;
    const confirmed = confirm('Clear all reviews for this item stored on this device?');
    if (confirmed) {
      clearReviews(state.currentEntity);
      renderReviews(getReviews(state.currentEntity));
      els.detailMeta.textContent = 'No reviews yet';
    }
  };
}

// Submissions store (local demo)
const PENDING_KEY = 'submissions:pending';
const CUSTOM_PARKS_KEY = 'custom:parks';
const CUSTOM_TRAILS_KEY = 'custom:trails';

function getPending() {
  try { return JSON.parse(localStorage.getItem(PENDING_KEY) || '[]'); } catch { return []; }
}
function setPending(list) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(list));
}
function addPending(item) {
  const list = getPending();
  list.push(item);
  setPending(list);
}
function saveCustomPark(park) {
  const list = loadCustomParks();
  list.push(park);
  localStorage.setItem(CUSTOM_PARKS_KEY, JSON.stringify(list));
}
function saveCustomTrail(trail) {
  const list = loadCustomTrails();
  list.push(trail);
  localStorage.setItem(CUSTOM_TRAILS_KEY, JSON.stringify(list));
}
function loadCustomParks() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_PARKS_KEY) || '[]'); } catch { return []; }
}
function loadCustomTrails() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_TRAILS_KEY) || '[]'); } catch { return []; }
}

function mergeCustomData() {
  const cParks = loadCustomParks();
  const cTrails = loadCustomTrails();
  DATA.parks.push(...cParks);
  for (const t of cTrails) {
    const p = DATA.parks.find(p => p.id === t.parkId);
    if (p) p.trails.push(t);
  }
}

// Submission dialog
function openSubmitDialog() {
  if (!state.user) { openAuthDialog('Please sign in to submit.'); return; }
  els.submitForm.reset();
  syncSubmitFormVisibility();
  populateSubmitTrailPark();
  els.submitDialog.showModal();
}
function syncSubmitFormVisibility() {
  const isTrail = els.submitType && els.submitType.value === 'trail';
  // Show/hide groups
  if (els.submitDifficultyWrap) els.submitDifficultyWrap.classList.toggle('hidden', !isTrail);
  if (els.submitTrailParkRow) els.submitTrailParkRow.classList.toggle('hidden', !isTrail);
  if (els.submitLocationWrap) els.submitLocationWrap.classList.toggle('hidden', isTrail);
  // Toggle required/disabled to prevent stray prompts
  if (els.submitTrailPark) {
    els.submitTrailPark.required = isTrail;
    els.submitTrailPark.disabled = !isTrail;
    if (!isTrail) els.submitTrailPark.value = '';
  }
  if (els.submitDifficulty) {
    els.submitDifficulty.required = isTrail;
    els.submitDifficulty.disabled = !isTrail;
  }
  if (els.submitLocation) {
    els.submitLocation.required = !isTrail; // required only for Park
    els.submitLocation.disabled = isTrail;
    if (isTrail) els.submitLocation.value = '';
  }
}
function populateSubmitTrailPark() {
  if (!els.submitTrailPark) return;
  els.submitTrailPark.innerHTML = allParksMerged().map(p => `<option value="${p.id}">${p.name}${p.verified ? '' : ' (pending)'} </option>`).join('');
}

function handleSubmitNew(e) {
  e.preventDefault();
  if (!state.user) { openAuthDialog('Please sign in first.'); return; }
  const type = els.submitType.value;
  const id = `${type}-${slug(els.submitName.value)}-${Math.random().toString(36).slice(2,7)}`;
  const name = els.submitName.value.trim();
  const downhill = els.submitDownhill.value === 'yes';
  const description = els.submitDescription.value.trim();
  const location = els.submitLocation.value.trim();
  if (!name) return;

  let payload;
  if (type === 'park') {
    if (!location) return; // parks require location
    payload = { kind: 'park', submittedBy: pickUser(state.user), data: { id, name, location, downhill, description, createdAt: new Date().toISOString(), trails: [] } };
  } else {
    const lenRaw = els.submitLength?.valueAsNumber;
    const dropRaw = els.submitDrop?.valueAsNumber;
    const length_km = Number.isFinite(lenRaw)
      ? lenRaw
      : (els.submitLength?.value ? parseFloat(String(els.submitLength.value).replace(',', '.')) : undefined);
    const elevation_drop_m = Number.isFinite(dropRaw)
      ? dropRaw
      : (els.submitDrop?.value ? parseFloat(String(els.submitDrop.value).replace(',', '.')) : undefined);
    const t = {
      id,
      name,
      downhill,
      difficulty: els.submitDifficulty.value,
      length_km: Number.isFinite(length_km) ? length_km : undefined,
      elevation_drop_m: Number.isFinite(elevation_drop_m) ? elevation_drop_m : undefined,
      description,
      parkId: els.submitTrailPark.value,
    };
    payload = { kind: 'trail', submittedBy: pickUser(state.user), data: t };
  }
  addPending(payload);
  els.submitDialog.close();
  alert('Thanks! Your submission is pending review.');
}

function pickUser(u) {
  if (!u) return null;
  // Store only minimal info in submissions
  return { id: u.id, name: u.name, email: u.email };
}

// Review dialog
function openReviewDialog() {
  renderPendingQueue();
  els.reviewDialog.showModal();
}
function renderPendingQueue() {
  const items = getPending();
  if (!items.length) {
    els.reviewListPanel.innerHTML = '<div class="muted">No pending submissions.</div>';
    return;
  }
  els.reviewListPanel.innerHTML = items.map((it, idx) => {
    const by = it.submittedBy?.name ? `Submitted by ${escapeHtml(it.submittedBy.name)}` : 'Submitted';
    if (it.kind === 'park') {
      const p = it.data;
      return `
        <div class="queue-item" data-idx="${idx}">
          <div class="queue-head">
            <div>
              <div class="queue-title">Park: ${p.name}</div>
              <div class="queue-meta">${p.location} • ${p.downhill ? 'Downhill' : 'Pedal Access'} • ${by}</div>
            </div>
            <div class="queue-actions">
              <button class="btn small" data-action="approve">Approve</button>
              <button class="btn small outline" data-action="reject">Reject</button>
            </div>
          </div>
          <div class="muted" style="margin-top:6px;">${escapeHtml(p.description || '')}</div>
        </div>`;
    } else {
      const t = it.data;
      const park = allParks().find(p => p.id === t.parkId);
      const diffClass = t.difficulty && t.difficulty.startsWith('Double') ? 'Double' : t.difficulty;
      return `
        <div class="queue-item" data-idx="${idx}">
          <div class="queue-head">
            <div>
              <div class="queue-title">Trail: ${t.name}</div>
              <div class="queue-meta">${park ? park.name : 'Unknown park'} • <span class="badge ${diffClass}">${t.difficulty || ''}</span> • ${t.downhill ? 'Downhill' : 'Pedal Access'} • ${by}</div>
            </div>
            <div class="queue-actions">
              <button class="btn small" data-action="approve">Approve</button>
              <button class="btn small outline" data-action="reject">Reject</button>
            </div>
          </div>
          <div class="muted" style="margin-top:6px;">${escapeHtml(t.description || '')}</div>
        </div>`;
    }
  }).join('');

  // Bind actions
  els.reviewListPanel.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const idx = parseInt(btn.closest('[data-idx]').dataset.idx, 10);
      if (action === 'approve') approvePending(idx);
      else rejectPending(idx);
    });
  });

  // Disable self-approval and require sign-in
  els.reviewListPanel.querySelectorAll('[data-idx]').forEach(item => {
    const idx = parseInt(item.dataset.idx, 10);
    const data = getPending()[idx];
    const approveBtn = item.querySelector('[data-action="approve"]');
    if (!approveBtn) return;
    if (!state.user) {
      approveBtn.disabled = true;
      approveBtn.title = 'Sign in to approve';
      return;
    }
    const isSelf = !!(data?.submittedBy?.id && state.user?.id && data.submittedBy.id === state.user.id);
    if (isSelf) {
      approveBtn.disabled = true;
      approveBtn.title = 'You cannot approve your own submission';
    }
  });
}

function approvePending(index) {
  if (!state.user) { openAuthDialog('Please sign in to approve.'); return; }
  const items = getPending();
  const item = items[index];
  if (!item) return;
  if (item.submittedBy?.id && state.user?.id && item.submittedBy.id === state.user.id) {
    alert('You cannot approve your own submission.');
    return;
  }
  if (item.kind === 'park') {
    const p = item.data;
    saveCustomPark(p);
    DATA.parks.push(p);
  } else if (item.kind === 'trail') {
    const t = item.data;
    const park = DATA.parks.find(p => p.id === t.parkId);
    if (!park) { alert('Park not found for this trail. Approve a park first.'); return; }
    saveCustomTrail(t);
    park.trails.push(t);
  }
  items.splice(index, 1);
  setPending(items);
  renderPendingQueue();
  populateParkSelect();
  renderResults();
}

function rejectPending(index) {
  if (!state.user) { openAuthDialog('Please sign in to review.'); return; }
  const items = getPending();
  items.splice(index, 1);
  setPending(items);
  renderPendingQueue();
}

// Event wiring
function bindEvents() {
  els.tabParks.addEventListener('click', () => switchTab('parks'));
  els.tabTrails.addEventListener('click', () => switchTab('trails'));

  els.q.addEventListener('input', debounce(() => { state.filters.q = els.q.value; renderResults(); }, 120));
  els.downhill.addEventListener('change', () => { state.filters.downhill = els.downhill.value; renderResults(); });
  els.difficulty.addEventListener('change', () => { state.filters.difficulty = els.difficulty.value; renderResults(); });
  if (els.parkSelect) els.parkSelect.addEventListener('change', () => { state.filters.park = els.parkSelect.value; renderResults(); });

  if (els.addBtn) els.addBtn.addEventListener('click', openSubmitDialog);
  if (els.adminBtn) els.adminBtn.addEventListener('click', openReviewDialog);
  if (els.submitType) els.submitType.addEventListener('change', syncSubmitFormVisibility);
  if (els.submitForm) els.submitForm.addEventListener('submit', handleSubmitNew);
  if (els.userBtn) els.userBtn.addEventListener('click', () => openAuthDialog());
  if (els.authForm) els.authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = els.authName.value.trim();
    const email = els.authEmail.value.trim();
    if (!name) return;
    const existing = loadUser();
    const id = existing?.id || `u_${Math.random().toString(36).slice(2,10)}`;
    saveUser({ id, name, email });
    els.authDialog.close();
  });
  if (els.signOutBtn) els.signOutBtn.addEventListener('click', () => { saveUser(null); els.authDialog.close(); });

  // Close dialog on backdrop or Esc handled natively by <dialog> with method="dialog"
}

function switchTab(tab) {
  if (state.tab === tab) return;
  state.tab = tab;
  els.tabParks.classList.toggle('active', tab === 'parks');
  els.tabTrails.classList.toggle('active', tab === 'trails');
  els.tabParks.setAttribute('aria-pressed', tab === 'parks');
  els.tabTrails.setAttribute('aria-pressed', tab === 'trails');
  renderFiltersVisibility();
  renderResults();
}

// Small debounce helper
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), wait);
  };
}

// Init
function init() {
  mergeCustomData();
  saveUser(loadUser()); // load from storage and render button
  populateParkSelect();
  renderFiltersVisibility();
  renderResults();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);
