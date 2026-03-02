// Almanca Kelime Verileri - 5 Kategori
const germanWords = [
    // Aile (s: 3)
    { ar: 'Vater', ok: 'Fater', tr: 'Baba', s: 3, e: '👨‍👦' },
    { ar: 'Mutter', ok: 'Muter', tr: 'Anne', s: 3, e: '👩‍👧' },
    { ar: 'Sohn', ok: 'Zon', tr: 'Oğul', s: 3, e: '👨‍👦' },
    { ar: 'Tochter', ok: 'Tohter', tr: 'Kız', s: 3, e: '👧' },
    { ar: 'Bruder', ok: 'Bruder', tr: 'Erkek Kardeş', s: 3, e: '👦' },
    { ar: 'Schwester', ok: 'Şvester', tr: 'Kız Kardeş', s: 3, e: '👩‍❤️‍👩' },
    { ar: 'Großvater', ok: 'Grosfater', tr: 'Dede', s: 3, e: '👴' },
    { ar: 'Großmutter', ok: 'Grosmuter', tr: 'Nine', s: 3, e: '👵' },
    { ar: 'Baby', ok: 'Beybi', tr: 'Bebek', s: 3, e: '👶' },
    { ar: 'Familie', ok: 'Familie', tr: 'Aile', s: 3, e: '👨‍👩‍👧‍👦' },

    // Renkler (s: 4)
    { ar: 'Rot', ok: 'Rot', tr: 'Kırmızı', s: 4, e: '🔴' },
    { ar: 'Blau', ok: 'Blau', tr: 'Mavi', s: 4, e: '🔵' },
    { ar: 'Gelb', ok: 'Gelb', tr: 'Sarı', s: 4, e: '🟡' },
    { ar: 'Grün', ok: 'Grün', tr: 'Yeşil', s: 4, e: '🟢' },
    { ar: 'Orange', ok: 'Orange', tr: 'Turuncu', s: 4, e: '🟠' },
    { ar: 'Lila', ok: 'Lila', tr: 'Mor', s: 4, e: '🟣' },
    { ar: 'Rosa', ok: 'Roza', tr: 'Pembe', s: 4, e: '<span style="color:#FF007F">⬤</span>' },
    { ar: 'Schwarz', ok: 'Şvarts', tr: 'Siyah', s: 4, e: '⚫' },
    { ar: 'Weiß', ok: 'Vays', tr: 'Beyaz', s: 4, e: '⚪' },
    { ar: 'Braun', ok: 'Braun', tr: 'Kahverengi', s: 4, e: '🟤' },

    // Hayvanlar 1 (s: 5)
    { ar: 'Katze', ok: 'Katse', tr: 'Kedi', s: 5, e: '🐱' },
    { ar: 'Hund', ok: 'Hund', tr: 'Köpek', s: 5, e: '🐶' },
    { ar: 'Vogel', ok: 'Fogel', tr: 'Kuş', s: 5, e: '🐦' },
    { ar: 'Fisch', ok: 'Fiş', tr: 'Balık', s: 5, e: '🐟' },
    { ar: 'Löwe', ok: 'Löve', tr: 'Aslan', s: 5, e: '🦁' },
    { ar: 'Elefant', ok: 'Elefant', tr: 'Fil', s: 5, e: '🐘' },
    { ar: 'Affe', ok: 'Afe', tr: 'Maymun', s: 5, e: '🐵' },
    { ar: 'Kaninchen', ok: 'Kaninhen', tr: 'Tavşan', s: 5, e: '🐰' },
    { ar: 'Bär', ok: 'Ber', tr: 'Ayı', s: 5, e: '🐻' },
    { ar: 'Pferd', ok: 'Pferd', tr: 'At', s: 5, e: '🐴' },

    // Hayvanlar 2 (s: 6)
    { ar: 'Kuh', ok: 'Ku', tr: 'İnek', s: 6, e: '🐄' },
    { ar: 'Schaf', ok: 'Şaf', tr: 'Koyun', s: 6, e: '🐑' },
    { ar: 'Huhn', ok: 'Hun', tr: 'Tavuk', s: 6, e: '🐔' },
    { ar: 'Ente', ok: 'Ente', tr: 'Ördek', s: 6, e: '🦆' },
    { ar: 'Schmetterling', ok: 'Şmeterling', tr: 'Kelebek', s: 6, e: '🦋' },
    { ar: 'Frosch', ok: 'Froş', tr: 'Kurbağa', s: 6, e: '🐸' },
    { ar: 'Schildkröte', ok: 'Şiltkröte', tr: 'Kaplumbağa', s: 6, e: '🐢' },
    { ar: 'Giraffe', ok: 'Girafe', tr: 'Zürafa', s: 6, e: '🦒' },
    { ar: 'Zebra', ok: 'Tsebra', tr: 'Zebra', s: 6, e: '🦓' },
    { ar: 'Pinguin', ok: 'Pinguin', tr: 'Penguen', s: 6, e: '🐧' },

    // Meyveler (s: 7)
    { ar: 'Apfel', ok: 'Apfel', tr: 'Elma', s: 7, e: '🍎' },
    { ar: 'Banane', ok: 'Banane', tr: 'Muz', s: 7, e: '🍌' },
    { ar: 'Orange', ok: 'Orange', tr: 'Portakal', s: 7, e: '🍊' },
    { ar: 'Erdbeere', ok: 'Erdbere', tr: 'Çilek', s: 7, e: '🍓' },
    { ar: 'Traube', ok: 'Traube', tr: 'Üzüm', s: 7, e: '🍇' },
    { ar: 'Wassermelone', ok: 'Vasermelone', tr: 'Karpuz', s: 7, e: '🍉' },
    { ar: 'Zitrone', ok: 'Tsitrone', tr: 'Limon', s: 7, e: '🍋' },
    { ar: 'Kirsche', ok: 'Kirşe', tr: 'Kiraz', s: 7, e: '🍒' },
    { ar: 'Pfirsich', ok: 'Pfirsiş', tr: 'Şeftali', s: 7, e: '🍑' },
    { ar: 'Birne', ok: 'Birne', tr: 'Armut', s: 7, e: '🍐' },

    // Sayılar (s: 2)
    { ar: 'Eins', ok: 'Ayns', tr: 'Bir', s: 2, e: '1️⃣' },
    { ar: 'Zwei', ok: 'Tsvay', tr: 'İki', s: 2, e: '2️⃣' },
    { ar: 'Drei', ok: 'Dray', tr: 'Üç', s: 2, e: '3️⃣' },
    { ar: 'Vier', ok: 'Fir', tr: 'Dört', s: 2, e: '4️⃣' },
    { ar: 'Fünf', ok: 'Fünf', tr: 'Beş', s: 2, e: '5️⃣' },
    { ar: 'Sechs', ok: 'Zeks', tr: 'Altı', s: 2, e: '6️⃣' },
    { ar: 'Sieben', ok: 'Ziben', tr: 'Yedi', s: 2, e: '7️⃣' },
    { ar: 'Acht', ok: 'Aht', tr: 'Sekiz', s: 2, e: '8️⃣' },
    { ar: 'Neun', ok: 'Noyn', tr: 'Dokuz', s: 2, e: '9️⃣' },
    { ar: 'Zehn', ok: 'Tsen', tr: 'On', s: 2, e: '🔟' },

    // Şekiller (s: 21)
    { ar: 'Kreis', ok: 'Krays', tr: 'Daire', s: 21, e: '⭕' },
    { ar: 'Quadrat', ok: 'Kvadrat', tr: 'Kare', s: 21, e: '⬜' },
    { ar: 'Dreieck', ok: 'Drayek', tr: 'Üçgen', s: 21, e: '🔺' },
    { ar: 'Rechteck', ok: 'Rehtek', tr: 'Dikdörtgen', s: 21, e: '▬' },
    { ar: 'Stern', ok: 'Ştern', tr: 'Yıldız', s: 21, e: '⭐' },
    { ar: 'Herz', ok: 'Herts', tr: 'Kalp', s: 21, e: '❤️' },
    { ar: 'Linie', ok: 'Liniye', tr: 'Çizgi', s: 21, e: '➖' },
    { ar: 'Punkt', ok: 'Punkt', tr: 'Nokta', s: 21, e: '•' },

    // Mutfak (s: 22)
    { ar: 'Teller', ok: 'Teler', tr: 'Tabak', s: 22, e: '🍽️' },
    { ar: 'Glas', ok: 'Glas', tr: 'Bardak', s: 22, e: '🥛' },
    { ar: 'Löffel', ok: 'Löfel', tr: 'Kaşık', s: 22, e: '🥄' },
    { ar: 'Gabel', ok: 'Gabel', tr: 'Çatal', s: 22, e: '🍴' },
    { ar: 'Messer', ok: 'Meser', tr: 'Bıçak', s: 22, e: '🔪' },
    { ar: 'Topf', ok: 'Topf', tr: 'Tencere', s: 22, e: '🍲' },
    { ar: 'Pfanne', ok: 'Pfane', tr: 'Tava', s: 22, e: '🍳' },
    { ar: 'Schüssel', ok: 'Şüsel', tr: 'Kase', s: 22, e: '🥣' },
    { ar: 'Tasse', ok: 'Tase', tr: 'Fincan', s: 22, e: '☕' },
    { ar: 'Ofen', ok: 'Ofen', tr: 'Fırın', s: 22, e: '♨️' }
];
