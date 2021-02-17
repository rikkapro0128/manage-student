export function handleFormSigned() {
    const photoSign = {
        in: '../img/bg_signin.jpg',
        up: '../img/bg_signup.jpg',
    }
    const textSignIn = 'Signin';
    const textSignUp = 'Signup';
    const signIn = $('.tab .tab-item')[0]; // signIn
    const signUp = $('.tab .tab-item')[1]; // signUp 

    function lookParent(element) {
        if(element.parent('.form-group').css('display') === 'none') {
            element.removeAttr('required');
        }else {
            element.prop('required', true);
        }
        return element.parent('.form-group');
    }

    function lookChild() {
        const rePassword = $('.form-group').children('#re-password');
        return $(lookParent(rePassword));
    }

    function changePhoto(element, link) {
        $(element).removeAttr('src');
        $(element).attr('src', link);
    }

    $(signIn).on('click', function() {
        const isActive = $(this).hasClass('is-active');
        const imageSignIn = $('.sign-image');
        const signHeading = $('.signin-heading');
        const btnText = $('.btn-sign');
        const form = $('form');
        if(!isActive) {
            $(this).addClass('is-active') // change action click on element
            $(signUp).removeClass('is-active') // like top
            lookChild().hide(); // hide repeat password
            lookChild().next('.signup-term').hide(); // hide like top but is signup term
            changePhoto(imageSignIn, photoSign.in); // change photo login
            signHeading.text(textSignIn); // change heading signIn
            btnText.text(textSignIn); // change text btn
            form.attr('action', '/public/action-login')
        }else {
            return;
        }
    })
    $(signUp).on('click', function() {
        const isActive = $(this).hasClass('is-active');
        const imageSignIn = $('.sign-image');
        const signHeading = $('.signup-heading');
        const btnText = $('.btn-sign');
        const form = $('form');
        if(!isActive) {
            $(this).addClass('is-active')
            $(signIn).removeClass('is-active')
            lookChild().show();
            lookChild().next('.signup-term').show();
            changePhoto(imageSignIn, photoSign.up);
            signHeading.text(textSignUp);
            btnText.text(textSignUp);
            form.attr('action', '/public/action-registration')
        }else {
            return;
        }
    }) 
}