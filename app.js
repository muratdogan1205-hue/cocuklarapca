// --- VERİ HAVUZU ---
const vocab = [
    { id: 'apple', tr: 'Elma', ar: 'تفاحة', tr_okunus: 'Tuffah', emoji: '🍎', color: 'red' },
    { id: 'cat', tr: 'Kedi', ar: 'قطة', tr_okunus: 'Kıtta', emoji: '🐱', color: 'orange' },
    { id: 'lion', tr: 'Aslan', ar: 'أسد', tr_okunus: 'Esed', emoji: '🦁', color: 'orange' },
    { id: 'dog', tr: 'Köpek', ar: 'كلب', tr_okunus: 'Kelb', emoji: '🐶', color: 'brown' },
    { id: 'tree', tr: 'Ağaç', ar: 'شجرة', tr_okunus: 'Şecera', emoji: '🌳', color: 'green' },
    { id: 'star', tr: 'Yıldız', ar: 'نجمة', tr_okunus: 'Nejme', emoji: '⭐', color: 'yellow' },
    { id: 'fish', tr: 'Balık', ar: 'سمكة', tr_okunus: 'Semeke', emoji: '🐟', color: 'blue' },
    { id: 'car', tr: 'Araba', ar: 'سيارة', tr_okunus: 'Seyyara', emoji: '🚗', color: 'red' }
];

const colorsInfo = [
    { id: 'red', tr: 'Kırmızı', ar: 'أحمر', okunus: 'Ahmar', code: '#f44336' },
    { id: 'blue', tr: 'Mavi', ar: 'أزرق', okunus: 'Azrak', code: '#2196F3' },
    { id: 'green', tr: 'Yeşil', ar: 'أخضر', okunus: 'Ahdar', code: '#4CAF50' },
    { id: 'yellow', tr: 'Sarı', ar: 'أصفر', okunus: 'Asfar', code: '#FFEB3B' }
];

// --- SES SENTEZİ (TTS) ---
function speakArabic(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
}

// --- NAVİGASYON ---
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    const homeBtn = document.getElementById('home-btn');
    if (id === 'main-menu') {
        homeBtn.style.display = 'none';
        stopColorGame();
    } else {
        homeBtn.style.display = 'flex';
    }
}

function goHome() {
    showScreen('main-menu');
}

function showFeedback(text = "Harika! 🌟") {
    const fb = document.getElementById('feedback');
    fb.textContent = text;
    fb.style.display = 'block';
    setTimeout(() => { fb.style.display = 'none'; }, 1000);
}

// --- OYUN 1: KART EŞLEŞTİRME ---
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function startMemoryGame() {
    showScreen('game-memory');
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;

    let selected = [...vocab].sort(() => 0.5 - Math.random()).slice(0, 6);

    let deck = [];
    selected.forEach(item => {
        deck.push({ id: item.id, type: 'emoji', content: item.emoji, data: item });
        deck.push({ id: item.id, type: 'text', content: `<div class="arabic-text">${item.ar}</div><div style="font-size:0.6em">${item.tr_okunus}</div>`, data: item });
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

    if (cardData.type === 'text') speakArabic(cardData.data.ar);

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
            showFeedback("Doğru! 🎉");
            if (c1.data.type === 'text') speakArabic(c1.data.data.ar);
            else speakArabic(c2.data.data.ar);
        }, 500);
        matchedPairs++;
        if (matchedPairs === 6) {
            setTimeout(() => showFeedback("Oyun Bitti! 🏆"), 1500);
        }
    } else {
        setTimeout(() => {
            c1.el.classList.remove('flipped');
            c2.el.classList.remove('flipped');
        }, 1000);
    }
    flippedCards = [];
}

// --- OYUN 2: DİNLE VE BUL ---
let currentQuestionItem = null;

function startListeningGame() {
    showScreen('game-listening');
    nextListeningQuestion();
}

function nextListeningQuestion() {
    let options = [...vocab].sort(() => 0.5 - Math.random()).slice(0, 3);
    currentQuestionItem = options[Math.floor(Math.random() * options.length)];

    const bubble = document.getElementById('listening-text');
    bubble.innerHTML = `<div>Ben kimim?</div><div class="arabic-text" style="color: #0288D1; font-size: 3rem; margin-top:10px;">${currentQuestionItem.ar}</div><div style="font-size:1rem; color:#666;">(${currentQuestionItem.tr_okunus})</div>`;

    setTimeout(() => speakArabic(currentQuestionItem.ar), 500);

    const container = document.getElementById('listening-options');
    container.innerHTML = '';

    options.forEach(opt => {
        const el = document.createElement('div');
        el.className = 'animal-option';
        el.textContent = opt.emoji;
        el.onclick = () => {
            if (opt.id === currentQuestionItem.id) {
                showFeedback("Aferin! 👏");
                speakArabic("Mümtaz!");
                setTimeout(nextListeningQuestion, 1500);
            } else {
                el.style.transform = "translateX(10px)";
                setTimeout(() => el.style.transform = "none", 200);
                speakArabic("La, havale marra uhra");
            }
        };
        container.appendChild(el);
    });
}

// --- OYUN 3: RENKLER ORMANI ---
let colorGameInterval = null;
let targetColorObj = null;

function startColorGame() {
    showScreen('game-colors');
    const container = document.getElementById('game-colors');
    document.querySelectorAll('.flying-object').forEach(e => e.remove());

    setNewColorTarget();

    colorGameInterval = setInterval(() => {
        spawnBalloon();
    }, 1200);
}

function stopColorGame() {
    if (colorGameInterval) clearInterval(colorGameInterval);
    document.querySelectorAll('.flying-object').forEach(e => e.remove());
}

function setNewColorTarget() {
    targetColorObj = colorsInfo[Math.floor(Math.random() * colorsInfo.length)];
    const display = document.getElementById('target-word');
    display.textContent = targetColorObj.ar;
    display.style.color = targetColorObj.code;
    document.getElementById('color-target-display').innerHTML = `Hedef: <span class="arabic-text" style="font-weight:bold; color:${targetColorObj.code}; font-size:1.5rem;">${targetColorObj.ar}</span> (${targetColorObj.okunus})`;

    speakArabic(targetColorObj.ar);
}

function spawnBalloon() {
    if (!document.getElementById('game-colors').classList.contains('active')) return;

    const container = document.getElementById('game-colors');
    const el = document.createElement('div');
    el.className = 'flying-object';

    const randColor = colorsInfo[Math.floor(Math.random() * colorsInfo.length)];
    let emoji = '🎈';
    if (randColor.id === 'red') emoji = '🔴';
    if (randColor.id === 'blue') emoji = '🔵';
    if (randColor.id === 'green') emoji = '🟢';
    if (randColor.id === 'yellow') emoji = '🟡';

    el.textContent = emoji;
    el.style.left = Math.random() * 80 + 10 + '%';
    el.style.fontSize = (Math.random() * 2 + 3) + 'rem';

    let speed = Math.random() * 4 + 4;
    el.style.animationDuration = speed + 's';

    el.onclick = () => {
        if (randColor.id === targetColorObj.id) {
            el.classList.add('pop-anim');
            showFeedback("Yakaladın! ✨");
            speakArabic(randColor.ar);
            setTimeout(() => el.remove(), 300);
            setTimeout(() => setNewColorTarget(), 1000);
        } else {
            el.style.opacity = 0.5;
        }
    };

    container.appendChild(el);

    setTimeout(() => {
        if (el.parentNode) el.remove();
    }, speed * 1000);
}

// --- ÖĞRENME MODU (50 AŞAMA) ---
const TOTAL_STAGES = 20;

function startLearningMode() {
    showScreen('stage-select');
    const grid = document.getElementById('stage-grid');
    grid.innerHTML = '';

    for (let i = 1; i <= TOTAL_STAGES; i++) {
        const btn = document.createElement('button');
        btn.className = 'stage-btn';
        btn.textContent = i;
        btn.onclick = () => startStage(i);
        grid.appendChild(btn);
    }
}

function startStage(stageNum) {
    showScreen('learn-screen');
    document.getElementById('learn-title').textContent = `📖 Aşama ${stageNum}`;

    const container = document.getElementById('learn-content');
    container.innerHTML = '';

    const stageWords = arabicWords.filter(w => w.s === stageNum);

    const grid = document.createElement('div');
    grid.className = 'learn-grid';

    stageWords.forEach(item => {
        const card = createLearnCard(item.e, item.ar, item.ok, item.tr);
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

function createLearnCard(emoji, arText, okunus, trText) {
    const card = document.createElement('div');
    card.className = 'learn-card';
    card.innerHTML = `
        <div class="emoji">${emoji}</div>
        <div class="ar-text">${arText}</div>
        <div class="okunus">${okunus}</div>
        <div class="tr-text">${trText}</div>
        <button class="sound-btn" onclick="event.stopPropagation(); speakArabic('${arText}')">🔊</button>
    `;
    return card;
}
