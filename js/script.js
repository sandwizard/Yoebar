(function (global) {

  var yoebar = {};
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  var homeHtml = "snippets/home-snippet.html";
  var commingSoomHtml = "snippets/comming-soon.html";
  const nav_tabs = document.querySelectorAll(".nav-link");
  
  // /////////////////////hide nav on scroll////////////////////////
  var prevScrollpos = global.pageYOffset;
  global.onscroll = function() {
  var currentScrollPos = global.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header-nav").classList.add("navbar-appear");
    document.getElementById("header-nav").classList.remove("navbar-dissappear");
  } else {
    document.getElementById("header-nav").classList.add("navbar-dissappear");
    document.getElementById("header-nav").classList.remove("navbar-appear");
  }
  prevScrollpos = currentScrollPos;
}
  // ///////////Convenience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  //////////// On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    yoebar.loadHomePage();
    
  });
///////////// helper function to remove active class from all nav tabs
  yoebar.remove_active_from_all_nav=function () {
    nav_tabs.forEach(Element=>{
    Element.classList.remove("active-nav")});  
  }
  //////////////////////////////////////////////////load home snippet////////////////////////////////
  yoebar.loadHomePage =function () {
    
    if(document.querySelector(".home") == null){
      yoebar.remove_active_from_all_nav();
      document.querySelector("#home-nav").classList.add("active-nav");
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(
        homeHtml,
        function (responseText) {
          document.querySelector("#main-content")
            .innerHTML = responseText;
          yoebar.animations();

            
        },
        false);

    }
    else{
      document.querySelector("#home-nav").classList.add("active-nav");
    }
    
  };
  /////////////////////////////////////////////////// load products page/////////////////////////////////////////
  yoebar.loadProductsPage =function () {
    yoebar.remove_active_from_all_nav();
    document.querySelector("#products-nav").classList.add("active-nav");
    loadCommingSoonPage();
  }
  /////////////////////////////////////////////////// load carts page/////////////////////////////////////////
  yoebar.loadCartPage =function () {
    document.querySelector("#cart-nav").classList.add("active-nav");
    yoebar.remove_active_from_all_nav();
    yoebar.loadCommingSoonPage();
  }

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='load-wrapper'>";
    html += "<img id='loading' src='img/loading.svg'><div class='shadow'></div><h2>Loading</h2></div>";
    insertHtml(selector, html);
  };

  ///////////comming soon ajax load/////////////////
  var loadCommingSoonPage = function () {
    if(document.querySelector(".comming-soon") == null){
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(commingSoomHtml,
      function (responseText) {
        document.querySelector("#main-content").innerHTML = responseText

      }, false);

    }
    

  };




  ////////////////////gentel hover start////////////////////////////
  let numberOfShapes = 10;
  let shapes = [
    "M122.2,323.47a18,18,0,1,0,18,18A18,18,0,0,0,122.2,323.47Zm0,27.74a9.71,9.71,0,1,1,9.7-9.7A9.7,9.7,0,0,1,122.2,351.21Z",
    "M254 286.11a50 50 0 0050-50H204a50 50 0 0050 50z",
    "M255.5 271a20 20 0 10-20-20 20 20 0 0020 20zm0 30a50 50 0 10-50-50 50 50 0 0050 50z",
    "M248.8 202.17a8 8 0 019.4 0l40.6 29.5a8 8 0 012.9 8.94l-15.5 47.73a8 8 0 01-7.61 5.52h-50.18a8 8 0 01-7.61-5.52l-15.5-47.73a8 8 0 012.9-8.94z",
    "M307.5 250a50 50 0 11-50-50 50 50 0 0150 50",
    "M248.08 204.07a11.91 11.91 0 0116.84 0l30.59 30.59a11.91 11.91 0 11-16.85 16.85l-10.25-10.25v47.41a11.91 11.91 0 11-23.82 0v-47.41l-10.25 10.25a11.91 11.91 0 01-16.85-16.85z",
    "M234 237a22.5 22.5 0 0045 0h27.5a50 50 0 01-100 0z",
    "M258 202.5a12 12 0 00-12 12v26h-26a12 12 0 000 24h26v26a12 12 0 0024 0v-26h26a12 12 0 000-24h-26v-26a12 12 0 00-12-12z"
  ];
  yoebar.gentleHover = function (container) {

    let svg = container.nextElementSibling;
    let animatedShapes = [];
    for (var i = 0; i < numberOfShapes; i++) {

      let newElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      newElement.setAttribute("d", gsap.utils.random(shapes));
      newElement.style.fill = gsap.utils.random([
        // change colours
        "#B3B7EE",
        "#9395D3",
        "#F5C396",
        "#2F323A"
      ]);
      svg.appendChild(newElement);
      animatedShapes.push(newElement);
    };
    function killShapes() {
      animatedShapes.forEach((shape) => {
        svg.removeChild(shape);
      });
    };
    gsap.set(animatedShapes, {
      transformOrigin: "center",
      scale: "random(0.5, 1.3)"
    });

    gsap.to(animatedShapes, {
      onComplete: killShapes,
      keyframes: [
        {
          rotate: "random(180, -180)",
          x: "random([-150, -100, -200, 200, 100, 150])",
          y: "random([-150, -100, -200, 200, 100, 150])",
          ease: "expo.out",
          duration: 4,
          stagger: {
            amount: 0.1
          }
        },
        { opacity: 0, delay: -3 }
      ]
    });

  }
  /**************************animations***********************************/
  yoebar.animations = function () {
    yoebar.fadein();
    yoebar.slide_in();  
  }
   //////////////////////// slide in/////////////////////////////////////////
  yoebar.slide_in = function () {
    const sliders = document.querySelectorAll(".slide-in");
    sliders.forEach(slider=>{
      appearOnScroll.observe(slider);
    });
  }
  //////////////////////// fade in/////////////////////////////////////////
  yoebar.fadein = function () {

    const faders = document.querySelectorAll(".fade-in");
    faders.forEach(fader=>{
      appearOnScroll.observe(fader);
    });
  }
  ///////intersection observer/////////////////////////
  const apperarOptions ={
    threshold:0,
    rootMargin:"0px 0px -12% 0px" 
  };
  const appearOnScroll = new IntersectionObserver(
    function (entries,appearOnScroll) {
      entries.forEach(entry=>{
        if(!entry.isIntersecting){
          return;
        }else{
          entry.target.classList.add('appear');
          appearOnScroll.unobserve(entry.target);
        }
      })
      
    },apperarOptions
  );
    
  
  


  global.$yoebar = yoebar;


})(window);
