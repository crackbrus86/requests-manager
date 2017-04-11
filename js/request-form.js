(function($, undefined) {
    $(document).ready(function() {
        $("#birthDate").datepicker({
            altFormat: "dd-mm-yy",
            changeYear: true,
            yearRange: "1910:2200",
            regional: ["uk"]
        });
    })
})(jQuery)