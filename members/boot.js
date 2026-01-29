const rootElement = document.getElementById('root');

const renderFallback = (message) => {
  if (!rootElement) return;
  rootElement.innerHTML = `
    <div class="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
      <div class="max-w-lg text-center space-y-4">
        <div class="text-2xl font-black uppercase tracking-widest">The Lab Members</div>
        <p class="text-zinc-300 text-sm leading-relaxed">${message}</p>
        <p class="text-zinc-500 text-xs">If you use a content blocker, allow access to this site and reload.</p>
      </div>
    </div>
  `;
};

const bootScript = document.currentScript;
const baseUrl = bootScript?.src ? new URL('.', bootScript.src) : new URL('./', window.location.href);
let legacyLoading = false;

const markLoaded = () => {
  document.documentElement.dataset.membersLoaded = 'true';
  window.dispatchEvent(new Event('members-app-loaded'));
};

const loadLegacyBundle = (reason) => {
  if (legacyLoading) return;
  legacyLoading = true;
  const legacyScript = document.createElement('script');
  legacyScript.src = new URL('main.bundle.js', baseUrl).toString();
  legacyScript.defer = true;
  legacyScript.onload = () => {
    markLoaded();
    if (reason) {
      console.warn(reason);
    }
  };
  legacyScript.onerror = () => {
    renderFallback('Unable to load the members experience. Please refresh and try again.');
  };
  document.head.appendChild(legacyScript);
};

const moduleScript = document.createElement('script');
moduleScript.type = 'module';
moduleScript.src = new URL('main.js', baseUrl).toString();
moduleScript.onerror = () => {
  loadLegacyBundle('Module load failed; falling back to legacy bundle.');
};

document.head.appendChild(moduleScript);

const fallbackTimer = window.setTimeout(() => {
  if (document.documentElement.dataset.membersLoaded !== 'true') {
    loadLegacyBundle('Members app still loading; switching to legacy bundle.');
  }
}, 8000);

window.addEventListener('members-app-loaded', () => {
  window.clearTimeout(fallbackTimer);
});
