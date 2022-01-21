(function (global) {
  

  
  var yoebar = {};
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  var homeHtml = "snippets/home-snippet.html";
  var commingSoomHtml = "snippets/comming-soon.html";
  var serviceHtml = "snippets/services-snippet.html";
  var aboutHtml = "snippets/about-snippet.html";
  const nav_tabs = document.querySelectorAll(".nav-link");
  var contactHtml ="snippets/contact-snippet.html";
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
  //////////////////////////////////////////////////load services snippet////////////////////////////////
  yoebar.loadServicesPage =function (section=null) {
    
    if(document.querySelector(".services") == null){
      yoebar.remove_active_from_all_nav();
      document.querySelector("#services-nav").classList.add("active-nav");
      showLoading("#main-content");

      $ajaxUtils.sendGetRequest(
        serviceHtml,
        function (responseText) {
          document.querySelector("#main-content")
            .innerHTML = responseText;
          yoebar.animations();
          let sec = document.querySelector(section);
          console.log(sec);
          sec.scrollIntoView(true);         
        },
        false);

    }
    else{
      document.querySelector("#services-nav").classList.add("active-nav");
    }
    
  }
   //////////////////////////////////////////////////load aboutus snippet////////////////////////////////
  yoebar.loadAboutPage =function () {
    
    if(document.querySelector(".about") == null){
      yoebar.remove_active_from_all_nav();
      document.querySelector("#about-nav").classList.add("active-nav");
      showLoading("#main-content");

      $ajaxUtils.sendGetRequest(
        aboutHtml,
        function (responseText) {
          document.querySelector("#main-content")
            .innerHTML = responseText;
          yoebar.animations();
        },
        false);

    }
    else{
      document.querySelector("#services-nav").classList.add("active-nav");
    }
    
  }
  yoebar.loadContactPage =function () {
    console.log('loading contact');
    if(document.querySelector(".contact") == null){
      yoebar.remove_active_from_all_nav();
      document.querySelector("#contact-nav").classList.add("active-nav");
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(
        contactHtml,
        function (responseText) {
          document.querySelector("#main-content")
            .innerHTML = responseText;
          yoebar.animations();
        },
        false);
    }
    else{
      document.querySelector("#services-nav").classList.add("active-nav");
    }   
  }
  ////////////////////////////////////////////////// load products page/////////////////////////////////////////
  yoebar.loadProductsPage =function () {
    yoebar.remove_active_from_all_nav();
    document.querySelector("#products-nav").classList.add("active-nav");
    loadCommingSoonPage();
  }
  /////////////////////////////////////////////////// load carts page/////////////////////////////////////////
  yoebar.loadCartPage =function () {
    yoebar.remove_active_from_all_nav();
    document.querySelector("#cart-nav").classList.add("active-nav");
   
    loadCommingSoonPage();
  }
  yoebar.showUploadForm = function () {
    let form = document.querySelector('#fileUpload-form');
    // blur bg
    let blurFilter = document.querySelector('#blur-filter');
    let darkenFilter = document.querySelector('#darken-filter');
    blurFilter.classList.remove('d-none');
    blurFilter.classList.add('d-block');
    darkenFilter.classList.remove('d-none');
    darkenFilter.classList.add('d-block');
    form.classList.remove('uploadForm-dissapear')
    form.classList.add('uploadForm-appear');
    
  }
  yoebar.submitfeedback =function(e){
    console.log('submitclicked');
    e.preventDefault();

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var subject = document.getElementById('subject');
    var message = document.getElementById('message');

    let formData = {
      name:name.value,
      email:email.value,
      subject:subject.value,
      message:message.value
    }
    $ajaxUtils.sendPostRequest('/contact',JSON.stringify(formData),(req)=>{
      console.log(req);
      if(req.responseText =='success'){
        alert('Email sent');
        name.value ="";
        email.value ="";
        subject.value = "";
        message.value = "";           
      }
      else{
        alert('something went wrong');
      }
    },true)
    
  }
  yoebar.submitform = function(e){
    e.preventDefault();
    //
    console.log('submitclicked');
    var sender = document.getElementById('sender').value;
    var email = document.getElementById('email').value;
    var files = document.getElementById('supplyOrders').files;
    var formData = new FormData();
    formData.append('sender',sender);
    formData.append('email',email);
    console.log('0' + files[0]);
    var i = 0;
    for(var file in files){
      console.log(files[i]);
      formData.append('supplyOrder',files[i]);
      i++;
    }
    console.log(files);

    $ajaxUtils.sendPostRequest('/supplyOrder',formData,(req)=>{
      console.log(req);
      if(req.responseText =='success'){
        showMailSent('#fileUpload-form');    
        
      }
      else{
        alert('something went wrong');
      }
    },false);
    showMailing('#fileUpload-form');
    // xhr.open("POST",'/supplyOrder');
    // xhr.onload = ()=>{
    //   console.log(xhr.responseText);
    //   if(xhr.responseText =='success'){
    //     showMailSent('#fileUpload-form');    
        
    //   }
    //   else{
    //     alert('something went wrong');
    //   }
    // }
    // showMailing('#fileUpload-form');
  
    // xhr.send(formData);

    
  }

  
  var showMailSent = function(selector){
    var html = "<div class='close-button' onclick='$yoebar.hideForm()'>x</div><div class='mailSent-wrapper'>";
    html += "<h1>Mail sent</h1></div>";
    insertHtml(selector, html);
  }
  yoebar.hideForm = function () {
    let form = document.querySelector('#fileUpload-form');
    // blur bg
    let blurFilter = document.querySelector('#blur-filter');
    let darkenFilter = document.querySelector('#darken-filter');
    blurFilter.classList.remove('d-block');
    blurFilter.classList.add('d-none');   
    darkenFilter.classList.remove('d-block');
    darkenFilter.classList.add('d-none');  
    form.classList.remove('uploadForm-appear');   
    form.classList.add('uploadForm-dissapear')
    
  }
  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='load-wrapper'>";
    html += '<svg id="loading" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 618.17 780.26"><defs><style>.cls-1{fill:none;stroke-linecap:round;stroke-width:5px;}.cls-1,.cls-2,.cls-3{stroke:#162649;stroke-miterlimit:10;}.cls-2{fill:#de3f37;}.cls-3,.cls-4{fill:#eb8d84;}.cls-5{fill:#b3b5b9;}.cls-6{fill:#eaecee;}.cls-7{fill:#162649;}</style></defs><path class="cls-1" d="M314.67,406.52c6.87,8.61,18.47,11.29,27.54,6.79,8.1-4,13.36-13.33,11.65-21.87C351.69,380.53,338.41,372,324,375.85"/><path class="cls-1" d="M333.33,492.77a96.91,96.91,0,0,1,30,31.92A87.92,87.92,0,0,1,375,565.21"/><path class="cls-1" d="M375,567.6a85.17,85.17,0,0,1,25-15.06,94.35,94.35,0,0,1,17.83-5"/><path class="cls-1" d="M287.48,513.33c.15,3.66.15,13.92-5.89,23.38-5.37,8.39-16.88,18.29-29.49,14.19-11.47-3.73-19.64-17.68-18.42-33.4"/><path class="cls-1" d="M233.56,515.05A224.67,224.67,0,0,1,215,541.33c-5,6.06-9.92,11.46-14.68,16.23"/><path class="cls-2" d="M328.65,489.85c-2.07,10.13-10.42,18.76-21.64,21.6s-22.71-.77-29.35-8.73v0a5.39,5.39,0,0,0,.88-.1,5,5,0,0,0,.87-.18l48-12.13A7.91,7.91,0,0,0,328.65,489.85Z"/><path class="cls-2" d="M260.11,378.55l28.26,111.73a4.85,4.85,0,0,1-1,4.31,4.8,4.8,0,0,1-2.52,1.57l-6.8,1.72a.22.22,0,0,1-.11,0,4.36,4.36,0,0,1-2.87-.28,4.25,4.25,0,0,1-1.29-.83,4.43,4.43,0,0,1-1.35-2.24L244.07,382.41a4.63,4.63,0,0,1,3.35-5.62l6.8-1.72A4.84,4.84,0,0,1,260.11,378.55Z"/><path class="cls-2" d="M280.66,373.35l28.26,111.74a2.88,2.88,0,0,1,.09.48,2.12,2.12,0,0,1,.05.44s0,.06,0,.07a3.57,3.57,0,0,1,0,.46,1.73,1.73,0,0,1-.05.45c0,.16,0,.31-.07.47a1.07,1.07,0,0,0-.07.19,3.59,3.59,0,0,1-.12.35.67.67,0,0,1-.06.12,3.68,3.68,0,0,1-.15.35,2.39,2.39,0,0,0-.12.22c-.1.15-.18.3-.28.43s-.23.29-.35.42h-.06a.48.48,0,0,1-.09.14c-.05,0-.06.08-.11.12l-.31.28s-.06,0-.08.05a2.82,2.82,0,0,1-.31.21,5.64,5.64,0,0,1-.92.46l-.48.14-6.62,1.67c-.13,0-.27.06-.4.09a.33.33,0,0,1-.14,0l-.36,0h-.57a2.84,2.84,0,0,1-.42-.05,4.45,4.45,0,0,1-.48-.1,1.54,1.54,0,0,1-.28-.09.66.66,0,0,1-.2-.06h0l-.39-.16-.4-.22a2.16,2.16,0,0,1-.35-.24l-.11-.07a2.76,2.76,0,0,1-.27-.23.43.43,0,0,1-.12-.11,1.07,1.07,0,0,1-.14-.16.46.46,0,0,1-.16-.15s-.06-.06-.09-.11,0,0,0,0a1.51,1.51,0,0,1-.17-.2l-.13-.2v0h0a1,1,0,0,1-.17-.26l0-.07c0-.07-.08-.15-.11-.23a2.71,2.71,0,0,1-.17-.39c0-.15-.1-.29-.15-.47L264.69,377.39a4.82,4.82,0,0,1,3.5-5.85l6.62-1.68A4.82,4.82,0,0,1,280.66,373.35Z"/><path class="cls-2" d="M288.82,325.45l2.53,10a5.85,5.85,0,0,1-4.23,7.09l-43.65,11a5.84,5.84,0,0,1-7.08-4.23l-2.53-10a5.84,5.84,0,0,1,4.22-7.09l43.65-11A5.85,5.85,0,0,1,288.82,325.45Z"/><path class="cls-3" d="M301.7,368,330,479.76a5.07,5.07,0,0,1-.22,3.26,3.77,3.77,0,0,1-.34.7c-.08.16-.16.29-.25.44a.57.57,0,0,0-.12.15,5.4,5.4,0,0,1-2.91,1.9l-6.61,1.67a5.11,5.11,0,0,1-2.23.07,5.54,5.54,0,0,1-1.33-.41,5.23,5.23,0,0,1-2.16-1.85,1.93,1.93,0,0,0,0-.24,1.62,1.62,0,0,1,0,.22,5.47,5.47,0,0,1-.72-1.63L284.79,372.31a5.58,5.58,0,0,1-.14-1.77h0v0a5.32,5.32,0,0,1,2-3.64,5,5,0,0,1,2-1l6.61-1.68A5.32,5.32,0,0,1,301.7,368Z"/><path class="cls-2" d="M285.89,354.28a24.43,24.43,0,0,0,2.3,5.83l-36.45,9.22a25,25,0,0,0-3.05-12.07L285.14,348A24.47,24.47,0,0,0,285.89,354.28Z"/><path class="cls-4" d="M288.61,325.72l2.43,9.6c.75,3-.68,5.95-3.2,6.59l-6.28,1.59L276.38,323l6.28-1.59C285.18,320.81,287.85,322.72,288.61,325.72Z"/><path class="cls-4" d="M286.61,319.56l.05.21a2.1,2.1,0,0,0-.3-.15Z"/><rect class="cls-5" x="244.36" y="265.55" width="13.39" height="59.04" transform="translate(-64.69 70.57) rotate(-14.19)"/><rect class="cls-6" x="253.68" y="264.33" width="4.32" height="58.22" transform="translate(-64.14 71.69) rotate(-14.19)"/><path class="cls-5" d="M245.34,236.27a51.76,51.76,0,0,1,.32,25.35l-10.41,2.58-2.59-3.7a52.74,52.74,0,0,1-9.13-37.38l.6-4.49,10.44-2.58A51.68,51.68,0,0,1,245.34,236.27Z"/><path class="cls-7" d="M294.43,360l-.55.14s0,0,0,0a18.6,18.6,0,0,1-3.35-7,19.19,19.19,0,0,1-.56-6.37,10.56,10.56,0,0,0,6.47-12.46l-2.52-10a10.54,10.54,0,0,0-5.29-6.74l-.3-.16a10.51,10.51,0,0,0-7.25-.77l-11.72,3L254.51,261l.51-4.76a60,60,0,0,0-9.68-39.58L241,210.16l-21.09,5.19-.83,7.79a60,60,0,0,0,9.67,39.59l3.33,5,14.57,57.61-9.25,2.34a10.6,10.6,0,0,0-7.66,12.85l2.53,10a10.56,10.56,0,0,0,11.59,7.88,19.74,19.74,0,0,1,2.53,5.88,18.36,18.36,0,0,1,.37,7.75s0,0,0,.05l-.3.08a4.12,4.12,0,0,0-.47.13,9.59,9.59,0,0,0-6.65,10.55l.09.45c0,.17.07.32.11.48l28.26,111.73a9.34,9.34,0,0,0,2.37,4.26c0,.07.08.14.11.21h0c6.52,13.25,22.38,20,37.89,16.07,15.31-3.87,26-17.17,25.71-31.74a9.08,9.08,0,0,0,.26-5.36L305.78,366.8A9.37,9.37,0,0,0,294.43,360Zm-43.9-94.33,14,55.37-13,3.28-14-55.37ZM224,223.7l.47-4.33,9.36-2.3,5-1.24,2.4,3.62a55,55,0,0,1,8.87,36.25l-.48,4.33-5,1.22-9.34,2.31-2.4-3.61A55.05,55.05,0,0,1,224,223.7Zm12.87,125.65-2.53-10a5.84,5.84,0,0,1,4.22-7.09l43.65-11a5.85,5.85,0,0,1,7.09,4.23l2.53,10a5.85,5.85,0,0,1-4.23,7.09l-43.65,11A5.84,5.84,0,0,1,236.87,349.35Zm51.32,10.76-36.45,9.22a25,25,0,0,0-3.05-12.07L285.14,348a24.57,24.57,0,0,0,3.05,12.07Zm5.23,130.17,0-.07c0-.07-.08-.15-.11-.23a2.71,2.71,0,0,1-.17-.39c0-.15-.1-.29-.15-.47L264.69,377.39a4.82,4.82,0,0,1,3.5-5.85l6.62-1.68a4.82,4.82,0,0,1,5.85,3.49l28.26,111.74a2.88,2.88,0,0,1,.09.48,2.12,2.12,0,0,1,.05.44s0,.06,0,.07a3.57,3.57,0,0,1,0,.46,1.73,1.73,0,0,1-.05.45c0,.16,0,.31-.07.47a1.07,1.07,0,0,0-.07.19,3.59,3.59,0,0,1-.12.35.67.67,0,0,1-.06.12,3.68,3.68,0,0,1-.15.35,2.39,2.39,0,0,0-.12.22c-.1.15-.18.3-.28.43s-.23.29-.35.42h0s-.09.11-.14.15-.06.08-.11.12l-.31.28s-.06,0-.08.05a2.82,2.82,0,0,1-.31.21,5.64,5.64,0,0,1-.92.46l-.48.14-6.62,1.67c-.13,0-.27.06-.4.09a.33.33,0,0,1-.14,0l-.36,0h-.57a2.84,2.84,0,0,1-.42-.05,4.45,4.45,0,0,1-.48-.1,1.54,1.54,0,0,1-.28-.09.66.66,0,0,1-.2-.06h0l-.39-.16-.4-.22a2.16,2.16,0,0,1-.35-.24l-.11-.07-.27-.22a.68.68,0,0,1-.12-.12,1.07,1.07,0,0,1-.14-.16.46.46,0,0,1-.16-.15s-.06-.06-.09-.11,0,0,0,0a1.51,1.51,0,0,1-.17-.2l-.13-.2v0h0A1,1,0,0,1,293.42,490.28Zm-19.64,6.5a4.43,4.43,0,0,1-1.35-2.24L244.07,382.41a4.63,4.63,0,0,1,3.35-5.62l6.8-1.72a4.84,4.84,0,0,1,5.89,3.48l28.26,111.73a4.83,4.83,0,0,1-1,4.31,4.73,4.73,0,0,1-2.51,1.57l-6.8,1.72a.22.22,0,0,1-.11,0,4.36,4.36,0,0,1-2.87-.28A4.25,4.25,0,0,1,273.78,496.78ZM307,511.45c-11.28,2.85-22.71-.77-29.35-8.73v0a5.39,5.39,0,0,0,.88-.1,5,5,0,0,0,.87-.18l48-12.13a7.91,7.91,0,0,0,1.27-.43C326.58,500,318.23,508.61,307,511.45ZM330,479.76a5.07,5.07,0,0,1-.22,3.26,3.77,3.77,0,0,1-.34.7c-.08.16-.16.29-.25.44a.57.57,0,0,0-.12.15,5.4,5.4,0,0,1-2.91,1.9l-6.61,1.67a5.11,5.11,0,0,1-2.23.07,5.54,5.54,0,0,1-1.33-.41,5.23,5.23,0,0,1-2.16-1.85.16.16,0,0,1,0,.07l0-.09a5.47,5.47,0,0,1-.72-1.63L284.79,372.31a5.58,5.58,0,0,1-.14-1.77h0v0a5.32,5.32,0,0,1,2-3.64,5,5,0,0,1,2-1l6.61-1.68A5.32,5.32,0,0,1,301.7,368Z"/><path class="cls-1" d="M254.72,434.7c-13.6-9.81-30.63-6.84-37.45,3.06-5.19,7.54-5.19,20.15,2,27.58a20.93,20.93,0,0,0,11.58,5.78"/></svg><div class="shadow"></div><h2>Loading</h2></div>';
    insertHtml(selector, html);
  };

  var showMailing = function (selector){
    var html = "<div class='mailing-wrapper'>";
    html += "<img id='mailing' src='img/mail-icon.svg'></div>";
    insertHtml(selector, html);
  }
  
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

 


  
  /**************************animations***********************************/
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