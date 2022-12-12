/*---------------------- MENU SHOW Y HIDDEN ----------------------*/
const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close")


/*---------------------- MENU SHOW ----------------------*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*---------------------- MENU HIDDEN ----------------------*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*---------------------- REMOVE MENU MOBILE ----------------------*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*---------------------- QUALIFICATION TABS ----------------------*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*---------------------- PROJECT MODAL ----------------------*/
const modalViews = document.querySelectorAll('.project__modal'),
    modalBtns = document.querySelectorAll('.project__button'),
    modalClose = document.querySelectorAll('.project__modal__close')

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active__modal')
}
modalBtns.forEach((mb, i) => {
    mb.addEventListener('click', () => {
        modal(i)
    })
})
modalClose.forEach((mc) => {
    mc.addEventListener('click', () => {
        modalViews.forEach((mv) => {
            mv.classList.remove('active__modal')
        })
    })
})

/*---------------------- PORTFOLIO SWIPER  ----------------------*/
let swiper = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    mousewheel: true,
    keyboard: true,
})

/*---------------------- SCROLL SECTIONS ACTIVE LINK ----------------------*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active__link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active__link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*---------------------- CHANGE BACKGROUND HEADER ----------------------*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) header.classList.add('scroll__header');
    else header.classList.remove('scroll__header')
}
window.addEventListener('scroll', scrollHeader)

/*---------------------- SHOW SCROLL UP ----------------------*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 200) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*---------------------- DARK LIGHT THEME ----------------------*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark__theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* --------------------- EMAILJS ---------------------- */
const contactForm = document.getElementById('contact-form'),
    contactName = document.getElementById('contact__input__name'),
    contactEmail = document.getElementById('contact__input__email'),
    contactSubject = document.getElementById('contact__input__subject'),
    contactMessage = document.getElementById('contact__input__message'),
    contactAlert = document.getElementById('contact__alert')

const sendEmail = (e) => {
    e.preventDefault()

    if (contactName.value === '' || contactEmail.value === '' || contactSubject.value === '' || contactMessage.value === '') {
        contactAlert.classList.remove('contact__green')
        contactAlert.classList.add('contact__red')
        contactAlert.textContent = "Please fill in all the input fields."
    } else {
        /* parameter: service ID, template ID, form ID, Public key */
        emailjs.sendForm('kkkkkeeeeyyy', 'kkkkkeeeeyyy', '#kkkkkeeeeyyy', 'kkkkkeeeeyyy')
            .then(() => {
                contactAlert.classList.add('contact__green')
                contactAlert.textContent = "Message sent."

                setTimeout(() => {
                    contactAlert.textContent = ''
                    contactName.textContent = ''
                    contactEmail.textContent = ''
                    contactSubject.textContent = ''
                    contactMessage.textContent = ''
                }, 5000)
            })
    }
}
contactForm.addEventListener('submit', sendEmail)