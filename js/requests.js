(function($, undefined) {
    $(document).ready(function() {
        var service = new RequestsService();
        var requestMgr = new RequestMgr();
        var spinner = new Spinner();
        var form = new Form();
        var requestsGrid = {};

        service.GetAgeCategories().then(function(data) {
            requestMgr.ageCategories = JSON.parse(data);
            form.appendOptions("#requestModal #ageCategory", requestMgr.ageCategories);
        }).then(function() {
            service.GetWeightCategories().then(function(data) {
                requestMgr.weightCategories = JSON.parse(data);
                form.appendOptions("#requestModal #weightCategory", requestMgr.weightCategories.filter(function(item) {
                    return item.parent == requestMgr.ageCategories[0].id;
                }));
            })
        });

        service.GetActualGames().then(function(data) {
            requestMgr.currentCompetition = JSON.parse(data);
            form.appendOptions("#filter #competitionFilter", requestMgr.currentCompetition);
            form.appendOptions("#requestModal #currentCompetition", requestMgr.currentCompetition);
        }).then(function() {
            service.GetBeforeGames().then(function(data) {
                requestMgr.preCompetition = JSON.parse(data);
                form.appendOptions("#requestModal #preCompetition", requestMgr.preCompetition);
            });
        });

        if ($("#requests").hasClass("active")) {
            spinner.show();
            service.GetAllRequests().then(function(data) {
                requestMgr.fetchRequests(data);
                requestsGrid = new Grid(requestMgr.fields, requestMgr.getRequestsList());
                $("#requestsGrid").append(requestsGrid.renderGrid());
                spinner.hide();
            });

        }

        $('a[href="#requests"]').live('click', function() {
            alert('123');
        });

        $(".btn-edit").live('click', function(e) {
            spinner.show();
            service.GetRequest(e.target.dataset["rel"]).then(function(data) {
                spinner.hide();
                requestMgr.populateModal(JSON.parse(data)[0]);
                $("#requestModal").modal('show');

            });
        });

        $(".btn-delete").live("click", function(e) {
            $("#confirmDialog #removeRequestId").val(e.target.dataset["rel"]);
            $("#confirmDialog").modal("show");
        });

        $("#requestModal #ageCategory").live("change", function(e) {
            form.appendOptions("#requestModal #weightCategory", requestMgr.weightCategories.filter(function(item) {
                return item.parent == e.target.value;
            }));
        });

        $("input[name='dopingControl']").live("change", function() {
            $("#wrapDopingControlDate").toggle();
        });

        $("input[name='activeVisa']").live("change", function() {
            $("#typeOfVisa option:first").attr('selected', 'selected');
            $("#termOfVisa").val('');
            $("#visaFeatures").toggle();
        });

        $(".discipline").live("change", function() {
            requestMgr.calculateTotal();
        });

        $("#dopingControlDate, #startDate, #endDate").live("click", function() {
            $(this).datepicker({
                altFormat: "dd-mm-yy",
                changeYear: true,
                yearRange: "1900:2200",
                regional: ["uk"]
            }).datepicker("show");
        });

        $("#termOfVisa").live("click", function() {
            $(this).datepicker({
                altFormat: "dd-mm-yy",
                changeYear: true,
                yearRange: "1900:2200",
                regional: ["uk"]
            }).datepicker("show");
        });

        $("#requestModal #saveRequest").live("click", function() {
            $("#requestModal").modal("hide");
            service.UpdateRequest(requestMgr.setRequestData()).then(function() {
                spinner.show();
                service.GetAllRequests().then(function(data) {
                    requestMgr.fetchRequests(data);
                    requestsGrid.getDataSource(requestMgr.getRequestsList());
                    $("#requestsGrid").html('');
                    $("#requestsGrid").append(requestsGrid.renderGrid());
                    spinner.hide();
                });
            });
        });

        $("#confirmDialog #deleteRequest").live("click", function() {
            var id = $("#confirmDialog #removeRequestId").val();
            $("#confirmDialog").modal("hide");
            service.DeleteRequest(id).then(function() {
                spinner.show();
                service.GetAllRequests().then(function(data) {
                    requestMgr.fetchRequests(data);
                    requestsGrid.getDataSource(requestMgr.getRequestsList());
                    $("#requestsGrid").html('');
                    $("#requestsGrid").append(requestsGrid.renderGrid());
                    spinner.hide();
                });
            });
        });

        $("#runFilter").live("click", function() {
            var filter = {
                competition: $("#competitionFilter").val(),
                startDate: form.formatUniversal($("#startDate").val(), ".", "-"),
                endDate: form.formatUniversal($("#endDate").val(), ".", "-")
            }
            service.getFilteredRequests(filter).then(function(data) {
                console.log(data);
            })
        });

        $("#startDate").val(form.getToday());
        $("#endDate").val(form.getToday());
    });

    function RequestMgr() {
        var requests = [];
        this.ageCategories = [];
        this.weightCategories = [];
        this.currentCompetition = [];
        this.preCompetition = [];
        this.fields = [{
                title: "",
                field: "id",
                button: "edit"
            },
            {
                title: "",
                field: "id",
                button: "delete"
            },
            {
                title: "Прізвище",
                field: "last_name"
            },
            {
                title: "Ім'я",
                field: "first_name"
            },
            {
                title: "Вікова категорія",
                field: "title"
            },
            {
                title: "Вагова категорія",
                field: "title_w"
            },
            {
                title: "Змагання",
                field: "name"
            },
            {
                title: "Дата подачі",
                field: "create_date"
            }
        ];

        function appendRequest(request) {
            requests.push(request);
        }

        this.fetchRequests = function(data) {
            requests = [];
            var dt = JSON.parse(data);
            for (var i = 0; i < dt.length; i++) {
                requests.push(dt[i]);
            }
        }

        this.calculateTotal = function() {
            var disciplines = ["squat", "benchPress", "deadLift"];
            var total = 0;
            for (var i = 0; i < disciplines.length; i++) {
                total += parseFloat($("#" + disciplines[i]).val());
            }
            $("#total").val(total);
        }

        this.populateModal = function(data) {
            var globalForm = new Form();
            var fullName = data.last_name + " " + data.first_name + " " + data.middle_name;
            $("#requestId").val(data.id);
            $("#fullname").val(fullName);
            $("#birthDate").val(globalForm.formatForDatepicker(data.birth_date, '-'));
            $("#region").val(data.region);
            $("#ageCategory").val(data.age_category_id).change();
            $("#weightCategory").val(data.weight_category_id).change();
            $("#currentCompetition").val(data.current_competition_id).change();
            $("#squat").val(data.results.squat);
            $("#benchPress").val(data.results.benchPress);
            $("#deadLift").val(data.results.deadLift);
            this.calculateTotal();
            $("#preCompetition").val(data.pre_competition_id);
            if (data.doping.dopingControl == "true") {
                $("input[name='dopingControl'][value='true']").attr("checked", "checked");
                $("#dopingControlDate").val(globalForm.formatForDatepicker(data.doping.dopingControlDate, "."));
                $("#wrapDopingControlDate").css("display", "block");
            } else {
                $("input[name='dopingControl'][value='false']").attr("checked", "checked");
                $("#wrapDopingControlDate").css("display", "none");
            }
            if (data.visa.hasActiveVisa == "true") {
                $("input[name='activeVisa'][value='true']").attr("checked", "checked");
                $("#typeOfVisa").val(data.visa.typeOfVisa).change();
                $("#termOfVisa").val(globalForm.formatForDatepicker(data.visa.termOfVisa, "."));
                $("#visaFeatures").css("display", "block");
            } else {
                $("input[name='activeVisa'][value='false']").attr("checked", "checked");
                $("#visaFeatures").css("display", "none");
            }
            if (data.coach_details) {
                $("#coachesList").remove();
                $("#editRequest").append("<div id='coachesList'><h3>Тренери</h3><ul></ul></div>");
                for (var i = 0; i < data.coach_details.length; i++) {
                    var coach = data.coaches.filter(function(item) {
                        return item[0] == data.coach_details[i].id
                    });
                    var escorts = (coach[0][1] == "true") ? " - <strong>cупроводжує</strong>" : "";
                    $("#coachesList ul").append("<li class='bg-primary'>" + data.coach_details[i].last_name + " " + data.coach_details[i].first_name +
                        " " + data.coach_details[i].middle_name + escorts + "</li>");
                }
            }
        }

        this.getRequestsList = function() {
            return requests;
        }

        this.requestDataForUpdate = {
            id: "",
            ageCat: "",
            weigthCat: "",
            competiton: "",
            results: {
                squat: "0.00",
                benchPress: "0.00",
                deadLift: "0.00",
                total: "0.00"
            },
            preCompetition: "",
            doping: {
                isChecked: "",
                checkDate: ""
            },
            visa: {
                hasVisa: "",
                typeOfVisa: "",
                termOfVisa: ""
            }
        };

        this.setRequestData = function() {
            var form = new Form();
            this.requestDataForUpdate.id = $("#requestId").val().trim();
            this.requestDataForUpdate.ageCat = $("#ageCategory").val();
            this.requestDataForUpdate.weigthCat = $("#weightCategory").val()
            this.requestDataForUpdate.competiton = $("#currentCompetition").val();
            this.requestDataForUpdate.results.squat = $("#squat").val().trim();
            this.requestDataForUpdate.results.benchPress = $("#benchPress").val().trim();
            this.requestDataForUpdate.results.deadLift = $("#deadLift").val().trim();
            this.requestDataForUpdate.results.total = $("#total").val().trim();
            this.requestDataForUpdate.preCompetition = $("#preCompetition").val();
            this.requestDataForUpdate.doping.isChecked = $("input[name=dopingControl]:checked").val();
            this.requestDataForUpdate.doping.checkDate = form.formatForDatepicker($("#dopingControlDate").val().trim(), ".");
            this.requestDataForUpdate.visa.hasVisa = $("input[name=activeVisa]:checked").val();
            this.requestDataForUpdate.visa.type = $("#typeOfVisa").val();
            this.requestDataForUpdate.visa.termOfVisa = form.formatForDatepicker($("#termOfVisa").val(), ".");
            return this.requestDataForUpdate;
        }
    }

    function RequestsService() {
        var dir = "../wp-content/plugins/requests-manager/api/Requests/";
        var rootDir = "../wp-content/plugins/requests-manager/api/";

        this.GetAllRequests = function() {
            return $.ajax({
                url: dir + "GetAllRequests.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            });
        }

        this.GetRequest = function(id) {
            return $.ajax({
                url: dir + "GetRequest.php",
                type: "POST",
                data: "id=" + id,
                success: function(data) {
                    return data;
                }
            })
        }

        this.GetAgeCategories = function() {
            return $.ajax({
                url: rootDir + "Categories-Manager/GetAgeCategories.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            })
        }

        this.GetWeightCategories = function() {
            return $.ajax({
                url: rootDir + "Categories-Manager/GetWeightCategoriesStrict.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            })
        }

        this.GetActualGames = function() {
            return $.ajax({
                url: rootDir + "Games-Manager/GetActualGames.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            })
        }

        this.GetBeforeGames = function() {
            return $.ajax({
                url: rootDir + "Games-Manager/GetBeforeGames.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            })
        }

        this.UpdateRequest = function(request) {
            return $.ajax({
                url: dir + "UpdateRequest.php",
                type: "POST",
                data: request,
                success: function(data) {
                    return data;
                }
            })
        }

        this.DeleteRequest = function(id) {
            return $.ajax({
                url: dir + "DeleteRequest.php",
                type: "POST",
                data: "rqstId=" + id,
                success: function(data) {
                    return data;
                }
            })
        }

        this.getFilteredRequests = function(filter) {
            return $.ajax({
                url: dir + "GetFilteredRequests.php",
                type: "POST",
                data: filter,
                success: function(data) {
                    return data;
                }
            })
        }
    }
})(jQuery)