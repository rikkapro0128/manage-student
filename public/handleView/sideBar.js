document.addEventListener("DOMContentLoaded", function() {

    // let time = 5000;
    // let position = 0; 
    // let isDrop = false;
    // // let isHold = false;
    // // let isDrag = false;
    // let click = false;
    // let loop;

    // class side {
        
    //     nextSide(position, timeSmooth) {
    //         $('.story_appoint').css({
    //             transform: `translate3d(${position}px, 0px, 0px)`,
    //             transition: `all ${timeSmooth}ms ease`,
    //         })
    //     }
    //     loopSide(time) {
    //         if(!click || isDrop) {
    //             loop = setInterval(() => {
    //                 if(position === -760) {
    //                     position = 0;
    //                     sideShow.nextSide(position, 1000);
    //                 }else {
    //                     position += -190;
    //                     sideShow.nextSide(position, 800);
    //                 }
    //             }, time);
    //         }
    //     }
    //     resetInterval(time) {
    //         clearInterval(loop)
    //         sideShow.loopSide(time);
    //     }
    //     clickLeft() {
    //         console.log('click left')
    //         click = true;
    //         if(position === 0) {
    //             position = -760;
    //             sideShow.nextSide(position, 1000);
    //         }else {
    //             position += 190;
    //             sideShow.nextSide(position, 300);
    //         }
    //         click = false;
    //     }
    //     clickRight() {
    //         console.log('click right')
    //         click = true;
    //         if(position === -760) {
    //             position = 0;
    //             sideShow.nextSide(position, 1000);
    //         }else {
    //             position += -190;
    //             sideShow.nextSide(position, 300);
    //         }
    //         click = false;
    //     }
        
    // }
    
    // const sideShow = new side();
    
    // // $('.story_appoint').on('mousemove', sideShow.drag);

    // sideShow.loopSide(time);

    // // add event listener
    // // $('.story_appoint').on('mousedown', sideShow.hold);
    // // $('.story_appoint').on('mouseup', sideShow.drop);
    // $('.--redirect .-left').on('click', sideShow.clickLeft)
    // $('.--redirect .-right').on('click', sideShow.clickRight)
    // $('.--redirect .-left').on('mouseup', sideShow.resetInterval(time))
    // $('.--redirect .-right').on('mouseup', sideShow.resetInterval(time))
    
    $(".owl-carousel").owlCarousel({
        items: 6,
        autoplay: true,
        autoplayTimeout: 5000,
        rewind: true,
        nav: true,
        navText: ['', '']
    });
    
});