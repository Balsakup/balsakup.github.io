(function ($) {

    $(document).ready(function () {

        $(window).on('load', function () {
            $('.loader').fadeOut();
            $('body').removeClass('loading');
        });

        var control = $('.form .form__control');
        var checkEmail = function (value) {
            var regex = new RegExp('^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$', 'i');

            return regex.test(value);
        };

        control.on('focus', function () {

            var self = $(this);

            self.parents('.form__group').addClass('active');

        });

        control.on('blur', function () {

            var self = $(this);
            var value = self.val();
            var parent = self.parents('.form__group');

            if ((self.attr('type') == 'email' && !checkEmail(value)) || value.length < 3) {
                parent.addClass('error');
            }

            if (value == '') {
                self.parents('.form__group').removeClass('active');
            }

        });

        control.on('keyup keydown keypress', function () {
            var self = $(this);
            var value = self.val();
            var parent = self.parents('.form__group');

            if (self.attr('type') == 'email') {
                if (checkEmail(value)) {
                    parent.removeClass('error');
                } else {
                    parent.addClass('error');
                }
            } else {
                if (value.length >= 3) {
                    parent.removeClass('error');
                } else {
                    parent.addClass('error');
                }
            }
        });

        $('.nav__toggle').on('click', function () {
            $(this).parents('.nav').toggleClass('active');
            $('body').toggleClass('nav__open');
        });




        var sections        = [];
        var navbar          = $('nav.nav');
        var navbar_items    = $('li', navbar);
        var active_sectiion = {};

        navbar_items.each(function () {
            sections.push($($(this).find('a').attr('href')));
        });

        $(window).on('scroll', function (event) {
            var scrollTop = $(this).scrollTop();

            for (var i in sections) {
                var section = sections[i];

                if (scrollTop > section.offset().top - navbar.height() - 40) {
                    active_sectiion = section.attr('id');

                    navbar_items.removeClass('active');

                    $('a[href="#' + active_sectiion + '"]', navbar).parent().addClass('active');
                }
            }
        });

        navbar_items.on('click', function (event) {
            event.preventDefault();

            var section = $(this).find('a').attr('href');

            $('body, html').animate({
                scrollTop: $(section).offset().top - navbar.height() - 20
            }, 500);
        });

    });

})(jQuery);

(function () {

    document.initMap = function () {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 49.155614,
                lng: -0.451432
            },
            zoom: 10
        });
        var homeInfo = new google.maps.InfoWindow({
            content: '<p style="color: #000">Voilà. C\'est là que j\'ai grandis</p>'
        });
        var home = new google.maps.Marker({
            position: {
                lat: 49.098884,
                lng: -0.353804
            },
            map: map,
            title: 'Ma maison'
        });
        home.addListener('click', function () {
            homeInfo.open(map, home);
        });
    };

})();
