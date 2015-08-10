function setEqualHeight(columns) {
    var tallestcolumn = 0;
    columns.each(
        function() {
            currentHeight = $(this).height();
            if (currentHeight > tallestcolumn) {
                tallestcolumn = currentHeight;
            }
        }
    );
    columns.height(tallestcolumn);
}

jQuery(document).ready(function($) {
    setEqualHeight($(".generator-page .content > div"));
    $("#slider").slider({
        range: "max",
        min: 1,
        max: 10,
        value: 6,
        slide: function(event, ui) {
            $("#amount").val(ui.value);
        }
    });
    $("#amount").val($("#slider").slider("value"));
    $(".show_menu").on("click", function() {
        $(".content__left").addClass("mobile-menu").show();
        $(this).hide("mobile-menu");
    });
});
