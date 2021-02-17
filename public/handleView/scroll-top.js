// handle click scroll to top
export function scrollTop() {
    $('.scroll_top > #scroll_top-btn').click(function() {
        $("html, body").animate({scrollTop: 0}, 500);
    })
    document.addEventListener("scroll", function() {
        if(window.scrollY >= 140) {
            $('.scroll_top > #scroll_top-btn').fadeIn(200);
    
        }else {
            $('.scroll_top > #scroll_top-btn').fadeOut(200);
        }
    })
}
