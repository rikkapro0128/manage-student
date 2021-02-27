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

    $('#accept-make-author').click(function(event) {
        const data = { changeUser: 'author' };
        fetch('http://localhost:19436/private/accept-make-author', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if(data.isSucess) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Bạn đăng ký thành công rồi đoá!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            setTimeout(() => {
                location.reload();
            }, 2000);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })

    $('#add-story').click(function() {
        location.href = 'http://localhost:19436/private/upload-story/add';
    })
}
