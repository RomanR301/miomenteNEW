jQuery(function () {

  // Datepicker =====>
  var someDateRange = [

  ];

  let start = moment();
  let end = moment().add(365 , 'd');

  const datepickerCheckbox = document.querySelector('.GWA.datepicker .checkbox-wrapper input')

  datepickerCheckbox.addEventListener('click', function() {

    if (someDateRange.length > 0) {
      someDateRange = []
      // Maximum number of dates to select
      jQuery('input[name="daterange"]').data().daterangepicker.maxSpan.days = 365
    } else {
      // Maximum number of dates to select
      jQuery('input[name="daterange"]').data().daterangepicker.maxSpan.days = 2

      // Monday;
      let monday = start.clone().day(1);
      if( monday.isAfter(start, 'd') ){
        someDateRange.push(monday.format('DD-MM-YYYY'));
      }
      while( monday.isBefore(end) ){
        monday.add(7, 'days');
        someDateRange.push(monday.format('DD-MM-YYYY'));
        someDateRange.push(moment().format('DD-MM-YYYY'));
      }
  
      // Tuesday;
      let tuesday = start.clone().day(2);
      if( tuesday.isAfter(start, 'd') ){
        someDateRange.push(tuesday.format('DD-MM-YYYY'));
      }
      while( tuesday.isBefore(end) ){
        tuesday.add(7, 'days');
        someDateRange.push(tuesday.format('DD-MM-YYYY'));
        someDateRange.push(moment().format('DD-MM-YYYY'));
      }

      // Wednesday;
      let wednesday = start.clone().day(3);
      if( wednesday.isAfter(start, 'd') ){
        someDateRange.push(wednesday.format('DD-MM-YYYY'));
      }
      while( wednesday.isBefore(end) ){
        wednesday.add(7, 'days');
        someDateRange.push(wednesday.format('DD-MM-YYYY'));
        someDateRange.push(moment().format('DD-MM-YYYY'));
      }

      // Thursday;
      let thursday = start.clone().day(4); 
      if( thursday.isAfter(start, 'd') ){
        someDateRange.push(thursday.format('DD-MM-YYYY'));
      }
      while( thursday.isBefore(end) ){
        thursday.add(7, 'days');
        someDateRange.push(thursday.format('DD-MM-YYYY'));
        someDateRange.push(moment().format('DD-MM-YYYY'));
      }

      // let startOfWeek = moment().isoWeekday()
      // let test = 2

      let firstValiableDay = jQuery('input[name="daterange"]').data().daterangepicker.startDate.startOf('week').add(5, 'days');
      let lastValiableDay = jQuery('input[name="daterange"]').data().daterangepicker.endDate.startOf('week').add(7, 'days');


      // function checkWeek() {
      //   if (jQuery('input[name="daterange"]').data().daterangepicker.endDate.isSame(start, 'week')) {
      //     console.log('CURRENT WEEK')
      //     jQuery('input[name="daterange"]').data().daterangepicker.startDate.isoWeekday(6);
      //     jQuery('input[name="daterange"]').data().daterangepicker.endDate.isoWeekday(7);

      //   } else if (jQuery('input[name="daterange"]').data().daterangepicker.endDate.isSame(firstValiableDay, 'week')) {
      //     console.log('SAME  WEEK')
      //     jQuery('input[name="daterange"]').data().daterangepicker.startDate.isoWeekday(5);
      //     jQuery('input[name="daterange"]').data().daterangepicker.endDate.isoWeekday(7);

      //   } else if (jQuery('input[name="daterange"]').data().daterangepicker.startDate.isoWeekday(7) && jQuery('input[name="daterange"]').data().daterangepicker.endDate.isoWeekday(7)) {
      //     console.log('fuck')
      //   } else {
      //     console.log('PIDAR WEEK')
      //     let firstValiableDay = jQuery('input[name="daterange"]').data().daterangepicker.startDate.startOf('week').add(5, 'days');
      //     let lastValiableDay = jQuery('input[name="daterange"]').data().daterangepicker.endDate.isoWeekday("Sunday");
      //     let result = lastValiableDay.diff(firstValiableDay, 'days')
      //     console.log(result)
      //     if (result > 0) {
      //       test = 2
      //       lastValiableDay.add(-result + test, 'days')
      //     } else {
      //       console.log('null')
      //     }
      //   }
      // }

      function allowToday() {
        someDateRange = someDateRange.filter(function(element) { return element !== start.format('DD-MM-YYYY')})
      }

      if (start.day() === 5) {
        allowToday()
        // startOfWeek = 5
        // test = 2
        // let lastValiableDay = jQuery('input[name="daterange"]').data().daterangepicker.endDate.isoWeekday(5);
        // checkWeek()
      } else if (start.day() === 6) {
        allowToday()
        // startOfWeek = 6
        // test = 1
        // let lastValiableDay = jQuery('input[name="daterange"]').data().daterangepicker.endDate.isoWeekday(6);
        // checkWeek()
      } else if (start.day() === 7) {
        allowToday()
        // startOfWeek = 7
        // test = 0
        // let lastValiableDay = jQuery('input[name="daterange"]').data().daterangepicker.endDate.isoWeekday(7);
        // checkWeek()
      } else {
        null
        // startOfWeek = 5
        // test = 2
        // checkWeek()
      }
    }

    jQuery('input[name="daterange"]').data().daterangepicker.updateView()
  })



  jQuery(function() {
    jQuery('input[name="daterange"]').daterangepicker({
      opens: 'center',
      parentEl: '.GWA.datepicker .datepicker-wrapper',
      minYear: 2022,
      minDate: moment(),
      alwaysShowCalendars: true,
      // If checkbox active
      maxSpan: {
        "days": 365
      },
      isInvalidDate:
        function(date){
          for(var ii = 0; ii < someDateRange.length; ii++){
            if (date.format('DD-MM-YYYY') == someDateRange[ii]){
              return true;
            }
          }
        },
      startDate: moment(),
      locale: {
        format: 'DD.MM.YYYY',
        daysOfWeek: [
          "So.",
          "Mo.",
          "Di.",
          "Mi.",
          "Do.",
          "Fr.",
          "Sa."
        ],
        monthNames: [
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "October",
            "November",
            "Dezember"
        ],
        firstDay: 1
      },
    })
  });

  jQuery('.datepicker__trigger').click(function () {
    jQuery('.GWA.datepicker').show()
    jQuery('.GWA.overlay').addClass('active')
    jQuery('body').addClass('lock')
    jQuery('input[name="daterange"]').data().daterangepicker.show()
  })

  $(document).on('click','.datepicker-close',function(){
    jQuery('.cancelBtn').click()
    jQuery('.GWA.datepicker').hide()
    jQuery('.GWA.overlay').removeClass('active')
    jQuery('body').removeClass('lock')
    if (datepickerCheckbox.checked) {
      datepickerCheckbox.click()
    } else {
      null
    }
  });

  $(document).on('click','.datepicker-apply',function(){
    jQuery('.applyBtn').click()
    jQuery('.GWA.datepicker').hide()
    jQuery('.GWA.overlay').removeClass('active')
    jQuery('body').removeClass('lock')
  });

  // Open Date list in card //
  jQuery('.GWA .card .date__trigger').click(function () {
    jQuery(this).parents('.GWA .card').find('.date-list').toggleClass('active')
  }) 

  // Sort //
  jQuery('.sort__trigger').click(function () {
    if (jQuery('.sort-list').hasClass('active')) {
      jQuery('.sort-list').removeClass('active')
    } else {
      jQuery('.sort-list').addClass('active')
    }
  })

  jQuery('.sort-item').click(function () {
    jQuery(this).parents('.sort-wrapper').find('.sort__trigger .current-value').text(jQuery(this).text())
    jQuery('.sort-list').removeClass('active')
  })

  jQuery(function(jQuery){
    jQuery(document).mouseup(function (e){
      var div = jQuery(".sort-wrapper");
      if (!div.is(e.target)
          && div.has(e.target).length === 0) {
        jQuery('.sort-list').removeClass('active');
      }
    });
  });

  // Video //
  jQuery('.video-thumb').click(function () {
    jQuery(this).css('display', 'none')
    jQuery(this).next('.video').css('display', 'block');
    jQuery(this).next('.video').children('iframe')[0].src += '&autoplay=1';
  })

  // Elected List //
  jQuery('.elected').click(function () {
    jQuery(this).attr('tabindex', 1).focus();
    jQuery(this).toggleClass('active');
    jQuery(this).find('.elected-menu').slideToggle(300);
  });
  jQuery('.elected').focusout(function () {
    jQuery(this).removeClass('active');
    jQuery(this).find('.elected-menu').slideUp(300);
  });
  jQuery('.elected .elected-menu li').click(function () {
    jQuery(this).parents('.elected').find('span').text( jQuery(this).text());
    jQuery(this).parents('.elected').find('input').attr('value',  jQuery(this).attr('id'));
  });

  jQuery('.online-trigger').click(function () {
    jQuery(this).addClass('active');
    jQuery('.online-item').addClass('active');
    jQuery('.local-item').removeClass('active');
    jQuery('.local-trigger').removeClass('active');
    jQuery('.all-trigger').removeClass('active');
  })

  jQuery('.local-trigger').click(function () {
    jQuery(this).addClass('active');
    jQuery('.local-item').addClass('active');
    jQuery('.online-item').removeClass('active');
    jQuery('.online-trigger').removeClass('active')
    jQuery('.all-trigger').removeClass('active');
  })

  jQuery('.all-trigger').click(function () {
    jQuery(this).addClass('active');
    jQuery('.online-item').addClass('active');
    jQuery('.local-item').addClass('active');
    jQuery('.online-trigger').removeClass('active')
    jQuery('.local-trigger').removeClass('active');
  })

  // Show-more //
  jQuery('.show-more button').click(function () {
    jQuery(this).parent().prev('.show-item').toggleClass('show');
    jQuery(this).toggleClass('show');
    if (jQuery(this).parent().prev('.show-item').hasClass('show')) {
      jQuery(this).text('Weniger anzeigen');
    } else {
      jQuery(this).text('Mehr anzeigen');
    }
  });

  jQuery('.show-more span').click(function () {
    jQuery(this).toggleClass('show');
    jQuery(this).parent().parent().children('.show-item').toggleClass('show');
    if (jQuery(this).hasClass('show')) {
      jQuery(this).text('Weniger anzeigen');
    } else {
      jQuery(this).text('Mehr anzeigen');
    }
  })

  // Search Cities //
  var search = '',
  total = 0;
  
  jQuery('.hero .i-search').on('keyup',function(e){
    search = jQuery(this).val();
    total = 0;
    jQuery('.result-list li a').each(function(){
      var value = jQuery(this).text().toLowerCase();
      if( value.indexOf(search.toLowerCase()) == 0 ){
        total++;
        jQuery(this).parent().removeClass('hide');
      } else {
        jQuery(this).parent().addClass('hide');
      }
    });
    if( total>0 ) jQuery('.result__error').hide(); else jQuery('.result__error').show();
  });

  // Search //
  jQuery('.search__trigger').click(function () {
    jQuery('.header-main .search-wrapper').addClass('active');
    jQuery('.overlay').addClass('active');
  });
  jQuery('.search-close').click(function () {
    jQuery('.header-main .search-wrapper').removeClass('active');
    jQuery('.overlay').removeClass('active');
  });

  // Burger //
  jQuery('.burger-wrapper').click(function () {
    jQuery('.burger-wrapper').toggleClass('active');
    jQuery('.nav').toggleClass('active');
    jQuery('body').toggleClass('lock');
  });

  jQuery('.nav-header .burger-wrapper').click(function () {
    jQuery('.nav__trigger').removeClass('active');
    jQuery('.nav-sub__trigger').removeClass('active');
    jQuery('.nav-dropdown-list').slideUp(300);
    jQuery('.nav-dropdown').slideUp(300);
  })

  // Overlay //
  jQuery('.overlay').click(function () {
    jQuery(this).removeClass('active');
    jQuery('.header-main .search-wrapper').removeClass('active');
    jQuery('.datepicker').hide()
    jQuery('body').removeClass('lock')
    jQuery('.cancelBtn').click()
  });

  jQuery('.reviews-table').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      }
    ]
  });

  jQuery('.slide__trigger').click(function () {
    jQuery(this).toggleClass('active');
    jQuery(this).next('.slide-list').slideToggle(300);
  });

if (window.matchMedia('(max-width: 991px)').matches) {

  const sellerSlider = new Swiper('.seller-slider', {
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
      el: ".seller-scrollbar",
      hide: false,
    },
  })

  jQuery('.slick-dots li button').text('');

  // Change Text //
  jQuery('.header-top .giftbox span').text('Geschenkbox');
  jQuery('.header-top .printer span').text('Gleich ausdrucken');
  jQuery('.header-top .contact h5').text('Kontakt zu Miomente');
  jQuery('.header-top .calendar span').text('Jahre gültig');
  jQuery('.safe-item .calendar span').text('Gutschein 3 Jahre gültig');
  jQuery('.cities .dropdown__trigger').text('Die Miomente Städte');
  jQuery('.hotel h2').text('Alle Events beidir zu Hause');

  // Remove class //
  jQuery('.nav-dropdown-wrapper').removeClass('with-border');

  jQuery('.categories-card .dropdown__trigger').click(function (e) {
    e.preventDefault()
    jQuery(this).toggleClass('active');
    jQuery(this).parent().next('.dropdown-list').slideToggle(300);
  });

  // Dropdown Mobile //
  jQuery('.dropdown__trigger').click(function (e) {
    e.preventDefault()
    jQuery(this).toggleClass('active');
    jQuery(this).parent().next().next('.dropdown-list').slideToggle(300);
    jQuery(this).next().next('.dropdown-list').slideToggle(300);
    jQuery(this).next('.dropdown-list').slideToggle(300);
  });

  // Nav Mobile //
  jQuery('.nav__trigger').click(function () {
    jQuery(this).toggleClass('active');
    jQuery(this).next('.nav-dropdown').slideToggle(300);
  });
  jQuery('.nav-sub__trigger').click(function () {
    jQuery(this).toggleClass('active');
    jQuery(this).next('.nav-dropdown-list').slideToggle(300);
  });

  // Hero Mobile //
  jQuery('.hero__trigger').click(function () {
    jQuery(this).toggleClass('active');
    jQuery(this).parent().next('.hero-dropdown').toggleClass('active');
  });

} else {

  // Dropdown Desktop //
  jQuery('.dropdown__trigger').mouseover(function () {
    jQuery(this).addClass('active');
    jQuery(this).next('.dropdown-list').addClass('active');
  });
  jQuery('.dropdown-list').mouseleave(function () {
    jQuery(this).removeClass('active');
    jQuery(this).prev('.dropdown__trigger').removeClass('active');
  });

  // Hero Desktop //
  jQuery('.hero__trigger').mouseover(function () {
    jQuery(this).addClass('active');
    jQuery(this).parent().next('.hero-dropdown').addClass('active');
  });
  jQuery('.hero-dropdown').mouseleave(function () {
    jQuery(this).removeClass('active');
    jQuery('.hero__trigger').removeClass('active');
  });

  // Hero Dropdown Close on click outside//
  jQuery(document).click( function(event){
    if ( !jQuery(event.target).closest('.hero-dropdown.active').length ) {
      jQuery('.hero-dropdown').removeClass('active');
      jQuery('.hero__trigger').removeClass('active');
    }
  });

  // Nav Desktop //
  jQuery('.nav__trigger').mouseover(function () {
    jQuery(this).addClass('active');
  });
  jQuery('.nav-item').mouseleave(function () {
    jQuery(this).children('.nav__trigger').removeClass('active');
  });

  // Change Text //
  jQuery('.header-top .giftbox span').text('Wunderschöne Geschenkbox');
  jQuery('.header-top .printer span').text('Sofort selbst ausdrucken');
  jQuery('.header-top .calendar span').text('Gutschein 3 Jahre gültig');
  jQuery('.safe-item .calendar span').text('3 Jahre gültig');
  jQuery('.contact h5').text('Kundenservice');
  jQuery('.cities .dropdown__trigger').text('Die Moment Städte');
  jQuery('.hotel h2').text('Genussreisen bei Ihnen zuhause')
};
})