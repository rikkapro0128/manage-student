export function configCarousel () {
    $('.owl-carousel').owlCarousel({
        items: 6,
        autoplay: true,
        autoplayTimeout: 5000,
        rewind: true,
        nav: true,
        navText: ['', '']
    });
}
