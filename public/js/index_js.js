$(document).mousemove(function(event) {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    
    mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
    mouseYpercentage = Math.round(event.pageY / windowHeight * 100);
    
    $('.radial-gradient').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #923CB5, #000000)');
  });

//-----------------------------------------------------------------------------
var carousel1 = $(".carousel1"),
    currdeg = 0,
    num = 1;

$(".next").on("click", { d: "x" }, rotate);
$(".prev").on("click", { d: "z" }, rotate);

function rotate(f) {
    if (f.data.d == "x") {
        currdeg = currdeg - 45;
        $(".text" + num).fadeOut();
        if (num == 8) {
            num = 1;
        } else {
            num = num + 1;
        }
        $(".text" + num).fadeIn();
    }
    if (f.data.d == "z") {
        currdeg = currdeg + 45;
        $(".text" + num).fadeOut();
        if (num == 1) {
            num = 8;
        } else {
            num = num - 1;
        }
        $(".text" + num).fadeIn();
    }
    carousel1.css({
        "-webkit-transform": "rotateY(" + currdeg + "deg)",
        "-moz-transform": "rotateY(" + currdeg + "deg)",
        "-o-transform": "rotateY(" + currdeg + "deg)",
        "transform": "rotateY(" + currdeg + "deg)"
    });
}

// -----------------------------------------------------
var carousel2 = $(".carousel2"),
    currdeg = 0,
    num = 1;

$(".next2").on("click", { d: "n" }, rotate);
$(".prev2").on("click", { d: "p" }, rotate);

function rotate(e) {
    if (e.data.d == "n") {
        currdeg = currdeg - 45;
        $(".text" + num).fadeOut();
        $(".button" + num).fadeOut();
        if (num == 8) {
            num = 1;
        } else {
            num = num + 1;
        }
        $(".button" + num).fadeIn();
        $(".text" + num).fadeIn();
    }
    if (e.data.d == "p") {
        currdeg = currdeg + 45;
        $(".text" + num).fadeOut();
        $(".buttonn" + num).fadeOut();
        if (num == 1) {
            num = 8;
        } else {
            num = num - 1;
        }
        $(".text" + num).fadeIn();
        $(".button" + num).fadeIn();
    }

    
    
    carousel2.css({
        "-webkit-transform": "rotateY(" + currdeg + "deg)",
        "-moz-transform": "rotateY(" + currdeg + "deg)",
        "-o-transform": "rotateY(" + currdeg + "deg)",
        "transform": "rotateY(" + currdeg + "deg)"
    });
}
//----------------------------------------------------------------------------------------------------

