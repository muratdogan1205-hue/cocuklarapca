// --- DURUM YÖNETİMİ ---
let currentStage = 1;
let currentStageWords = [];

// --- SES SENTEZİ (TTS) ---
let voicesLoaded = false;
let arabicVoice = null;

// Sesleri yükle
function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        voicesLoaded = true;
        // Sadece Arapça ses ara
        arabicVoice = voices.find(v => v.lang.startsWith('ar')) ||
            voices.find(v => v.lang.toLowerCase().includes('ar-')) ||
            voices.find(v => v.name.toLowerCase().includes('arabic'));

        const warningId = 'voice-warning-banner';
        let warningEl = document.getElementById(warningId);

        if (arabicVoice) {
            console.log('Arapça ses bulundu:', arabicVoice.name, arabicVoice.lang);
            if (warningEl) warningEl.style.display = 'none';
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
    // Eğer ana menü veya aşama seçimi ise geri tuşunu kapa (kendi navigasyonları var)
    if (id === 'main-menu' || id === 'stage-select') {
        homeBtn.style.display = 'none';
        stopBalloonGame(); // Oyun açıksa durdur
    } else {
        homeBtn.style.display = 'flex';
        // Stage dashboard'da iken anasayfa butonu stage select'e dönsün mü? 
        // Kullanıcı "home" basarsa en başa dönsün iyisi.
    }

    // Eğer aşama seçimi ekranı açıldıysa gridi doldur
    if (id === 'stage-select') {
        initStageGrid();
    }
}

function goHome() {
    // Oyunlardan çıkınca dashboard'a mı yoksa ana menüye mi? 
    // Kullanıcı deneyimi: Oyun bitti -> Dashboard'a dönmek mantıklı.
    // Ama "Ev" ikonu genellikle Ana Menü'dür.
    // Şimdilik Stage Dashboard'a dönsün çünkü o anki bağlam o.
    if (currentStage > 0) {
        showScreen('stage-dashboard');
    } else {
        showScreen('main-menu');
    }
}

function showFeedback(text = "Harika! 🌟") {
    const fb = document.getElementById('feedback');
    fb.textContent = text;
    fb.style.display = 'block';
    setTimeout(() => { fb.style.display = 'none'; }, 1000);
}

// --- AŞAMA SEÇİMİ ---
const TOTAL_STAGES = 20; // arabic-words-data.js içinden de anlaşılabilir ama limit koyalım

function initStageGrid() {
    const grid = document.getElementById('stage-grid');
    if (grid.children.length > 0) return; // Zaten doluysa tekrar yapma

    grid.innerHTML = '';
    for (let i = 1; i <= TOTAL_STAGES; i++) {
        const btn = document.createElement('button');
        btn.className = 'stage-btn';
        btn.textContent = i;
        btn.onclick = () => selectStage(i);
        grid.appendChild(btn);
    }
}

function selectStage(stageNum) {
    currentStage = stageNum;
    // arabicWords değişkeni index.html'de yüklenen diğer dosyadan geliyor
    currentStageWords = arabicWords.filter(w => w.s === stageNum);

    document.getElementById('dashboard-title').textContent = `📖 Aşama ${stageNum}`;
    showScreen('stage-dashboard');
}


// --- ETKİNLİK 1: ÖĞRENME MODU ---
function startLearningMode() {
    showScreen('learn-screen');
    document.getElementById('learn-title').textContent = `📖 Aşama ${currentStage} Kelimeleri`;

    const container = document.getElementById('learn-content');
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'learn-grid';

    currentStageWords.forEach(item => {
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
        <button class="sound-btn">🔊</button>
    `;

    card.querySelector('.sound-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        speakArabic(arText);
    });

    // Karta tıklayınca da ses çalsın
    card.addEventListener('click', () => speakArabic(arText));

    return card;
}


// --- OYUN 1: KART EŞLEŞTİRME ---
let flippedCards = [];
let matchedPairs = 0;

function startMemoryGame() {
    showScreen('game-memory');
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;

    // O anki aşamadan rastgele 6 kelime seç
    // Eğer kelime sayısı 6'dan az ise hepsini al
    let pool = [...currentStageWords];
    let selected = pool.sort(() => 0.5 - Math.random()).slice(0, 6);

    let deck = [];
    selected.forEach(item => {
        deck.push({ id: item.ar, type: 'emoji', content: item.e, data: item });
        // Text kartında Arapça ve okunuşu olsun
        deck.push({ id: item.ar, type: 'text', content: `<div class="arabic-text">${item.ar}</div><div style="font-size:0.6em">${item.ok}</div>`, data: item });
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
        if (matchedPairs === (currentStageWords.length < 6 ? currentStageWords.length : 6)) {
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
    // 3 seçenek sun
    let pool = [...currentStageWords];
    let options = pool.sort(() => 0.5 - Math.random()).slice(0, 3);

    currentQuestionItem = options[Math.floor(Math.random() * options.length)];

    const bubble = document.getElementById('listening-text');
    bubble.innerHTML = `
        <div>Ben kimim?</div>
        <div class="arabic-text" 
             onclick="speakArabic('${currentQuestionItem.ar}')" 
             style="color: #0288D1; font-size: 3rem; margin-top:10px; cursor: pointer; user-select: none;"
             title="Tekrar dinlemek için tıkla">
             🔊
        </div>
    `;
    // Metin gizlendi, sadece ses var. Veya Arapçayı gösterip okunuşu mu gizlesek?
    // "Dinle ve Bul" olduğu için önce DUYUP sonra resmi bulmalı. Yazı ipucu olabilir.
    // Şimdilik sadece Hoparlör ikonu ve tıklayınca ses çalması daha zorlayıcı/eğitici.
    // Ama çocuk okuma bilmiyorsa sadece sese odaklanmalı.

    // Alternatif: Arapça yazıyı gösterelim, çocuk görselle eşleştirsin.
    bubble.innerHTML = `
        <div>Bu ne?</div>
        <div class="arabic-text" 
             onclick="speakArabic('${currentQuestionItem.ar}')" 
             style="color: #0288D1; font-size: 3rem; margin-top:10px; cursor: pointer; user-select: none;">
             ${currentQuestionItem.ar}
        </div>
        <div style="font-size:1rem; color:#666;">(Ses için tıkla)</div>
    `;

    setTimeout(() => speakArabic(currentQuestionItem.ar), 500);

    const container = document.getElementById('listening-options');
    container.innerHTML = '';

    options.forEach(opt => {
        const el = document.createElement('div');
        el.className = 'animal-option'; // Stil adı aynı kalsın
        el.textContent = opt.e; // Emoji
        el.onclick = () => {
            if (opt.ar === currentQuestionItem.ar) {
                showFeedback("Aferin! 👏");
                speakArabic("Mümtaz!"); // Harika
                setTimeout(nextListeningQuestion, 1500);
            } else {
                el.style.transform = "translateX(10px)";
                setTimeout(() => el.style.transform = "none", 200);
                speakArabic("La, havale marra uhra"); // Hayır tekrar dene
            }
        };
        container.appendChild(el);
    });
}


// --- OYUN 3: RENKLER ORMANI (BALON OYUNU) ---
// Artık "Kelime Balonları"
let balloonGameInterval = null;
let targetBalloonItem = null;

function startBalloonGame() {
    showScreen('game-colors'); // ID aynı kalsın, CSS bozulmasın
    const container = document.getElementById('game-colors');
    document.querySelectorAll('.flying-object').forEach(e => e.remove());

    setNewBalloonTarget();

    if (balloonGameInterval) clearInterval(balloonGameInterval);
    balloonGameInterval = setInterval(() => {
        spawnBalloon();
    }, 1200);
}

function stopBalloonGame() {
    if (balloonGameInterval) clearInterval(balloonGameInterval);
    document.querySelectorAll('.flying-object').forEach(e => e.remove());
}

function setNewBalloonTarget() {
    const pool = currentStageWords;
    targetBalloonItem = pool[Math.floor(Math.random() * pool.length)];

    const display = document.getElementById('target-word'); // index.html'de var mıydı? Evet.
    // index.html'de id="target-word" olan span var.

    // HTML yapısını dinamik güncelle
    const targetDisplay = document.getElementById('color-target-display');
    targetDisplay.innerHTML = `
        Hedef: <span class="arabic-text" style="font-weight:bold; color:red; font-size:1.5rem;">${targetBalloonItem.ar}</span> 
        (${targetBalloonItem.ok})
    `;

    speakArabic(targetBalloonItem.ar);
}

function spawnBalloon() {
    if (!document.getElementById('game-colors').classList.contains('active')) return;

    const container = document.getElementById('game-colors');
    const el = document.createElement('div');
    el.className = 'flying-object';

    // Rastgele bir kelime seç (balonun taşıyacağı)
    const randomItem = currentStageWords[Math.floor(Math.random() * currentStageWords.length)];

    el.textContent = randomItem.e; // Balon emoji taşıyor

    // Stil (Rastgele renkli balon görünümü için border/bg eklenebilir ama şimdilik sadece emoji)
    // CSS'de .flying-object sadece pozisyonluyor.
    // Biraz süsleyelim:
    el.style.textShadow = "0 0 10px rgba(0,0,0,0.2)";

    el.style.left = Math.random() * 80 + 10 + '%';
    el.style.fontSize = (Math.random() * 2 + 3) + 'rem';

    let speed = Math.random() * 4 + 4; // 4-8 saniye arası
    el.style.animationDuration = speed + 's';

    el.onclick = () => {
        if (randomItem.ar === targetBalloonItem.ar) {
            el.classList.add('pop-anim');
            showFeedback("Yakaladın! ✨");
            speakArabic(randomItem.ar);
            setTimeout(() => el.remove(), 300);
            setTimeout(() => setNewBalloonTarget(), 1000);
        } else {
            // Yanlış balon
            el.style.opacity = 0.5;
            // Belki yanlış sesi?
        }
    };

    container.appendChild(el);

    setTimeout(() => {
        if (el.parentNode) el.remove();
    }, speed * 1000);
}
