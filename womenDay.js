$("#messageState").on("change", () => {
    let audio = document.getElementById("heartAudio");

    $(".message").removeClass("openNor closeNor");

    if ($("#messageState").is(":checked")) {
        $(".message").removeClass("closed no-anim").addClass("openNor");
        $(".heart").removeClass("closeHer openedHer").addClass("openHer");
        $(".container").stop().animate({"backgroundColor": "#f48fb1"}, 2000);
        $(".heart").css("z-index", "5");

        // Chờ animation mở thư hoàn thành rồi mới hiện GIF
        setTimeout(() => {
            $(".gif-container").fadeIn(1000);
        }, 2000);

        // Phát âm thanh khi trái tim được bấm
        audio.play();

        console.log("Mở thư, hiển thị ảnh GIF và phát nhạc");
    } else {
        $(".message").removeClass("no-anim").addClass("closeNor");
        $(".heart").removeClass("openHer openedHer").addClass("closeHer");
        $(".container").stop().animate({"backgroundColor": "#fce4ec"}, 2000);
        $(".heart").css("z-index", "1");

        // Ẩn GIF ngay khi thư bắt đầu đóng
        $(".gif-container").fadeOut(500);

        // Dừng nhạc khi thư đóng
        audio.pause();
        audio.currentTime = 0; // Reset nhạc về đầu

        console.log("Đóng thư, ẩn ảnh GIF và dừng nhạc");
    }
});


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
