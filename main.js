let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll(".nav-link");


  function handleScroll() {
    let navbar = document.getElementById("navbar");
    let scrollHeight = window.scrollY;
    let scrollThreshold = 100;

    if (scrollHeight > scrollThreshold) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }

      if (scrollHeight > scrollThreshold) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }
    

  window.addEventListener("scroll", function() {
    var logo = document.getElementById("logo");
    var navbar = document.getElementById("navbar");

    if (window.scrollY > 0) {
        logo.classList.add("scrolled-logo");
        navbar.classList.add("scrolled-navbar");
    } else {
        logo.classList.remove("scrolled-logo");
        navbar.classList.remove("scrolled-navbar");
    }
});

    
 window.addEventListener("scroll", handleScroll);







 let primoNumero = document.querySelector("#primoNumero");
let secondoNumero = document.querySelector("#secondoNumero");
let terzoNumero = document.querySelector("#terzoNumero");


let confirm = false;

let observer= new IntersectionObserver( ( entries )=> {

    entries.forEach((entry)=> {
        if(entry.isIntersecting && confirm == false){
            createInterval(1000, primoNumero, 10 );
            createInterval(2000, secondoNumero, 5 );
            createInterval(100, terzoNumero, 100 );
            confirm = true;
        }
    })


} );
observer.observe(primoNumero);



function createInterval(number, element, timing ) {
    let counter = 0; 
    let interval = setInterval(()=> {
        if(counter < number){
            counter++
            element.innerHTML = counter;
        }else{
            console.log("mi sono bloccato ??");
            clearInterval(interval)
        }
    
    }, timing);
}




let reviews = [

  { name : "Antonio" , description : "Spedizione veloce,prodotto ottimo."},
  { name : "Giorgia" , description: "il sito è funzionale e semplice da usare. "},
  { name : "Giovanni" , description: "il prodotto non mi ha conquistata,ma la qualità è ottima"},
 
]


let swiperWrapper = document.querySelector("#swiperWrapper");
let userName = document.querySelector("#userName");
let userDescription = document.querySelector("#userDescription");
let addReviewBtn = document.querySelector("#addReviewBtn");


addReviewBtn.addEventListener('click', ()=>{
  reviews.push( { name : userName.value , description: userDescription.value});
  generateCard();
  userName.value = '';
  userDescription.value = '';
  swiper.update();
});

function generateCard() {
  swiperWrapper.innerHTML='';
  reviews.forEach((review) =>{
      let div = document.createElement('div');
      div.classList.add("swiper-slide");
      div.innerHTML = `
          <div class="review-card">
          <p class="h3">${review.name}</p>
          <p class="lead">${review.description}</p>
          </div>
      `
      swiperWrapper.appendChild(div);
  });
}
generateCard();






//!! SEZIONE SWIPER JS !!
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
 
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 3,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },

  // If we need pagination

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  
});



