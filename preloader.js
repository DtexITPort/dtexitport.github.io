$(window).on('load', function () {
  $preloader = $('.pre-loader'),
  $preloader.addClass('end');
  $preloader.delay(350).fadeOut('slow');
});