(function($, undefined) {
    var delegationDir = "../wp-content/plugins/requests-manager/api/Delegation/";
    var rootDir = "../wp-content/plugins/requests-manager/api/";
    $(document).ready(function() {
        var formD = new Form();
        var spinnerD = new Spinner();
        var alertD = new Alert();
        var delegation = new Delegation();

        if ($("#delegation").hasClass("active")) {
            setupDefaultDate();
        }

        $.ajax({
            url: rootDir + "Games-Manager/GetActualGames.php",
            type: "POST"
        }).then(function(data) {
            formD.appendOptions("#competitionFilterDelegation", JSON.parse(data));
            setupDefaultDate();
        });

        $("#runFilterDelegation").live("click", function() {
            delegation.filter = {
                competition: $("#competitionFilterDelegation").val(),
                startDate: $("#startDateDelegation").val(),
                endDate: $("#endDateDelegation").val()
            }
        });

        function setupDefaultDate() {
            $("#startDateDelegation").val(formD.getToday());
            $("#endDateDelegation").val(formD.getToday());
        }

    });

    function Delegation() {
        this.filter = null;

        this.validateFilter = function() {
            if (!this.filter.competition) return 1;
            if (!this.filter.startDate || this.filter.startDate == "") return 2;
            if (!this.filter.endDate || this.filter.endDate == "") return 3;
            if (new Date(this.filter.startDate) > new Date(this.filter.endDate)) return 4;
            return 0;
        }
    }

})(jQuery)