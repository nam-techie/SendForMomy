window.onload = () => {
    let backgroundMusic = document.getElementById("backgroundMusic");

    // Chỉ phát nhạc sau khi người dùng có tương tác
    document.body.addEventListener("click", () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            console.log("🎵 Phát nhạc nền golden_hour.mp3");
        }
    }, { once: true }); // Chạy một lần duy nhất

    console.log("✅ Trang đã tải xong, chờ tương tác để phát nhạc.");
};

// Hàm tạo trái tim với màu ngẫu nhiên
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    
    // Màu sắc ngẫu nhiên cho trái tim (sử dụng màu trong suốt)
    const colors = [
        'rgba(255, 0, 128, 0.6)',  // Hồng đậm trong suốt
        'rgba(255, 105, 180, 0.6)', // Hồng nhạt trong suốt
        'rgba(255, 20, 147, 0.6)',  // Deep pink trong suốt
        'rgba(219, 112, 147, 0.6)', // Pale violet red trong suốt
        'rgba(255, 182, 193, 0.6)', // Light pink trong suốt
        'rgba(255, 0, 255, 0.6)'    // Magenta trong suốt
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Kích thước ngẫu nhiên (tăng kích thước lớn hơn)
    const size = Math.random() * (120 - 60) + 60;
    
    // Vị trí ngẫu nhiên theo chiều ngang
    const left = Math.random() * 100;
    
    // Tốc độ bay ngẫu nhiên
    const duration = Math.random() * (15 - 10) + 10;
    
    // Tạo hiệu ứng trái tim phát sáng
    heart.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: ${randomColor};
        animation-duration: ${duration}s;
        box-shadow: 0 0 20px ${randomColor};
    `;
    
    // Thêm trái tim vào container
    document.querySelector('.container').appendChild(heart);
    
    // Xóa trái tim sau khi animation kết thúc
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Hàm tạo nhiều trái tim liên tục
function createHearts() {
    // Tạo nhiều trái tim cùng lúc để có hiệu ứng dày đặc hơn
    const interval = setInterval(() => {
        for(let i = 0; i < 3; i++) { // Tạo 3 trái tim mỗi lần
            setTimeout(() => createHeart(), i * 100);
        }
    }, 300);

    window.heartsInterval = interval;
}

$("#messageState").on("change", () => {
    let heartAudio = document.getElementById("heartAudio");
    let backgroundMusic = document.getElementById("backgroundMusic");

    $(".message").removeClass("openNor closeNor");

    if ($("#messageState").is(":checked")) {
        // 🟢 MỞ THƯ
        // Dừng tạo trái tim nếu đang chạy
        if (window.heartsInterval) {
            clearInterval(window.heartsInterval);
        }
        
        $(".message").removeClass("closed no-anim").addClass("openNor");
        $(".heart").removeClass("closeHer openedHer").addClass("openHer");
        $(".container").stop().animate({"backgroundColor": "#f48fb1"}, 2000);

        $(".instruction").fadeOut();
        setTimeout(() => {
            $(".gif-container").fadeIn(1000);
        }, 2000);

        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        heartAudio.play();

        console.log("📖 Mở thư, phát nhạc mpe.audio.mp3, tắt nhạc nền");
    } else {
        // 🔴 ĐÓNG THƯ
        $(".message").removeClass("no-anim").addClass("closeNor");
        $(".heart").removeClass("openHer openedHer").addClass("closeHer");
        $(".container").stop().animate({"backgroundColor": "#fde4ec"}, 2000);

        $(".instruction").fadeIn();
        $(".gif-container").fadeIn(1000);

        // Bắt đầu tạo trái tim liên tục
        createHearts();

        heartAudio.pause();
        heartAudio.currentTime = 0;
        backgroundMusic.play();

        console.log("🔄 Đóng thư, quay về trang ban đầu, phát nhạc golden_hour.mp3");
    }
});

// **Tự động phát nhạc nền khi tải trang**
window.onload = () => {
    let backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.play();
};

$(".message").on("animationend webkitAnimationEnd oanimationend msAnimationEnd", () => {
    if ($(".message").hasClass("closeNor")) {
        $(".message").addClass("closed");
    }
    $(".message").removeClass("openNor closeNor").addClass("no-anim");
});

$(".heart").on("animationend webkitAnimationEnd oanimationend msAnimationEnd", () => {
    if (!$(".heart").hasClass("closeHer")) {
        $(".heart").addClass("openedHer beating");
    } else {
        $(".heart").addClass("no-anim").removeClass("beating");
    }
    $(".heart").removeClass("openHer closeHer");
});
