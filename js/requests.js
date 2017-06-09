(function($, undefined) {
    $(document).ready(function() {
        var service = new RequestsService();
        var requestMgr = new RequestMgr();
        var spinner = new Spinner();
        var form = new Form();
        var requestsGrid = {};
        var alert = new Alert();

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
                if (requestMgr.filter) {
                    $("#startDate").val(requestMgr.filter.startDate);
                    $("#endDate").val(requestMgr.filter.endDate);
                    $("#competitionFilter").val(requestMgr.filter.competition);
                } else {
                    $("#startDate").val(form.getToday());
                    $("#endDate").val(form.getToday());
                }
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

        $("#requestModal #saveRequest").live("click", function() {
            $("#requestModal").modal("hide");
            service.UpdateRequest(requestMgr.setRequestData()).then(function() {
                spinner.show();
                if (requestMgr.filter) {
                    service.GetFilteredRequests(requestMgr.filter).then(function(data) {
                        requestMgr.fetchRequests(data);
                        requestsGrid.getDataSource(requestMgr.getRequestsList());
                        $("#requestsGrid").html('');
                        $("#requestsGrid").append(requestsGrid.renderGrid());
                        spinner.hide();
                    });
                    $("#startDate").val(requestMgr.filter.startDate);
                    $("#endDate").val(requestMgr.filter.endDate);
                    $("#competitionFilter").val(requestMgr.filter.competition);
                } else {
                    service.GetAllRequests().then(function(data) {
                        requestMgr.fetchRequests(data);
                        requestsGrid.getDataSource(requestMgr.getRequestsList());
                        $("#requestsGrid").html('');
                        $("#requestsGrid").append(requestsGrid.renderGrid());
                        spinner.hide();
                    });
                    $("#startDate").val(form.getToday());
                    $("#endDate").val(form.getToday());
                }
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
            requestMgr.filter = {
                competition: $("#competitionFilter").val(),
                startDate: $("#startDate").val(),
                endDate: $("#endDate").val()
            }
            switch (requestMgr.validateFilter()) {
                case 1:
                    alert.alertDanger("Не вибране змагання");
                    $("#competitionFilter").parent().addClass("has-error");
                    break;
                case 2:
                    alert.alertDanger("Не вибрано дату Від");
                    $("#startDate").parent().addClass("has-error");
                    break;
                case 3:
                    alert.alertDanger("Не вибрано дату До");
                    $("#endDate").parent().addClass("has-error");
                    break;
                case 4:
                    alert.alertDanger("Дата Від пізніше за дату До");
                    $("#startDate").parent().addClass("has-error");
                    $("#endDate").parent().addClass("has-error");
                    break;
                default:
                    spinner.show();
                    service.GetFilteredRequests(requestMgr.filter).then(function(data) {
                        if (!data.length) {
                            spinner.hide();
                        } else {
                            requestMgr.fetchRequests(data);
                            requestsGrid.getDataSource(requestMgr.getRequestsList());
                            $("#requestsGrid").html('');
                            $("#requestsGrid").append(requestsGrid.renderGrid());
                            spinner.hide();
                        }
                    });
                    break;
            }
            $("#competitionFilter").val(requestMgr.filter.competition);
            $("#startDate").val(requestMgr.filter.startDate);
            $("#endDate").val(requestMgr.filter.endDate);
        });


        $("#startDate, #endDate").live("click", function(e) {
            if ($(e.target).parent().hasClass("has-error")) {
                $(e.target).parent().removeClass("has-error");
            }
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
        this.filter = null;
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
            if (data.doping.isChecked == "true") {
                $("input[name='dopingControl'][value='true']").attr("checked", "checked");
                $("#dopingControlDate").val(data.doping.checkDate);
                $("#wrapDopingControlDate").css("display", "block");
            } else {
                $("input[name='dopingControl'][value='false']").attr("checked", "checked");
                $("#wrapDopingControlDate").css("display", "none");
            }
            if (data.visa.hasVisa == "true") {
                $("input[name='activeVisa'][value='true']").attr("checked", "checked");
                $("#typeOfVisa").val(data.visa.type).change();
                $("#termOfVisa").val(data.visa.termOfVisa);
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
            this.requestDataForUpdate.doping.checkDate = $("#dopingControlDate").val().trim();
            this.requestDataForUpdate.visa.hasVisa = $("input[name=activeVisa]:checked").val();
            this.requestDataForUpdate.visa.type = $("#typeOfVisa").val();
            this.requestDataForUpdate.visa.termOfVisa = $("#termOfVisa").val();
            return this.requestDataForUpdate;
        }

        this.validateFilter = function() {
            if (!this.filter.competition) return 1;
            if (!this.filter.startDate || this.filter.startDate == "") return 2;
            if (!this.filter.endDate || this.filter.endDate == "") return 3;
            if (new Date(this.filter.startDate) > new Date(this.filter.endDate)) return 4;
            return 0;
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

        this.GetFilteredRequests = function(filter) {
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