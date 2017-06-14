(function($, undefined) {
    var visaDir = "../wp-content/plugins/requests-manager/api/Visa/";
    var rootDir = "../wp-content/plugins/requests-manager/api/";
    $(document).ready(function() {
        var formV = new Form();
        var spinnerV = new Spinner();
        var alertV = new Alert();

        $.ajax({
            url: rootDir + "Games-Manager/GetActualGames.php",
            type: "POST"
        }).then(function(data) {
            formV.appendOptions("#competitionFilterVisa", JSON.parse(data));
            setupDefaultDate();
        });



        function setupDefaultDate() {
            $("#startDateVisa").val(formV.getToday());
            $("#endDateVisa").val(formV.getToday());
        }
    });
})(jQuery)