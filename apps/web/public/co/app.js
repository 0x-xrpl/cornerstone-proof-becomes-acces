const STORAGE_KEY = 'cornerstone-demo-state-v2';

const defaultState = {
  connected: false,
  proof: {
    watch: false,
    venue: false,
    quiz: false,
  },
  amaOpened: false,
};

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return { ...defaultState };
  }
}

let state = loadState();
state.connected = true;

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function proofComplete() {
  return state.proof.watch && state.proof.venue && state.proof.quiz;
}

function showToast(message) {
  const toast = $('[data-toast]');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 1800);
}

function openModal(kind) {
  const modal = $('[data-modal]');
  if (!modal) return;
  const copy = {
    console: ['Console Preview', 'Support Proof, CornerKey, and Access are connected in this demo flow.'],
    ama: ['AMA Access Opened', 'Your Corner AMA Key opens verified supporter access.'],
    locked: ['Access Locked', 'Keep proving support to unlock this CornerKey in the next MVP step.'],
    event: ['Event Details', 'ONE Samurai, Japan. April 29 at Ariake Arena. Premium access opens around the live event.'],
    progress: ['Community Progress', 'The squad is 78% complete. Every proof action moves the unlock path forward.'],
    squad: ['Squad Unlock', 'When the community moves together, the next door opens.'],
  }[kind] || ['CornerStone', 'Proof becomes access.'];

  $('[data-modal-title]').textContent = copy[0];
  $('[data-modal-body]').textContent = copy[1];
  modal.showModal();
}

function render() {
  $$('[data-wallet-cover]').forEach((cover) => cover.classList.toggle('connected', state.connected));
  $$('[data-dashboard-wallet-patch]').forEach((patch) => patch.classList.toggle('connected', state.connected));

  if (document.body.dataset.page === 'proof') {
    ['watch', 'venue', 'quiz'].forEach((key) => {
      $$(`[data-mask="${key}"]`).forEach((mask) => mask.classList.toggle('revealed', state.proof[key]));
    });

    const complete = proofComplete();
    $$('[data-mask="key"], [data-mask="ama"], [data-mask="status"]').forEach((mask) => {
      mask.classList.toggle('revealed', state.connected && complete);
    });
  }
}

$$('[data-connect]').forEach((button) => {
  button.addEventListener('click', () => {
    state.connected = true;
    saveState();
    render();
    showToast('Wallet connected. Continue with Watch Check-in.');
  });
});

$$('[data-proof-action]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!state.connected) {
      showToast('Connect wallet first.');
      return;
    }

    const key = button.dataset.proofAction;
    state.proof[key] = true;
    saveState();
    render();

    if (proofComplete()) {
      showToast('Corner AMA Key unlocked.');
    } else {
      showToast('Support proof recognized.');
    }
  });
});

$$('[data-open-ama]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!state.connected || !proofComplete()) {
      showToast('Complete all proof actions first.');
      return;
    }

    state.amaOpened = true;
    saveState();
    openModal('ama');
  });
});

$$('[data-modal-trigger]').forEach((trigger) => {
  trigger.addEventListener('click', () => openModal(trigger.dataset.modalTrigger));
});

$$('[data-close-modal]').forEach((button) => {
  button.addEventListener('click', () => button.closest('dialog').close());
});

render();


// --- FORCE DASHBOARD FIX ---
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a, button, div").forEach(el => {
    if (el.innerText && el.innerText.toUpperCase().includes("DASH")) {
      el.onclick = (e) => {
        e.preventDefault();
        window.location.href = "/co/";
      };
    }
  });
});
