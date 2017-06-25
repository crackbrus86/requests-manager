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
            switch (delegation.validateFilter()) {
                case 1:
                    alertD.alertDanger("Не вибране змагання");
                    $("#competitionFilterDelegation").parent().addClass("has-error");
                    break;
                case 2:
                    alertD.alertDanger("Не вибрано дату Від");
                    $("#startDateDelegation").parent().addClass("has-error");
                    break;
                case 3:
                    alertD.alertDanger("Не вибрано дату До");
                    $("#endDateDelegation").parent().addClass("has-error");
                    break;
                case 4:
                    alertD.alertDanger("Дата Від пізніше за дату До");
                    $("#startDateDelegation").parent().addClass("has-error");
                    $("#endDateDelegation").parent().addClass("has-error");
                    break;
                default:
                    spinnerD.show();
                    delegation.getDelegation().then(function(data) {
                        delegation.buildGrid(data);
                        spinnerD.hide();
                    })
                    break;
            }
            delegation.setupCurrentFilter();
        });

        $("#startDateDelegation, #endDateDelegation").live("click", function(e) {
            if ($(e.target).parent().hasClass("has-error")) {
                $(e.target).parent().removeClass("has-error");
            }
        });

        function setupDefaultDate() {
            $("#startDateDelegation").val(formD.getToday());
            $("#endDateDelegation").val(formD.getToday());
        }

        $(".word-export-delegation").live("click", function() {
            $("#delegationGrid").wordExport();
        });

        $(".print-delegation").live("click", function() {
            $.print("#delegationGrid");
        });
    });

    function Delegation() {
        this.filter = null;
        this.dataForGrid = [];
        this.gridFields = [{
                title: "П.І.Б.",
                field: "fullName"
            },
            {
                title: "область",
                field: "region"
            },
            {
                title: "",
                field: "role"
            }
        ];

        this.validateFilter = function() {
            if (!this.filter.competition) return 1;
            if (!this.filter.startDate || this.filter.startDate == "") return 2;
            if (!this.filter.endDate || this.filter.endDate == "") return 3;
            if (new Date(this.filter.startDate) > new Date(this.filter.endDate)) return 4;
            return 0;
        }

        this.buildGrid = function(data) {
            $("#delegationGrid").html('');
            this.dataForGrid = [];
            var grid = new Grid(this.gridFields, this.prepareData(JSON.parse(data)));
            $("#delegationGrid").append(grid.renderGrid());
        }

        this.prepareData = function(data) {
            var result = data.sort(compareLastName);
            var tempObj = {};
            for (var i = 0; i < result.length; i++) {
                tempObj.fullName = result[i].last_name + " " + result[i].first_name + " " + result[i].middle_name;
                tempObj.region = result[i].region;
                switch (result[i].type) {
                    case "user":
                        tempObj.role = "спортсмен";
                        break;
                    case "coach":
                        tempObj.role = "тренер";
                        break;
                    case "president":
                        tempObj.role = "голова делегації";
                        break;
                }
                this.dataForGrid.push({
                    fullName: tempObj.fullName,
                    region: tempObj.region,
                    role: tempObj.role
                });
            }
            return this.dataForGrid;
        }

        this.setupCurrentFilter = function() {
            $("#competitionFilterDelegation").val(this.filter.competition);
            $("#startDateDelegation").val(this.filter.startDate);
            $("#endDateDelegation").val(this.filter.endDate);
        }

        this.getDelegation = function() {
            return $.ajax({
                url: delegationDir + "GetDelegation.php",
                type: "POST",
                data: this.filter
            })
        }

        function compareLastName(a, b) {
            var textA = a.last_name.toUpperCase();
            var textB = b.last_name.toUpperCase();
            return textA.localeCompare(textB);
        }
    }

})(jQuery)