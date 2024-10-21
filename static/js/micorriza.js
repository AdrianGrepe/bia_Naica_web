const $ = jQuery;
const colors = ['#4B50FF', '#78D2C3', '#9650FF'];
$(window).on('load', () => {
    console.log('Hello world from El Cultivo! --Load');
    /* HOME : H e r o */
    if( $('#home_hero').length ){
        $('#home_hero').slick({
            arrows: false,
            dots: true,
            dotsClass: 'dots',
            infinite: true,
            autoplay: true,
            autoplaySpeed: 8000,
            pauseOnHover: true,
            speed: 650, // Velocidad del fade entre slides (250ms)
            fade: true,
            lazyLoad: 'ondemand',
            cssEase: 'linear',
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 651,
                    settings: {
                        adaptiveHeight: true,
                    }
                }
            ]
        });
    }

    /*HOME : C o n o c e */
    if( $('#home_know').length){
        renderColors($('#home_know .home__know-block .home__know-block-content'));
        initializeSlider();
    }

    /*HOME : C l i e n t e s */
    if( $('#home_reviews').length ){
        $('#home_reviews').slick({
            arrows: false,
            dots: true,
            dotsClass: 'dots dots--reviews',
            infinite: true,
            autoplay: true,
            autoplaySpeed: 8000,
            pauseOnHover: true,
            speed: 650, // Velocidad del fade entre slides (250ms)
            fade: true,
            lazyLoad: 'ondemand',
            cssEase: 'linear',
            adaptiveHeight: true
        });
    }

    /*CREDITORS: F i n a n z a s */
    if( $('#creditors_finances').length ){
        initializeCreditorsSlider();
    }
});

// Inicializar slider en el load y resize de la ventana
$(window).on('load resize', function() {
    if( $('#home_know').length){
        initializeSlider();
    }
    if( $('#creditors_finances').length ){
        initializeCreditorsSlider();
    }
});

$(document).ready(function() {
    console.log('Hello world from El Cultivo! --Ready');
    /* MENÚ */
    $('#open_menu').on('click', function(){
        $('#menu_target').fadeIn(300);
    });
    $('#close_menu').on('click', function(){
        $('#menu_target').fadeOut(150);
    });
    /* END MENÚ*/
    /* CALCULADORA */
    const ranges = document.querySelectorAll('.range-input');

    ranges.forEach(range => {
        range.addEventListener('input', function() {
            const targetId = range.id;
            const amountElement = document.querySelector(`.amount-target[data-target="${targetId}"]`);
            if (amountElement) {
                amountElement.textContent = `$${parseInt(range.value).toLocaleString('es-MX')}`;
            }
        });
    });
    
    $('.creditors__calculator-filters-button').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
    
        if ($(this).is('#first_block')) {
            selectedYears = 1;
        } else if ($(this).is('#second_block')) {
            selectedYears = 3;
        } else if ($(this).is('#third_block')) {
            selectedYears = 5;
        }
        
        calculateAndDisplayResult();
    });
    
    $('.btn_type').on('click', function() {
        $(this).addClass('active').siblings('.btn_type').removeClass('active');
    
        isMonthly = $(this).attr('id') === 'monthly';
        
        calculateAndDisplayResult();
    });
    
    // Actualiza el capital cuando se mueve el rango
    $('.range-input').on('input', function() {
        initialCapital = parseFloat($(this).val());
        calculateAndDisplayResult();
    });
    
    // Realiza el cálculo al presionar "Calcular"
    $('#calculate').on('click', calculateAndDisplayResult);
    
    // Cálculo inicial es decir el rendimiento en $100,000
    calculateAndDisplayResult();
    
    /* END CALCULADORA */

    /* FORMULARIO */
    $("#creditors_form").validate({
        rules: {
            name : {
                required: true
            },
            phone: {
                required: true,
                number: true
            },
            mail: {
                required: true,
                email: true
            },
            privacy:{
                required: true
            }
        },
        messages : {
            name: {
                required: "Este campo es obligatorio"
            },
            phone: {
                required: "Este campo es obligatorio",
                number: "Por favor ingrese solo números"
            },
            mail: {
                required: "Este campo es obligatorio",
                email: "Ingresa una dirección de correo válida"
            },
            privacy: {
                required: "Este campo es obligatorio",
            }
        },
        errorClass : "error-form",
        errorElement: "p",
        submitHandler: function(form) {
            event.preventDefault();
            $('#submit-btn').prop('disabled', true);
            console.log('Mensaje enviado');
            window.location.href = 'gracias.html';
        }
    });
    /* END FORMULARIO */
    /* POPUP FORMULARIO */
    $('.contact_pop').on('click', function(){
        $('#contact_pop_target').fadeIn(300);
    });
    $('#contact_pop_close').on('click', function(){
        $('#contact_pop_target').fadeOut(300);
    });
    $("#pop_form").validate({
        rules: {
            name : {
                required: true
            },
            phone: {
                required: true,
                number: true
            },
            mail: {
                required: true,
                email: true
            },
            privacy:{
                required: true
            }
        },
        messages : {
            name: {
                required: "Este campo es obligatorio"
            },
            phone: {
                required: "Este campo es obligatorio",
                number: "Por favor ingrese solo números"
            },
            mail: {
                required: "Este campo es obligatorio",
                email: "Ingresa una dirección de correo válida"
            },
            privacy: {
                required: "Este campo es obligatorio",
            }
        },
        errorClass : "error-form",
        errorElement: "p",
        submitHandler: function(form) {
            event.preventDefault();
            $('#submit-btn').prop('disabled', true);
            console.log('Mensaje enviado');
            window.location.href = 'gracias.html';
        }
    });
    /* END POPUP FORMULARIO */
});

/* B U T T O N  C O L O R S */
const renderColors = ( container ) =>{
    let colorIndex = 0;
    $(container).each(function() {
        // Obtener el botón dentro de este bloque
        let $button = $(this).find('.btn');
        let $title =$(this).find('.ttl');
        // Asignar el color de fondo al botón
        $button.css('background-color', colors[colorIndex]);
        $title.css('color', colors[colorIndex]);
        
        // Incrementar el índice de color o reiniciar si alcanza el límite
        colorIndex = (colorIndex + 1) % colors.length;
    });
}
/* END B U T T O N  C O L O R S */

/* S L I D E R C O N O C E */
function initializeSlider() {
    if ($(window).width() <= 950 ) {
        $('#home_know').not('.slick-initialized').slick({
            infinite: false,
            speed: 300,
            slidesToShow: 1.1, // Ajusta el número de diapositivas para pantallas móviles
            arrows: false,
        });
    } else if ($('#home_know').hasClass('slick-initialized')) {
        $('#home_know').slick('unslick');
    }
}
/* END S L I D E R C O N O C E */

/* S L I D E R A c r e e d o r e s */
function initializeCreditorsSlider() {
    if ($(window).width() <= 950 ) {
        $('#creditors_finances').not('.slick-initialized').slick({
            infinite: false,
            speed: 300,
            slidesToShow: 1.2, // Ajusta el número de diapositivas para pantallas móviles
            arrows: false,
        });
    } else if ($('#creditors_finances').hasClass('slick-initialized')) {
        $('#creditors_finances').slick('unslick');
    }
}
/* END S L I D E R A c r e e d o r e s  */

/* C A L C U L A D O R A  */
let initialCapital = 100000;
let selectedYears = 1;
let isMonthly = false;

function calculateAndDisplayResult() {
    const capital = initialCapital || parseFloat($('#capital').val());

    // Calcula el rendimiento anual para 1 año
    let annualReturnForOneYear = (capital * 0.14) - (capital * 0.14 * 0.16);
    
    // Multiplica el resultado del rendimiento anual por los años seleccionados
    let totalAnnualReturn = annualReturnForOneYear * selectedYears;

    // Si está en modo mensual, divide el rendimiento anual de 1 año entre 12
    let result = isMonthly ? annualReturnForOneYear / 12 : totalAnnualReturn;

    const formattedResult = `$${result.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    $('.creditors__calculator-block-total .total').text(formattedResult);
}
/* END C A L C U L A D O R A  */
