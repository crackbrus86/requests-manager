(function($, undefined) {
    var visaDir = "../wp-content/plugins/requests-manager/api/Visa/";
    var rootDir = "../wp-content/plugins/requests-manager/api/";
    $(document).ready(function() {
        var formV = new Form();
        var spinnerV = new Spinner();
        var alertV = new Alert();
        var visaSupport = new VisaSupport();

        $.ajax({
            url: rootDir + "Games-Manager/GetActualGames.php",
            type: "POST"
        }).then(function(data) {
            formV.appendOptions("#competitionFilterVisa", JSON.parse(data));
            setupDefaultDate();
        });

        $("#runFilterVisa").live("click", function() {
            visaSupport.filter = {
                competition: $("#competitionFilterVisa").val(),
                startDate: $("#startDateVisa").val(),
                endDate: $("#endDateVisa").val()
            }
            switch (visaSupport.validateFilter()) {
                case 1:
                    alertV.alertDanger("Не вибране змагання");
                    $("#competitionFilterVisa").parent().addClass("has-error");
                    break;
                case 2:
                    alertV.alertDanger("Не вибрано дату Від");
                    $("#startDateVisa").parent().addClass("has-error");
                    break;
                case 3:
                    alertV.alertDanger("Не вибрано дату До");
                    $("#endDateVisa").parent().addClass("has-error");
                    break;
                case 4:
                    alertV.alertDanger("Дата Від пізніше за дату До");
                    $("#startDateVisa").parent().addClass("has-error");
                    $("#endDateVisa").parent().addClass("has-error");
                    break;
                default:
                    spinnerV.show();
                    visaSupport.getVisaSupportList().then(function(data) {
                        console.log(data);
                        spinnerV.hide();
                    });
                    // spinnerN.show();
                    // nominationsMgr.getNomination().then(function(data) {
                    //     nominationsMgr.fetchCategories(JSON.parse(data));
                    //     nominationsMgr.displayNominations();
                    //     spinnerN.hide();
                    // });
                    break;
            }
            visaSupport.setupCurrentFilter();
            // nominationsMgr.setupCurrentFilter();
        });

        $("#startDateVisa, #endDateVisa").live("click", function(e) {
            if ($(e.target).parent().hasClass("has-error")) {
                $(e.target).parent().removeClass("has-error");
            }
        });

        function setupDefaultDate() {
            $("#startDateVisa").val(formV.getToday());
            $("#endDateVisa").val(formV.getToday());
        }
    });

    function VisaSupport() {
        var filter = null;

        this.validateFilter = function() {
            if (!this.filter.competition) return 1;
            if (!this.filter.startDate || this.filter.startDate == "") return 2;
            if (!this.filter.endDate || this.filter.endDate == "") return 3;
            if (new Date(this.filter.startDate) > new Date(this.filter.endDate)) return 4;
            return 0;
        }

        this.getVisaSupportList = function() {
            return $.ajax({
                url: visaDir + "GetVisaSupport.php",
                type: "POST",
                data: this.filter
            })
        }

        this.setupCurrentFilter = function() {
            $("#startDateVisa").val(this.filter.startDate);
            $("#endDateVisa").val(this.filter.endDate);
            $("#competitionFilterVisa").val(this.filter.competition);
        }
    }
})(jQuery)