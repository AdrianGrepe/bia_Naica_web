const $ = jQuery;
const colors = ["#4B50FF", "#78D2C3", "#9650FF"];

$(window).on("load", () => {
    console.log("Hello world from El Cultivo! --Load");

    if ($("#home_hero").length) {
        $("#home_hero").slick({
            arrows: false,
            dots: true,
            dotsClass: "dots",
            infinite: true,
            autoplay: true,
            autoplaySpeed: 8000,
            pauseOnHover: true,
            speed: 650,
            fade: true,
            lazyLoad: "ondemand",
            cssEase: "linear",
            adaptiveHeight: true,
            responsive: [{
                breakpoint: 651,
                settings: {
                    adaptiveHeight: true
                }
            }]
        });
    }

    if ($("#home_know").length) {
        renderColors($("#home_know .home__know-block .home__know-block-content"));
        initializeSlider();
    }

    if ($("#home_reviews").length) {
        $("#home_reviews").slick({
            arrows: false,
            dots: true,
            dotsClass: "dots dots--reviews",
            infinite: true,
            autoplay: true,
            autoplaySpeed: 8000,
            pauseOnHover: true,
            speed: 650,
            fade: true,
            lazyLoad: "ondemand",
            cssEase: "linear",
            adaptiveHeight: true
        });
    }

    if ($("#creditors_finances").length) {
        initializeCreditorsSlider();
    }
});

$(window).on("load resize", () => {
    if ($("#home_know").length) {
        initializeSlider();
    }

    if ($("#creditors_finances").length) {
        initializeCreditorsSlider();
    }
});

$(document).ready(() => {
    console.log("Hello world from El Cultivo! --Ready");

    $("#open_menu").on("click", () => {
        $("#menu_target").fadeIn(300);
    });

    $("#close_menu").on("click", () => {
        $("#menu_target").fadeOut(150);
    });

    document.querySelectorAll(".range-input").forEach((input) => {
        input.addEventListener("input", () => {
            const id = input.id;
            const target = document.querySelector(`.amount-target[data-target="${id}"]`);
            if (target) {
                target.textContent = `$${parseInt(input.value).toLocaleString("es-MX")}`;
            }
        });
    });

    $(".creditors__calculator-filters-button").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");

        if ($(this).is("#first_block")) {
            selectedYears = 1;
        } else if ($(this).is("#second_block")) {
            selectedYears = 3;
        } else if ($(this).is("#third_block")) {
            selectedYears = 5;
        }

        calculateAndDisplayResult();
    });

    $(".btn_type").on("click", function () {
        $(this).addClass("active").siblings(".btn_type").removeClass("active");
        isMonthly = $(this).attr("id") === "monthly";
        calculateAndDisplayResult();
    });

    $(".range-input").on("input", function () {
        initialCapital = parseFloat($(this).val());
        calculateAndDisplayResult();
    });

    $("#calculate").on("click", calculateAndDisplayResult);
    calculateAndDisplayResult();

    $("#creditors_form").validate({
        rules: {
            name: { required: true },
            phone: { required: true, number: true },
            mail: { required: true, email: true },
            privacy: { required: true }
        },
        messages: {
            name: { required: "Este campo es obligatorio" },
            phone: { required: "Este campo es obligatorio", number: "Por favor ingrese solo números" },
            mail: { required: "Este campo es obligatorio", email: "Ingresa una dirección de correo válida" },
            privacy: { required: "Este campo es obligatorio" }
        },
        errorClass: "error-form",
        errorElement: "p",
        submitHandler: function (e) {
            event.preventDefault();
            $("#submit-btn").prop("disabled", true);
            console.log("Mensaje enviado");
            window.location.href = graciasUrl;
        }
    });

    $(".contact_pop").on("click", () => {
        $("#contact_pop_target").fadeIn(300);
    });

    $("#contact_pop_close").on("click", () => {
        $("#contact_pop_target").fadeOut(300);
    });

    $("#pop_form").validate({
        rules: {
            name: { required: true },
            phone: { required: true, number: true },
            mail: { required: true, email: true },
            privacy: { required: true }
        },
        messages: {
            name: { required: "Este campo es obligatorio" },
            phone: { required: "Este campo es obligatorio", number: "Por favor ingrese solo números" },
            mail: { required: "Este campo es obligatorio", email: "Ingresa una dirección de correo válida" },
            privacy: { required: "Este campo es obligatorio" }
        },
        errorClass: "error-form",
        errorElement: "p",
        submitHandler: function (e) {
            event.preventDefault();
            $("#submit-btn").prop("disabled", true);
            console.log("Mensaje enviado");
            window.location.href = graciasUrl;
        }
    });
});

const renderColors = (element) => {
    let index = 0;
    $(element).each(function () {
        const button = $(this).find(".btn");
        const title = $(this).find(".ttl");
        button.css("background-color", colors[index]);
        title.css("color", colors[index]);
        index = (index + 1) % colors.length;
    });
};

function initializeSlider() {
    if ($(window).width() <= 950) {
        $("#home_know").not(".slick-initialized").slick({
            infinite: false,
            speed: 300,
            slidesToShow: 1.1,
            arrows: false
        });
    } else {
        if ($("#home_know").hasClass("slick-initialized")) {
            $("#home_know").slick("unslick");
        }
    }
}

function initializeCreditorsSlider() {
    if ($(window).width() <= 950) {
        $("#creditors_finances").not(".slick-initialized").slick({
            infinite: false,
            speed: 300,
            slidesToShow: 1.2,
            arrows: false
        });
    } else {
        if ($("#creditors_finances").hasClass("slick-initialized")) {
            $("#creditors_finances").slick("unslick");
        }
    }
}

let initialCapital = 100000, selectedYears = 1, isMonthly = false;

function calculateAndDisplayResult() {
    const amount = initialCapital || parseFloat($("#capital").val());
    let result = 0.14 * amount - 0.14 * amount * 0.16;
    const formattedResult = `$${(isMonthly ? result / 12 : result * selectedYears).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    $(".creditors__calculator-block-total .total").text(formattedResult);
}
//# sourceMappingURL=micorriza-dist.js.map
