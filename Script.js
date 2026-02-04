document.addEventListener('DOMContentLoaded', function() {

    // --- 1. PERSONALIASASI NAMA TAMU (Poin: Data Penerima) ---
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    
    if (guestName) {
        document.getElementById('guest-name').innerText = decodeURIComponent(guestName);
    }

    // --- 2. LOGIKA TOMBOL BUKA UNDANGAN (BARU) ---
    const cover = document.getElementById('cover');
    const content = document.getElementById('content');
    const openButton = document.getElementById('open-invitation');
    const music = document.getElementById('background-music');
    const playBtn = document.getElementById('play-pause-btn');

    openButton.addEventListener('click', function() {
        // 1. Sembunyikan cover
        cover.classList.add('hidden');
        
        // 2. Tampilkan konten utama
        content.style.display = 'block';

        // 3. Putar musik (solusi terbaik untuk autoplay)
        music.play();
        playBtn.classList.add('playing');
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
    });

    // --- 3. HITUNG MUNDUR (Poin: Hitung Mundur) ---
    const targetDate = new Date("Feb 14, 2026 07:00:00").getTime(); // GANTI TANGGAL

    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById("timer").innerHTML = "Acara Telah Selesai";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }, 1000);

    // --- 4. KONTROL MUSIK (Poin: Lagu) ---
    playBtn.addEventListener('click', function() {
        if (music.paused) {
            music.play();
            playBtn.classList.add('playing');
            playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'; // Icon Volume
        } else {
            music.pause();
            playBtn.classList.remove('playing');
            playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="22" y1="9" x2="16" y2="15"></line><line x1="16" y1="9" x2="22" y2="15"></line></svg>'; // Icon Mute
        }
    });

    // --- 5. FORM KOMENTAR (Poin: Komentar Ucapan) ---
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const name = document.getElementById('comment-name').value;
        const message = document.getElementById('comment-message').value;
        alert(`Terima kasih, ${name}!\nUcapan Anda: "${message}"\n\n(Catatan: Ini hanya demo, ucapan belum tersimpan.)`);
        commentForm.reset();
    });

    // --- 6. MODAL AMPLOP DIGITAL (Poin: Amplop Digital) ---
    const modal = document.getElementById('gift-modal');
    const giftBtn = document.getElementById('gift-button');
    const closeBtn = document.querySelector('.close-button');

    giftBtn.onclick = () => modal.style.display = "block";
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    // Fungsi Salin No. Rek
    const copyBtn = document.querySelector('.btn-copy');
    copyBtn.onclick = function() {
        const rekBCA = "1234567890"; // Ganti dengan no rek asli
        navigator.clipboard.writeText(rekBCA).then(() => {
            alert('Nomor rekening BCA berhasil disalin!');
        });
    }

    // --- 7. ANIMASI SAAT SCROLL (BARU) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Hapus komentar ini jika ingin animasi hanya terjadi sekali
            }
        });
    }, {
        threshold: 0.1 // Muncul saat 10% elemen terlihat
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
