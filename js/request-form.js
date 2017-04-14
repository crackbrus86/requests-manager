(function($, undefined) {
    $(document).ready(function() {

        var dir = "../wp-content/plugins/requests-manager/api/";

        var ageCategories = [],
            weightCategories = [],
            currentCompetition = [];
        var typeOfCompetition;

        $.ajax({
            type: "POST",
            url: dir + "Categories-Manager/GetWeightCategoriesStrict.php",
            success: function(data) {
                weightCategories = JSON.parse(data);
            }
        }).then(function() {
            $.ajax({
                type: "POST",
                url: dir + "Categories-Manager/GetAgeCategories.php",
                success: function(data) {
                    ageCategories = JSON.parse(data);
                }
            }).then(function() {
                appendOptions("#ageCategory", ageCategories);
                appendOptions("#weightCategory", weightCategories.filter(function(item) {
                    return item.parent == ageCategories[0].id;
                }));
            });
        });

        $.ajax({
            type: "POST",
            url: dir + "Games-Manager/GetActualGames.php",
            success: function(data) {
                currentCompetition = JSON.parse(data);
            }
        }).then(function() {
            appendOptions("#currentCompetition", currentCompetition);
            getExercises(getTypeOfCompetition("#currentCompetition", currentCompetition));
        });



        $("#birthDate").datepicker({
            altFormat: "dd-mm-yy",
            changeYear: true,
            yearRange: "1910:2200",
            regional: ["uk"]
        });

        $("#termOfPass").datepicker({
            altFormat: "dd-mm-yy",
            changeYear: true,
            yearRange: "1990:2200",
            regional: ["uk"]
        });

        $("#showNext").on("click", function() {
            $(".anotherData").fadeIn(800);
        });

        $("#ageCategory").on("change", function(e) {
            appendOptions("#weightCategory", weightCategories.filter(function(item) {
                return item.parent == e.target.value;
            }));
        });

        $("#currentCompetition").on("change", function(e) {
            getExercises(getTypeOfCompetition("#currentCompetition", currentCompetition));
        });
    });

    function appendOptions(select, data) {
        var list = '';
        data.forEach(function(item) {
            var id = item.id;
            var title = item.title || item.title_w || item.name;
            list += '<option value="' + id + '">' + title + '</option>';
        });
        $(select).html(list);
    }

    function getTypeOfCompetition(select, listOfCompetitions) {
        for (var i = 0; i < listOfCompetitions.length; i++) {
            if (listOfCompetitions[i].id === $(select).val()) return listOfCompetitions[i].type;
        }
    }

    function getExercises(type) {
        if (type == 0) {
            $("#squat").attr("disabled", false);
            $("#deadLift").attr("disabled", false);
        } else {
            $("#squat").attr("disabled", true);
            $("#deadLift").attr("disabled", true);
        }
    }
})(jQuery)