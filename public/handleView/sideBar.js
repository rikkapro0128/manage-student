document.addEventListener("DOMContentLoaded", function() {

    let count = 0;
    let position = 0; 
    let isDrag = false;
    let isDrop = false;

    class side {
        
        hold(event) {
            $(this).on('mousemove', sideShow.drag);
        }
        drag(event) {
            console.log('draging!')
            console.log('X: ' + event.pageX + 'Y: ' + event.pageY)
        }
        drop(event) {
            console.log('remove mousedown')
            $(this).off('mousemove')
        }
        
    }
    
    let sideShow = new side();
    
    $('.story_appoint').on('mousedown', sideShow.hold);
    $('.story_appoint').on('mouseup', sideShow.drop);

    setInterval(function() {
        position += 190;
        count += 1;
        if(count < 5) {
            $('.story_appoint').css('transform', `translate3d(-${position}px, 0px, 0px)`)
        }else {
            position = 0;
            count = 0;
        }
    }, 4000)
    
    

});