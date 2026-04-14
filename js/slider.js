document.addEventListener("DOMContentLoaded", () => {

    const swipers = document.querySelectorAll(".mySwiper");

    swipers.forEach((container) => {

        const swiper = new Swiper(container, {
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: container.querySelector(".swiper-pagination"),
                clickable: true,
            },
            navigation: {
                nextEl: container.querySelector(".swiper-button-next"),
                prevEl: container.querySelector(".swiper-button-prev"),
            },
        });

        // Hover events for each swiper
        container.addEventListener("mouseenter", () => {
            swiper.autoplay.stop();
        });

        container.addEventListener("mouseleave", () => {
            swiper.autoplay.start();
        });

    });

});