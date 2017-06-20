(function($, undefined) {
    var visaDir = "../wp-content/plugins/requests-manager/api/Visa/";
    var rootDir = "../wp-content/plugins/requests-manager/api/";
    $(document).ready(function() {
        var formV = new Form();
        var spinnerV = new Spinner();
        var alertV = new Alert();
        var visaSupport = new VisaSupport();

        if ($("#visaSupport").hasClass("active")) {
            setupDefaultDate();
        }

        $("a[href=#visaSupport]").live("click", function() {
            if (visaSupport.filter) visaSupport.setupCurrentFilter();
            else setupDefaultDate();
        });

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
                        visaSupport.buildGrid(data);
                        spinnerV.hide();
                    });
                    break;
            }
            visaSupport.setupCurrentFilter();
        });

        $("#startDateVisa, #endDateVisa").live("click", function(e) {
            if ($(e.target).parent().hasClass("has-error")) {
                $(e.target).parent().removeClass("has-error");
            }
        });

        $(".word-export-visa").live("click", function() {
            $("#visaGrids").wordExport();
        });

        $(".print-visa").live("click", function() {
            $.print("#visaGrids");
        });

        function setupDefaultDate() {
            $("#startDateVisa").val(formV.getToday());
            $("#endDateVisa").val(formV.getToday());
        }
    });

    function VisaSupport() {
        this.filter = null;
        this.dataForGrid = [];
        this.gridFields = [{
                title: "Прізвище, Ім'я",
                field: "fullName",
                width: "220px"
            },
            {
                title: "Дата народження",
                field: "birthDay",
                width: "120px"
            },
            {
                title: "Номер паспорта",
                field: "passNumber",
                width: "120px"
            },
            {
                title: "Термін дії паспорта",
                field: "passExpiration",
                width: "120px"
            }
        ]

        this.buildGrid = function(data) {
            $("#visaGrids").html('');
            this.dataForGrid = [];
            var grid = new Grid(this.gridFields, this.prepareData(JSON.parse(data)));
            $("#visaGrids").append(grid.renderGrid());
        }

        this.prepareData = function(data) {
            var result = data.sort(compareLastName);
            var tempObj = {};
            for (var i = 0; i < result.length; i++) {
                tempObj.fullName = result[i].last_name + " " + result[i].first_name;
                tempObj.birthDay = result[i].birth_date;
                tempObj.passNumber = result[i].serial_number_pass + result[i].number_pass;
                tempObj.passExpiration = result[i].expiration_date_pass
                this.dataForGrid.push({
                    fullName: tempObj.fullName,
                    birthDay: tempObj.birthDay,
                    passNumber: tempObj.passNumber,
                    passExpiration: tempObj.passExpiration
                });
            }
            return this.dataForGrid;
        }

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

        function compareLastName(a, b) {
            var textA = a.last_name.toUpperCase();
            var textB = b.last_name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }
    }
})(jQuery)