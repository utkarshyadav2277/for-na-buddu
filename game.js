/* ========================================================
   Purrfect Sweet Dreams - Game Logic & Micro-Interactions
   ======================================================== */

// Characters available to choose
const characterDefs = [
  {
    id: 'cat',
    name: 'Princess Mochi',
    animal: 'Dream Kitten',
    emoji: '🐱',
    trait: 'Purrfect Speed',
    carColor: '#ff608f',
    speech: "Meow! Don't worry Buddu, I'll drive fast to banish all nightmares!",
    sound: () => window.dreamAudio.playMeow(),
    img: 'assets/cat_hero.jpg'
  },
  {
    id: 'dog',
    name: 'Captain Biscuit',
    animal: 'Golden Puppy',
    emoji: '🐶',
    trait: 'Zoomies Power',
    carColor: '#ffd166',
    speech: "Woof! Hold onto your seat Buddu, puppy zoomies are engaged!",
    sound: () => window.dreamAudio.playWoof(),
    img: 'assets/cat_hero.jpg'
  },
  {
    id: 'bunny',
    name: 'Bubbles',
    animal: 'Fluffy Bunny',
    emoji: '🐰',
    trait: 'Nimble Turns',
    carColor: '#7dd3fc',
    speech: "Hop hop! Let's collect all those sweet hearts for Buddu!",
    sound: () => window.dreamAudio.playSqueak(),
    img: 'assets/cat_hero.jpg'
  },
  {
    id: 'panda',
    name: 'Bao Bao',
    animal: 'Baby Panda',
    emoji: '🐼',
    trait: 'Cuddle Shield',
    carColor: '#6ee7b7',
    speech: "So peaceful and cozy! No bad dreams can reach our panda car, Buddu!",
    sound: () => window.dreamAudio.playMeow(),
    img: 'assets/cat_hero.jpg'
  },
  {
    id: 'fox',
    name: 'Rusty',
    animal: 'Starry Fox',
    emoji: '🦊',
    trait: 'Swift Navigator',
    carColor: '#fb923c',
    speech: "The night stars are guiding us Buddu! Full speed ahead!",
    sound: () => window.dreamAudio.playSparkle(),
    img: 'assets/cat_hero.jpg'
  },
  {
    id: 'hamster',
    name: 'Peanut',
    animal: 'Speedy Hamster',
    emoji: '🐹',
    trait: 'Wheel Master',
    carColor: '#c084fc',
    speech: "Squeak! I've been training on my hamster wheel for this moment!",
    sound: () => window.dreamAudio.playSqueak(),
    img: 'assets/cat_hero.jpg'
  }
];

// Game State
const gameState = {
  activeTab: 'runner',
  selectedCharacter: 'cat',
  kittyHappiness: 45,
  kittyName: 'Princess Mochi',
  girlfriendName: 'Buddu',
  soundEnabled: true,

  // Level 1: Parigettu Buddu Runner
  runnerRunning: false,
  runnerTimer: 90, // 1 min 30s = 90s
  runnerDistance: 0,
  runnerTargetDistance: 1000,
  runnerHeartsCollected: 0,
  runnerSpeed: 70, // km/h

  // Level 2: Memory
  memoryMatchedPairs: 0,
  memoryMoves: 0,
  memoryFlippedCards: [],

  // Level 3: Catch Dreams (Hard Mode)
  arcadeRunning: false,
  arcadeScore: 0,
  arcadeTargetScore: 500,
  arcadeLives: 3,
  arcadeStartTime: 0,

  themeIndex: 0,
  themes: ['twilight', 'cotton-candy', 'strawberry']
};

// Memory Game Cards (10 unique pairs = 20 cards)
const memoryCardDefs = [
  { id: 'cat', name: 'Mochi Cat', img: 'assets/cat_hero.jpg', icon: '🐱', quote: "A warm purr for Buddu's heart!" },
  { id: 'moon', name: 'Golden Moon', img: 'assets/cat_sleep.jpg', icon: '🌙', quote: "Rest peacefully under gentle moonlight, Buddu!" },
  { id: 'wand', name: 'Magic Wand', img: 'assets/cat_magic.jpg', icon: '🪄', quote: "Banished all bad dreams into fairy dust!" },
  { id: 'heart', name: 'Love Hug', img: 'assets/cat_cuddle.jpg', icon: '💖', quote: "Sending Buddu the warmest bear hug!" },
  { id: 'strawberry', name: 'Sweet Treat', icon: '🍓', quote: "A sweet strawberry kiss for Buddu!" },
  { id: 'cocoa', name: 'Warm Cocoa', icon: '☕', quote: "Warm cozy cocoa to soothe Buddu's soul!" },
  { id: 'star', name: 'Lucky Star', icon: '⭐', quote: "Every star in the sky shines for Buddu!" },
  { id: 'rainbow', name: 'Rainbow', icon: '🌈', quote: "Bright colors to chase away all clouds for Buddu!" },
  { id: 'teddy', name: 'Cuddle Bear', icon: '🧸', quote: "Soft plushie hugs to protect your sleep, Buddu!" },
  { id: 'sparkles', name: 'Fairy Dust', icon: '✨', quote: "Sprinkling magical sweet dream wishes on Buddu!" }
];

// Sweet Affirmations for the Petting Sanctuary
const sweetCompliments = [
  "Buddu is safe, loved, and the sweetest person in the entire universe. 💕",
  "Bad dreams are just silly little mist that evaporates the moment Buddu wakes up! ☀️",
  "Your boyfriend is thinking of Buddu right now with a giant smile on his face! 🌸",
  "Buddu deserves all the forehead kisses, warm blankets, and yummy snacks today! 🍰",
  "Princess Mochi has declared Buddu's room an official Nightmare-Free Zone! 🛡️✨",
  "Close your eyes Buddu, take a deep breath: you are wrapped in pure unconditional love. 🫂",
  "Buddu is stronger than any silly bad dream, and ten thousand times cuter! 🐱💖"
];

/* ========================================================
   INITIALIZATION
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  setupEventListeners();
  loadSavedData();
  initCharacterSystem();
  initRunnerGame();
  initMemoryGame();
  initArcadeGame();
  updateCompanionUI();
  updateHappinessUI();

  // Floating ambient hearts generator
  setInterval(spawnAmbientFloatingHeart, 2400);
});

// Default heartfelt love letter
const defaultLoveLetter = `Hey Buddu,

You did it! You made it all the way to the end. You just proved you can conquer any level, and I know that whatever life throws at us, we’ll always level up together. 

I am so incredibly grateful for you, for always clearing things with me, and for simply being who you are. You're the best yr, i stg im so glad that i meet you and yeah im sorry for everything and thank you for being with me, and my love for you is completely real.

Thank you baba for playing, but most importantly, thank you for being my person. I love you endlessly, Na Buddu!`;

// Load custom love note stored in localStorage
function loadSavedData() {
  const savedLetter = localStorage.getItem('her_love_letter');
  const letterEl = document.getElementById('letter-body-text');
  if (letterEl) {
    if (!savedLetter || savedLetter.includes("silly flickering shadows") || savedLetter.includes("bad dream") || savedLetter.includes("comforting, sweet")) {
      letterEl.textContent = defaultLoveLetter;
      localStorage.setItem('her_love_letter', defaultLoveLetter);
    } else {
      letterEl.textContent = savedLetter;
    }
  }
  const savedName = localStorage.getItem('girlfriend_nickname') || 'Buddu';
  gameState.girlfriendName = savedName;
  const nameEl = document.getElementById('girlfriend-display-name');
  if (nameEl) nameEl.textContent = savedName;
}

/* ========================================================
   STARFIELD CANVAS & INTERACTIVE PARTICLE TRAIL
   ======================================================== */
let canvas, ctx, stars = [], pointerTrails = [];

function initBackgroundCanvas() {
  canvas = document.getElementById('dream-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateStars();
  }
  window.addEventListener('resize', resize);
  resize();

  // Cursor sparkle trail
  window.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.4) {
      pointerTrails.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 2,
        alpha: 1,
        color: ['#ff608f', '#ff85a2', '#c084fc', '#ffd166'][Math.floor(Math.random() * 4)],
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5
      });
    }
  });

  animateCanvas();
}

function generateStars() {
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 8000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      increasing: Math.random() > 0.5,
      color: Math.random() > 0.3 ? '#ffe4e6' : '#ffd166'
    });
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render twinkling dream stars
  stars.forEach(star => {
    if (star.increasing) {
      star.alpha += star.speed;
      if (star.alpha >= 1) star.increasing = false;
    } else {
      star.alpha -= star.speed;
      if (star.alpha <= 0.15) star.increasing = true;
    }

    ctx.save();
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = star.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = star.color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Render cursor trails
  for (let i = pointerTrails.length - 1; i >= 0; i--) {
    const p = pointerTrails[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.025;

    if (p.alpha <= 0) {
      pointerTrails.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  requestAnimationFrame(animateCanvas);
}

/* ========================================================
   COMPANION INTERACTIONS & PETTING SYSTEM
   ======================================================== */
function updateCompanionUI(message, state = 'hero') {
  const avatarImg = document.getElementById('companion-img');
  const bubble = document.getElementById('cat-speech-text');

  if (avatarImg) {
    if (state === 'hero') avatarImg.src = 'assets/cat_hero.jpg';
    else if (state === 'magic') avatarImg.src = 'assets/cat_magic.jpg';
    else if (state === 'cuddle') avatarImg.src = 'assets/cat_cuddle.jpg';
    else if (state === 'sleep') avatarImg.src = 'assets/cat_sleep.jpg';
  }

  if (message && bubble) {
    bubble.textContent = message;
    bubble.style.transform = 'scale(1.05)';
    setTimeout(() => { bubble.style.transform = 'scale(1)'; }, 300);
  }
}

function updateHappinessUI() {
  const fill = document.getElementById('happiness-fill');
  const text = document.getElementById('happiness-text');
  if (fill) fill.style.width = Math.min(100, gameState.kittyHappiness) + '%';
  if (text) text.textContent = `${Math.min(100, Math.round(gameState.kittyHappiness))}% Comfort`;
}

function petTheCat(event) {
  gameState.kittyHappiness = Math.min(100, gameState.kittyHappiness + 8);
  updateHappinessUI();

  // Sounds
  window.dreamAudio.playMeow();
  window.dreamAudio.startPurr();
  setTimeout(() => window.dreamAudio.stopPurr(), 1200);

  // Visual effects
  const catBox = document.getElementById('cat-avatar');
  if (catBox) {
    catBox.classList.add('purring');
    setTimeout(() => catBox.classList.remove('purring'), 800);
  }

  const compliments = [
    "Purrr... Buddu gives the absolute best head scratches! 💕",
    "I'm feeling so warm and safe with you, Buddu! Miau~ ✨",
    "Bad dreams are fully banished! Buddu is protected forever! 🌸",
    "Purrr... Princess Mochi loves Buddu so so much! 🐾"
  ];
  const randomC = compliments[Math.floor(Math.random() * compliments.length)];
  updateCompanionUI(randomC, 'cuddle');

  // Spawn heart burst at click location
  const x = event ? (event.clientX || event.pageX) : window.innerWidth / 2;
  const y = event ? (event.clientY || event.pageY) : window.innerHeight / 2;
  createHeartBurst(x, y, 6);

  showToast("🐾 *Purrrrr* Mochi loves Buddu's cuddles! 💕");
}

/* ========================================================
   EVENT LISTENERS SETUP
   ======================================================== */
function setupEventListeners() {
  // Navigation tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Audio controls
  const bgmBtn = document.getElementById('bgm-toggle-btn');
  if (bgmBtn) {
    bgmBtn.addEventListener('click', () => {
      if (!window.dreamAudio.bgmPlaying) {
        window.dreamAudio.startBgm();
        bgmBtn.innerHTML = '🎵 Music: Playing';
        bgmBtn.style.borderColor = '#ff85a2';
      } else {
        window.dreamAudio.stopBgm();
        bgmBtn.innerHTML = '🔇 Music: Paused';
        bgmBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      }
    });
  }

  // Pet quick button
  const petBtn = document.getElementById('quick-pet-btn');
  if (petBtn) petBtn.addEventListener('click', petTheCat);

  // Cat avatar click
  const catBox = document.getElementById('cat-avatar');
  if (catBox) catBox.addEventListener('click', petTheCat);

  // Sanctuary cat click & drag
  const sanctuaryCat = document.getElementById('sanctuary-cat-img');
  if (sanctuaryCat) {
    sanctuaryCat.addEventListener('click', (e) => {
      petTheCat(e);
      rotateAffirmation();
    });
  }

  const newAffirmationBtn = document.getElementById('new-affirmation-btn');
  if (newAffirmationBtn) newAffirmationBtn.addEventListener('click', rotateAffirmation);

  // Theme button
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      gameState.themeIndex = (gameState.themeIndex + 1) % gameState.themes.length;
      const theme = gameState.themes[gameState.themeIndex];
      document.body.setAttribute('data-theme', theme);
      showToast(`🎨 Theme: ${theme.replace('-', ' ').toUpperCase()}`);
    });
  }

  // Edit Note Modal
  const editNoteBtn = document.getElementById('edit-note-btn');
  const editModal = document.getElementById('edit-note-modal');
  const saveNoteBtn = document.getElementById('save-note-btn');
  const closeNoteBtn = document.getElementById('close-note-btn');
  const noteInput = document.getElementById('note-textarea-input');
  const nameInput = document.getElementById('girlfriend-name-input');

  if (editNoteBtn && editModal) {
    editNoteBtn.addEventListener('click', () => {
      const currentText = document.getElementById('letter-body-text').textContent;
      noteInput.value = currentText;
      nameInput.value = gameState.girlfriendName;
      editModal.style.display = 'flex';
    });
  }

  if (closeNoteBtn && editModal) {
    closeNoteBtn.addEventListener('click', () => {
      editModal.style.display = 'none';
    });
  }

  if (saveNoteBtn && editModal) {
    saveNoteBtn.addEventListener('click', () => {
      const newText = noteInput.value.trim();
      const newName = nameInput.value.trim() || 'My Sweet Princess';
      if (newText) {
        document.getElementById('letter-body-text').textContent = newText;
        localStorage.setItem('her_love_letter', newText);
      }
      gameState.girlfriendName = newName;
      document.getElementById('girlfriend-display-name').textContent = newName;
      localStorage.setItem('girlfriend_nickname', newName);

      editModal.style.display = 'none';
      showToast("💌 Love letter updated with your personal words!");
      window.dreamAudio.playSparkle();
    });
  }

  // Setup Coupons
  document.querySelectorAll('.coupon-card').forEach(coupon => {
    coupon.addEventListener('click', () => {
      window.dreamAudio.playSparkle();
      coupon.style.borderColor = '#ffd166';
      coupon.style.background = 'linear-gradient(135deg, rgba(255, 51, 102, 0.4), rgba(168, 85, 247, 0.5))';
      const title = coupon.querySelector('.coupon-title').textContent;
      showToast(`🎟️ REDEEMED: ${title}! Redeemable 24/7 with unlimited refills! 💕`);
      createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 12);
    });
  });

  // Character Modal Trigger
  const charSelectBtn = document.getElementById('character-select-btn');
  if (charSelectBtn) charSelectBtn.addEventListener('click', openCharacterModal);

  const closeCharModalBtn = document.getElementById('close-character-modal-btn');
  if (closeCharModalBtn) closeCharModalBtn.addEventListener('click', closeCharacterModal);

  // Defeat Modal Buttons
  const defeatRetryBtn = document.getElementById('defeat-retry-btn');
  if (defeatRetryBtn) {
    defeatRetryBtn.addEventListener('click', () => {
      closeDefeatModal();
      if (currentFailedLevel === 'runner') {
        startRunnerGame();
      } else if (currentFailedLevel === 'arcade') {
        startArcadeGame();
      } else if (currentFailedLevel === 'memory') {
        initMemoryGame();
      }
    });
  }

  const defeatCharBtn = document.getElementById('defeat-char-btn');
  if (defeatCharBtn) {
    defeatCharBtn.addEventListener('click', () => {
      closeDefeatModal();
      openCharacterModal();
    });
  }
}

// Tab Switching
function switchTab(tabName) {
  gameState.activeTab = tabName;
  window.dreamAudio.playPop();

  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.game-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const activePanel = document.getElementById(`panel-${tabName}`);
  if (activePanel) {
    activePanel.classList.add('active');
  }

  if (tabName !== 'runner' && gameState.runnerRunning) {
    pauseRunnerGame();
  }
  if (tabName !== 'arcade' && gameState.arcadeRunning) {
    pauseArcadeGame();
  }

  if (tabName === 'runner') {
    if (!gameState.runnerRunning) {
      const overlay = document.getElementById('runner-overlay');
      if (overlay) overlay.classList.remove('hidden');
    }
  }

  if (tabName === 'arcade') {
    if (!gameState.arcadeRunning) {
      const overlay = document.getElementById('arcade-overlay');
      if (overlay) overlay.classList.remove('hidden');
    }
  }
}

/* ========================================================
   LEVEL 2: COZY MEMORY MATCH PUZZLE
   ======================================================== */
function initMemoryGame() {
  const grid = document.getElementById('memory-grid');
  if (!grid) return;

  grid.innerHTML = '';
  gameState.memoryMatchedPairs = 0;
  gameState.memoryMoves = 0;
  gameState.memoryFlippedCards = [];

  const movesEl = document.getElementById('memory-moves');
  const matchesEl = document.getElementById('memory-matches');
  if (movesEl) movesEl.textContent = '0';
  if (matchesEl) matchesEl.textContent = '0 / 10';

  // Create 20 cards (10 pairs)
  const deck = [...memoryCardDefs, ...memoryCardDefs];
  // Shuffle
  deck.sort(() => Math.random() - 0.5);

  deck.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'memory-card';
    cardEl.dataset.id = card.id;
    cardEl.dataset.index = index;

    let frontContent = '';
    if (card.img) {
      frontContent = `<img src="${card.img}" alt="${card.name}"><div class="card-label">${card.name}</div>`;
    } else {
      frontContent = `<div style="font-size: 2.8rem;">${card.icon}</div><div class="card-label">${card.name}</div>`;
    }

    cardEl.innerHTML = `
      <div class="card-face card-back"></div>
      <div class="card-face card-front">${frontContent}</div>
    `;

    cardEl.addEventListener('click', () => handleCardClick(cardEl, card));
    grid.appendChild(cardEl);
  });
}

function handleCardClick(cardEl, cardData) {
  if (
    cardEl.classList.contains('flipped') ||
    cardEl.classList.contains('matched') ||
    gameState.memoryFlippedCards.length >= 2
  ) {
    return;
  }

  window.dreamAudio.playPop();
  cardEl.classList.add('flipped');
  gameState.memoryFlippedCards.push({ element: cardEl, data: cardData });

  if (gameState.memoryFlippedCards.length === 2) {
    gameState.memoryMoves++;
    const movesEl = document.getElementById('memory-moves');
    if (movesEl) movesEl.textContent = gameState.memoryMoves;

    checkMemoryMatch();
  }
}

function checkMemoryMatch() {
  const [first, second] = gameState.memoryFlippedCards;

  if (first.data.id === second.data.id) {
    // Matched!
    setTimeout(() => {
      window.dreamAudio.playSparkle();
      first.element.classList.add('matched');
      second.element.classList.add('matched');
      gameState.memoryMatchedPairs++;

      const matchesEl = document.getElementById('memory-matches');
      if (matchesEl) matchesEl.textContent = `${gameState.memoryMatchedPairs} / 10`;

      gameState.kittyHappiness = Math.min(100, gameState.kittyHappiness + 10);
      updateHappinessUI();

      updateCompanionUI(`Matched: ${first.data.name}! "${first.data.quote}"`, 'cuddle');

      createHeartBurst(window.innerWidth / 2, window.innerHeight / 2 - 50, 8);

      gameState.memoryFlippedCards = [];

      // Check win condition (10 pairs = 20 cards)
      if (gameState.memoryMatchedPairs === 10) {
        setTimeout(finishMemoryGame, 600);
      }
    }, 400);
  } else {
    // No match, flip back
    setTimeout(() => {
      first.element.classList.remove('flipped');
      second.element.classList.remove('flipped');
      gameState.memoryFlippedCards = [];
    }, 850);
  }
}

function finishMemoryGame() {
  window.dreamAudio.playVictory();
  createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 24);
  showToast("🌟 Memory match complete! All 10 cozy constellations aligned!");

  const grid = document.getElementById('memory-grid');
  if (grid) {
    const banner = document.createElement('div');
    banner.style.gridColumn = '1 / -1';
    banner.style.textAlign = 'center';
    banner.style.padding = '1.8rem';
    banner.style.background = 'rgba(255, 255, 255, 0.15)';
    banner.style.borderRadius = '20px';
    banner.innerHTML = `
      <h3 style="font-family: var(--font-fun); font-size: 1.8rem; color: #ffd6e0; margin-bottom: 0.6rem;">
        You Did It So Fast! 🎉
      </h3>
      <p style="color: #fff; margin-bottom: 1.2rem; font-size: 1.05rem;">
        Completed all 20 cards in only ${gameState.memoryMoves} moves! Princess Mochi is doing backflips of joy!
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="icon-btn" onclick="initMemoryGame()">🔄 Play Again</button>
        <button class="action-btn" onclick="switchTab('arcade')">Play Catch The Dreams 🌟</button>
      </div>
    `;
    grid.innerHTML = '';
    grid.appendChild(banner);
  }
}

/* ========================================================
   CHARACTER COMPANION SYSTEM
   ======================================================== */
function initCharacterSystem() {
  const grid = document.getElementById('character-selection-grid');
  if (!grid) return;
  grid.innerHTML = '';

  characterDefs.forEach(char => {
    const card = document.createElement('div');
    card.className = `character-card ${char.id === gameState.selectedCharacter ? 'active' : ''}`;
    card.dataset.id = char.id;
    card.innerHTML = `
      <div class="char-avatar-emoji">${char.emoji}</div>
      <div class="char-name">${char.name}</div>
      <div class="char-animal">${char.animal}</div>
      <div class="char-trait-pill">✨ ${char.trait}</div>
      <div style="font-size: 0.8rem; color: #ffd6e0; font-style: italic; margin-top: 0.2rem;">"${char.speech}"</div>
    `;
    card.addEventListener('click', () => {
      selectCharacter(char.id);
      closeCharacterModal();
    });
    grid.appendChild(card);
  });

  const savedChar = localStorage.getItem('her_selected_char');
  if (savedChar && characterDefs.some(c => c.id === savedChar)) {
    selectCharacter(savedChar, false);
  } else {
    selectCharacter('cat', false);
  }
}

function selectCharacter(charId, playSound = true) {
  const char = characterDefs.find(c => c.id === charId) || characterDefs[0];
  gameState.selectedCharacter = char.id;
  gameState.kittyName = char.name;
  localStorage.setItem('her_selected_char', char.id);

  if (playSound && char.sound) {
    char.sound();
  }

  // Update companion pill in header
  const charPill = document.getElementById('current-char-pill');
  if (charPill) charPill.textContent = `${char.name} ${char.emoji}`;

  // Update companion name display
  const nameDisp = document.getElementById('cat-name-display');
  if (nameDisp) nameDisp.textContent = char.name;

  // Update runner driver icon
  const driverBadge = document.getElementById('runner-overlay-driver');
  if (driverBadge) driverBadge.textContent = char.emoji;

  updateCompanionUI(char.speech, 'hero');

  document.querySelectorAll('.character-card').forEach(c => {
    if (c.dataset.id === char.id) c.classList.add('active');
    else c.classList.remove('active');
  });

  showToast(`🐾 Driver selected: <strong>${char.name}</strong> ${char.emoji}!`);
}

function openCharacterModal() {
  window.dreamAudio.playPop();
  const modal = document.getElementById('character-modal');
  if (modal) modal.style.display = 'flex';
}

function closeCharacterModal() {
  const modal = document.getElementById('character-modal');
  if (modal) modal.style.display = 'none';
}

/* ========================================================
   UNIVERSAL DEFEAT SYSTEM (" YEAH, WHAAATEVER")
   ======================================================== */
let currentFailedLevel = 'runner';

function triggerDefeat(level = 'runner', reason = '') {
  currentFailedLevel = level;
  window.dreamAudio.playLose();

  const modal = document.getElementById('defeat-modal');
  const speech = document.getElementById('defeat-speech-bubble');
  const msg = document.getElementById('defeat-msg');
  const sticker = document.getElementById('defeat-sticker');

  if (level === 'runner') {
    speech.textContent = `"Buddu was just sightseeing the galaxy flowers!"`;
    msg.innerHTML = `Buddu's dream car didn't lose—it just paused for emergency cuddling! The 3-minute clock ticked down, but she is still our champion. Ready to rev up and <strong>Parigettu</strong> again? 💕`;
    sticker.textContent = '🚗💅🙄';
  } else if (level === 'arcade') {
    speech.textContent = `"Those storm clouds totally cheated! Test invalid!"`;
    msg.innerHTML = `Losing all 3 lives was simply a tactical recalculation! The stars belong to Buddu! Ready to show them who is the true star glider? ✨`;
    sticker.textContent = '⚡😤💅';
  } else {
    speech.textContent = `"I wasn't trying anyway! Warm-up rehearsal only!"`;
    msg.innerHTML = `Buddu never actually loses! The universe is simply recalibrating for her royal greatness! 💕`;
    sticker.textContent = '👑🙄💅';
  }

  if (modal) modal.style.display = 'flex';
}

function closeDefeatModal() {
  const modal = document.getElementById('defeat-modal');
  if (modal) modal.style.display = 'none';
}

/* ========================================================
   LEVEL 1: PARIGETTU BUDDU (CAR RUNNER GAME)
   ======================================================== */
let runnerCanvas, runnerCtx, runnerAnimationId;
let runnerCar = {
  x: 200,
  y: 350,
  width: 52,
  height: 92,
  vx: 0,
  speed: 70, // km/h
  invulnerableTimer: 0,
  steerLeft: false,
  steerRight: false
};
let runnerCollectibles = []; // Hearts
let runnerObstacles = [];    // Boulders, Puddles, Nightmare Spikes
let runnerRoadsideStars = [];
let runnerParticles = [];
let runnerFloatingTexts = [];
let runnerLastTimestamp = 0;
let runnerScreenShake = 0;
let runnerLastSpawnHeart = 0;
let runnerLastSpawnObstacle = 0;

function drawSafeRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    try {
      ctx.roundRect(x, y, w, h, r);
      return;
    } catch (e) {}
  }
  const rad = typeof r === 'number' ? r : (Array.isArray(r) ? r[0] : 10);
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
  ctx.closePath();
}

function renderRunnerPreview() {
  if (!runnerCanvas || !runnerCtx) return;
  const roadWidth = Math.min(runnerCanvas.width - 40, 440);
  const roadLeft = (runnerCanvas.width - roadWidth) / 2;
  const roadRight = roadLeft + roadWidth;
  const laneWidth = roadWidth / 3;

  runnerCtx.clearRect(0, 0, runnerCanvas.width, runnerCanvas.height);

  // Background
  const bgGrad = runnerCtx.createLinearGradient(0, 0, 0, runnerCanvas.height);
  bgGrad.addColorStop(0, '#10021c');
  bgGrad.addColorStop(1, '#2c0638');
  runnerCtx.fillStyle = bgGrad;
  runnerCtx.fillRect(0, 0, runnerCanvas.width, runnerCanvas.height);

  // Road surface
  runnerCtx.fillStyle = '#170324';
  runnerCtx.shadowBlur = 20;
  runnerCtx.shadowColor = '#ff608f';
  runnerCtx.fillRect(roadLeft, 0, roadWidth, runnerCanvas.height);
  runnerCtx.shadowBlur = 0;

  // Road neon borders
  runnerCtx.strokeStyle = '#ff608f';
  runnerCtx.lineWidth = 4;
  runnerCtx.beginPath();
  runnerCtx.moveTo(roadLeft, 0);
  runnerCtx.lineTo(roadLeft, runnerCanvas.height);
  runnerCtx.moveTo(roadRight, 0);
  runnerCtx.lineTo(roadRight, runnerCanvas.height);
  runnerCtx.stroke();

  // Lane dividers
  runnerCtx.strokeStyle = 'rgba(255, 215, 235, 0.45)';
  runnerCtx.lineWidth = 3;
  runnerCtx.setLineDash([25, 25]);
  for (let l = 1; l < 3; l++) {
    const lx = roadLeft + laneWidth * l;
    runnerCtx.beginPath();
    runnerCtx.moveTo(lx, 0);
    runnerCtx.lineTo(lx, runnerCanvas.height);
    runnerCtx.stroke();
  }
  runnerCtx.setLineDash([]);

  // Draw player car waiting at start line
  const currentChar = characterDefs.find(c => c.id === gameState.selectedCharacter) || characterDefs[0];
  const cx = runnerCar.x;
  const cy = runnerCar.y;
  const cw = runnerCar.width;
  const ch = runnerCar.height;

  // Headlight beams
  [cx + 12, cx + cw - 12].forEach(hx => {
    const beamGrad = runnerCtx.createRadialGradient(hx, cy + 10, 5, hx, cy - 130, 90);
    beamGrad.addColorStop(0, 'rgba(255, 235, 180, 0.4)');
    beamGrad.addColorStop(1, 'rgba(255, 235, 180, 0)');
    runnerCtx.fillStyle = beamGrad;
    runnerCtx.beginPath();
    runnerCtx.moveTo(hx, cy + 10);
    runnerCtx.lineTo(hx - 30, cy - 140);
    runnerCtx.lineTo(hx + 30, cy - 140);
    runnerCtx.closePath();
    runnerCtx.fill();
  });

  // Car Shadow
  runnerCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  runnerCtx.beginPath();
  runnerCtx.ellipse(cx + cw / 2, cy + ch - 5, cw * 0.65, 14, 0, 0, Math.PI * 2);
  runnerCtx.fill();

  // Wheels
  runnerCtx.fillStyle = '#1e1b2e';
  runnerCtx.fillRect(cx - 4, cy + 16, 6, 18);
  runnerCtx.fillRect(cx + cw - 2, cy + 16, 6, 18);
  runnerCtx.fillRect(cx - 4, cy + ch - 30, 6, 18);
  runnerCtx.fillRect(cx + cw - 2, cy + ch - 30, 6, 18);

  // Body
  runnerCtx.fillStyle = currentChar.carColor;
  runnerCtx.shadowBlur = 15;
  runnerCtx.shadowColor = currentChar.carColor;
  drawSafeRoundRect(runnerCtx, cx, cy, cw, ch, [20, 20, 14, 14]);
  runnerCtx.fill();
  runnerCtx.shadowBlur = 0;

  // Cockpit
  runnerCtx.fillStyle = '#0a0212';
  drawSafeRoundRect(runnerCtx, cx + 6, cy + 22, cw - 12, ch - 42, 10);
  runnerCtx.fill();

  // Driver
  runnerCtx.font = '26px sans-serif';
  runnerCtx.textAlign = 'center';
  runnerCtx.textBaseline = 'middle';
  runnerCtx.fillText(currentChar.emoji, cx + cw / 2, cy + 42);
}

function initRunnerGame() {
  runnerCanvas = document.getElementById('runner-canvas');
  if (!runnerCanvas) return;
  runnerCtx = runnerCanvas.getContext('2d');

  function resizeRunner() {
    const rect = runnerCanvas.getBoundingClientRect();
    runnerCanvas.width = rect.width || 700;
    runnerCanvas.height = 460;
    runnerCar.x = runnerCanvas.width / 2 - runnerCar.width / 2;
    runnerCar.y = runnerCanvas.height - 120;
    if (!gameState.runnerRunning) renderRunnerPreview();
  }
  resizeRunner();
  window.addEventListener('resize', resizeRunner);

  // Steer controls: keyboard
  window.addEventListener('keydown', (e) => {
    if (gameState.activeTab !== 'runner') return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      runnerCar.steerLeft = true;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      runnerCar.steerRight = true;
    }
    if (e.key === ' ' || e.key === 'h' || e.key === 'H') {
      window.dreamAudio.playHonk();
      createHeartBurst(runnerCar.x + runnerCar.width / 2, runnerCar.y, 4);
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      runnerCar.steerLeft = false;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      runnerCar.steerRight = false;
    }
  });

  // Touch and Mouse dragging on canvas
  let isDragging = false;
  const handlePointer = (clientX) => {
    if (!gameState.runnerRunning) return;
    const rect = runnerCanvas.getBoundingClientRect();
    const roadWidth = Math.min(runnerCanvas.width - 40, 440);
    const roadLeft = (runnerCanvas.width - roadWidth) / 2;
    const roadRight = roadLeft + roadWidth;
    const targetX = clientX - rect.left - runnerCar.width / 2;
    runnerCar.x = Math.max(roadLeft + 10, Math.min(roadRight - runnerCar.width - 10, targetX));
  };

  runnerCanvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    handlePointer(e.clientX);
  });
  window.addEventListener('mousemove', (e) => {
    if (isDragging) handlePointer(e.clientX);
  });
  window.addEventListener('mouseup', () => { isDragging = false; });

  runnerCanvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      handlePointer(e.touches[0].clientX);
      e.preventDefault();
    }
  }, { passive: false });

  // Onscreen steer buttons
  const leftBtn = document.getElementById('steer-left-btn');
  const rightBtn = document.getElementById('steer-right-btn');
  const honkBtn = document.getElementById('steer-honk-btn');

  if (leftBtn) {
    leftBtn.addEventListener('mousedown', () => { runnerCar.steerLeft = true; });
    leftBtn.addEventListener('mouseup', () => { runnerCar.steerLeft = false; });
    leftBtn.addEventListener('touchstart', (e) => { runnerCar.steerLeft = true; e.preventDefault(); }, { passive: false });
    leftBtn.addEventListener('touchend', () => { runnerCar.steerLeft = false; });
  }

  if (rightBtn) {
    rightBtn.addEventListener('mousedown', () => { runnerCar.steerRight = true; });
    rightBtn.addEventListener('mouseup', () => { runnerCar.steerRight = false; });
    rightBtn.addEventListener('touchstart', (e) => { runnerCar.steerRight = true; e.preventDefault(); }, { passive: false });
    rightBtn.addEventListener('touchend', () => { runnerCar.steerRight = false; });
  }

  if (honkBtn) {
    honkBtn.addEventListener('click', () => {
      window.dreamAudio.playHonk();
      createHeartBurst(runnerCar.x + runnerCar.width / 2, runnerCar.y, 6);
    });
  }

  const startBtn = document.getElementById('runner-start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', startRunnerGame);
  }

  // Pre-generate road decor stars
  for (let i = 0; i < 40; i++) {
    runnerRoadsideStars.push({
      x: Math.random() * 800,
      y: Math.random() * 500,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 3
    });
  }
}

function startRunnerGame() {
  const overlay = document.getElementById('runner-overlay');
  if (overlay) overlay.classList.add('hidden');

  gameState.runnerRunning = true;
  gameState.runnerTimer = 90; // 1 min 30s (90 seconds) time limit!
  gameState.runnerDistance = 0;
  gameState.runnerHeartsCollected = 0;
  gameState.runnerSpeed = 70;

  runnerCar.x = runnerCanvas.width / 2 - runnerCar.width / 2;
  runnerCar.y = runnerCanvas.height - 120;
  runnerCar.vx = 0;
  runnerCar.invulnerableTimer = 0;
  runnerCollectibles = [];
  runnerObstacles = [];
  runnerParticles = [];
  runnerFloatingTexts = [];
  runnerLastTimestamp = performance.now();
  runnerLastSpawnHeart = performance.now();
  runnerLastSpawnObstacle = performance.now();

  window.dreamAudio.playHonk();
  updateRunnerHud();
  updateCompanionUI("Engine started! Hold tight Buddu, Parigettu! Dodge obstacles and collect hearts!", 'hero');

  if (runnerAnimationId) cancelAnimationFrame(runnerAnimationId);
  runnerAnimationId = requestAnimationFrame(runRunnerLoop);
}

function pauseRunnerGame() {
  gameState.runnerRunning = false;
  if (runnerAnimationId) {
    cancelAnimationFrame(runnerAnimationId);
    runnerAnimationId = null;
  }
}

function updateRunnerHud() {
  const mins = Math.floor(Math.max(0, gameState.runnerTimer) / 60);
  const secs = Math.floor(Math.max(0, gameState.runnerTimer) % 60);
  const timerStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  const timerVal = document.getElementById('runner-timer-val');
  if (timerVal) timerVal.textContent = timerStr;

  const timerBox = document.getElementById('runner-timer-box');
  if (timerBox) {
    if (gameState.runnerTimer <= 30 && gameState.runnerRunning) {
      timerBox.classList.add('hurry');
    } else {
      timerBox.classList.remove('hurry');
    }
  }

  const heartsVal = document.getElementById('runner-hearts-val');
  if (heartsVal) heartsVal.textContent = `${gameState.runnerHeartsCollected} (+${gameState.runnerHeartsCollected * 10}s)`;

  const distPercent = Math.min(100, Math.floor((gameState.runnerDistance / 1000) * 100));
  const distVal = document.getElementById('runner-distance-val');
  if (distVal) distVal.textContent = `${Math.min(1000, Math.floor(gameState.runnerDistance))}m / 1000m (${distPercent}%)`;

  const fill = document.getElementById('road-progress-fill');
  if (fill) fill.style.width = `${distPercent}%`;

  const carMarker = document.getElementById('road-progress-car');
  if (carMarker) carMarker.style.left = `${distPercent}%`;

  const speedVal = document.getElementById('runner-speed-val');
  if (speedVal) speedVal.textContent = `${Math.round(gameState.runnerSpeed)} km/h`;
}

function runRunnerLoop(timestamp = 0) {
  if (!gameState.runnerRunning) return;

  const dt = Math.min(0.08, (timestamp - runnerLastTimestamp) / 1000) || 0.016;
  runnerLastTimestamp = timestamp;

  // 1. Countdown timer (1 min 30s = 90s)
  gameState.runnerTimer -= dt;
  if (gameState.runnerTimer <= 0) {
    gameState.runnerTimer = 0;
    updateRunnerHud();
    pauseRunnerGame();
    triggerDefeat('runner', 'Time ran out!');
    return;
  }

  // 2. Distance progress
  gameState.runnerDistance += (gameState.runnerSpeed * dt * 0.28);
  updateRunnerHud();

  // Check Finish Line Win
  if (gameState.runnerDistance >= 1000) {
    finishRunnerGame();
    return;
  }

  // Road geometry
  const roadWidth = Math.min(runnerCanvas.width - 40, 440);
  const roadLeft = (runnerCanvas.width - roadWidth) / 2;
  const roadRight = roadLeft + roadWidth;
  const laneWidth = roadWidth / 3;

  // 3. Steer physics
  if (runnerCar.steerLeft) {
    runnerCar.vx = -7.2;
  } else if (runnerCar.steerRight) {
    runnerCar.vx = 7.2;
  } else {
    runnerCar.vx *= 0.72;
  }
  runnerCar.x += runnerCar.vx;
  runnerCar.x = Math.max(roadLeft + 12, Math.min(roadRight - runnerCar.width - 12, runnerCar.x));

  if (runnerCar.invulnerableTimer > 0) {
    runnerCar.invulnerableTimer -= dt;
  }

  // 4. Spawn Hearts (Collectibles: +10 seconds lifeline!)
  if (timestamp - runnerLastSpawnHeart > 1350) {
    runnerLastSpawnHeart = timestamp;
    const laneIndex = Math.floor(Math.random() * 3);
    const laneCenter = roadLeft + laneWidth * (laneIndex + 0.5);
    const isGold = Math.random() < 0.25;
    runnerCollectibles.push({
      x: laneCenter,
      y: -40,
      char: isGold ? '💛' : '💖',
      isGold: isGold,
      size: 32,
      speed: 4.8
    });
  }

  // 5. Spawn Obstacles (Dodgeable in remaining lanes!)
  if (timestamp - runnerLastSpawnObstacle > 1750) {
    runnerLastSpawnObstacle = timestamp;
    const obstacleLanes = [Math.floor(Math.random() * 3)];
    if (Math.random() < 0.35) {
      let second = Math.floor(Math.random() * 3);
      if (second !== obstacleLanes[0]) obstacleLanes.push(second);
    }
    const obsTypes = [
      { char: '🪨', name: 'Sleepy Boulder', color: '#a78bfa' },
      { char: '⛈️', name: 'Storm Puddle', color: '#38bdf8' },
      { char: '💥', name: 'Nightmare Spike', color: '#f43f5e' },
      { char: '🚧', name: 'Road Cone', color: '#fb923c' }
    ];
    obstacleLanes.forEach(laneIdx => {
      const type = obsTypes[Math.floor(Math.random() * obsTypes.length)];
      runnerObstacles.push({
        x: roadLeft + laneWidth * (laneIdx + 0.5),
        y: -45,
        char: type.char,
        name: type.name,
        color: type.color,
        size: 34,
        speed: 4.5
      });
    });
  }

  // 6. DRAWING CANVAS
  runnerCtx.clearRect(0, 0, runnerCanvas.width, runnerCanvas.height);
  runnerCtx.save();

  // Screen shake
  if (runnerScreenShake > 0) {
    const sx = (Math.random() - 0.5) * runnerScreenShake;
    const sy = (Math.random() - 0.5) * runnerScreenShake;
    runnerCtx.translate(sx, sy);
    runnerScreenShake *= 0.86;
    if (runnerScreenShake < 0.4) runnerScreenShake = 0;
  }

  // Cosmic roadside background
  const bgGrad = runnerCtx.createLinearGradient(0, 0, 0, runnerCanvas.height);
  bgGrad.addColorStop(0, '#10021c');
  bgGrad.addColorStop(1, '#2c0638');
  runnerCtx.fillStyle = bgGrad;
  runnerCtx.fillRect(0, 0, runnerCanvas.width, runnerCanvas.height);

  // Roadside scrolling stars & cherry blossoms
  runnerRoadsideStars.forEach(star => {
    star.y += star.speed;
    if (star.y > runnerCanvas.height) {
      star.y = -10;
      star.x = Math.random() * runnerCanvas.width;
    }
    runnerCtx.fillStyle = '#ffd6e0';
    runnerCtx.shadowBlur = 6;
    runnerCtx.shadowColor = '#ff608f';
    runnerCtx.beginPath();
    runnerCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    runnerCtx.fill();
    runnerCtx.shadowBlur = 0;
  });

  // Road surface
  runnerCtx.fillStyle = '#170324';
  runnerCtx.shadowBlur = 20;
  runnerCtx.shadowColor = '#ff608f';
  runnerCtx.fillRect(roadLeft, 0, roadWidth, runnerCanvas.height);
  runnerCtx.shadowBlur = 0;

  // Road neon borders
  runnerCtx.strokeStyle = '#ff608f';
  runnerCtx.lineWidth = 4;
  runnerCtx.beginPath();
  runnerCtx.moveTo(roadLeft, 0);
  runnerCtx.lineTo(roadLeft, runnerCanvas.height);
  runnerCtx.moveTo(roadRight, 0);
  runnerCtx.lineTo(roadRight, runnerCanvas.height);
  runnerCtx.stroke();

  // Lane dividers (animated dashed lines scrolling down)
  const dashOffset = (timestamp * 0.45) % 50;
  runnerCtx.strokeStyle = 'rgba(255, 215, 235, 0.45)';
  runnerCtx.lineWidth = 3;
  runnerCtx.setLineDash([25, 25]);
  runnerCtx.lineDashOffset = -dashOffset;

  for (let l = 1; l < 3; l++) {
    const lx = roadLeft + laneWidth * l;
    runnerCtx.beginPath();
    runnerCtx.moveTo(lx, 0);
    runnerCtx.lineTo(lx, runnerCanvas.height);
    runnerCtx.stroke();
  }
  runnerCtx.setLineDash([]);

  // Checkered Finish Line Banner
  if (gameState.runnerDistance >= 940) {
    const bannerY = Math.min(runnerCanvas.height - 180, (gameState.runnerDistance - 940) * 8);
    const sqSize = 14;
    for (let bx = roadLeft; bx < roadRight; bx += sqSize) {
      for (let by = bannerY; by < bannerY + 28; by += sqSize) {
        const isWhite = (Math.floor((bx - roadLeft) / sqSize) + Math.floor((by - bannerY) / sqSize)) % 2 === 0;
        runnerCtx.fillStyle = isWhite ? '#ffffff' : '#000000';
        runnerCtx.fillRect(bx, by, sqSize, sqSize);
      }
    }
    runnerCtx.fillStyle = '#ffd166';
    runnerCtx.font = 'bold 16px var(--font-fun)';
    runnerCtx.textAlign = 'center';
    runnerCtx.fillText('🏁 FINISH LINE 🏁', runnerCanvas.width / 2, bannerY - 8);
  }

  // 7. Update & Draw Collectibles (Hearts: +10s lifeline!)
  for (let i = runnerCollectibles.length - 1; i >= 0; i--) {
    const heart = runnerCollectibles[i];
    heart.y += heart.speed;

    const scale = 1 + Math.sin(timestamp * 0.008 + i) * 0.15;
    runnerCtx.save();
    runnerCtx.font = `${heart.size * scale}px sans-serif`;
    runnerCtx.textAlign = 'center';
    runnerCtx.textBaseline = 'middle';
    runnerCtx.shadowBlur = 15;
    runnerCtx.shadowColor = heart.isGold ? '#ffd166' : '#ff3366';
    runnerCtx.fillText(heart.char, heart.x, heart.y);
    runnerCtx.restore();

    // Collision with Player's Car
    const dist = Math.hypot(heart.x - (runnerCar.x + runnerCar.width / 2), heart.y - (runnerCar.y + runnerCar.height / 2));
    if (dist < 42) {
      gameState.runnerHeartsCollected++;
      gameState.runnerTimer += 10; // +10s LIFELINE!
      window.dreamAudio.playSparkle();
      createHeartBurst(heart.x, heart.y, 8);

      runnerFloatingTexts.push({
        text: '+10s Lifeline! 💖',
        x: runnerCar.x + runnerCar.width / 2,
        y: runnerCar.y - 15,
        alpha: 1,
        color: '#ff3366'
      });

      runnerCollectibles.splice(i, 1);
      updateRunnerHud();
      continue;
    }

    if (heart.y > runnerCanvas.height + 40) {
      runnerCollectibles.splice(i, 1);
    }
  }

  // 8. Update & Draw Obstacles
  for (let i = runnerObstacles.length - 1; i >= 0; i--) {
    const obs = runnerObstacles[i];
    obs.y += obs.speed;

    runnerCtx.save();
    runnerCtx.font = `${obs.size}px sans-serif`;
    runnerCtx.textAlign = 'center';
    runnerCtx.textBaseline = 'middle';
    runnerCtx.shadowBlur = 12;
    runnerCtx.shadowColor = obs.color;
    runnerCtx.fillText(obs.char, obs.x, obs.y);
    runnerCtx.restore();

    // Collision detection with Car
    const dist = Math.hypot(obs.x - (runnerCar.x + runnerCar.width / 2), obs.y - (runnerCar.y + runnerCar.height / 2));
    if (dist < 38) {
      if (runnerCar.invulnerableTimer <= 0) {
        runnerCar.invulnerableTimer = 1.3;
        runnerScreenShake = 16;
        window.dreamAudio.playBump();

        gameState.runnerTimer = Math.max(0, gameState.runnerTimer - 10);
        runnerFloatingTexts.push({
          text: '-10s! 💥',
          x: runnerCar.x + runnerCar.width / 2,
          y: runnerCar.y - 15,
          alpha: 1,
          color: '#ff003c'
        });

        updateRunnerHud();

        if (gameState.runnerTimer <= 0) {
          pauseRunnerGame();
          triggerDefeat('runner', 'Time ran out from obstacle collision!');
          return;
        }
      }
      runnerObstacles.splice(i, 1);
      continue;
    }

    if (obs.y > runnerCanvas.height + 40) {
      runnerObstacles.splice(i, 1);
    }
  }

  // 9. Draw Car Particle Exhaust (Hearts trailing behind)
  if (Math.random() < 0.4) {
    runnerParticles.push({
      x: runnerCar.x + runnerCar.width / 2 + (Math.random() - 0.5) * 16,
      y: runnerCar.y + runnerCar.height - 4,
      char: '💕',
      size: Math.random() * 8 + 10,
      alpha: 1,
      vy: Math.random() * 2 + 3
    });
  }

  for (let p = runnerParticles.length - 1; p >= 0; p--) {
    const part = runnerParticles[p];
    part.y += part.vy;
    part.alpha -= 0.035;
    if (part.alpha <= 0) {
      runnerParticles.splice(p, 1);
      continue;
    }
    runnerCtx.save();
    runnerCtx.globalAlpha = part.alpha;
    runnerCtx.font = `${part.size}px sans-serif`;
    runnerCtx.fillText(part.char, part.x, part.y);
    runnerCtx.restore();
  }

  // 10. DRAW THE PLAYER'S CAR
  runnerCtx.save();
  const currentChar = characterDefs.find(c => c.id === gameState.selectedCharacter) || characterDefs[0];

  if (runnerCar.invulnerableTimer > 0) {
    if (Math.floor(timestamp / 70) % 2 === 0) {
      runnerCtx.globalAlpha = 0.4;
    }
  }

  const cx = runnerCar.x;
  const cy = runnerCar.y;
  const cw = runnerCar.width;
  const ch = runnerCar.height;

  // Headlight beams
  const leftHeadlightX = cx + 12;
  const rightHeadlightX = cx + cw - 12;
  const beamY = cy + 10;

  [leftHeadlightX, rightHeadlightX].forEach(hx => {
    const beamGrad = runnerCtx.createRadialGradient(hx, beamY, 5, hx, beamY - 140, 90);
    beamGrad.addColorStop(0, 'rgba(255, 235, 180, 0.45)');
    beamGrad.addColorStop(1, 'rgba(255, 235, 180, 0)');
    runnerCtx.fillStyle = beamGrad;
    runnerCtx.beginPath();
    runnerCtx.moveTo(hx, beamY);
    runnerCtx.lineTo(hx - 35, beamY - 150);
    runnerCtx.lineTo(hx + 35, beamY - 150);
    runnerCtx.closePath();
    runnerCtx.fill();
  });

  // Car Shadow
  runnerCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  runnerCtx.beginPath();
  runnerCtx.ellipse(cx + cw / 2, cy + ch - 5, cw * 0.65, 14, 0, 0, Math.PI * 2);
  runnerCtx.fill();

  // Wheels
  runnerCtx.fillStyle = '#1e1b2e';
  runnerCtx.fillRect(cx - 4, cy + 16, 6, 18);
  runnerCtx.fillRect(cx + cw - 2, cy + 16, 6, 18);
  runnerCtx.fillRect(cx - 4, cy + ch - 30, 6, 18);
  runnerCtx.fillRect(cx + cw - 2, cy + ch - 30, 6, 18);

  // Car Body
  runnerCtx.fillStyle = currentChar.carColor;
  runnerCtx.shadowBlur = 15;
  runnerCtx.shadowColor = currentChar.carColor;
  drawSafeRoundRect(runnerCtx, cx, cy, cw, ch, [20, 20, 14, 14]);
  runnerCtx.fill();
  runnerCtx.shadowBlur = 0;

  // Chrome side stripe
  runnerCtx.strokeStyle = '#ffffff';
  runnerCtx.lineWidth = 2;
  runnerCtx.beginPath();
  runnerCtx.moveTo(cx + 4, cy + 18);
  runnerCtx.lineTo(cx + 4, cy + ch - 18);
  runnerCtx.moveTo(cx + cw - 4, cy + 18);
  runnerCtx.lineTo(cx + cw - 4, cy + ch - 18);
  runnerCtx.stroke();

  // Cockpit
  runnerCtx.fillStyle = '#0a0212';
  drawSafeRoundRect(runnerCtx, cx + 6, cy + 22, cw - 12, ch - 42, 10);
  runnerCtx.fill();

  // Driver Companion seated inside
  runnerCtx.font = '26px sans-serif';
  runnerCtx.textAlign = 'center';
  runnerCtx.textBaseline = 'middle';
  const headBob = Math.sin(timestamp * 0.015) * 2;
  runnerCtx.fillText(currentChar.emoji, cx + cw / 2, cy + 42 + headBob);

  // Mini steering wheel
  runnerCtx.strokeStyle = '#ffd6e0';
  runnerCtx.lineWidth = 2.5;
  runnerCtx.beginPath();
  runnerCtx.arc(cx + cw / 2, cy + 30, 8, 0, Math.PI * 2);
  runnerCtx.stroke();

  runnerCtx.restore();

  // 11. Draw Floating Feedback Texts
  for (let f = runnerFloatingTexts.length - 1; f >= 0; f--) {
    const ft = runnerFloatingTexts[f];
    ft.y -= 1.2;
    ft.alpha -= 0.025;
    if (ft.alpha <= 0) {
      runnerFloatingTexts.splice(f, 1);
      continue;
    }
    runnerCtx.save();
    runnerCtx.globalAlpha = ft.alpha;
    runnerCtx.font = 'bold 18px var(--font-fun)';
    runnerCtx.textAlign = 'center';
    runnerCtx.fillStyle = ft.color;
    runnerCtx.shadowBlur = 8;
    runnerCtx.shadowColor = ft.color;
    runnerCtx.fillText(ft.text, ft.x, ft.y);
    runnerCtx.restore();
  }

  runnerCtx.restore();

  runnerAnimationId = requestAnimationFrame(runRunnerLoop);
}

function finishRunnerGame() {
  pauseRunnerGame();
  window.dreamAudio.playVictory();
  createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 28);

  const overlay = document.getElementById('runner-overlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    overlay.innerHTML = `
      <div style="font-size: 3.5rem; margin-bottom: 0.5rem; animation: heartPulse 1.2s infinite;">🏁🏆🚗💨</div>
      <h3 style="font-family: var(--font-fun); font-size: 2.2rem; color: #ffd6e0; margin-bottom: 0.6rem;">
        PARIGETTU BUDDU CLEARED! 🎉
      </h3>
      <p style="color: #fff; max-width: 480px; margin-bottom: 1.4rem; font-size: 1.1rem; line-height: 1.6;">
        Buddu crossed the 1000m finish line like a champion! You collected <strong>${gameState.runnerHeartsCollected} hearts</strong> and had <strong>${Math.floor(gameState.runnerTimer)} seconds</strong> remaining on the clock!
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="icon-btn" onclick="startRunnerGame()">🔄 Race Again</button>
        <button class="action-btn" onclick="switchTab('memory')">Level 2: Starry Match 🧩</button>
      </div>
    `;
  }

  updateCompanionUI("BRAVOOO BUDDU!! You crossed the finish line in style! All bad dreams are left behind in the dust!", 'magic');
  showToast("🏁 Level 1 Complete! Starry Match unlocked!");
}

/* ========================================================
   LEVEL 3: CATCH THE SWEET DREAMS ARCADE GAME (HARD MODE)
   ======================================================== */
let arcadeCanvas, arcadeCtx, arcadePlayer, arcadeItems = [], arcadeAnimationId;
let arcadeScreenShake = 0;
let arcadePlayerFlash = 0;

function initArcadeGame() {
  arcadeCanvas = document.getElementById('arcade-canvas');
  if (!arcadeCanvas) return;
  arcadeCtx = arcadeCanvas.getContext('2d');

  function setupSize() {
    const rect = arcadeCanvas.getBoundingClientRect();
    arcadeCanvas.width = rect.width || 700;
    arcadeCanvas.height = 440;
  }
  setupSize();
  window.addEventListener('resize', setupSize);

  arcadePlayer = {
    x: arcadeCanvas.width / 2,
    y: arcadeCanvas.height - 75,
    width: 70,
    height: 70
  };

  // Controls: Mouse & Touch
  arcadeCanvas.addEventListener('mousemove', (e) => {
    const rect = arcadeCanvas.getBoundingClientRect();
    arcadePlayer.x = e.clientX - rect.left - arcadePlayer.width / 2;
  });

  arcadeCanvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = arcadeCanvas.getBoundingClientRect();
      arcadePlayer.x = e.touches[0].clientX - rect.left - arcadePlayer.width / 2;
      e.preventDefault();
    }
  }, { passive: false });

  const startBtn = document.getElementById('arcade-start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', startArcadeGame);
  }
}

function startArcadeGame() {
  const overlay = document.getElementById('arcade-overlay');
  if (overlay) overlay.classList.add('hidden');

  gameState.arcadeRunning = true;
  gameState.arcadeScore = 0;
  gameState.arcadeLives = 3; // 3 Lives!
  arcadeItems = [];
  arcadeScreenShake = 0;
  arcadePlayerFlash = 0;

  updateArcadeHud();
  updateCompanionUI("Hold tight Buddu! 3 Lives, target 500 points! Dodge lightning and dark clouds!", 'hero');

  if (arcadeAnimationId) cancelAnimationFrame(arcadeAnimationId);
  arcadeAnimationId = requestAnimationFrame(runArcadeLoop);
}

function pauseArcadeGame() {
  gameState.arcadeRunning = false;
  if (arcadeAnimationId) {
    cancelAnimationFrame(arcadeAnimationId);
    arcadeAnimationId = null;
  }
}

function updateArcadeHud() {
  const scoreVal = document.getElementById('arcade-score-val');
  if (scoreVal) scoreVal.textContent = `${gameState.arcadeScore} / 500`;

  const livesDisplay = document.getElementById('arcade-lives-display');
  if (livesDisplay) {
    livesDisplay.textContent = '❤️'.repeat(Math.max(0, gameState.arcadeLives)) || '💔';
  }

  const speedDisplay = document.getElementById('arcade-speed-display');
  if (speedDisplay) {
    if (gameState.arcadeScore < 100) speedDisplay.textContent = 'Gentle Breeze 🌸';
    else if (gameState.arcadeScore < 250) speedDisplay.textContent = 'Sweet Whirlwind 🌟';
    else if (gameState.arcadeScore < 400) speedDisplay.textContent = 'Turbo Starstorm ⚡';
    else speedDisplay.textContent = 'Cosmic Hyperdrive 🚀';
  }
}

let lastArcadeSpawn = 0;
function runArcadeLoop(timestamp = 0) {
  if (!gameState.arcadeRunning) return;

  arcadeCtx.clearRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);
  arcadeCtx.save();

  // Screen shake
  if (arcadeScreenShake > 0) {
    const sx = (Math.random() - 0.5) * arcadeScreenShake;
    const sy = (Math.random() - 0.5) * arcadeScreenShake;
    arcadeCtx.translate(sx, sy);
    arcadeScreenShake *= 0.85;
    if (arcadeScreenShake < 0.4) arcadeScreenShake = 0;
  }

  // Keep player inside canvas
  if (arcadePlayer.x < 10) arcadePlayer.x = 10;
  if (arcadePlayer.x > arcadeCanvas.width - arcadePlayer.width - 10) {
    arcadePlayer.x = arcadeCanvas.width - arcadePlayer.width - 10;
  }

  // Draw Glowing Cloud and Character
  const currentChar = characterDefs.find(c => c.id === gameState.selectedCharacter) || characterDefs[0];
  const px = arcadePlayer.x + arcadePlayer.width / 2;
  const py = arcadePlayer.y + arcadePlayer.height / 2;

  arcadeCtx.save();
  arcadeCtx.fillStyle = arcadePlayerFlash > 0 ? '#ff3366' : 'rgba(255, 255, 255, 0.88)';
  if (arcadePlayerFlash > 0) arcadePlayerFlash--;
  arcadeCtx.shadowBlur = 18;
  arcadeCtx.shadowColor = currentChar.carColor;
  arcadeCtx.beginPath();
  arcadeCtx.ellipse(px, py + 16, arcadePlayer.width * 0.65, 16, 0, 0, Math.PI * 2);
  arcadeCtx.fill();

  // Character Emoji Pilot
  arcadeCtx.font = '36px sans-serif';
  arcadeCtx.textAlign = 'center';
  arcadeCtx.textBaseline = 'middle';
  arcadeCtx.fillText(currentChar.emoji, px, py - 4);
  arcadeCtx.restore();

  // Dynamic Speed and Spawn Rate Ramp-up (0 -> 500)
  const baseSpeed = 2.2 + (gameState.arcadeScore / 500) * 4.3;
  const spawnInterval = Math.max(280, 560 - (gameState.arcadeScore / 500) * 260);

  if (timestamp - lastArcadeSpawn > spawnInterval) {
    lastArcadeSpawn = timestamp;

    const isObstacle = Math.random() < 0.38;
    if (isObstacle) {
      const obstacleDefs = [
        { char: '⛈️', type: 'obstacle', color: '#38bdf8', isObstacle: true },
        { char: '⚡', type: 'obstacle', color: '#ffd166', isObstacle: true },
        { char: '💥', type: 'obstacle', color: '#ff0055', isObstacle: true },
        { char: '💀', type: 'obstacle', color: '#c084fc', isObstacle: true }
      ];
      const picked = obstacleDefs[Math.floor(Math.random() * obstacleDefs.length)];
      arcadeItems.push({
        x: Math.random() * (arcadeCanvas.width - 60) + 30,
        y: -35,
        size: 34,
        speed: baseSpeed * (Math.random() * 0.3 + 0.9),
        ...picked
      });
    } else {
      const goodDefs = [
        { char: '⭐', points: 10, color: '#ffd166', isObstacle: false },
        { char: '💖', points: 15, color: '#ff3366', isObstacle: false },
        { char: '🍓', points: 10, color: '#ff608f', isObstacle: false },
        { char: '🌟', points: 25, color: '#fef08a', isObstacle: false }
      ];
      const picked = goodDefs[Math.floor(Math.random() * goodDefs.length)];
      arcadeItems.push({
        x: Math.random() * (arcadeCanvas.width - 60) + 30,
        y: -35,
        size: 32,
        speed: baseSpeed * (Math.random() * 0.3 + 0.85),
        ...picked
      });
    }
  }

  // Update & Draw falling objects
  for (let i = arcadeItems.length - 1; i >= 0; i--) {
    const item = arcadeItems[i];
    item.y += item.speed;

    arcadeCtx.save();
    arcadeCtx.font = `${item.size}px sans-serif`;
    arcadeCtx.textAlign = 'center';
    arcadeCtx.textBaseline = 'middle';
    arcadeCtx.shadowBlur = item.isObstacle ? 15 : 10;
    arcadeCtx.shadowColor = item.color;
    arcadeCtx.fillText(item.char, item.x, item.y);
    arcadeCtx.restore();

    // Collision detection with player
    const dist = Math.hypot(item.x - px, item.y - py);
    if (dist < 44) {
      if (item.isObstacle) {
        // Hit Obstacle: DEDUCT ONE LIFE!
        gameState.arcadeLives--;
        arcadeScreenShake = 18;
        arcadePlayerFlash = 12;
        window.dreamAudio.playLifeLost();
        updateArcadeHud();
        arcadeItems.splice(i, 1);

        if (gameState.arcadeLives <= 0) {
          pauseArcadeGame();
          triggerDefeat('arcade', 'Lost all 3 lives!');
          arcadeCtx.restore();
          return;
        }
      } else {
        // Caught good item!
        gameState.arcadeScore += item.points;
        updateArcadeHud();
        if (item.points >= 20) {
          window.dreamAudio.playSparkle();
        } else {
          window.dreamAudio.playPop();
        }
        createHeartBurst(item.x, item.y, 4);
        arcadeItems.splice(i, 1);

        // Win check (500 points!)
        if (gameState.arcadeScore >= 500) {
          finishArcadeGame();
          arcadeCtx.restore();
          return;
        }
      }
      continue;
    }

    if (item.y > arcadeCanvas.height + 40) {
      arcadeItems.splice(i, 1);
    }
  }

  arcadeCtx.restore();
  arcadeAnimationId = requestAnimationFrame(runArcadeLoop);
}

function finishArcadeGame() {
  pauseArcadeGame();
  window.dreamAudio.playVictory();
  createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 30);

  const overlay = document.getElementById('arcade-overlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    overlay.innerHTML = `
      <div style="font-size: 3.5rem; margin-bottom: 0.5rem; animation: heartPulse 1.2s infinite;">🏰💖⭐✨</div>
      <h3 style="font-family: var(--font-fun); font-size: 2.2rem; color: #ffd6e0; margin-bottom: 0.6rem;">
        500 SWEET DREAMS CONQUERED! 🏆
      </h3>
      <p style="color: #fff; max-width: 480px; margin-bottom: 1.5rem; font-size: 1.1rem; line-height: 1.6;">
        Buddu survived the high-speed star storm with <strong>${gameState.arcadeLives} lives remaining</strong>! The Secret Letter is now fully unlocked!
      </p>
      <button class="action-btn" onclick="switchTab('vault')">
        Open Secret Letter 💌
      </button>
    `;
  }

  updateCompanionUI("WOHOOOO! 500 points achieved! Go read your secret love letter right now, Buddu!", 'magic');
  showToast("🌟 Level 3 Complete! Secret Letter unlocked!");
}


/* ========================================================
   SANCTUARY & AFFIRMATIONS
   ======================================================== */
function rotateAffirmation() {
  const box = document.getElementById('compliment-text');
  if (!box) return;

  window.dreamAudio.playSparkle();
  const randomText = sweetCompliments[Math.floor(Math.random() * sweetCompliments.length)];
  box.style.opacity = '0';
  setTimeout(() => {
    box.textContent = `"${randomText}"`;
    box.style.opacity = '1';
  }, 200);

  createHeartBurst(window.innerWidth / 2, window.innerHeight / 2 + 100, 5);
}

/* ========================================================
   VISUAL PARTICLES & TOAST NOTICES
   ======================================================== */
function createHeartBurst(x, y, count = 8) {
  const symbols = ['💖', '💕', '✨', '🌸', '🍓', '🐾'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'floating-heart';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${x + (Math.random() - 0.5) * 80}px`;
    el.style.top = `${y + (Math.random() - 0.5) * 40}px`;
    el.style.fontSize = `${Math.random() * 1.4 + 1.2}rem`;
    document.body.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1400);
  }
}

function spawnAmbientFloatingHeart() {
  const el = document.createElement('div');
  el.className = 'floating-heart';
  el.textContent = ['💖', '✨', '🌸', '💜', '🐾'][Math.floor(Math.random() * 5)];
  el.style.left = `${Math.random() * (window.innerWidth - 60) + 30}px`;
  el.style.top = `${window.innerHeight - 30}px`;
  el.style.fontSize = `${Math.random() * 1.2 + 0.9}rem`;
  el.style.opacity = '0.7';
  document.body.appendChild(el);

  setTimeout(() => {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, 1400);
}

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast-notice');
  if (!toast) return;

  toast.innerHTML = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

window.switchTab = switchTab;
window.initMemoryGame = initMemoryGame;
window.startRunnerGame = startRunnerGame;
window.startArcadeGame = startArcadeGame;
window.openCharacterModal = openCharacterModal;
window.closeCharacterModal = closeCharacterModal;
window.selectCharacter = selectCharacter;
window.triggerDefeat = triggerDefeat;
window.closeDefeatModal = closeDefeatModal;
