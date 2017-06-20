(function($, undefined) {
    var nominationsDir = "../wp-content/plugins/requests-manager/api/Nominations/";
    var rootDir = "../wp-content/plugins/requests-manager/api/";
    $(document).ready(function() {
        var formN = new Form();
        var spinnerN = new Spinner();
        var alertN = new Alert();
        var nominationsMgr = new NominationsMng();

        $.ajax({
            url: rootDir + "Games-Manager/GetActualGames.php",
            type: "POST"
        }).then(function(data) {
            formN.appendOptions("#competitionFilterNom", JSON.parse(data));
            setupDefaultDate()
        });

        nominationsMgr.getAgeCategories().then(function(categories) {
            nominationsMgr.setAgeCategories(JSON.parse(categories));
        });

        if ($("#nominations").hasClass("active")) {
            setupDefaultDate();
        }

        $("a[href=#nominations]").live("click", function() {
            if (nominationsMgr.filter) nominationsMgr.setupCurrentFilter();
            else setupDefaultDate();
        });

        $("#runFilterNom").live("click", function() {
            nominationsMgr.filter = {
                competition: $("#competitionFilterNom").val(),
                startDate: $("#startDateNom").val(),
                endDate: $("#endDateNom").val()
            }
            switch (nominationsMgr.validateFilter()) {
                case 1:
                    alertN.alertDanger("Не вибране змагання");
                    $("#competitionFilterNom").parent().addClass("has-error");
                    break;
                case 2:
                    alertN.alertDanger("Не вибрано дату Від");
                    $("#startDateNom").parent().addClass("has-error");
                    break;
                case 3:
                    alertN.alertDanger("Не вибрано дату До");
                    $("#endDateNom").parent().addClass("has-error");
                    break;
                case 4:
                    alertN.alertDanger("Дата Від пізніше за дату До");
                    $("#startDateNom").parent().addClass("has-error");
                    $("#endDateNom").parent().addClass("has-error");
                    break;
                default:
                    spinnerN.show();
                    nominationsMgr.getNomination().then(function(data) {
                        nominationsMgr.fetchCategories(JSON.parse(data));
                        nominationsMgr.displayNominations();
                        spinnerN.hide();
                    });
                    break;
            }
            nominationsMgr.setupCurrentFilter();
        });

        $(".word-export-nom").live("click", function() {
            $("#nominationsGrids").wordExport();
        });

        $(".print-nom").live("click", function() {
            $.print("#nominationsGrids");
        });

        function setupDefaultDate() {
            $("#startDateNom").val(formN.getToday());
            $("#endDateNom").val(formN.getToday());
        }

    });

    function NominationsMng() {
        this.filter = null;
        this.ageCategories = null;
        this.tables = [];
        this.gridFields = [{
                title: "Вагова кат.",
                field: "weight",
                width: "120px"
            },
            {
                title: "Прізвище",
                field: "lastName",
                width: "300px"
            },
            {
                title: "Ім'я",
                field: "firstName",
                width: "200px"
            },
            {
                title: "Дата народження",
                field: "birthDate",
                width: "120px"
            },
            {
                title: "Присідання",
                field: "squat",
                width: "80px"
            },
            {
                title: "Жим",
                field: "benchPress",
                width: "80px"
            },
            {
                title: "Тяга",
                field: "deadLift",
                width: "80px"
            },
            {
                title: "Сума",
                field: "total",
                width: "80px"
            }
        ]

        this.validateFilter = function() {
            if (!this.filter.competition) return 1;
            if (!this.filter.startDate || this.filter.startDate == "") return 2;
            if (!this.filter.endDate || this.filter.endDate == "") return 3;
            if (new Date(this.filter.startDate) > new Date(this.filter.endDate)) return 4;
            return 0;
        }

        this.setupCurrentFilter = function() {
            $("#startDateNom").val(this.filter.startDate);
            $("#endDateNom").val(this.filter.endDate);
            $("#competitionFilterNom").val(this.filter.competition);
        }

        this.setAgeCategories = function(categories) {
            this.ageCategories = categories;
        }

        this.getNomination = function() {
            return $.ajax({
                url: nominationsDir + "GetNominations.php",
                type: "POST",
                data: this.filter
            })
        }

        this.displayNominations = function() {
            $("#nominationsGrids").html('');
            for (var i = 0; i < this.tables.length; i++) {
                $("#nominationsGrids").append($("<div class='nom-cat-" + this.tables[i].id + "'></div>")
                    .append("<h3>" + this.tables[i].title + "</h3>")
                    .append("<div class='nom-cat-items'></div>"));
                var grid = new Grid(this.gridFields, this.tables[i].items.sort(compareWeight));
                $(".nom-cat-" + this.tables[i].id + " .nom-cat-items:last-child").append(grid.renderGrid());
            }
        }

        this.fetchCategories = function(data) {
            this.tables = [];
            for (var i = 0; i < this.ageCategories.length; i++) {
                var cat = { id: this.ageCategories[i].id, title: this.ageCategories[i].title, items: [] }
                for (var j = 0; j < data.length; j++) {
                    if (this.ageCategories[i].id == data[j].age) {
                        prepareDataSource(data[j]);
                        cat.items.push(data[j]);
                    }
                }
                if (cat.items.length > 0) this.tables.push(cat);
            }
        }

        this.getAgeCategories = function() {
            return $.ajax({
                url: rootDir + "Categories-Manager/GetAgeCategories.php",
                type: "POST"
            })
        }

        function compareWeight(a, b) {
            return a.class - b.class;
        }

        function prepareDataSource(item) {
            item.squat = item.results.squat;
            item.benchPress = item.results.benchPress;
            item.deadLift = item.results.deadLift;
            item.total = item.results.total;
            return item;
        }
    }
})(jQuery);