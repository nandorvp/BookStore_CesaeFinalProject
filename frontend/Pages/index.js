$(document).mousemove(function (event) {
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
    mouseYpercentage = Math.round((event.pageY / windowHeight) * 100);

    $('.radial-gradient').css(
        'background',
        'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #923CB5, #000000)'
    );
});

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    let currentSlide = 0;

    function goToSlide(slideIndex) {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(-${100 * slideIndex}%)`;
        });
        currentSlide = slideIndex;
    }

    prevButton.addEventListener("click", function () {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
        }
    });
});



var carousel1 = $(".carousel1");
var currdeg1 = 0;
var num1 = 1;

$(".next").on("click", { d: "x" }, rotateCarousel1);
$(".prev").on("click", { d: "z" }, rotateCarousel1);

function rotateCarousel1(f) {
    if (f.data.d == "x") {
        currdeg1 = currdeg1 - 45;
        $(".text" + num1).fadeOut();
        $(".button" + num1).fadeOut();
        if (num1 == 8) {
            num1 = 1;
        } else {
            num1 = num1 + 1;
        }
        $(".button" + num1).fadeIn();
        $(".text" + num1).fadeIn();
    }
    if (f.data.d == "z") {
        currdeg1 = currdeg1 + 45;
        $(".text" + num1).fadeOut();
        $(".button" + num1).fadeOut();
        if (num1 == 1) {
            num1 = 8;
        } else {
            num1 = num1 - 1;
        }
        $(".button" + num1).fadeIn();
        $(".text" + num1).fadeIn();
    }
    carousel1.css({
        "-webkit-transform": "rotateY(" + currdeg1 + "deg)",
        "-moz-transform": "rotateY(" + currdeg1 + "deg)",
        "-o-transform": "rotateY(" + currdeg1 + "deg)",
        "transform": "rotateY(" + currdeg1 + "deg)",
    });
}

var carousel2 = $(".carousel2");
var currdeg2 = 0;
var num2 = 1;

$(".next2").on("click", { d: "n" }, rotateCarousel2);
$(".prev2").on("click", { d: "p" }, rotateCarousel2);

function rotateCarousel2(e) {
    if (e.data.d == "n") {
        currdeg2 = currdeg2 - 45;
        $(".text" + num2).fadeOut();
        $(".button" + num2).fadeOut();
        if (num2 == 8) {
            num2 = 1;
        } else {
            num2 = num2 + 1;
        }
        $(".button" + num2).fadeIn();
        $(".text" + num2).fadeIn();
    }
    if (e.data.d == "p") {
        currdeg2 = currdeg2 + 45;
        $(".text" + num2).fadeOut();
        $(".button" + num2).fadeOut();
        if (num2 == 1) {
            num2 = 8;
        } else {
            num2 = num2 - 1;
        }
        $(".button" + num2).fadeIn();
        $(".text" + num2).fadeIn();
    }

    carousel2.css({
        "-webkit-transform": "rotateY(" + currdeg2 + "deg)",
        "-moz-transform": "rotateY(" + currdeg2 + "deg)",
        "-o-transform": "rotateY(" + currdeg2 + "deg)",
        "transform": "rotateY(" + currdeg2 + "deg)",
    });
}
