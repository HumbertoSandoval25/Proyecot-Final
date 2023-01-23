const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLink = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');

const sections = document.querySelectorAll('section[id]')

const scroll_Up = document.getElementById('scroll-up');

const cart = document.getElementById('cart');
const cartShop = document.getElementById('cart-shop');
const cartClose = document.getElementById('cart-close'); 


// EventListeners
/* ========== MOSTRAR MENU ========== */
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}
/* ========== OCULTAR MENU ========= */
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}
/* ========== REMOVER EL MENU AL SELECCIONAR UNA OPCION ========= */
navLink.forEach(link => link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
}));



/* ========== CAMBIAR EL FONDO DEL HEADER ========== */
const scrollHeader = () => {
    this.scrollY >= 80 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader)


/* ========== TESTIMONIAL SWIPER ========== */
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop:'true',

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

/* ========= NEW SWIPER ========= */
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop:'true',

    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },

  });

  /* ========= SCROLL SELECTORES DE LINK ACTIVOS ========= */
  const scrollActive = () =>{
      const scrollY = window.pageYOffset
  
    sections.forEach(current =>{
      const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id'),
          sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
  
      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
        sectionsClass.classList.add('active-link')
      }else{
        sectionsClass.classList.remove('active-link')
      }                                                    
    })
  }
  
  window.addEventListener('scroll', scrollActive);

  /* ========= MOSTRAR SCROLL UP ========= */
  const scrollUp = () => {
    //When the scroll is higher than 400 viewport  height 
    this.scrollY >= 400 ? scroll_Up.classList.add('show-scroll') : scroll_Up.classList.remove('show-scroll')
  }

  window.addEventListener('scroll', scrollUp);

// MOSTRAR CARRO
if(cartShop){
  cartShop.addEventListener('click', () => {
    cart.classList.add('show-cart');
  });
}


// OCULTAR CARRO
cartClose.addEventListener('click', () => {
  cart.classList.remove('show-cart');
})


/*========= DARK LIGHT THEME ========= */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Activar / desactivar tema manual con el boton
themeButton.addEventListener('click', () => {
  // Anadir o remover dark / icon tema
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  // Guardamos el tema y el icono que el usuario escoje 
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})

// Obtenemos el tema actual que tiene la interfaz validando la clase dark-theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// Tema seleccionado previamente (si está seleccionada por el usuario)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Validamos si el usuario eligió previamente un tema
if (selectedTheme) {
  // Si se cumple la validación, preguntamos cuál fue el problema para saber si activamos o desactivamos la oscuridad.
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}



