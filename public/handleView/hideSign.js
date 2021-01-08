document.addEventListener("DOMContentLoaded", function() {

    function getCookie(name = 'Authorization') {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    if(!getCookie()) {
        $(".box_sign[id='boxLogout']").remove();
    }else {
        $(".box_sign[id='boxSign']").remove();
    }

});