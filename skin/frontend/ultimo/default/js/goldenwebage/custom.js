//var $ = jQuery;

var $animation_elements = jQuery('.animated');
var $window = jQuery(window);
var $ticketselected = 0;
jQuery(document).ready(function() {
    if(jQuery('#order-box .price').length) {
        $orgPriceHtml = jQuery('#order-box .price').html();
    }
});

function check_if_in_view() {

    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    jQuery.each($animation_elements, function() {
        var $element = jQuery(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
        var element_animation = $element.attr("data-animation");
        if (!element_animation) {
            element_animation = "animation-fade-in-up";
        }

        //check to see if this current container is within viewport
        if ( (element_bottom_position >= window_top_position && element_top_position <= window_bottom_position) || $element.css("position") == "fixed" ) {
            $element.addClass(element_animation).one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function(e) {
                if (e.target == e.currentTarget || $element[0] == e.target || jQuery(e.currentTarget).hasClass("hero")) {
                    jQuery(this).removeClass("animated").addClass("animationEnd");
                }
            });
        }
    });
}

jQuery(document).ready(function() {
	$animation_elements = jQuery('.animated');
	check_if_in_view();



    jQuery(".slick").slick({
        autoplay: false,
        dots: false,
        prevArrow: '<button role="button" class="btn btn-round slick-prev"><span class="icon icon-arrow-left"></span></button>',
		nextArrow: '<button role="button" class="btn btn-round slick-next"><span class="icon icon-arrow-right"></span></button>',
		waitForAnimate: false

    });

    jQuery('.slick.single').show();

    jQuery('#order-box').affix({
        offset: {
            top: function() {
                if (window.innerWidth < 992) {
                    return 0;
                } else {
                    return jQuery('.main-container').offset().top;
                }
            },
            bottom: function() {
                if (window.innerWidth < 992) {
                    return 0;
                } else {
                    return jQuery('body').outerHeight() - jQuery('.order-box-scroll-up').offset().top;
                }
            }
        }
	});

	jQuery('#header-contact').affix({
		offset: {
			top: function() {
				if (window.innerWidth < 768) {
					return 0;
				} else {
					return jQuery('html').outerHeight();
				}
			}
		}
	});

	// jQuery('a[href^="#"]:not([data-toggle])').click(function() {
	// 	if (jQuery(jQuery(this).attr('href') + '.tab-pane').length) {
	// 		jQuery('a[href="' + jQuery(this).attr('href') + '"][data-toggle]').trigger('click');
	// 	}
	// });

	jQuery('[data-toggle="modal"]').click(function() {
		var currModal = jQuery(jQuery(this).attr('data-target'));
		jQuery('.modal').not(currModal).modal('hide');
	});

    jQuery('[data-toggle="copy"]').click(function() {
        var copyText = document.getElementById(jQuery(this).attr('data-target'));
        copyText.select();
        document.execCommand("copy");
    });

    jQuery('[data-toggle="toggle-height"]').click(function() {
        var target = jQuery(this).data('target');
        jQuery(this).fadeOut();
        jQuery(target + '.toggle-height').addClass('expanded');
    });

	jQuery('.table-striped:not(.expanded) > tbody > tr:nth-child(n+4) > td').wrapInner('<div class="td-wrapper" style="display:none;"/>');
    jQuery('.toggle-table').click(function() {
        jQuery(this).fadeOut();
		jQuery(this).prevAll('.table')
			.addClass('expanded')
			.find('.td-wrapper:hidden').slideDown(500, function() {
				var $tdContent = jQuery(this);
				$tdContent.replaceWith($tdContent.contents());
			});
    });

    jQuery('label').click(function() {
        var inputField = jQuery(this).prev('input[type="radio"]');
        inputField.prop('checked', !inputField.prop('checked'));
    });

    jQuery('.spinner button:first-of-type').on('click', function() {
        var currInput = jQuery(this).parents('.spinner-buttons').prevAll('input');
        currInput.val( parseInt(currInput.val(), 10) + 1);
      });
      jQuery('.spinner button:last-of-type').on('click', function() {
        var currInput = jQuery(this).parents('.spinner-buttons').prevAll('input');
        currInput.val( parseInt(currInput.val(), 10) - 1);
    });
});

jQuery(window).scroll(function() {
    check_if_in_view();
});

function submitCartForm(){
    if(jQuery('input[name=order-type]:checked').val() == 'vouchers'){
        jQuery('#product_addtocart_form_choose_ordertype').submit();
    }
    else {
        if($ticketselected) {
            jQuery('#product_addtocart_form_dates').submit();
        }
        else {
            sweetAlert('', 'Bitte w??hlen Sie die Anzahl Ihrer Tickets aus', 'error');
            jQuery( "#ticket-tab" ).addClass('setActive');
        }
    }
}

function showHideMobileDateform(value){
    if(value == 'tickets'){
        jQuery('#product_addtocart_form_mobile').show();
    }
    else{
        jQuery('#product_addtocart_form_mobile').hide();
    }

}

function scrollDateBox() {
    jQuery(document).ready(function () {
            jQuery('html, body').animate({
                scrollTop: (jQuery("#date-box").offset().top - 20)
            }, 1000);
    });
}

function resetVoucherSelect(selector){
    jQuery(selector).prop('selectedIndex', 0);
    jQuery('#pricebox .price').html($orgPriceHtml);
}

function hideTicketInfo(){
    jQuery('#order-box .order-box-type-desc .checkmark-list').html('');
    jQuery('#pricebox .price').html($orgPriceHtml);
    resetTicketSelects();
}

function resetTicketSelect(){
    jQuery('#pricebox .price').html($orgPriceHtml);
    jQuery('#addToCartTickets').hide();
    resetTicketSelects();
}

function countTotalTickets() {
    var selectsum = 0;
    jQuery('#ticket-tab').removeClass('setActive');

    jQuery('#product_addtocart_form_dates select').each(
        function(index){
            var select = jQuery(this);
            selectsum += parseInt(select.val());
        }
    );
    $ticketselected = selectsum;
    console.log(selectsum);
    return selectsum;
}

function switchOrderOption(){
    var selectsum = countTotalTickets();
    setOrderboxInfo();

    if(selectsum > 0){
        jQuery('#product_addtocart_form_choose_ordertype #vouchers').prop('checked', false);
        jQuery('#product_addtocart_form_choose_ordertype #tickets').prop('checked', true);
    }
    else{
        jQuery('#product_addtocart_form_choose_ordertype #tickets').prop('checked', false);
        jQuery('#product_addtocart_form_choose_ordertype #vouchers').prop('checked', true);
    }
}

function switchOrderOptionMobile(){
    jQuery('#product_addtocart_form_choose_ordertype_mobile #vouchers').prop('checked', false);
    jQuery('#product_addtocart_form_choose_ordertype_mobile #tickets').prop('checked', true);
    jQuery('#addToCartTickets').show();
}

function setOrderboxInfo(){
    var tickets = '';
    var selectsum = countTotalTickets();

    if (selectsum > 0) {

        jQuery('#ticket-tab .miomente-select').each(function() {
            var select     = jQuery(this);
            var currCount  = parseInt(select.val());
            if(currCount) {
                var ticketDate = jQuery(select).attr("data-info");
                tickets += '<li><strong>' + ticketDate + '<br>(' + currCount + ' Person' + (currCount == 1 ? '' : 'en') + ')</strong></li>';
            }
        });
        jQuery('#order-box .order-box-type-desc .checkmark-list').html(tickets);

    } else {
        jQuery('#order-box .order-box-type-desc .checkmark-list').html('');
    }
}

function resetTicketSelects(){
    jQuery(".miomente-select").prop('selectedIndex', 0);
    jQuery('#order-box .price').html($orgPriceHtml);
}

function setOrderboxPrice(selector){
   if(jQuery("#product_addtocart_form_choose_ordertype input[type='radio']:checked").val() == "vouchers") {
       var price = parseFloat(jQuery(selector).attr("data-price")) * parseFloat(jQuery(selector).val());
   }
   else if(jQuery("#product_addtocart_form_choose_ordertype input[type='radio']:checked").val() == "tickets"){
       var price = 0;
       jQuery( "#product_addtocart_form_dates .miomente-select" ).each(function() {
           price += parseFloat(jQuery(selector).attr("data-price")) * parseFloat(jQuery(this).val());
       });
   }
   if(price) {
       price = number_format(price, 2, ',', '.') + ' &euro;';
       jQuery('#pricebox .price').html(price);
   }
}

function setOrderboxPriceMobile(selector){
        var price = 0;
        jQuery( "#product_addtocart_form_mobile .miomente-select" ).each(function() {            price += parseFloat(jQuery(selector).attr("data-price")) * parseFloat(jQuery(this).val());

        });

    if(price) {
        price = number_format(price, 2, ',', '.') + ' &euro;';
        jQuery('#pricebox .price').html(price);
    }
}



number_format = function (number, decimals, dec_point, thousands_sep) {
    number = number.toFixed(decimals);
    var nstr = number.toString();
    nstr += '';
    x = nstr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? dec_point + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + thousands_sep + '$2');

    return x1 + x2;
}
