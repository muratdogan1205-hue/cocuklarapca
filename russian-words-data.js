// Rusça Kelime Verileri - 5 Kategori
const russianWords = [
    // Aile (s: 3)
    { ar: 'Отец', ok: 'Otets', tr: 'Baba', s: 3, e: '👨' },
    { ar: 'Мать', ok: 'Mat', tr: 'Anne', s: 3, e: '👩' },
    { ar: 'Сын', ok: 'Sın', tr: 'Oğul', s: 3, e: '👦' },
    { ar: 'Дочь', ok: 'Doç', tr: 'Kız', s: 3, e: '👧' },
    { ar: 'Брат', ok: 'Brat', tr: 'Erkek Kardeş', s: 3, e: '👦' },
    { ar: 'Сестра', ok: 'Kız Kardeş', tr: 'Sestra', s: 3, e: '👩' },
    { ar: 'Дедушка', ok: 'Deduşka', tr: 'Dede', s: 3, e: '👴' },
    { ar: 'Бабушка', ok: 'Babuška', tr: 'Nine', s: 3, e: '👵' },
    { ar: 'Ребенок', ok: 'Rebönok', tr: 'Bebek', s: 3, e: '👶' },
    { ar: 'Семья', ok: 'Semya', tr: 'Aile', s: 3, e: '🏠' },

    // Renkler (s: 4)
    { ar: 'Красный', ok: 'Krasnıy', tr: 'Kırmızı', s: 4, e: '🔴' },
    { ar: 'Синий', ok: 'Siniy', tr: 'Mavi', s: 4, e: '🔵' },
    { ar: 'Желтый', ok: 'Joltıy', tr: 'Sarı', s: 4, e: '🟡' },
    { ar: 'Зеленый', ok: 'Zelenıy', tr: 'Yeşil', s: 4, e: '🟢' },
    { ar: 'Оранжевый', ok: 'Oranjenıy', tr: 'Turuncu', s: 4, e: '🟠' },
    { ar: 'Фиолетовый', ok: 'Fioletovıy', tr: 'Mor', s: 4, e: '🟣' },
    { ar: 'Розовый', ok: 'Rozovıy', tr: 'Pembe', s: 4, e: '<span style="color:#FF007F">⬤</span>' },
    { ar: 'Черный', ok: 'Çornıy', tr: 'Siyah', s: 4, e: '⚫' },
    { ar: 'Белый', ok: 'Belıy', tr: 'Beyaz', s: 4, e: '⚪' },
    { ar: 'Коричневый', ok: 'Koriçnevıy', tr: 'Kahverengi', s: 4, e: '🟤' },

    // Hayvanlar 1 (s: 5)
    { ar: 'Кошка', ok: 'Koşka', tr: 'Kedi', s: 5, e: '🐱' },
    { ar: 'Собака', ok: 'Sobaka', tr: 'Köpek', s: 5, e: '🐶' },
    { ar: 'Птица', ok: 'Ptitsa', tr: 'Kuş', s: 5, e: '🐦' },
    { ar: 'Рыба', ok: 'Rıba', tr: 'Balık', s: 5, e: '🐟' },
    { ar: 'Лев', ok: 'Lev', tr: 'Aslan', s: 5, e: '🦁' },
    { ar: 'Слон', ok: 'Slon', tr: 'Fil', s: 5, e: '🐘' },
    { ar: 'Обезьяна', ok: 'Obezayana', tr: 'Maymun', s: 5, e: '🐵' },
    { ar: 'Кролик', ok: 'Krolik', tr: 'Tavşan', s: 5, e: '🐰' },
    { ar: 'Медведь', ok: 'Medved', tr: 'Ayı', s: 5, e: '🐻' },
    { ar: 'Лошадь', ok: 'Loşad', tr: 'At', s: 5, e: '🐴' },

    // Hayvanlar 2 (s: 6)
    { ar: 'Корова', ok: 'Korova', tr: 'İnek', s: 6, e: '🐄' },
    { ar: 'Овца', ok: 'Ovtsa', tr: 'Koyun', s: 6, e: '🐑' },
    { ar: 'Курица', ok: 'Kuritsa', tr: 'Tavuk', s: 6, e: '🐔' },
    { ar: 'Утка', ok: 'Utka', tr: 'Ördek', s: 6, e: '🦆' },
    { ar: 'Бабочка', ok: 'Baboçka', tr: 'Kelebek', s: 6, e: '🦋' },
    { ar: 'Лягушка', ok: 'Lyaguşka', tr: 'Kurbağa', s: 6, e: '🐸' },
    { ar: 'Черепаха', ok: 'Çerepaha', tr: 'Kaplumbağa', s: 6, e: '🐢' },
    { ar: 'Жираф', ok: 'Jiraf', tr: 'Zürafa', s: 6, e: '🦒' },
    { ar: 'Зебра', ok: 'Zebra', tr: 'Zebra', s: 6, e: '🦓' },
    { ar: 'Пингвин', ok: 'Pingvin', tr: 'Penguen', s: 6, e: '🐧' },

    // Meyveler (s: 7)
    { ar: 'Яблоко', ok: 'Yabloko', tr: 'Elma', s: 7, e: '🍎' },
    { ar: 'Банан', ok: 'Banan', tr: 'Muz', s: 7, e: '🍌' },
    { ar: 'Апельсин', ok: 'Apelsin', tr: 'Portakal', s: 7, e: '🍊' },
    { ar: 'Клубника', ok: 'Klubnika', tr: 'Çilek', s: 7, e: '🍓' },
    { ar: 'Виноград', ok: 'Vinograd', tr: 'Üzüm', s: 7, e: '🍇' },
    { ar: 'Арбуз', ok: 'Arbuz', tr: 'Karpuz', s: 7, e: '🍉' },
    { ar: 'Лимон', ok: 'Limon', tr: 'Limon', s: 7, e: '🍋' },
    { ar: 'Вишня', ok: 'Vişnya', tr: 'Kiraz', s: 7, e: '🍒' },
    { ar: 'Персик', ok: 'Persik', tr: 'Şeftali', s: 7, e: '🍑' },
    { ar: 'Груша', ok: 'Gruşa', tr: 'Armut', s: 7, e: '🍐' },

    // Sayılar (s: 2)
    { ar: 'Один', ok: 'Odin', tr: 'Bir', s: 2, e: '1️⃣' },
    { ar: 'Два', ok: 'Dva', tr: 'İki', s: 2, e: '2️⃣' },
    { ar: 'Три', ok: 'Tri', tr: 'Üç', s: 2, e: '3️⃣' },
    { ar: 'Четыре', ok: 'Çetıre', tr: 'Dört', s: 2, e: '4️⃣' },
    { ar: 'Пять', ok: 'Pyat', tr: 'Beş', s: 2, e: '5️⃣' },
    { ar: 'Шесть', ok: 'Şest', tr: 'Altı', s: 2, e: '6️⃣' },
    { ar: 'Семь', ok: 'Sem', tr: 'Yedi', s: 2, e: '7️⃣' },
    { ar: 'Восемь', ok: 'Vosem', tr: 'Sekiz', s: 2, e: '8️⃣' },
    { ar: 'Девять', ok: 'Devyat', tr: 'Dokuz', s: 2, e: '9️⃣' },
    { ar: 'Десять', ok: 'Desyat', tr: 'On', s: 2, e: '🔟' },

    // Şekiller (s: 21)
    { ar: 'Круг', ok: 'Kruk', tr: 'Daire', s: 21, e: '⭕' },
    { ar: 'Квадрат', ok: 'Kvadrat', tr: 'Kare', s: 21, e: '⬜' },
    { ar: 'Треугольник', ok: 'Treugolnik', tr: 'Üçgen', s: 21, e: '🔺' },
    { ar: 'Прямоугольник', ok: 'Pryamougolnik', tr: 'Dikdörtgen', s: 21, e: '▬' },
    { ar: 'Звезда', ok: 'Zvezda', tr: 'Yıldız', s: 21, e: '⭐' },
    { ar: 'Сердце', ok: 'Serdtse', tr: 'Kalp', s: 21, e: '❤️' },
    { ar: 'Линия', ok: 'Liniya', tr: 'Çizgi', s: 21, e: '➖' },
    { ar: 'Точка', ok: 'Toçka', tr: 'Nokta', s: 21, e: '•' },

    // Mutfak (s: 22)
    { ar: 'Тарелка', ok: 'Tarelka', tr: 'Tabak', s: 22, e: '🍽️' },
    { ar: 'Стакан', ok: 'Stakan', tr: 'Bardak', s: 22, e: '🥛' },
    { ar: 'Ложка', ok: 'Lojka', tr: 'Kaşık', s: 22, e: '🥄' },
    { ar: 'Вилка', ok: 'Vilka', tr: 'Çatal', s: 22, e: '🍴' },
    { ar: 'Нож', ok: 'Noj', tr: 'Bıçak', s: 22, e: '🔪' },
    { ar: 'Кастрюля', ok: 'Kastrülya', tr: 'Tencere', s: 22, e: '🍲' },
    { ar: 'Сковорода', ok: 'Skovoroda', tr: 'Tava', s: 22, e: '🍳' },
    { ar: 'Миска', ok: 'Miska', tr: 'Kase', s: 22, e: '🥣' },
    { ar: 'Чашка', ok: 'Çaşkka', tr: 'Fincan', s: 22, e: '☕' },
    { ar: 'Духовка', ok: 'Duhovka', tr: 'Fırın', s: 22, e: '♨️' }
];
