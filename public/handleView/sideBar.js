document.addEventListener("DOMContentLoaded", function() {

    let count = 0;
    let position = 0; 
    let isDrop = false;
    let isHold = false;
    let isDrag = false;
    let point = 0;
    let speed = 20;
    let coordinate = {
        mouseX: 0,
        mouseY: 0,
    }

    class side {
        leftOrRight(entry, present, element) {
            // console.log(entry, ' ', present) 
            if(entry > present) {
                point += -speed;
                if(point <= -760) {
                    point = -760;
                }
                $(element).css({    
                    // translate to left
                    transform: `translate3d(${point}px, 0px, 0px)`,
                    transition: ``, 
                    // you have () when write event.pageX - coordinate.mouseX
                })
            }
            else {
                point += speed;
                if(point >= 0) {
                    point = 0;
                }
                $(element).css({
                    // translate to right
                    transform: `translate3d(${point}px, 0px, 0px)`,
                    transition: ``, 
                    // you have () when write event.pageX - coordinate.mouseX
                })
            }
            console.log(point)  
            
        }
        hold(event) {
            isHold = true;
            isDrop = false;
            isDrag = true;
            coordinate.mouseX = event.pageX;
            coordinate.mouseY = event.pageY;
        }
        drag(event) {
            if(!isDrop && isHold) {
                sideShow.leftOrRight(coordinate.mouseX, event.pageX, this)
                if(isDrag) {
                    $(this).find('a').on('click', function(event) {
                        event.preventDefault();
                    })
                }
            }
        }
        drop(event) {
            isDrop = true;
            isHold = true;
            isDrag = false;
        }
        
    }
    
    const sideShow = new side();
    
    $('.story_appoint').on('mousedown', sideShow.hold);
    $('.story_appoint').on('mouseup', sideShow.drop);
    $('.story_appoint').on('mousemove', sideShow.drag);

    if(!isDrag) {
        setInterval(function() {
            console.log(isDrag)
            if(count < 5) {
                $('.story_appoint').css({
                    transform: `translate3d(-${position}px, 0px, 0px)`,
                    transition: `all 800ms ease-in-out`,
                })
                position += 190;
                count += 1;
            }else {
                position = 0;
                count = 0;
            }
        }, 4000)
    }
    
});