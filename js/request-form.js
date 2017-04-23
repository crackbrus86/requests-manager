(function($, undefined) {
    $(document).ready(function() {

        var dir = "../wp-content/plugins/requests-manager/api/";

        var ageCategories = [],
            weightCategories = [],
            currentCompetition = [],
            preCompetition = [];
        var typeOfCompetition;
        var numberOfCoaches = 1;

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

        $.ajax({
            type: "POST",
            url: dir + "Games-Manager/GetBeforeGames.php",
            success: function(data) {
                preCompetition = JSON.parse(data);
            }
        }).then(function() {
            appendOptions("#preCompetition", preCompetition);
        });

        $("#birthDate, #coachBirthDate, #termOfPass, #coachTermOfPass, #dopingControlDate, #termOfVisa").datepicker({
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
            $(".discipline").val(0.00);
            calculateTotal();
        });

        calculateTotal();

        $(".discipline").on("change", function() {
            calculateTotal();
        });

        $("#phone, #coachPhone").mask("+38 (999) 999-99-99");

        $("input[name='hasCoach']").on("change", function(e) {
            $("#appendCoach").toggle();
            $("#coachForm").toggle();
        });

        $(".coachNo1 input[name='following']").on("change", function(e) {
            $("#coachAdvancedData input").each(function(e) {
                this.value = "";
            });
            $("#coachAdvancedData").toggle("800");
        });

        $("#appendCoach").on("click", function() {
            $(".coachForms").last().after($("<div class='row coachForms' style='margin-top: 10px;'></div>")
                .append("<p class='text-right'><span class='text-danger remove-coach' style='cursor: pointer'>Видалити</span></p>")
            );
            renderCouchForm($(".coachForms").last(), ++numberOfCoaches);
        });

        $("input[name='dopingControl']").on("change", function() {
            $("#wrapDopingControlDate").toggle();
        });

        $("input[name='activeVisa']").on("change", function() {
            $("#visaFeatures").toggle();
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

    function calculateTotal() {
        var disciplines = ["squat", "benchPress", "deadLift"];
        var total = 0;
        for (var i = 0; i < disciplines.length; i++) {
            total += parseFloat($("#" + disciplines[i]).val());
        }
        $("#total").val(total);
    }

    function renderCouchForm(selector, numberOfCoaches) {
        selector.append($('<div class="col-sm-12 bg-info" id="coachForm' + numberOfCoaches + '" />')
            .append('<div class="form-group"><label>Тренер #' + numberOfCoaches + '</label></div>')
            .append('<div class="form-group"><label for="coachLastName' + numberOfCoaches + '">Прізвище тренера</label><input type="text" class="form-control" name="coachLastName' + numberOfCoaches + '" id="coachLastName' + numberOfCoaches + '" placeholder="Прізвище" maxlength="50" /></div>')
            .append('<div class="form-group"><label for="coachFirstName' + numberOfCoaches + '">Ім\'я тренера</label><input type="text" class="form-control" name="coachFirstName' + numberOfCoaches + '" id="coachFirstName' + numberOfCoaches + '" placeholder="Ім\'я" maxlength="30" /></div>')
            .append('<div class="form-group"><label for="coachMiddleName' + numberOfCoaches + '">По-батькові тренера</label><input type="text" class="form-control" name="coachMiddleName' + numberOfCoaches + '" id="coachMiddleName' + numberOfCoaches + '" placeholder="По-батькові" maxlength="30" /></div>')
            .append('<div class="form-group"><label for="coachBirthDate' + numberOfCoaches + '">Дата народження</label><input type="text" class="form-control" id="coachBirthDate' + numberOfCoaches + '"></div>')
            .append('<div class="form-group coachNo' + numberOfCoaches + '"><div><label>Чи супроводжує Вас на змагання?</label></div><label class="radio-inline"><input type="radio" name="following' + numberOfCoaches + '" value="false" checked /> Ні</label><label class="radio-inline"><input type="radio" name="following' + numberOfCoaches + '" value="true" /> Так</label></div>')
            .append($('<div id="coachAdvancedData' + numberOfCoaches + '" style="display: none" />')
                .append('<div class="form-group"><label for="coachLastNameLikeInPass' + numberOfCoaches + '">Прізвище тренера як у закордонному паспорті</label><input type="text" class="form-control" name="coachLastNameLikeInPass' + numberOfCoaches + '" id="coachLastNameLikeInPass' + numberOfCoaches + '" placeholder="Surname" maxlength="50" /></div>')
                .append('<div class="form-group"><label for="coachFirstNameLikeInPass' + numberOfCoaches + '">Ім\'я тренера як у закордонному паспорті</label><input type="text" class="form-control" name="coachFirstNameLikeInPass' + numberOfCoaches + '" id="coachFirstNameLikeInPass' + numberOfCoaches + '" placeholder="Name" maxlength="30" /></div>')
                .append('<div class="form-group"><label>Серія та номер закордонного паспорту тренера</label><div class="row"><div class="col-sm-4"><input type="text" class="form-control" id="coachSeriaOfpass' + numberOfCoaches + '" placeholder="НН" maxlength="4"></div><div class="col-sm-8"><input type="text" class="form-control" id="coachNumberOfPass' + numberOfCoaches + '" placeholder="ХХХХХХ" maxlength="8"></div></div></div>')
                .append('<div class="form-group"><label for="coachTermOfPass' + numberOfCoaches + '">Термін дії закордонного паспорту тренера</label><input type="text" class="form-control" id="coachTermOfPass' + numberOfCoaches + '"></div>')
                .append('<div class="form-group"><label for="coachPhone' + numberOfCoaches + '">Номер телефону тренера</label><input type="tel" class="form-control" id="coachPhone' + numberOfCoaches + '" placeholder="+38 (999) 999-99-99" maxlength="20" /></div>')
                .append('<div class="form-group"><label for="coachEmail' + numberOfCoaches + '">Електронна адреса тренера</label><input type="email" class="form-control" id="coachEmail' + numberOfCoaches + '" placeholder="email.adress@gmail.com" maxlength="50" /></div>')
                .append('<div class="form-group"><label for="coachPhotoOfNatPass' + numberOfCoaches + '">Фото першої сторінки національного паспорту</label><input type="file" class="form-control" name="coachPhotoOfNatPass' + numberOfCoaches + '" id="coachPhotoOfNatPass' + numberOfCoaches + '" accept="image/jpeg,image/png" /></div>')
                .append('<div class="form-group"><label for="coachPhotoOfForPass' + numberOfCoaches + '">Фото першої сторінки закордонного паспорту</label><input type="file" class="form-control" name="coachPhotoOfForPass' + numberOfCoaches + '" id="coachPhotoOfForPass' + numberOfCoaches + '" accept="image/jpeg,image/png" /></div>')
                .append('<div class="form-group"><label for="coachAccreditationPhoto">Фото для акредитації</label><input type="file" class="form-control" name="coachAccreditationPhoto" id="coachAccreditationPhoto" accept="image/jpeg,image/png" /></div>')
            )
        );
        $("#coachBirthDate" + numberOfCoaches + ", #coachTermOfPass" + numberOfCoaches).datepicker({
            altFormat: "dd-mm-yy",
            changeYear: true,
            yearRange: "1990:2200",
            regional: ["uk"]
        });
        $(".coachNo" + numberOfCoaches + " input[name='following" + numberOfCoaches + "']").on("change", function(e) {
            $("#coachAdvancedData" + numberOfCoaches + " input").each(function(e) {
                this.value = "";
            });
            $("#coachAdvancedData" + numberOfCoaches).toggle("800");
        });

        $("#coachPhone" + numberOfCoaches).mask("+38 (999) 999-99-99");

        $(".remove-coach").on("click", function(e) {
            $(e.target).parent().parent().remove();
        });

    }
})(jQuery)