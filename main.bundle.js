const root = document.getElementById('root');

const DATA = {
  brand: {
    name: 'THE LAB',
    address: '3280 Suntree Blvd, Melbourne, FL'
  },
  stats: [
    { label: 'XP Earned', value: '1,250 XP' },
    { label: 'Current Level', value: 'Level 3' },
    { label: 'Credits', value: '1 Active' },
    { label: 'Streak', value: '4 Weeks' }
  ],
  tabs: [
    {
      key: 'home',
      label: 'Home',
      headline: 'Your next best session is queued.',
      body: 'Track recovery, unlock coaching, and keep your training momentum with insights built for Lab Studio Fit.'
    },
    {
      key: 'services',
      label: 'Services',
      headline: 'Protocol-driven training, ready on demand.',
      body: 'Reserve your assessment, precision strength sessions, and recovery add-ons without waiting on a front desk.'
    },
    {
      key: 'market',
      label: 'Market',
      headline: 'Fuel and gear that matches the work.',
      body: 'Order meals, hydration, and essentials curated for high performance training days.'
    },
    {
      key: 'community',
      label: 'Community',
      headline: 'Challenges and accountability in one place.',
      body: 'Join in-gym challenges, leaderboards, and private coaching to stay consistent.'
    }
  ],
  highlightCards: [
    {
      title: 'Workout Focus',
      text: 'Upper Body Hypertrophy • 60 min',
      tag: 'Next Up'
    },
    {
      title: 'Recovery Window',
      text: 'Infrared + cold plunge booking available.',
      tag: 'Recovery'
    },
    {
      title: 'Marketplace',
      text: 'Protein bowls and hydration stocked.',
      tag: 'Fuel'
    },
    {
      title: 'Coaching',
      text: 'Message your coach for form reviews.',
      tag: 'Support'
    }
  ],
  services: [
    {
      title: 'Intro Assessment',
      text: 'Movement screen & custom strategy.',
      pill: '45 min · $49'
    },
    {
      title: '1:1 Protocol',
      text: 'Hypertrophy session guided by a coach.',
      pill: '60 min · $95'
    },
    {
      title: 'Flow State Mobility',
      text: 'Active mobility & joint health focus.',
      pill: '45 min · $55'
    },
    {
      title: 'Ice + Heat Recovery',
      text: 'Contrast therapy with sauna + plunge.',
      pill: '30 min · $59'
    }
  ],
  market: [
    {
      title: 'Macro Bowl: Chicken & Rice',
      text: '45g protein · 50g carbs · 12g fat',
      pill: '$10.99'
    },
    {
      title: 'Electro-Hydrate',
      text: 'Recovery electrolytes for training days.',
      pill: '$2.99'
    },
    {
      title: 'Iso-Whey Shake',
      text: '30g protein · 5g carbs · 2g fat',
      pill: '$4.99'
    }
  ],
  community: [
    {
      title: 'The 300 Challenge',
      text: '300 reps total volume in one session.',
      pill: '500 XP'
    },
    {
      title: 'Ice King Streak',
      text: 'Accumulate 20 minutes in cold plunge.',
      pill: 'Free shake'
    },
    {
      title: 'Leaderboard',
      text: 'Track your rank and weekly momentum.',
      pill: 'Top 5'
    }
  ]
};

const state = {
  activeTab: 'home'
};

const card = ({ title, text, tag, pill }) => {
  const tagMarkup = tag ? `<span class="pill">${tag}</span>` : '';
  const pillMarkup = pill ? `<span class="pill">${pill}</span>` : '';
  return `
    <div class="card">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
        <h4>${title}</h4>
        ${tagMarkup || pillMarkup}
      </div>
      <p>${text}</p>
    </div>
  `;
};

const renderTabContent = () => {
  if (state.activeTab === 'services') {
    return `
      <div class="grid two">
        ${DATA.services.map((item) => card(item)).join('')}
      </div>
    `;
  }
  if (state.activeTab === 'market') {
    return `
      <div class="grid two">
        ${DATA.market.map((item) => card(item)).join('')}
      </div>
    `;
  }
  if (state.activeTab === 'community') {
    return `
      <div class="grid two">
        ${DATA.community.map((item) => card(item)).join('')}
      </div>
    `;
  }

  return `
    <div class="stats">
      ${DATA.stats
        .map(
          (stat) => `
            <div class="stat">
              <span>${stat.label}</span>
              <h3>${stat.value}</h3>
            </div>
          `
        )
        .join('')}
    </div>
    <div class="grid two">
      ${DATA.highlightCards.map((item) => card(item)).join('')}
    </div>
    <button class="cta" type="button">Book today’s session</button>
  `;
};

const render = () => {
  const activeTabData = DATA.tabs.find((tab) => tab.key === state.activeTab);
  root.innerHTML = `
    <div class="page">
      <header class="header">
        <div class="brand">
          <h1>${DATA.brand.name}</h1>
          <p>${DATA.brand.address}</p>
        </div>
        <span class="badge">Member App Ready</span>
      </header>

      <div class="tabs">
        ${DATA.tabs
          .map(
            (tab) => `
              <button class="tab-button ${tab.key === state.activeTab ? 'active' : ''}" data-tab="${tab.key}">
                ${tab.label}
              </button>
            `
          )
          .join('')}
      </div>

      <section>
        <div class="hero">
          <div>
            <h2>${activeTabData.headline}</h2>
            <p>${activeTabData.body}</p>
          </div>
          ${renderTabContent()}
        </div>
      </section>

      <footer class="footer">Lab Studio Fit · Offline-ready experience</footer>
    </div>
  `;

  document.querySelectorAll('.tab-button').forEach((button) => {
    button.addEventListener('click', () => {
      const nextTab = button.getAttribute('data-tab');
      if (!nextTab || nextTab === state.activeTab) {
        return;
      }
      state.activeTab = nextTab;
      render();
    });
  });
};

render();
