// Handle hide user profile if user click different area
import { eraseCookie } from './handle-token.js';
export function handleButton() {
    $(document).click(function(event) {
        //Hide the menus if visible
        if($(event.target).closest('.manager ._user').length && !$('.manager ._user').hasClass('show')) {
            $('.manager ._user .--dropdown').show();
            $('.manager ._user').addClass('show');
        }else {
            $('.manager ._user .--dropdown').hide();    
            $('.manager ._user').removeClass('show');
        }
        if($(event.target).closest('.--dropdown').length) {
            $('.manager ._user .--dropdown').show();
        }
    });
    $('.logout').click(function(event) {
        event.preventDefault();
        eraseCookie('Authorization');
        location.replace(location.origin + `/home`);
    })
}
