var index = 0;
var li = $(".banner ul li");
var img = $(".music .m_img img");
var text = $(".music .m_text");
var prev = $(".music .m_btn .m_prev");
var play = $(".music .m_btn .m_play");
var next = $(".music .m_btn .m_next");
var mp3 = $(".music .m_mp3");
var flag = false; // if a song is being played
var close = true; // if the player should be displayed


li.click (function(){
    // console.log($(this).index());

    index = $(this).index();

    show();
});

function show() {
    // change background picture
    change_bg(index+1);

    // change player text and pictures
    change_img_text(index+1);

    // change the player button to pause
    change_btn_title();

    // rotate the picture
    img_rotate();

    // play mp3
    play_mp3();
}

function change_bg(idx) {
    $("body").css({
        "background": "url(img/" + idx + "_bg.jpg)",
        "background-size": "cover"
    });
}

function change_img_text(idx) {
    img.attr("src", "img/img" + idx + ".jpg");
    text.html(li.eq(index).attr("title"));
}

function change_btn_title() {
    play.removeClass("m_play");
    play.addClass("m_pause");
    play.attr("title", "pause");
}

function img_rotate() {
    li.children().removeClass("img_rotate");
    li.eq(index).children().addClass("img_rotate");
}

function play_mp3() {
    mp3.attr("src", li.eq(index).attr("datasrc"));
    mp3.get(0).play();
    flag = true;
}

play.click(function() {
    if (flag) {
        mp3.get(0).pause();
        li.eq(index).children().removeClass("img_rotate"); // remove picture rotation
        play.removeClass("m_pause").addClass("m_play").attr("title", "play");
        flag = false;
    } else {
        mp3.get(0).play();
        li.eq(index).children().addClass("img_rotate");
        play.removeClass("m_play").addClass("m_pause").attr("title", "pause");
        flag = true;
        change_bg(index+1);
    }
});

prev.click(function() {
    index--;
    if (index < 0) {
        index = li.length - 1;
    }
    show();
});

next.click(function() {
    index++;
    if (index > li.length - 1) {
        index = 0;
    }
    show();
});

$(".m_close").click(function() {
    if (close) {
        $(this).addClass("m_open");
        $(".music").animate({"left": "-597px"}, 800);
        close = false;
    } else {
        $(this).removeClass("m_open");
        $(".music").animate({"left": "0px"}, 800);
        close = true;
    }
});

