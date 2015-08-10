function parseRequest() {
    var url = window.location.toString();
    var rq = url.toString().split(/#/im);
    $(".generators__item.active").removeClass("active");
    $(".generators__item[ref='" + rq[1] + "']").addClass("active");
    return rq[1];
}
(function() {
    $(".generators__item * a").on("click", function(e) {
        e.preventDefault();
        var act = "generator.html#" + $(this).parents(
            ".generators__item").attr("ref");
        window.location = act;
    });

    $("#submit-button").click(function(e) {
        //e.preventDefault();
        var rq = parseRequest();
        var min = $("input[name='input_from']").val();
        var max = $("input[name='input_to']").val();
        var range = $("input#amount").val();
        var value = "0";

        switch (rq) {
            case "number-generator":
                {
                    value = Gen.number(min, max);
                    break;
                }
            case "generator-nicks":
                {
                    value = Gen.nik(range);
                    break;
                }
            case "password-generator":
                {
                    value = Gen.password(range);
                    break;
                }
            case "generator-responses":
                {
                    break;
                }
            case "g-code-generator":
                {
                    break;
                }
            case "barcode-generator":
                {
                    break;
                }
            case "lottery-generator":
                {
                    break;
                }
            case "generator-slogans":
                {
                    break;
                }
            case "generator-brands":
                {
                    break;
                }
            case "rhyming-generator":
                {
                    break;
                }
        }
        console.debug(rq + ": min[" + min + "] max[" + max +
            "] range[" + range + "] = " + value);
        $(".generator__result").html(value);
    });
    $(document).ready(function() {
        $("#submit-button").click();
    });
    $("generator__form * input").change(function() {
        $("#submit-button").click();
        console.debug($(this).attr("name") + " changed");
    });
})();
/*

*/
