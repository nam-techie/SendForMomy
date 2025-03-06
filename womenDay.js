window.onload = () => {
    let backgroundMusic = document.getElementById("backgroundMusic");

    // Đặt màu nền ngay từ khi trang tải
    $(".container").css("background-color", "#fde4ec");

    // Bắt người dùng tương tác trước khi phát nhạc để tránh bị chặn autoplay
    document.body.addEventListener("click", () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            console.log("🎵 Phát nhạc nền golden_hour.mp3");
        }
    }, { once: true }); // Chỉ chạy một lần duy nhất

    console.log("✅ Trang đã tải xong, nền được đặt, nhạc sẽ phát sau khi người dùng click.");
};



$("#messageState").on("change", () => {
    let heartAudio = document.getElementById("heartAudio"); // Nhạc khi mở thư
    let backgroundMusic = document.getElementById("backgroundMusic"); // Nhạc nền

    $(".message").removeClass("openNor closeNor");

    if ($("#messageState").is(":checked")) {
        // 🟢 MỞ THƯ
        $(".message").removeClass("closed no-anim").addClass("openNor");
        $(".heart").removeClass("closeHer openedHer").addClass("openHer");
        $(".container").stop().animate({"backgroundColor": "#f48fb1"}, 2000);

        $(".instruction").fadeOut(); // Ẩn chữ "Nhấn zô đây"
        setTimeout(() => {
            $(".gif-container").fadeIn(1000);
        }, 2000);

        // Dừng nhạc nền, phát nhạc thư
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        heartAudio.play();

        console.log("📖 Mở thư, phát nhạc mpe.audio.mp3, tắt nhạc nền");
    } else {
        // 🔴 ĐÓNG THƯ (QUAY VỀ TRẠNG THÁI BAN ĐẦU)
        $(".message").removeClass("no-anim").addClass("closeNor");
        $(".heart").removeClass("openHer openedHer").addClass("closeHer");
        $(".container").stop().animate({"backgroundColor": "#fde4ec"}, 2000);

        $(".instruction").fadeIn(); // Hiện lại chữ "Nhấn zô đây"
        $(".gif-container").fadeIn(1000); // GIỮ GIF lại

        // Dừng nhạc thư, phát nhạc nền trở lại
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
