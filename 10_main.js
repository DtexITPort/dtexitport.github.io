$(document).ready(() => {

  history.pushState('', document.title, window.location.pathname);

  let mainNavLinks = document.querySelectorAll(".navbar-right li a");

  let declOfNum = (number, titles) => {
    cases = [2, 0, 1, 1, 1, 2];  
    return number+" "+titles[(number%100>4 && number%100<20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];  
  }
  let birthDateToAge = (b) => {
    let today = new Date(), 
        dateOfBirth = new Date(b),
        age = today.getFullYear() - dateOfBirth.getFullYear();
    return today.setFullYear(1972) < dateOfBirth.setFullYear(1972) ? age - 1 : age;
  }
  $('#years').text(declOfNum(birthDateToAge("2003-03-03"), ['год', 'года', 'лет']))

  let initScroll = () => {
    if($(window).scrollTop() != 0) {
      $('.navbar').removeClass('navbar-top'); 
    } else {
      $('.navbar').addClass('navbar-top'); 
    };
    let fromTop = window.scrollY + $(window).height() - 100;

    mainNavLinks.forEach((link) => {
      let section = document.querySelector(link.hash);

      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        $('.active-link').removeClass('active-link');
        link.classList.add("active-link");
      }
    });
  };
  initScroll();
  $(window).scroll(() => {
		initScroll();
	});

  $('.navbar-toggle').on('click', () => {
    $('.navbar-right').slideToggle(300);
  });
  
  $(window).on('resize', () => {
    let win = $(this);
		if(win.width() > 768) {
			$('.navbar-right').css('display', 'block');
		} else {
      $('.navbar-right').css('display', 'none');
    }
		initScroll();
  });
  
  $('.bar-progress').each(function() {
    var valorLargura = $(this).data('progress');
    var valorNivel = $(this).html("<span class='bar-value'>"+valorLargura+"</span>");
      $(this).animate({
          width: valorLargura
      });
  });

  $('#theme').on('click', () => {
    $('body').toggleClass('dark');
  })

  $('.menu-btn').on('click', (e) => {
    e.preventDefault();
    $('.menu-btn').toggleClass('menu-btn_active');
    $('.menu').toggleClass('menu_active');
  });

  $("#sendMail").on('submit', (e) => {
    e.preventDefault();
    $.ajax({
      url: "/mail",
      type: "POST", 
      dataType: "html", 
      data: $("#sendMail").serialize() + "&key=send",  
      success: function(res) { 
        console.log(res);
        $("#sendMail *").val("");
      },
      error: function(res) { 
        console.log(res);
      }
     });
  })

  $('a[href*="#"]').bind("click", function(e) {
    var anchor = $(this);
    if(anchor.attr('href') == '#') {
      e.preventDefault();
      return false;
    }
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top-100
    }, 0);
    e.preventDefault();
  });
})