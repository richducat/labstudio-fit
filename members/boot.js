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

const moduleScript = document.createElement('script');
moduleScript.type = 'module';
moduleScript.src = '/members/main.js';
moduleScript.onerror = () => {
  renderFallback('Unable to load the members experience. Please refresh and try again.');
};

document.head.appendChild(moduleScript);

const fallbackTimer = window.setTimeout(() => {
  if (document.documentElement.dataset.membersLoaded !== 'true') {
    renderFallback('Still loading the members experience. Please refresh or try another browser.');
  }
}, 3500);

window.addEventListener('members-app-loaded', () => {
  window.clearTimeout(fallbackTimer);
});
