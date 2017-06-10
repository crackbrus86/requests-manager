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
            setupDefaultFilter();
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
                if (requestMgr.filter) setupCurrentFilter();
                else setupDefaultFilter();
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
                if (requestMgr.filter) refreshFilteredGrid();
                else refreshDefaultGrid();
            });
        });

        $("#confirmDialog #deleteRequest").live("click", function() {
            var id = $("#confirmDialog #removeRequestId").val();
            $("#confirmDialog").modal("hide");
            service.DeleteRequest(id).then(function() {
                spinner.show();
                if (requestMgr.filter) refreshFilteredGrid();
                else refreshDefaultGrid();
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
                            refreshGrid(data);
                        }
                    });
                    break;
            }
            setupCurrentFilter();
        });


        $("#startDate, #endDate").live("click", function(e) {
            if ($(e.target).parent().hasClass("has-error")) {
                $(e.target).parent().removeClass("has-error");
            }
        });

        function refreshGrid(data) {
            requestMgr.fetchRequests(data);
            requestsGrid.getDataSource(requestMgr.getRequestsList());
            $("#requestsGrid").html('');
            $("#requestsGrid").append(requestsGrid.renderGrid());
            spinner.hide();
        }

        function refreshDefaultGrid() {
            service.GetAllRequests().then(function(data) { refreshGrid(data) });
            setupDefaultFilter();
        }

        function refreshFilteredGrid() {
            service.GetFilteredRequests(requestMgr.filter).then(function(data) { refreshGrid(data) });
            setupCurrentFilter();
        }

        function setupCurrentFilter() {
            $("#startDate").val(requestMgr.filter.startDate);
            $("#endDate").val(requestMgr.filter.endDate);
            $("#competitionFilter").val(requestMgr.filter.competition);
        }

        function setupDefaultFilter() {
            $("#startDate").val(form.getToday());
            $("#endDate").val(form.getToday());
        }
    });
})(jQuery)