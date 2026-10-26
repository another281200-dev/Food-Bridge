document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initCategoryFilters();
  initLogisticsStepper();
  initMapInteractions();
  initMetricCounters();
  initSectionReveals();
  initReservationModal();
  initMotionToggle();
  initAiScanner();
  initAiFraudScreening();
  initAiSmartMatch();
});

function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('glass-header-scrolled');
    } else {
      header.classList.remove('glass-header-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.cat-filter-btn');
  const feedCards = document.querySelectorAll('.feed-card');
  const countDisplay = document.getElementById('visible-count-text');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-cat');
      let count = 0;

      feedCards.forEach(card => {
        const cardCategory = card.getAttribute('data-cat');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 30);
          count++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countDisplay) {
        countDisplay.textContent = count;
      }
    });
  });
}

function initLogisticsStepper() {
  const nodes = document.querySelectorAll('.stepper-node');
  const fillBar = document.querySelector('.stepper-progress-fill');
  const advanceBtn = document.getElementById('stepper-advance-btn');
  const statusText = document.getElementById('stepper-status-note');

  if (!nodes.length || !fillBar) return;

  const stepsInfo = [
    "Posted by Oudh Heritage Banquet, Hazratganj: 85 fresh thali meals packed in leaf boxes. Worth ₹12,750 (Zero cost).",
    "Claimed by Yahiyaganj Langar Sewa, Chowk: volunteer courier assigned for immediate pickup.",
    "In transit via e-rickshaw across Gomti River: En route to Old Lucknow distribution hub.",
    "Verified delivered at Yahiyaganj: Temperature logged at 64°C. Ready for evening community langar."
  ];

  let currentStep = 2;

  function renderStep(step) {
    currentStep = step;
    const pct = ((currentStep - 1) / (nodes.length - 1)) * 100;
    fillBar.style.width = `${pct}%`;

    nodes.forEach((node, idx) => {
      const nodeStep = idx + 1;
      node.classList.remove('done', 'active');
      if (nodeStep < currentStep) {
        node.classList.add('done');
      } else if (nodeStep === currentStep) {
        node.classList.add('active');
      }
    });

    if (statusText) {
      statusText.textContent = stepsInfo[currentStep - 1];
    }
  }

  if (advanceBtn) {
    advanceBtn.addEventListener('click', () => {
      let next = currentStep + 1;
      if (next > nodes.length) next = 1;
      renderStep(next);
      showToast(`Logistics dispatch: step ${next} of 4`);
    });
  }

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const stepVal = parseInt(node.getAttribute('data-step'), 10);
      if (stepVal) renderStep(stepVal);
    });
  });

  renderStep(currentStep);
}

function initMapInteractions() {
  const pins = document.querySelectorAll('.map-pin-el');
  const radiusButtons = document.querySelectorAll('.map-radius-pill');

  const hubs = {
    hub1: {
      name: "Yahiyaganj Langar Sewa (Chowk)",
      role: "Daily Community Langar & Roti Bank",
      neighborhood: "Old Lucknow • Near Rumi Darwaza",
      distance: "1.4 km from Chowk Chauraha",
      capacity: "Needs ~250 thalis daily",
      valueSaved: "₹18,500 daily food value",
      tag: "Intake Open"
    },
    hub2: {
      name: "Gomti Nagar Community Fridge",
      role: "Public 24/7 Cooled Pantry",
      neighborhood: "Near 1090 Chauraha, Gomti Nagar",
      distance: "2.8 km from Hazratganj",
      capacity: "Open for dairy, fruit & bread",
      valueSaved: "₹8,200 daily fresh produce",
      tag: "Walk-in 24/7"
    },
    hub3: {
      name: "Hazratganj Relief Kitchen",
      role: "Central Commercial Surplus Hub",
      neighborhood: "Near Ganj Market / MG Road",
      distance: "Central Core Hub",
      capacity: "High volume banquet intake",
      valueSaved: "₹35,000 banquet food/day",
      tag: "Active Intake"
    },
    hub4: {
      name: "Charbagh Railway Community Shelter",
      role: "Migrant & Daily Worker Relief",
      neighborhood: "Near Lucknow Jn Railway Station",
      distance: "3.5 km south of Hazratganj",
      capacity: "Needs warm evening dinners",
      valueSaved: "₹14,000 nightly meals",
      tag: "Open for Meals"
    },
    hub5: {
      name: "Dubagga Mandi Food Recovery Hub",
      role: "Wholesale Sabzi Mandi Collection",
      neighborhood: "Dubagga, Hardoi Road",
      distance: "West Lucknow Mandi",
      capacity: "Accepts 500+ kg surplus veg",
      valueSaved: "₹22,000 daily mandi savings",
      tag: "Open 6 AM - 8 PM"
    }
  };

  pins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const hubId = pin.getAttribute('data-hub');
      const info = hubs[hubId];
      if (!info) return;

      const nameEl = document.getElementById('map-hub-name');
      const roleEl = document.getElementById('map-hub-role');
      const distEl = document.getElementById('map-hub-distance');
      const capEl = document.getElementById('map-hub-capacity');
      const tagEl = document.getElementById('map-hub-tag');

      if (nameEl) nameEl.textContent = info.name;
      if (roleEl) roleEl.textContent = `${info.role} • ${info.neighborhood}`;
      if (distEl) distEl.textContent = info.distance;
      if (capEl) capEl.textContent = `${info.capacity} (${info.valueSaved})`;
      if (tagEl) tagEl.textContent = info.tag;

      pins.forEach(p => p.classList.remove('selected'));
      pin.classList.add('selected');

      showToast(`Selected: ${info.name}`);
    });
  });

  radiusButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      radiusButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const radius = btn.getAttribute('data-radius');
      showToast(`Search radius set to ${radius}`);
    });
  });
}

function initMetricCounters() {
  const elements = document.querySelectorAll('.counter-num');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-target'), 10);
        runCountUp(el, 0, targetVal, 1000);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
}

function runCountUp(el, start, end, duration) {
  let startTime = null;
  function tick(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(ease * (end - start) + start);
    el.textContent = current.toLocaleString('en-IN');

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
      el.textContent = end.toLocaleString('en-IN');
    }
  }
  window.requestAnimationFrame(tick);
}

function initSectionReveals() {
  const reveals = document.querySelectorAll('.reveal-init');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

function initReservationModal() {
  const backdrop = document.getElementById('reservation-modal');
  const closeBtn = document.getElementById('modal-close-button');
  const reserveButtons = document.querySelectorAll('.btn-open-reserve');

  if (!backdrop) return;

  const openModal = (title, donor, qty, val) => {
    const titleEl = document.getElementById('modal-food-title');
    const donorEl = document.getElementById('modal-donor-name');
    const qtyEl = document.getElementById('modal-food-qty');
    const valEl = document.getElementById('modal-food-val');

    if (titleEl) titleEl.textContent = title || "Surplus Food Batch";
    if (donorEl) donorEl.textContent = donor || "Food Donor";
    if (qtyEl) qtyEl.textContent = qty || "Standard Batch";
    if (valEl) valEl.textContent = val || "₹0 (Community Relief)";

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  reserveButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.feed-card');
      const title = card ? card.querySelector('.feed-card-title').textContent : '';
      const donor = card ? card.querySelector('.feed-card-donor').textContent : '';
      const qty = card ? card.querySelector('.feed-quantity').textContent : '';
      const valTag = card ? card.querySelector('.rupee-val-tag') : null;
      const val = valTag ? valTag.textContent : '₹0 (Free for Langar)';
      openModal(title, donor, qty, val);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) closeModal();
  });

  const confirmBtn = document.getElementById('confirm-reserve-btn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      closeModal();
      showToast("Batch reserved! OTP and pickup code sent.");
    });
  }
}

function initMotionToggle() {
  const toggleButtons = document.querySelectorAll('.motion-switch-btn');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isReduced = localStorage.getItem('fb-motion') === 'reduced' || prefersReduced;

  function updateToggleUI(reduced) {
    if (reduced) {
      document.body.classList.add('reduced-motion');
      toggleButtons.forEach(btn => {
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
          <span>Reduced Motion</span>
        `;
      });
    } else {
      document.body.classList.remove('reduced-motion');
      toggleButtons.forEach(btn => {
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>Motion: On</span>
        `;
      });
    }
    localStorage.setItem('fb-motion', reduced ? 'reduced' : 'on');
  }

  updateToggleUI(isReduced);

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      isReduced = !isReduced;
      updateToggleUI(isReduced);
      showToast(isReduced ? "Reduced motion enabled" : "Motion enabled");
    });
  });
}

/* Feature 1: AI Food Freshness & Quality Scanner */
function initAiScanner() {
  const dropzone = document.getElementById('scanner-dropzone');
  const fileInput = document.getElementById('food-image-input');
  const previewImg = document.getElementById('scanner-preview-img');
  const placeholder = document.getElementById('scanner-placeholder');
  const laser = document.getElementById('scanner-laser');
  const sampleBtns = document.querySelectorAll('.ai-sample-btn');
  const autoFillBtn = document.getElementById('btn-autofill-ai');

  if (!dropzone) return;

  let lastScanResult = null;

  const sampleImages = {
    thali: {
      url: 'assets/images/indian-thali.jpg',
      category: 'prepared',
      desc: '85 fresh thali meals packed in leaf boxes with dal tadka and vegetable pulao. Prepared 2 hours ago under clean commercial supervision.'
    },
    mandi: {
      url: 'assets/images/lucknow-mandi-produce.jpg',
      category: 'produce',
      desc: 'Fresh spinach, ripe tomatoes, cauliflower and green peas in wicker tokris from Dubagga Sabzi Mandi.'
    },
    bakery: {
      url: 'assets/images/bakery-surplus.jpg',
      category: 'bakery',
      desc: 'Artisan soft pav, whole wheat burger buns, and tandoori naan surplus from local Hazratganj bakery.'
    },
    spoiled: {
      url: 'assets/images/prepared-meals.jpg',
      category: 'prepared',
      desc: 'Sour smelling dal and discolored vegetable curry left uncovered at room temperature for over 28 hours.'
    }
  };

  async function triggerScan(category, description, imageBase64, displayUrl) {
    dropzone.classList.add('scanning');
    if (placeholder) placeholder.style.display = 'none';
    if (previewImg) {
      previewImg.src = displayUrl;
      previewImg.style.display = 'block';
    }

    try {
      const res = await fetch('/api/ai-scan-freshness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          foodCategory: category,
          description: description,
          imageBase64: imageBase64 || null
        })
      });

      const data = await res.json();
      setTimeout(() => {
        dropzone.classList.remove('scanning');
        if (data.success && data.result) {
          applyScanResults(data.result, data.aiEngine);
        }
      }, 700);
    } catch (err) {
      dropzone.classList.remove('scanning');
      console.warn('Using local safety audit fallback:', err);
    }
  }

  function applyScanResults(res, engine) {
    lastScanResult = res;

    const scoreNum = document.getElementById('ai-freshness-num');
    const statusPill = document.getElementById('ai-freshness-status-pill');
    const nameEl = document.getElementById('ai-detected-name');
    const safeWindowEl = document.getElementById('ai-safe-window');
    const tempEl = document.getElementById('ai-rec-temp');
    const obsList = document.getElementById('ai-observations-list');
    const engineBadge = document.getElementById('ai-engine-badge');

    if (scoreNum) scoreNum.textContent = res.freshnessScore;
    if (nameEl) nameEl.textContent = res.foodName;
    if (safeWindowEl) safeWindowEl.textContent = `${res.safeWindowHours} Hours Left`;
    if (tempEl) tempEl.textContent = res.recommendedTemp;
    if (engineBadge && engine) engineBadge.textContent = engine;

    if (statusPill) {
      if (res.freshnessScore >= 80) {
        statusPill.className = 'status-badge status-badge-available';
        statusPill.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Prime Langar Grade
        `;
      } else if (res.freshnessScore >= 50) {
        statusPill.className = 'status-badge status-badge-pending';
        statusPill.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Urgent Pickup Needed
        `;
      } else {
        statusPill.className = 'status-badge status-badge-scam';
        statusPill.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          High Spoilage Risk
        `;
      }
    }

    if (obsList && Array.isArray(res.visualObservations)) {
      obsList.innerHTML = res.visualObservations.map(obs => `
        <li>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${res.freshnessScore >= 70 ? '#15803D' : '#DC2626'}" stroke-width="2.5">
            ${res.freshnessScore >= 70 ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'}
          </svg>
          <span>${obs}</span>
        </li>
      `).join('');
    }

    showToast(`AI Vision Scan: ${res.foodName} (${res.freshnessScore}% Fresh)`);
  }

  sampleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sampleKey = btn.getAttribute('data-sample');
      const sample = sampleImages[sampleKey];
      if (sample) {
        triggerScan(sample.category, sample.desc, null, sample.url);
      }
    });
  });

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result;
          triggerScan('prepared', file.name, base64, base64);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (autoFillBtn) {
    autoFillBtn.addEventListener('click', () => {
      if (!lastScanResult) {
        showToast("Please run or select a scan first.");
        return;
      }
      const catSelect = document.getElementById('food-category');
      const descArea = document.getElementById('food-description');
      const tempSelect = document.getElementById('current-temp');

      if (catSelect && lastScanResult.category) catSelect.value = lastScanResult.category;
      if (descArea) descArea.value = `${lastScanResult.foodName}. ${lastScanResult.visualObservations ? lastScanResult.visualObservations.join('. ') : ''}`;
      if (tempSelect) {
        if (lastScanResult.recommendedTemp.includes('Hot')) tempSelect.value = 'hot';
        else if (lastScanResult.recommendedTemp.includes('Cool') || lastScanResult.recommendedTemp.includes('Chilled')) tempSelect.value = 'chilled';
        else tempSelect.value = 'room';
      }

      showToast("Form auto-filled from AI quality scan!");
    });
  }
}

/* Feature 2: Real-time AI Scam & Fraud Screening */
function initAiFraudScreening() {
  const bizInput = document.getElementById('business-name');
  const phoneInput = document.getElementById('contact-phone');
  const addrInput = document.getElementById('pickup-address');
  const descInput = document.getElementById('food-description');
  const weightInput = document.getElementById('food-weight');

  const trustWidget = document.getElementById('ai-trust-widget');
  const trustBar = document.getElementById('trust-bar-fill');
  const trustBadge = document.getElementById('trust-badge-pill');
  const trustBadgeText = document.getElementById('trust-badge-text');
  const trustScoreLabel = document.getElementById('trust-score-label');
  const trustRiskLevel = document.getElementById('trust-risk-level');
  const trustReasons = document.getElementById('trust-reasons-summary');
  const submitBtn = document.getElementById('btn-submit-listing');

  if (!bizInput || !phoneInput || !trustWidget) return;

  let debounceTimer = null;

  async function checkFraud() {
    const payload = {
      businessName: bizInput.value,
      phone: phoneInput.value,
      address: addrInput ? addrInput.value : '',
      description: descInput ? descInput.value : '',
      quantity: weightInput ? weightInput.value : ''
    };

    try {
      const res = await fetch('/api/ai-screen-fraud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        updateFraudUI(data);
      }
    } catch (err) {
      console.warn('Fraud check offline fallback:', err);
    }
  }

  function updateFraudUI(data) {
    const score = data.legitimacyScore;
    if (trustBar) {
      trustBar.style.width = `${score}%`;
      if (score >= 80) trustBar.style.backgroundColor = '#15803D';
      else if (score >= 50) trustBar.style.backgroundColor = '#F59E0B';
      else trustBar.style.backgroundColor = '#DC2626';
    }

    if (trustScoreLabel) {
      trustScoreLabel.innerHTML = `Trust Score: <strong>${score}% Pass</strong>`;
    }

    if (trustRiskLevel) {
      trustRiskLevel.innerHTML = `Risk Level: <strong>${data.riskLevel}</strong>`;
    }

    if (trustReasons && Array.isArray(data.reasons)) {
      trustReasons.innerHTML = data.reasons.map(r => `<div>• ${r}</div>`).join('');
    }

    if (trustWidget) {
      trustWidget.classList.remove('flagged', 'review');
      if (data.status === 'SCAM_FLAGGED') trustWidget.classList.add('flagged');
      else if (data.status === 'PENDING_REVIEW') trustWidget.classList.add('review');
    }

    if (trustBadge) {
      if (data.status === 'APPROVED') {
        trustBadge.className = 'status-badge status-badge-available';
        trustBadge.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>AI Verified Safe</span>
        `;
        if (submitBtn) submitBtn.disabled = false;
      } else if (data.status === 'PENDING_REVIEW') {
        trustBadge.className = 'status-badge status-badge-pending';
        trustBadge.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>Under Admin Review</span>
        `;
        if (submitBtn) submitBtn.disabled = false;
      } else {
        trustBadge.className = 'status-badge status-badge-scam';
        trustBadge.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          <span>Scam Blocked</span>
        `;
        if (submitBtn) submitBtn.disabled = true;
      }
    }
  }

  const triggerDebounced = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(checkFraud, 300);
  };

  [bizInput, phoneInput, addrInput, descInput, weightInput].forEach(el => {
    if (el) el.addEventListener('input', triggerDebounced);
  });
}

/* Feature 3: Smart NGO & Dharamshala Matching */
function initAiSmartMatch() {
  const form = document.getElementById('surplus-donation-form');
  const previewBtn = document.getElementById('btn-preview-match');
  const modal = document.getElementById('ai-match-modal');
  const closeBtn = document.getElementById('close-match-modal-btn');
  const confirmBtn = document.getElementById('confirm-match-btn');

  if (!modal) return;

  async function runMatchAndOpenModal(isSubmit) {
    const category = document.getElementById('food-category')?.value || 'prepared';
    const address = document.getElementById('pickup-address')?.value || 'Hazratganj, Lucknow';
    const weight = document.getElementById('food-weight')?.value || '40 kg';

    try {
      const res = await fetch('/api/ai-smart-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodCategory: category, address, quantity: weight })
      });
      const data = await res.json();
      const hub = data.matchedHub || data.match;
      const otp = data.verificationOtp || data.dispatchOtp;
      if (data.success && hub) {
        populateMatchModal(hub, otp);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    } catch (err) {
      console.warn('Smart match fallback:', err);
    }
  }

  function populateMatchModal(match, otp) {
    const nameEl = document.getElementById('match-hub-name');
    const locEl = document.getElementById('match-hub-location');
    const transitEl = document.getElementById('match-transit');
    const etaEl = document.getElementById('match-eta');
    const contactEl = document.getElementById('match-contact');
    const rationaleEl = document.getElementById('match-rationale');
    const otpEl = document.getElementById('match-otp-code');

    if (nameEl) nameEl.textContent = match.name;
    if (locEl) locEl.textContent = `${match.locality} • ${match.distanceKm} km from pickup loading point`;
    if (transitEl) transitEl.textContent = match.transitMethod;
    if (etaEl) etaEl.textContent = `Estimated Courier ETA: ${match.etaMinutes} minutes`;
    if (contactEl) contactEl.textContent = match.contactPerson;
    if (otpEl) otpEl.textContent = otp || '7492';

    if (rationaleEl) {
      rationaleEl.textContent = `Optimal match based on current Lucknow hunger intake volume (${match.dailyCapacityThalis} thalis capacity), diet compatibility (${match.dietTypes.join(', ')}), and shortest Gomti transit corridor.`;
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (previewBtn) {
    previewBtn.addEventListener('click', () => runMatchAndOpenModal(false));
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      runMatchAndOpenModal(true);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      closeModal();
      showToast("Courier dispatched! Listing published to Lucknow Available Food feed.");
      setTimeout(() => {
        window.location.href = 'available-food.html';
      }, 1400);
    });
  }
}

function showToast(text) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${text}</span>
  `;

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
