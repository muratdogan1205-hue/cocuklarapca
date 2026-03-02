// --- DURUM YÖNETİMİ ---
let currentStage = 1;
let currentStageWords = [];
let currentCategory = null;
let lastGameMode = null;
let unlockedStage = 1; // Açık olan en yüksek aşama

// --- KULLANICI VE DİL ---
// --- KULLANICI VE DİL ---
let selectedLanguage = 'arabic';
let activeWords = []; // Seçilen dilin kelimeleri

// --- ÖDÜL SİSTEMİ ---
let totalStars = 0;
let gameStars = 0;



// --- DİL SEÇİMİ ---
// --- DİL SEÇİMİ ---
const LANGUAGE_CONFIG = {
    arabic: {
        words: () => arabicWords,
        voice: 'ar'
    },
    english: {
        words: () => englishWords,
        voice: 'en'
    },
    german: {
        words: () => germanWords,
        voice: 'de'
    },
    russian: {
        words: () => russianWords,
        voice: 'ru'
    }
};

function selectLanguage(lang) {
    playClickSound();
    selectedLanguage = lang;

    // ÖNEMLİ: Dil değiştiğinde eski kelime verilerini temizle!
    currentStageWords = [];
    currentCategory = null;
    activeBalloonWords = [];

    // Aktif kelimeleri ayarla
    activeWords = LANGUAGE_CONFIG[lang].words();

    // Başlığı güncelle
    const langNames = { arabic: 'Arapça', english: 'İngilizce', german: 'Almanca', russian: 'Rusça' };
    document.getElementById('main-title').textContent = `🌸 ELİF İNCİ'NİN DİLLER BAHÇESİ 🌺`;
    document.getElementById('main-subtitle').textContent = `${langNames[lang]} Öğrenmeye Hazır mısın?`;

    showScreen('main-menu');
}

// --- SES SENTEZİ (TTS) ---
let voicesLoaded = false;
let arabicVoice = null;

// --- AUDIO CONTEXT (Ses Efektleri) ---
let audioContext = null;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Doğru cevap sesi - Neşeli ding
function playCorrectSound() {
    try {
        const ctx = initAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
    } catch (e) { console.log('Ses çalınamadı'); }
}

// Yanlış cevap sesi - Nazik boop
function playWrongSound() {
    try {
        const ctx = initAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(200, ctx.currentTime);
        oscillator.frequency.setValueAtTime(150, ctx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) { console.log('Ses çalınamadı'); }
}

// Tebrik sesi - Fanfare
function playCelebrationSound() {
    try {
        const ctx = initAudioContext();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
            gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.3);

            osc.start(ctx.currentTime + i * 0.15);
            osc.stop(ctx.currentTime + i * 0.15 + 0.3);
        });
    } catch (e) { console.log('Ses çalınamadı'); }
}

// Buton tıklama sesi
function playClickSound() {
    try {
        const ctx = initAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) { }
}

// --- KONFETİ EFEKTİ ---
function showConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff9800', '#e91e63'];
    const emojis = ['🌟', '⭐', '✨', '🎉', '🎊', '💫'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 1 + 2) + 's';

        // Bazı konfetiler emoji olsun
        if (Math.random() > 0.7) {
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.backgroundColor = 'transparent';
            confetti.style.fontSize = '1.5rem';
        }

        container.appendChild(confetti);
    }

    setTimeout(() => {
        container.innerHTML = '';
    }, 3000);
}

// --- YILDIZ SİSTEMİ ---
function addStar(count = 1) {
    gameStars += count;
    totalStars += count;
    updateStarDisplay();

    // Her 3 yıldızda konfeti göster
    if (gameStars % 3 === 0) {
        showConfetti();
    }
}

function updateStarDisplay() {
    const counter = document.getElementById('star-count');
    if (counter) {
        counter.textContent = gameStars;
        counter.parentElement.classList.add('star-pulse');
        setTimeout(() => counter.parentElement.classList.remove('star-pulse'), 300);
    }
}

function resetGameStars() {
    gameStars = 0;
    updateStarDisplay();
}

// Sesleri yükle
function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        voicesLoaded = true;
        // Sadece Arapça ses ara
        arabicVoice = voices.find(v => v.lang.startsWith('ar')) ||
            voices.find(v => v.lang.toLowerCase().includes('ar-')) ||
            voices.find(v => v.name.toLowerCase().includes('arabic'));

        if (arabicVoice) {
            console.log('Arapça ses bulundu:', arabicVoice.name, arabicVoice.lang);
        } else {
            console.log('Arapça ses bulunamadı. Mevcut sesler:', voices.map(v => v.lang).join(', '));
        }
    }
}

// Sesler yüklendiğinde
if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

function speakArabic(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!voicesLoaded) loadVoices();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;

    if (arabicVoice && arabicVoice.lang.startsWith('ar')) {
        utterance.voice = arabicVoice;
    }

    setTimeout(() => {
        window.speechSynthesis.speak(utterance);
    }, 50);
}

// --- NAVİGASYON ---
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    const homeBtn = document.getElementById('home-btn');
    const starCounter = document.getElementById('star-counter');

    // Ana menü veya dil seçiminde geri tuşu ve yıldız sayacı gizle
    if (id === 'main-menu' || id === 'language-screen') {
        homeBtn.style.display = 'none';
        starCounter.style.display = 'none';
        stopBalloonGame();
    } else if (id === 'game-complete') {
        homeBtn.style.display = 'none';
        starCounter.style.display = 'none';
    } else {
        homeBtn.style.display = 'flex';
        starCounter.style.display = 'flex';
    }

    // Aşama seçimi ekranı açıldıysa gridi doldur
    if (id === 'stage-select') {
        initStageGrid();
    }
}

function goHome() {
    playClickSound();
    goToMainMenu();
}

function goToMainMenu() {
    playClickSound();
    currentCategory = null;
    showScreen('main-menu');
}

function showFeedback(text = "Harika! 🌟") {
    const fb = document.getElementById('feedback');
    fb.textContent = text;
    fb.style.display = 'block';
    setTimeout(() => { fb.style.display = 'none'; }, 1200);
}

// --- KATEGORİ SİSTEMİ ---
const CATEGORY_STAGES = {
    animals: [5, 6],  // Hayvanlar 1 ve 2
    colors: [4],      // Renkler
    fruits: [7],      // Meyveler/Yiyecekler
    family: [3],      // Aile
    numbers: [2],     // Sayılar
    shapes: [21],     // Şekiller
    kitchen: [22]     // Mutfak
};

const CATEGORY_NAMES = {
    animals: '🦁 Hayvanlar',
    colors: '🌈 Renkler',
    fruits: '🍎 Meyveler',
    family: '👨‍👩‍👧 Aile',
    numbers: '🔢 Sayılar',
    shapes: '🔺 Şekiller',
    kitchen: '🥣 Mutfak'
};

// --- İNTERNETTEN RESİM ÇEKME ---
function getImageUrl(item) {
    const seed = (item.tr.length * 5) + 123;
    const prompt = `cute colorful cartoon ${encodeURIComponent(item.tr)} icon flat graphic simple white background`;
    return `https://image.pollinations.ai/prompt/${prompt}?width=200&height=200&nologo=true&seed=${seed}`;
}

function renderImageElement(item) {
    return `<img src="${getImageUrl(item)}" alt="${item.tr}" class="word-img" onerror="this.outerHTML='<div class=\\'emoji\\'>${item.e}</div>'" style="width:100%; height:100%; object-fit:contain; border-radius:10px;">`;
}

function selectCategory(category) {
    playClickSound();
    currentCategory = category;
    const stages = CATEGORY_STAGES[category];

    // Kategorideki tüm kelimeleri topla - doğrudan seçilen dilden
    const wordsSource = LANGUAGE_CONFIG[selectedLanguage].words();
    showFeedback(category + " (" + selectedLanguage + ")"); // DEBUG
    currentStageWords = wordsSource.filter(w => stages.includes(w.s));

    document.getElementById('dashboard-title').textContent = CATEGORY_NAMES[category];
    showScreen('stage-dashboard');
}

// --- AŞAMA SEÇİMİ ---
const TOTAL_STAGES = 20;

const STAGE_NAMES = {
    1: { name: 'Selamlaşma', icon: '👋' },
    2: { name: 'Sayılar', icon: '🔢' },
    3: { name: 'Aile', icon: '👨‍👩‍👧' },
    4: { name: 'Renkler', icon: '🌈' },
    5: { name: 'Hayvanlar 1', icon: '🦁' },
    6: { name: 'Hayvanlar 2', icon: '🦒' },
    7: { name: 'Meyveler', icon: '🍎' },
    8: { name: 'Yiyecekler', icon: '🍞' },
    9: { name: 'Vücut', icon: '🧍' },
    10: { name: 'Giysiler', icon: '👕' },
    11: { name: 'Ev', icon: '🏠' },
    12: { name: 'Ev Eşyaları', icon: '🪑' },
    13: { name: 'Okul', icon: '🏫' },
    14: { name: 'Meslekler', icon: '👨‍⚕️' },
    15: { name: 'Yerler', icon: '🏙️' },
    16: { name: 'Ulaşım', icon: '🚗' },
    17: { name: 'Zaman', icon: '⏰' },
    18: { name: 'Günler', icon: '📅' },
    19: { name: 'Doğa', icon: '🌳' },
    20: { name: 'Hava Durumu', icon: '🌤️' }
};

function initStageGrid() {
    const grid = document.getElementById('stage-grid');
    grid.innerHTML = ''; // Her seferinde yeniden oluştur

    for (let i = 1; i <= TOTAL_STAGES; i++) {
        const btn = document.createElement('button');
        const isLocked = i > unlockedStage;

        const stageInfo = STAGE_NAMES[i];
        btn.className = 'stage-btn' + (isLocked ? ' locked' : '');

        if (isLocked) {
            btn.innerHTML = `<span class="stage-icon">🔒</span><span class="stage-name">???</span>`;
        } else {
            btn.innerHTML = `<span class="stage-icon">${stageInfo.icon}</span><span class="stage-name">${stageInfo.name}</span>`;
        }
        btn.disabled = isLocked;

        if (!isLocked) {
            btn.onclick = () => selectStage(i);
        }

        grid.appendChild(btn);
    }
}

function selectStage(stageNum) {
    if (stageNum > unlockedStage) {
        showFeedback("Bu aşama kilitli! 🔒");
        return;
    }

    playClickSound();
    currentStage = stageNum;
    currentCategory = null;
    const wordsSource = LANGUAGE_CONFIG[selectedLanguage].words();
    currentStageWords = wordsSource.filter(w => w.s === stageNum);

    const stageInfo = STAGE_NAMES[stageNum];
    document.getElementById('dashboard-title').textContent = `${stageInfo.icon} ${stageInfo.name}`;
    showScreen('stage-dashboard');
}

// Artik kullanilmiyor - sadece kategoriler var


// --- ETKİNLİK 1: ÖĞRENME MODU ---
function startLearningMode() {
    playClickSound();
    showScreen('learn-screen');

    const title = currentCategory ? CATEGORY_NAMES[currentCategory] : `📖 Aşama ${currentStage}`;
    document.getElementById('learn-title').textContent = `${title} Kelimeleri`;

    const container = document.getElementById('learn-content');
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'learn-grid';

    currentStageWords.forEach(item => {
        const card = createLearnCard(item);
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

function createLearnCard(item) {
    const card = document.createElement('div');
    card.className = 'learn-card';
    card.innerHTML = `
        <div class="image-container" style="width: 120px; height: 120px; margin: 0 auto 10px auto;">
            ${renderImageElement(item)}
        </div>
        <div class="ar-text">${item.ar}</div>
        <div class="okunus">${item.ok}</div>
        <div class="tr-text">${item.tr}</div>
        <button class="sound-btn">🔊</button>
    `;

    card.querySelector('.sound-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        playClickSound();
        speakWord(item.ar);
    });

    // Karta tıklayınca da ses çalsın
    card.addEventListener('click', () => speakWord(item.ar));

    return card;
}


// --- OYUN 1: KART EŞLEŞTİRME ---
let flippedCards = [];
let matchedPairs = 0;
let memoryTotalPairs = 0;

function startMemoryGame() {
    playClickSound();
    lastGameMode = 'memory';
    showScreen('game-memory');
    resetGameStars();

    // Dil adını güncelle
    const langNames = { arabic: 'Arapça', english: 'İngilizce', german: 'Almanca', russian: 'Rusça' };
    const subtitle = document.getElementById('memory-subtitle');
    if (subtitle) subtitle.textContent = `Resmi ${langNames[selectedLanguage]} ismiyle eşleştir!`;

    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;

    // O anki kelimelerden rastgele 6 kelime seç
    let pool = [...currentStageWords];
    let selected = pool.sort(() => 0.5 - Math.random()).slice(0, 6);
    memoryTotalPairs = selected.length;

    let deck = [];
    selected.forEach(item => {
        deck.push({ id: item.ar, type: 'emoji', content: `<div style="width: 100%; height: 100%; padding: 10px; box-sizing: border-box;">${renderImageElement(item)}</div>`, data: item });
        const textClass = selectedLanguage === 'arabic' ? 'arabic-text' : 'foreign-text';
        deck.push({ id: item.ar, type: 'text', content: `<div class="${textClass}">${item.ar}</div><div style="font-size:0.6em">${item.ok}</div>`, data: item });
    });

    deck.sort(() => 0.5 - Math.random());

    deck.forEach(cardData => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="front">${cardData.content}</div>
            <div class="back">?</div>
        `;
        card.onclick = () => flipCard(card, cardData);
        grid.appendChild(card);
    });
}

function flipCard(cardElement, cardData) {
    if (cardElement.classList.contains('flipped') || flippedCards.length >= 2) return;

    playClickSound();
    if (cardData.type === 'text') speakWord(cardData.data.ar);

    cardElement.classList.add('flipped');
    flippedCards.push({ el: cardElement, data: cardData });

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [c1, c2] = flippedCards;

    if (c1.data.id === c2.data.id) {
        setTimeout(() => {
            c1.el.classList.add('matched');
            c2.el.classList.add('matched');
            playCorrectSound();
            showFeedback("Doğru! 🎉");
            addStar(1);
            if (c1.data.type === 'text') speakWord(c1.data.data.ar);
            else speakWord(c2.data.data.ar);
        }, 500);
        matchedPairs++;

        // Oyun bitti mi?
        if (matchedPairs === memoryTotalPairs) {
            setTimeout(() => showGameComplete(), 1500);
        }
    } else {
        playWrongSound();
        setTimeout(() => {
            c1.el.classList.remove('flipped');
            c2.el.classList.remove('flipped');
        }, 1000);
    }
    flippedCards = [];
}


// --- OYUN 2: DİNLE VE BUL ---
let currentQuestionItem = null;
let listeningCorrectCount = 0;
let listeningTotalQuestions = 5;

function startListeningGame() {
    playClickSound();
    lastGameMode = 'listening';
    showScreen('game-listening');
    resetGameStars();
    listeningCorrectCount = 0;
    nextListeningQuestion();
}

function nextListeningQuestion() {
    // 3 seçenek sun
    let pool = [...currentStageWords];
    let options = pool.sort(() => 0.5 - Math.random()).slice(0, 3);

    currentQuestionItem = options[Math.floor(Math.random() * options.length)];

    const bubble = document.getElementById('listening-text');
    bubble.innerHTML = `
        <div>Bu ne?</div>
        <div class="target-text ${selectedLanguage === 'arabic' ? 'arabic-text' : ''}" 
             onclick="speakWord('${currentQuestionItem.ar}')" 
             style="color: #0288D1; font-size: 3rem; margin-top:10px; cursor: pointer; user-select: none;">
             ${currentQuestionItem.ar}
        </div>
        <div style="font-size:1rem; color:#666;">(Ses için tıkla)</div>
    `;

    setTimeout(() => speakWord(currentQuestionItem.ar), 500);

    const container = document.getElementById('listening-options');
    container.innerHTML = '';

    options.forEach(opt => {
        const el = document.createElement('div');
        el.className = 'animal-option';
        el.style.width = '120px';
        el.style.height = '120px';
        el.style.padding = '10px';
        el.innerHTML = renderImageElement(opt);
        el.onclick = () => {
            if (opt.ar === currentQuestionItem.ar) {
                playCorrectSound();
                showFeedback("Aferin! 👏");
                addStar(1);
                // speakWord("mumtaz"); // Sabit arapça yerine sadece ses efekti yeterli
                listeningCorrectCount++;

                if (listeningCorrectCount >= listeningTotalQuestions) {
                    setTimeout(() => showGameComplete(), 1500);
                } else {
                    setTimeout(nextListeningQuestion, 1500);
                }
            } else {
                playWrongSound();
                el.style.transform = "translateX(10px)";
                setTimeout(() => el.style.transform = "none", 200);
                // speakWord("la"); // Sabit arapça yerine sadece ses efekti
            }
        };
        container.appendChild(el);
    });
}


// --- OYUN 3: KELİME AVCISI (BOUNCING GAME) ---
let bouncingObjects = [];
let rafId = null;
let targetBalloonItem = null;
let balloonCorrectCount = 0;
let balloonTotalTargets = 10;
let activeBalloonWords = []; // Sadece ekrandaki kelimeler
let balloonTimerInterval = null;
let balloonTime = 0;

function startBalloonGame() {
    playClickSound();
    lastGameMode = 'balloon';
    showScreen('game-colors');
    resetGameStars();
    balloonCorrectCount = 0;

    // Önceki nesneleri temizle
    bouncingObjects.forEach(obj => obj.element.remove());
    bouncingObjects = [];

    // Kelime havuzunu sınırla (Max 8 kelime)
    const poolSize = Math.min(8, currentStageWords.length);
    activeBalloonWords = currentStageWords.slice(0, poolSize);

    // Seçilen kelimelerden spawn et
    activeBalloonWords.forEach(word => {
        for (let i = 0; i < 2; i++) {
            spawnBouncingObject(word);
        }
    });

    // Hedef belirle (balonlar spawn edildikten SONRA!)
    setNewBalloonTarget();

    // Timer'ı başlat
    balloonTime = 0;
    const timerDisplay = document.getElementById('balloon-timer');
    if (timerDisplay) {
        timerDisplay.style.display = 'block';
        timerDisplay.textContent = `Süre: ${balloonTime}`;
    }

    if (balloonTimerInterval) clearInterval(balloonTimerInterval);
    balloonTimerInterval = setInterval(() => {
        balloonTime++;
        if (timerDisplay) {
            timerDisplay.textContent = `Süre: ${balloonTime}`;
        }
    }, 1000);

    // Animation loop başlat
    if (rafId) cancelAnimationFrame(rafId);
    animateBouncingObjects();
}

function stopBalloonGame() {
    if (rafId) cancelAnimationFrame(rafId);
    if (balloonTimerInterval) {
        clearInterval(balloonTimerInterval);
        balloonTimerInterval = null;
    }
    const timerDisplay = document.getElementById('balloon-timer');
    if (timerDisplay) {
        timerDisplay.style.display = 'none';
    }
    bouncingObjects.forEach(obj => obj.element.remove());
    bouncingObjects = [];
}

function setNewBalloonTarget() {
    // Sadece aktif (ekranda olan) balonlardan hedef seç
    // bouncingObjects boşsa hata vermesin diye kontrol ekle
    if (bouncingObjects.length === 0) {
        // Eğer balon kalmadıysa ama hedef sayıya ulaşılmadıysa yeniden spawn etmek gerekebilir
        // Şimdilik oyunu bitirebiliriz veya mevcut akışta balonlar bitmeden oyun bitiyor genelde.
        return;
    }

    // Benzersiz kelimeleri al
    const availableWords = [...new Set(bouncingObjects.map(obj => obj.word))];
    targetBalloonItem = availableWords[Math.floor(Math.random() * availableWords.length)];

    const targetDisplay = document.getElementById('color-target-display');
    const targetTextClass = selectedLanguage === 'arabic' ? 'arabic-text' : 'foreign-text';
    targetDisplay.innerHTML = `
        <div style="width: 100px; height: 100px; margin: 0 auto 5px auto;">${renderImageElement(targetBalloonItem)}</div>
        <div style="text-align: center;">
            Hedef: <span class="${targetTextClass}" style="font-weight:bold; color:red; font-size:1.6rem;">${targetBalloonItem.ar}</span> 
            <br><span style="font-size: 0.9rem; color: #555;">(${targetBalloonItem.ok})</span>
        </div>
    `;

    speakWord(targetBalloonItem.ar);
}

// --- ÇOK DİLLİ SES SENTEZİ ---
function speakWord(text) {
    if (!text) return;

    // Web Speech API desteği kontrolü
    if (!window.speechSynthesis) return;

    // Önceki konuşmayı iptal et
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langCode = LANGUAGE_CONFIG[selectedLanguage].voice; // 'ar', 'en', 'de'

    utterance.lang = langCode;
    utterance.rate = 0.9; // Biraz yavaş konuşsun

    // Uygun sesi bulmaya çalış
    const voices = window.speechSynthesis.getVoices();
    const specificVoice = voices.find(v => v.lang.startsWith(langCode));
    if (specificVoice) {
        utterance.voice = specificVoice;
    }

    window.speechSynthesis.speak(utterance);
}

// Sesleri yükle (bazı tarayıcılar için gerekli)
if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}

function spawnBouncingObject(wordItem) {
    const container = document.getElementById('game-colors');
    const el = document.createElement('div');
    el.className = 'bouncing-object';
    el.style.width = '100px';
    el.style.height = '100px';
    el.innerHTML = renderImageElement(wordItem);

    // Rastgele başlangıç pozisyonu ve hız
    const obj = {
        element: el,
        word: wordItem,
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        vx: (Math.random() - 0.5) * 2 + (Math.random() < 0.5 ? -1 : 1),
        vy: (Math.random() - 0.5) * 2 + (Math.random() < 0.5 ? -1 : 1)
    };

    el.onclick = () => handleBouncingClick(obj);
    container.appendChild(el);
    bouncingObjects.push(obj);

    // İlk pozisyonu ayarla
    el.style.left = obj.x + 'px';
    el.style.top = obj.y + 'px';
}

function handleBouncingClick(obj) {
    if (obj.word.ar === targetBalloonItem.ar) {
        playCorrectSound();
        obj.element.classList.add('pop-anim');
        showFeedback("Yakaladın! ✨");
        addStar(1);
        balloonCorrectCount++;

        setTimeout(() => {
            const index = bouncingObjects.indexOf(obj);
            if (index > -1) {
                obj.element.remove();
                bouncingObjects.splice(index, 1);
            }
        }, 300);

        if (balloonCorrectCount >= balloonTotalTargets) {
            setTimeout(() => showGameComplete(), 1500);
        } else {
            setTimeout(() => setNewBalloonTarget(), 1000);
        }
    } else {
        playWrongSound();
        // Yanlış nesne - titret
        obj.element.style.opacity = '0.5';
        setTimeout(() => {
            obj.element.style.opacity = '1';
        }, 200);
    }
}

function animateBouncingObjects() {
    if (!document.getElementById('game-colors').classList.contains('active')) {
        stopBalloonGame();
        return;
    }

    const container = document.getElementById('game-colors');
    const bounds = container.getBoundingClientRect();

    bouncingObjects.forEach(obj => {
        // Pozisyon güncelle
        obj.x += obj.vx;
        obj.y += obj.vy;

        const size = 80;

        // Kenar çarpma kontrolü
        if (obj.x <= 0) {
            obj.x = 0;
            obj.vx *= -1;
        } else if (obj.x >= bounds.width - size) {
            obj.x = bounds.width - size;
            obj.vx *= -1;
        }

        if (obj.y <= 0) {
            obj.y = 0;
            obj.vy *= -1;
        } else if (obj.y >= bounds.height - size) {
            obj.y = bounds.height - size;
            obj.vy *= -1;
        }

        // DOM güncelle
        obj.element.style.left = obj.x + 'px';
        obj.element.style.top = obj.y + 'px';
    });

    rafId = requestAnimationFrame(animateBouncingObjects);
}


// --- OYUN BİTTİ ---
function showGameComplete() {
    stopBalloonGame();
    playCelebrationSound();
    showConfetti();

    // Aşama modundaysa sonraki aşamayı aç
    if (!currentCategory && currentStage >= unlockedStage && currentStage < TOTAL_STAGES) {
        unlockedStage = currentStage + 1;
    }

    const messages = [
        "Harika iş çıkardın! 🌟",
        "Sen bir yıldızsın! ⭐",
        "Muhteşemsin! 🏆",
        "Çok güzel! 👏",
        "Aferin sana! 🎉"
    ];

    document.getElementById('complete-message').textContent =
        messages[Math.floor(Math.random() * messages.length)];

    showScreen('game-complete');
}

function playAgain() {
    playClickSound();

    switch (lastGameMode) {
        case 'memory':
            startMemoryGame();
            break;
        case 'listening':
            startListeningGame();
            break;
        case 'balloon':
            startBalloonGame();
            break;
        default:
            showScreen('stage-dashboard');
    }
}


