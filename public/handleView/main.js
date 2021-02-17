import { configCarousel } from './config-carousel.js';
import { handleButton } from './handle-button.js';
import { handleToken } from './handle-sign.js';
import { scrollTop } from './scroll-top.js';
import { handleFormSigned } from './form-sign.js';

$('document').ready(function() {
    handleToken();  // show token testing
    configCarousel(); // config sidebar of OWL
    handleButton(); // handle event click on header
    scrollTop(); // handle click scroll to top
    handleFormSigned(); // handle form sign-in and signup
})