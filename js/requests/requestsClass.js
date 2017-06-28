        function RequestMgr() {
            var requests = [];
            this.ageCategories = [];
            this.weightCategories = [];
            this.currentCompetition = [];
            this.preCompetition = [];
            this.filter = null;
            this.recordsPerPage = 10;
            this.currentPage = 1;
            this.offset = this.recordsPerPage * this.currentPage - this.recordsPerPage;
            this.pageParams = {
                limit: this.recordsPerPage,
                offset: this.offset
            }
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

            this.offsetRecalc = function() {
                this.offset = this.recordsPerPage * this.currentPage - this.recordsPerPage;
                this.pageParams.offset = this.offset;
            }

            this.calculateTotal = function() {
                var disciplines = ["squat", "benchPress", "deadLift"];
                var total = 0;
                for (var i = 0; i < disciplines.length; i++) {
                    total += parseFloat(jQuery("#" + disciplines[i]).val());
                }
                jQuery("#total").val(total);
            }

            this.populateModal = function(data) {
                var fullName = data.last_name + " " + data.first_name + " " + data.middle_name;
                jQuery("#requestId").val(data.id);
                jQuery("#fullname").val(fullName);
                jQuery("#birthDate").val(data.birth_date);
                jQuery("#region").val(data.region);
                jQuery("#ageCategory").val(data.age_category_id).change();
                jQuery("#weightCategory").val(data.weight_category_id).change();
                jQuery("#currentCompetition").val(data.current_competition_id).change();
                jQuery("#squat").val(data.results.squat);
                jQuery("#benchPress").val(data.results.benchPress);
                jQuery("#deadLift").val(data.results.deadLift);
                this.calculateTotal();
                jQuery("#preCompetition").val(data.pre_competition_id);
                if (data.doping.isChecked == "true") {
                    jQuery("input[name='dopingControl'][value='true']").attr("checked", "checked");
                    jQuery("#dopingControlDate").val(data.doping.checkDate);
                    jQuery("#wrapDopingControlDate").css("display", "block");
                } else {
                    jQuery("input[name='dopingControl'][value='false']").attr("checked", "checked");
                    jQuery("#wrapDopingControlDate").css("display", "none");
                }
                if (data.visa.hasVisa == "true") {
                    jQuery("input[name='activeVisa'][value='true']").attr("checked", "checked");
                    jQuery("#typeOfVisa").val(data.visa.type).change();
                    jQuery("#termOfVisa").val(data.visa.termOfVisa);
                    jQuery("#visaFeatures").css("display", "block");
                } else {
                    jQuery("input[name='activeVisa'][value='false']").attr("checked", "checked");
                    jQuery("#visaFeatures").css("display", "none");
                }
                jQuery("#coachesList").remove();
                if (data.coach_details) {
                    jQuery("#editRequest").append("<div id='coachesList'><h3>Тренери</h3><ul></ul></div>");
                    for (var i = 0; i < data.coach_details.length; i++) {
                        var coach = data.coaches.filter(function(item) {
                            return item[0] == data.coach_details[i].id
                        });
                        var escorts = (coach[0][1] == "true") ? " - <strong>cупроводжує</strong>" : "";
                        jQuery("#coachesList ul").append("<li class='bg-primary'>" + data.coach_details[i].last_name + " " + data.coach_details[i].first_name +
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
                    type: "",
                    termOfVisa: ""
                }
            };

            this.setRequestData = function() {
                var form = new Form();
                this.requestDataForUpdate.id = jQuery("#requestId").val().trim();
                this.requestDataForUpdate.ageCat = jQuery("#ageCategory").val();
                this.requestDataForUpdate.weigthCat = jQuery("#weightCategory").val()
                this.requestDataForUpdate.competiton = jQuery("#currentCompetition").val();
                this.requestDataForUpdate.results.squat = jQuery("#squat").val().trim();
                this.requestDataForUpdate.results.benchPress = jQuery("#benchPress").val().trim();
                this.requestDataForUpdate.results.deadLift = jQuery("#deadLift").val().trim();
                this.requestDataForUpdate.results.total = jQuery("#total").val().trim();
                this.requestDataForUpdate.preCompetition = jQuery("#preCompetition").val();
                this.requestDataForUpdate.doping.isChecked = jQuery("input[name=dopingControl]:checked").val();
                this.requestDataForUpdate.doping.checkDate = jQuery("#dopingControlDate").val().trim();
                this.requestDataForUpdate.visa.hasVisa = jQuery("input[name=activeVisa]:checked").val();
                this.requestDataForUpdate.visa.type = jQuery("#typeOfVisa").val();
                this.requestDataForUpdate.visa.termOfVisa = jQuery("#termOfVisa").val();
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