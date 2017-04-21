jQuery(document).ready(function($){
    "use strict";

    /* jQuery MeanMenu */
    $('#site-navigation nav').meanmenu({
        meanMenuContainer: '#meanmenu',
        meanScreenWidth: "991",
        siteLogo: gymEdgeObj.siteLogo
    });

    /* Nav smooth scroll */
    $('#site-navigation .menu').onePageNav({
        scrollOffset: 80,
    });

    /* Search Box */
    $(".search-box-area").on('click', '.search-button', function(event){
        event.preventDefault();
        var v = $(this).prev('.search-text');
        if(v.hasClass('active')){
            v.removeClass('active');
        }
        else{
            v.addClass('active');
        }
        return false;
    }); 

    /* Sticky Menu activation code */
    if ( gymEdgeObj.stickyMenu == 1 || gymEdgeObj.stickyMenu == 'on' ) {
        $(window).scroll(function() {
            var s = $("body");
            var windowpos = $(window).scrollTop();
            if(windowpos > 0){
                s.removeClass("non-stick");
                s.addClass("stick");
            } 
            else {
                s.removeClass("stick");
                s.addClass("non-stick");
            }
        });
    }

    /* Scroll to top */
    // click event
    $('.scrollToTop').on('click',function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

    // scroll event
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    /* Mega Menu */
    $('.site-header .main-navigation ul > li.mega-menu').each(function() {
        var items = $(this).find(' > ul.sub-menu > li').length;
        var parentLinkWidth = $(this).find(' > a').outerWidth();

        var width = items * 210;
        var left  = (width/2) - (parentLinkWidth/2);

        // if left positioning exceeds screen
        var bodyWidth = $('body').outerWidth();
        var parentLinkpos = $(this).find(' > a').offset().left;
        var linkRightWidth = bodyWidth - ( parentLinkpos + parentLinkWidth );
        
        if ( (width/2)>linkRightWidth ) {
            $(this).find(' > ul.sub-menu').css({
                width: width + 'px',
                left: 'inherit',
                right:  '-' + linkRightWidth + 'px'
            }); 
        }
        else{
            $(this).find(' > ul.sub-menu').css({
                width: width + 'px',
                left:  '-' + left + 'px'
            });            
        }
    });

    /* Woocommerce Shop change view */
    $('#shop-view-mode li a').on('click',function(){
        $('body').removeClass('product-grid-view').removeClass('product-list-view');

        if ( $(this).closest('li').hasClass('list-view-nav')) {
            $('body').addClass('product-list-view');
            Cookies.set('shopview', 'list');
        }
        else{
            $('body').addClass('product-grid-view');
            Cookies.remove('shopview');
        }
        return false;
    });
    
    /* ---- VC Modules ---- */

     // Owl Custom Nav
     if ( typeof $.fn.owlCarousel == 'function') { 

        $(".owl-custom-nav .owl-next").on('click',function(){
            $(this).closest('.owl-wrap').find('.owl-carousel').trigger('next.owl.carousel');
        });
        $(".owl-custom-nav .owl-prev").on('click',function(){
            $(this).closest('.owl-wrap').find('.owl-carousel').trigger('prev.owl.carousel');
        });

        $(".rt-owl-carousel").each(function() {
            var options = $(this).data('carousel-options');
            $(this).owlCarousel(options);
        });
    }

    // Nav bar variable width
    $('.owl-custom-nav-bar').each(function() {
        var $parent      = $(this).closest('.section-title');
        var sectionWidth = $parent.outerWidth();
        var titleWidth   = $parent.find('.owl-custom-nav-title').outerWidth();
        var nav          = $parent.find('.owl-custom-nav');
        var navWidth     = nav.length ? nav.outerWidth() : 0;
        $parent.find('.owl-custom-nav-bar').width(sectionWidth-titleWidth-navWidth-40);
    });
});

(function($){
    $(window).on('load',function(){
        // Onepage Nav on meanmenu
        $('#meanmenu .menu').onePageNav({
            scrollOffset: 80,
            end: function() {
                $('.meanclose').trigger('click');
            } 
        });

        // Plugin: Easy Twitter Widget - Hide images
        $twtIframe = $(".widget-do-etfw iframe#twitter-widget-0");
        $twtIframe.contents().find(".timeline-Tweet-media").hide();
        $twtIframe.css('height','inherit');

    });
})(jQuery);