const front_image = document.querySelectorAll('.front_image');
const lang_image = document.querySelectorAll('.lang_image');

const nav_bar = document.querySelector('.nav_bar');
const content_anim = document.querySelectorAll('.content_anim');
const main_socials_anim = document.querySelectorAll('.main_socials_anim');
const section_btn = document.querySelectorAll('.section_btn');
const section_headline = document.querySelectorAll('.section_headline');

// footer email phone links
const footer_socials = document.querySelectorAll('.footer_socials');
const onlyfade = document.querySelectorAll('.onlyfade');
const experience_card = document.querySelector('.experience_card');
const project_card = document.querySelectorAll('.project-card');
const contact_information = document.querySelector('.contact_information');
const contact_form = document.querySelector('.contact_form');



project_card.forEach((card, index) => {
    if (index % 2 == 0) {
        card.classList.add('left');
    }
    else {
        card.classList.add('right');
    }
})





















const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            console.log(entry.target);
        }
    });
},
    {
        threshold: 0.1
    });
front_image.forEach(el => observer.observe(el));

observer.observe(nav_bar);
observer.observe(experience_card);
observer.observe(contact_information);
observer.observe(contact_form);
content_anim.forEach(el => observer.observe(el));
main_socials_anim.forEach(el => observer.observe(el));
section_btn.forEach(el => observer.observe(el));
section_headline.forEach(el => observer.observe(el));
footer_socials.forEach(el => observer.observe(el));
onlyfade.forEach(el => observer.observe(el));
lang_image.forEach(el => observer.observe(el));
project_card.forEach(card => observer.observe(card));
