var dir = "../wp-content/plugins/requests-manager/api/";
(function($, undefined) {
    $(document).ready(function() {
        var ageCategories = [],
            weightCategories = [],
            currentCompetition = [],
            regions = [],
            preCompetition = [];
        var typeOfCompetition;
        var numberOfCoaches = 1;

        $.ajax({
            type: "POST",
            url: dir + "Regions-Manager/GetAllRegions.php",
            success: function(data) {
                regions = JSON.parse(data);
                appendOptions("#region", regions);
            }
        });

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
            yearRange: "1900:2200",
            regional: ["uk"]
        });

        $("#showNext").on("click", function(e) {
            getUserData(e);
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

        $("input[name='hasCoach']").on("change", function() {
            if (this.value == "true") {
                $(".coachForms input[type=text], #coachAdvancedData input[type=tel], #coachAdvancedData input[type=email]").each(function() {
                    if ($(this).is(":visible")) $(this).addClass("required");
                });
            } else {
                $(".coachForms input[type=text], #coachAdvancedData input[type=tel], #coachAdvancedData input[type=email]").each(function() {
                    if ($(this.parentElement).hasClass("has-error")) $(this.parentElement).removeClass("has-error");
                    if ($(this).hasClass("required")) $(this).removeClass("required");
                });
            }
        });

        $(".coachNo1 input[name='following']").on("change", function(e) {
            if (e.target.value == "true") {
                $("#coachAdvancedData input").each(function(e) {
                    this.value = "";
                });
                setDefaultButtons("");
                getCoachData(e);
            } else {
                $("#coachAdvancedData").fadeOut("800");
            }
        });

        $(".coachNo1 input[name='following']").on("change", function() {
            if (this.value == "true") {
                $("#coachAdvancedData input[type=text], #coachAdvancedData input[type=tel], #coachAdvancedData input[type=email]").each(function() {
                    if ($(this).is(":visible")) $(this).addClass("required");
                });
                $("#coachAdvancedData input[type=hidden]").each(function() {
                    $(this).addClass("requiredId");
                });
            } else {
                $("#coachAdvancedData input[type=text], #coachAdvancedData input[type=tel], #coachAdvancedData input[type=email]").each(function() {
                    if ($(this.parentElement).hasClass("has-error")) $(this.parentElement).removeClass("has-error");
                    if ($(this).hasClass("required")) $(this).removeClass("required");
                });
                $("#coachAdvancedData input[type=hidden]").each(function() {
                    $(this).removeClass("requiredId");
                });
            }
        });

        $("#appendCoach").on("click", function() {
            $(".coachForms").last().after($("<div class='row coachForms' style='margin-top: 10px;'></div>")
                .append("<p class='text-right'><span class='text-danger remove-coach' style='cursor: pointer'>Видалити</span></p>")
            );
            renderCouchForm($(".coachForms").last(), ++numberOfCoaches);
        });

        $("input[name='dopingControl']").on("change", function() {
            $("#dopingControlDate").val('');
            $("#wrapDopingControlDate").toggle();
        });

        $("input[name='activeVisa']").on("change", function() {
            $("#typeOfVisa option:first").attr('selected', 'selected');
            $("#termOfVisa").val('');
            $("#visaFeatures").toggle();
        });

        var nationalPass = {
            title: "Завантажити фото національного паспорта",
            fileInput: "#photoOfNatPass",
            fileUplBut: "#uploadNatPassPhoto",
            photoId: "#photoOfNatPassId",
            uplButton: "#uploadPhotoOfNatPass",
            showPhoto: "showPhotoOfNatPass",
            delPhoto: "removePhotoOfNatPass"
        }

        $(nationalPass.uplButton).live("click", function() {
            showUploadModal(nationalPass);
        });

        $(nationalPass.fileUplBut).live("click", function() {
            uploadPhoto(nationalPass);
        });

        $("#" + nationalPass.showPhoto).live("click", function(e) {
            loadPhoto(e);
        });

        $("#" + nationalPass.delPhoto).live("click", function() {
            deletePhoto(nationalPass);
        });

        var foreignPass = {
            title: "Завантажити фото закордонного паспорта",
            fileInput: "#photoOfForPass",
            fileUplBut: "#uploadForPassPhoto",
            photoId: "#photoOfForPassId",
            uplButton: "#uploadPhotoOfForPass",
            showPhoto: "showPhotoOfForPass",
            delPhoto: "removePhotoOfForPass"
        }

        $(foreignPass.uplButton).live("click", function() {
            showUploadModal(foreignPass);
        });

        $(foreignPass.fileUplBut).live("click", function() {
            uploadPhoto(foreignPass);
        });

        $("#" + foreignPass.showPhoto).live("click", function(e) {
            loadPhoto(e);
        });

        $("#" + foreignPass.delPhoto).live("click", function() {
            deletePhoto(foreignPass);
        });

        var accreditPhoto = {
            title: "Завантажити фото для акредитації",
            fileInput: "#photoForAccreditation",
            fileUplBut: "#uploadAccreditationPhotoGo",
            photoId: "#accreditationPhotoId",
            uplButton: "#uploadAccreditationPhoto",
            showPhoto: "showPhotoForAccreditation",
            delPhoto: "removePhotoForAccreditation"
        }

        $(accreditPhoto.uplButton).live("click", function() {
            showUploadModal(accreditPhoto);
        });

        $(accreditPhoto.fileUplBut).live("click", function() {
            uploadPhoto(accreditPhoto);
        });

        $("#" + accreditPhoto.showPhoto).live("click", function(e) {
            loadPhoto(e);
        });

        $("#" + accreditPhoto.delPhoto).live("click", function() {
            deletePhoto(accreditPhoto);
        });

        var coachNP = {
            title: "Завантажити фото національного паспорта",
            uplButton: ".upl-coach-np",
            fileInput: "coach-np",
            fileButton: "coach-np-upload",
            photoIdPrefix: "#coachPhotoOfNatPassId",
            loadButton: "load-photo-np",
            delButton: "remove-photo-np"

        }

        $(coachNP.uplButton).live("click", function(e) {
            showCoachUploadModal(coachNP, e);
        });

        $('#' + coachNP.fileButton).live("click", function(e) {
            uploadCoachPhoto(coachNP, e);
        });

        $("." + coachNP.loadButton).live("click", function(e) {
            loadPhoto(e);
        });

        $("." + coachNP.delButton).live("click", function(e) {
            deleteCoachPhoto(coachNP, e)
        });

        var coachFP = {
            title: "Завантажити фото закордонного паспорта",
            uplButton: ".upl-coach-fp",
            fileInput: "coach-fp",
            fileButton: "coach-fp-upload",
            photoIdPrefix: "#coachPhotoOfForPassId",
            loadButton: "load-photo-fp",
            delButton: "remove-photo-fp"

        }

        $(coachFP.uplButton).live("click", function(e) {
            showCoachUploadModal(coachFP, e);
        });

        $('#' + coachFP.fileButton).live("click", function(e) {
            uploadCoachPhoto(coachFP, e);
        });

        $("." + coachFP.loadButton).live("click", function(e) {
            loadPhoto(e);
        });

        $("." + coachFP.delButton).live("click", function(e) {
            deleteCoachPhoto(coachFP, e)
        });

        var coachAP = {
            title: "Завантажити фото для акредитації",
            uplButton: ".upl-coach-ap",
            fileInput: "coach-ap",
            fileButton: "coach-ap-upload",
            photoIdPrefix: "#coachAccreditationPhotoId",
            loadButton: "load-photo-ap",
            delButton: "remove-photo-ap"

        }

        $(coachAP.uplButton).live("click", function(e) {
            showCoachUploadModal(coachAP, e);
        });

        $('#' + coachAP.fileButton).live("click", function(e) {
            uploadCoachPhoto(coachAP, e);
        });

        $("." + coachAP.loadButton).live("click", function(e) {
            loadPhoto(e);
        });

        $("." + coachAP.delButton).live("click", function(e) {
            deleteCoachPhoto(coachAP, e)
        });

        $("#uploadPhotoModal").on("hide.bs.modal", function() {
            clearUploadModal();
        });

        $('#showPhotoModal').on('hide.bs.modal', function(e) {
            $("#showPhotoModal .modal-body").html("");
        });

        $("#submitRequest").on("click", function(e) {
            var validationText = "<p><strong>Форма заповнена не вірно!</strong></p>\n";
            if (!inputHasValue()) {
                validationText += "<p>не заповнені усі обов'язкові поля</p>";
                showAlert("#RequestForm", validationText);
                return;
            } else if (!checkPhotos()) {
                validationText += "<p>не завантажено всіх необхідних файлів</p>";
                showAlert("#RequestForm", validationText);
                return;
            } else if (!validateEmail()) {
                validationText += "<p>не правильно вказаний email</p>";
                showAlert("#RequestForm", validationText);
                return;
            } else if (!checkOptionalDateField("#dopingControlDate")) {
                validationText += "<p>не вказано дату проходження допіг-контролю</p>";
                showAlert("#RequestForm", validationText);
                return;
            } else if (!checkOptionalDateField("#termOfVisa")) {
                validationText += "<p>не вказано терміну дії візи</p>";
                showAlert("#RequestForm", validationText);
                return;
            } else {
                sendRequest(buildRequest(), e);
            }
        });

        $(".required").live("change", function(e) {
            if (e.target.value.length && $(e.target.parentElement).hasClass("has-error")) {
                $(e.target.parentElement).removeClass("has-error");
            }
        });

        $("#dopingControlDate, #termOfVisa").live("change", function(e) {
            if (e.target.value.length && $(e.target.parentElement).hasClass("has-error")) {
                $(e.target.parentElement).removeClass("has-error");
            }
        });
    });

    function appendOptions(select, data) {
        var list = '';
        data.forEach(function(item) {
            var id = item.id;
            var title = item.title || item.title_w || item.name || item.region;
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
            .append('<div class="form-group"><label>Тренер #' + numberOfCoaches + '</label><input type="hidden" id="coachIsKnownAs' + numberOfCoaches + '" /></div>')
            .append('<div class="form-group"><label for="coachLastName' + numberOfCoaches + '">Прізвище тренера</label><input type="text" class="form-control" name="coachLastName' + numberOfCoaches + '" id="coachLastName' + numberOfCoaches + '" placeholder="Прізвище" maxlength="50" /></div>')
            .append('<div class="form-group"><label for="coachFirstName' + numberOfCoaches + '">Ім\'я тренера</label><input type="text" class="form-control" name="coachFirstName' + numberOfCoaches + '" id="coachFirstName' + numberOfCoaches + '" placeholder="Ім\'я" maxlength="30" /></div>')
            .append('<div class="form-group"><label for="coachMiddleName' + numberOfCoaches + '">По-батькові тренера</label><input type="text" class="form-control" name="coachMiddleName' + numberOfCoaches + '" id="coachMiddleName' + numberOfCoaches + '" placeholder="По-батькові" maxlength="30" /></div>')
            .append('<div class="form-group"><label for="coachBirthDate' + numberOfCoaches + '">Дата народження</label><input type="text" class="form-control" id="coachBirthDate' + numberOfCoaches + '" maxlength="10" placeholder="дд.мм.рррр" /></div>')
            .append('<div class="form-group coachNo' + numberOfCoaches + '"><div><label>Чи супроводжує Вас на змагання?</label></div><label class="radio-inline"><input type="radio" name="following' + numberOfCoaches + '" value="false" checked /> Ні</label><label class="radio-inline"><input type="radio" name="following' + numberOfCoaches + '" value="true" /> Так</label></div>')
            .append($('<div id="coachAdvancedData' + numberOfCoaches + '" style="display: none" />')
                .append('<div class="form-group"><label for="coachLastNameLikeInPass' + numberOfCoaches + '">Прізвище тренера як у закордонному паспорті</label><input type="text" class="form-control" name="coachLastNameLikeInPass' + numberOfCoaches + '" id="coachLastNameLikeInPass' + numberOfCoaches + '" placeholder="Surname" maxlength="50" /></div>')
                .append('<div class="form-group"><label for="coachFirstNameLikeInPass' + numberOfCoaches + '">Ім\'я тренера як у закордонному паспорті</label><input type="text" class="form-control" name="coachFirstNameLikeInPass' + numberOfCoaches + '" id="coachFirstNameLikeInPass' + numberOfCoaches + '" placeholder="Name" maxlength="30" /></div>')
                .append('<div class="form-group"><label>Серія та номер закордонного паспорту тренера</label><div class="row"><div class="col-sm-4"><input type="text" class="form-control" id="coachSeriaOfpass' + numberOfCoaches + '" placeholder="НН" maxlength="4" /></div><div class="col-sm-8"><input type="text" class="form-control" id="coachNumberOfPass' + numberOfCoaches + '" placeholder="ХХХХХХ" maxlength="8" /></div></div></div>')
                .append('<div class="form-group"><label for="coachTermOfPass' + numberOfCoaches + '">Термін дії закордонного паспорту тренера</label><input type="text" class="form-control" id="coachTermOfPass' + numberOfCoaches + '" maxlength="10" placeholder="дд.мм.рррр" /></div>')
                .append('<div class="form-group"><label for="coachndNumber' + numberOfCoaches + '">Ідентифікаційний номер</label><input type="text" class="form-control" id="coachIndNumber' + numberOfCoaches + '" maxlength="10" /></div>')
                .append('<div class="form-group"><label for="coachPhone' + numberOfCoaches + '">Номер телефону тренера</label><input type="tel" class="form-control" id="coachPhone' + numberOfCoaches + '" placeholder="+38 (999) 999-99-99" maxlength="20" /></div>')
                .append('<div class="form-group"><label for="coachEmail' + numberOfCoaches + '">Електронна адреса тренера</label><input type="email" class="form-control" id="coachEmail' + numberOfCoaches + '" placeholder="email.adress@gmail.com" maxlength="50" /></div>')
                .append('<div class="form-group"><p><label for="coachPhotoOfNatPass' + numberOfCoaches + '">Фото першої сторінки національного паспорту</label></p><button type="button" class="btn btn-default upl-coach-np" id="uploadCoachPhotoOfNatPass' + numberOfCoaches + '" data-rel="' + numberOfCoaches + '">Завантажити</button><input type="hidden" name="coachPhotoOfNatPassId' + numberOfCoaches + '" id="coachPhotoOfNatPassId' + numberOfCoaches + '" maxlength="10" /></div>')
                .append('<div class="form-group"><p><label for="coachPhotoOfForPass' + numberOfCoaches + '">Фото першої сторінки закордонного паспорту</label></p><button type="button" class="btn btn-default upl-coach-fp" id="uploadCoachPhotoOfForPass' + numberOfCoaches + '" data-rel="' + numberOfCoaches + '">Завантажити</button><input type="hidden" name="coachPhotoOfForPassId' + numberOfCoaches + '" id="coachPhotoOfForPassId' + numberOfCoaches + '" maxlength="10" /></div>')
                .append('<div class="form-group"><p><label for="coachAccreditationPhoto">Фото для акредитації</label></p><button type="button" class="btn btn-default upl-coach-ap" id="uploadCoachAccreditationPhoto' + numberOfCoaches + '" data-rel="' + numberOfCoaches + '">Завантажити</button><input type="hidden" name="coachAccreditationPhotoId' + numberOfCoaches + '" id="coachAccreditationPhotoId' + numberOfCoaches + '" maxlength="10" /></div>')
            )
        );
        $("#coachBirthDate" + numberOfCoaches + ", #coachTermOfPass" + numberOfCoaches).datepicker({
            altFormat: "dd-mm-yy",
            changeYear: true,
            yearRange: "1900:2200",
            regional: ["uk"]
        });
        $(".coachNo" + numberOfCoaches + " input[name='following" + numberOfCoaches + "']").on("change", function(e) {
            if (e.target.value == "true") {
                $("#coachAdvancedData" + numberOfCoaches + " input").each(function(e) {
                    this.value = "";
                });
                setDefaultButtons(numberOfCoaches);
                getCoachData(e);
            } else {
                $("#coachAdvancedData" + numberOfCoaches).fadeOut("800");
            }
        });

        $("#coachPhone" + numberOfCoaches).mask("+38 (999) 999-99-99");

        $(".remove-coach").on("click", function(e) {
            $(e.target).parent().parent().remove();
        });

    }

    function uploadPhoto(obj) {
        var $input = $(obj.fileInput);
        var fd = new FormData;
        if ($input[0].files.length) {
            if ($input[0].files[0].type == "image/jpeg" || $input[0].files[0].type == "image/png") {
                fd.append('img', $input[0].files[0]);
                showPreloader("#uploadPhotoModal", "150px");
                $.ajax({
                    url: dir + "UploadPhoto.php",
                    data: fd,
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function(data) {
                        $(obj.photoId).val(data);
                        var parent = $(obj.photoId)[0].parentElement;
                        if ($(parent.lastElementChild).hasClass("photo-alert")) $(parent.lastElementChild).remove();
                        $("#uploadPhotoModal").modal("hide");
                        $(obj.uplButton).remove();
                        $(obj.photoId).after("<button type='button' id='" + obj.showPhoto + "' class='btn btn-default' data-show = '" + data + "' style='margin-right: 5px' >Показати</button>" +
                            "<button type='button' id='" + obj.delPhoto + "' class='btn btn-default' data-remove = '" + data + "'>Видалити</button>");
                    }
                });
            } else {
                showAlert("#uploadPhotoModal .modal-content", "Недопустимий тип файлу!");
                $(obj.fileInput).val("");
            }

        } else {
            showAlert("#uploadPhotoModal .modal-content", "Оберіть файл!");
        }
    }

    function clearUploadModal() {
        $("#uploadPhotoModal .modal-header h6").html("");
        $("#uploadPhotoModal .modal-body").html("");
        $("#uploadPhotoModal .modal-footer").html("");
        $("#uploadPhotoModal .fa-spinner").remove();
    }

    function showPreloader(selector, top) {
        $(selector).append('<span class="fa fa-spinner fa-spin fa-3x fa-fw" style="position: absolute; top: ' + top + '; left: 50%; color: slategrey;"></span>');
    }

    function showPhoto(img) {
        $("#showPhotoModal .modal-body").append(img);
        $("#showPhotoModal").modal();
    }

    function showUploadModal(obj) {
        $("#uploadPhotoModal .modal-header h6").html(obj.title);
        $("#uploadPhotoModal .modal-body").append("<form><input type='file' class='form-control' name='" + obj.fileInput.slice(1) + "' id='" + obj.fileInput.slice(1) + "' accept='image/jpeg,image/png' /></form>");
        $("#uploadPhotoModal .modal-footer").append("<button type='button' class='btn btn-primary' id='" + obj.fileUplBut.slice(1) + "' >Завантажити</button>");
        $("#uploadPhotoModal").modal();
    }

    function loadPhoto(e) {
        var photoId = e.target.dataset.show;
        $(e.target.parentElement).append('<span class="fa fa-spinner fa-spin fa-2x fa-fw" style="color: slategrey;"></span>');
        $.ajax({
            url: dir + "GetPhoto.php",
            type: "POST",
            data: "photoId=" + photoId,
            success: function(data) {
                $(".fa-spinner").remove();
                showPhoto(data);
            }
        });
    }

    function deletePhoto(obj) {
        $(obj.photoId).val('');
        $("#" + obj.showPhoto).remove();
        $("#" + obj.delPhoto).remove();
        $(obj.photoId).after("<button type='button' class='btn btn-default' id='" + obj.uplButton.slice(1) + "'>Завантажити фото</button>");
    }

    function showCoachUploadModal(coach, e) {
        var id = e.target.dataset["rel"];
        $("#uploadPhotoModal .modal-header h6").html(coach.title);
        $("#uploadPhotoModal .modal-body").append("<form><input type='file' class='form-control' name='" + coach.fileInput + "' id='" + coach.fileInput + "' accept='image/jpeg,image/png' /></form>");
        $("#uploadPhotoModal .modal-footer").append("<button type='button' class='btn btn-primary' id='" + coach.fileButton + "' data-rel='" + id + "' >Завантажити</button>");
        $("#uploadPhotoModal").modal();
    }

    function uploadCoachPhoto(coach, e) {
        var id = e.target.dataset['rel'];
        var $input = $("#" + coach.fileInput);
        var fd = new FormData;
        if ($input[0].files.length) {
            if ($input[0].files[0].type == "image/jpeg" || $input[0].files[0].type == "image/png") {
                fd.append('img', $input[0].files[0]);
                showPreloader("#uploadPhotoModal", "150px");
                $.ajax({
                    url: dir + "UploadPhoto.php",
                    data: fd,
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function(data) {
                        $(coach.photoIdPrefix + id).val(data);
                        $("#uploadPhotoModal").modal("hide");
                        $("#coachForm" + id + " " + coach.uplButton).remove();
                        $(coach.photoIdPrefix + id).after("<button type='button' class='btn btn-default " + coach.loadButton + "' data-show = '" + data + "' style='margin-right: 5px' >Показати</button>" +
                            "<button type='button' class='btn btn-default " + coach.delButton + "' data-remove ='" + data + "' data-rel='" + id + "'>Видалити</button>");
                    }
                });
            } else {
                showAlert("#uploadPhotoModal .modal-content", "Недопустимий тип файлу!");
                $("#" + coach.fileInput).val("");
            }

        } else {
            showAlert("#uploadPhotoModal .modal-content", "Оберіть файл!");
        }
    }

    function deleteCoachPhoto(coach, e) {
        var id = e.target.dataset["rel"];
        $(coach.photoIdPrefix + id).val('');
        $("#coachForm" + id + " ." + coach.loadButton).remove();
        $("#coachForm" + id + " ." + coach.delButton).remove();
        $(coach.photoIdPrefix + id).after("<button type='button' class='btn btn-default " + coach.uplButton.slice(1) + "' data-rel='" + id + "'>Завантажити фото</button>");
    }

    function inputHasValue() {
        var isValid = true;
        $("#RequestForm .required").each(function() {
            if (this.value == "") {
                $(this.parentElement).addClass('has-error');
                isValid = false;
            }
        });
        return isValid;
    }

    function checkPhotos() {
        var isValid = true;
        $("#RequestForm .photo-alert").each(function() {
            $(this).remove();
        });
        $("#RequestForm .requiredId").each(function() {
            if (this.value == "" || this.value == 0) {
                $(this.parentElement).append("<p class='text-danger photo-alert'>Увага! Фото обов'язкове для завантаження.</p>");
                isValid = false;
            }
        });
        return isValid;
    }

    function isValidEmail(emailText) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailText);
    };

    function validateEmail() {
        var isValid = true;
        $("#RequestForm .email").each(function() {
            if ($(this).is(":visible")) {
                isValid = isValidEmail(this.value);
                if (!isValid) {
                    $(this.parentElement).addClass('has-error');
                    return isValid;
                }
            }
        });
        return isValid;
    }

    function checkOptionalDateField(selector) {
        var isValid = true;
        var parent = $(selector)[0].parentElement;
        if ($(selector).is(":visible") && !$(selector)[0].value) {
            $(parent).addClass('has-error');
            isValid = false;
        }
        return isValid;
    }

    function showAlert(parent, text) {
        $(parent).append('<div class="alert alert-danger" style="margin: 10px" role="alert">' + text + '</div> ');
        $(parent + " .alert-danger").fadeOut(4000);
        setTimeout(function() {
            $(parent + " .alert-danger").remove();
        }, 4500);
    }

    function showAlertSuccess(parent, text) {
        $(parent).append('<div class="alert alert-success" style="margin: 10px" role="alert">' + text + '</div> ');
        $(parent + " .alert-success").fadeOut(4000);
        setTimeout(function() {
            $(parent + " .alert-success").remove();
        }, 4500);
    }

    function convertDate(dateString) {
        if (!dateString) return null;
        var dateArr = dateString.split(".");
        return dateArr[2] + "." + dateArr[1] + "." + dateArr[0];
    }

    function convertDateDashed(dateString) {
        if (!dateString) return null;
        var dateArr = dateString.split(".");
        return dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
    }

    function convertDateOposite(dateString) {
        if (!dateString) return null;
        var dateArr = dateString.split("-");
        return dateArr[2] + "." + dateArr[1] + "." + dateArr[0];
    }

    function buildRequest() {
        var request = {};
        request.user = {
            lastName: $("#surname").val().trim(),
            firstName: $("#firstName").val().trim(),
            middleName: $("#middleName").val().trim(),
            birthDate: convertDate($("#birthDate").val().trim()),
            region: $("#region").val(),
            lastNameLikeInPass: $("#lastNameLikeInPass").val().trim(),
            firstNameLikeInPass: $("#firstNameLikeInPass").val().trim(),
            seriaOfpass: $("#seriaOfpass").val().trim(),
            numberOfPass: $("#numberOfPass").val().trim(),
            termOfPass: convertDate($("#termOfPass").val().trim()),
            indNumber: $("#indNumber").val().trim(),
            phone: $("#phone").val().trim(),
            email: $("#email").val().trim(),
            photoOfNatPassId: $("#photoOfNatPassId").val().trim(),
            photoOfForPassId: $("#photoOfForPassId").val().trim(),
            accreditationPhotoId: $("#accreditationPhotoId").val().trim()
        }
        request.user.id = ($("#isKnownAs").val() != "") ? $("#isKnownAs").val() : null;
        request.createDate = getToday();
        request.ageCategory = $("#ageCategory").val().trim();
        request.weightCategory = $("#weightCategory").val().trim();
        request.currentCompetition = $("#currentCompetition").val().trim();
        request.spam = $("#honeypot").val();
        request.disciplines = {
            squat: $("#squat").val().trim() || null,
            benchPress: $("#benchPress").val().trim() || null,
            deadLift: $("#deadLift").val().trim() || null,
            total: $("#total").val().trim()
        }
        request.preCompetition = $("#preCompetition").val().trim();
        request.hasCoach = $("input[name=hasCoach]:checked").val();
        if (JSON.parse(request.hasCoach)) {
            var numberOfCoaches = $(".coachForms .bg-info").length;
            request.coaches = [];
            for (var i = 0; i < numberOfCoaches; i++) {
                var n = (i) ? i + 1 : '';
                var cN = i + 1;
                var coach = {
                    lastName: $("#coachLastName" + n).val().trim(),
                    firstName: $("#coachFirstName" + n).val().trim(),
                    middleName: $("#coachMiddleName" + n).val().trim(),
                    coachBirthDate: convertDate($("#coachBirthDate" + n).val().trim()),
                    isFollowing: $(".coachNo" + cN + " input[name=following" + n + "]:checked").val(),
                    id: ($("#coachIsKnownAs" + n).val()) ? $("#coachIsKnownAs" + n).val() : null
                }
                if (JSON.parse(coach.isFollowing)) {
                    coach.coachLastNameLikeInPass = $("#coachLastNameLikeInPass" + n).val().trim();
                    coach.coachFirstNameLikeInPass = $("#coachFirstNameLikeInPass" + n).val().trim();
                    coach.coachSeriaOfpass = $("#coachSeriaOfpass" + n).val().trim();
                    coach.coachNumberOfPass = $("#coachNumberOfPass" + n).val().trim();
                    coach.coachTermOfPass = convertDate($("#coachTermOfPass" + n).val().trim());
                    coach.coachIndNumber = $("#coachIndNumber" + n).val().trim();
                    coach.coachPhone = $("#coachPhone" + n).val().trim();
                    coach.coachEmail = $("#coachEmail" + n).val().trim();
                    coach.coachPhotoOfNatPassId = $("#coachPhotoOfNatPassId" + n).val().trim();
                    coach.coachPhotoOfForPassId = $("#coachPhotoOfForPassId" + n).val().trim();
                    coach.coachAccreditationPhotoId = $("#coachAccreditationPhotoId" + n).val().trim();
                } else {
                    coach.coachLastNameLikeInPass = "";
                    coach.coachFirstNameLikeInPass = "";
                    coach.coachSeriaOfpass = "";
                    coach.coachNumberOfPass = "";
                    coach.coachTermOfPass = null;
                    coach.coachIndNumber = "";
                    coach.coachPhone = "";
                    coach.coachEmail = "";
                    coach.coachPhotoOfNatPassId = "";
                    coach.coachPhotoOfForPassId = "";
                    coach.coachAccreditationPhotoId = "";
                }
                request.coaches.push(coach);
            }
        }
        request.doping = {
            dopingControl: $("input[name=dopingControl]:checked").val(),
            dopingControlDate: convertDate($("#dopingControlDate").val().trim())
        }
        request.visa = {
            hasActiveVisa: $("input[name=activeVisa]:checked").val(),
            typeOfVisa: $("#typeOfVisa").val(),
            termOfVisa: convertDate($("#termOfVisa").val().trim())
        }
        return request;
    }

    function sendRequest(request, e) {
        $(e.target.parentElement).append('<span class="fa fa-spinner fa-spin fa-2x fa-fw" style="color: slategrey;"></span>');
        $.ajax({
            url: dir + "/Requests-Manager/SaveRequest.php",
            type: "POST",
            data: request,
            success: function(answer) {
                if (answer === "Refused") {
                    showAlert("#RequestForm", "Заявку відхилено!");
                } else if (answer === "Error") {
                    showAlert("#RequestForm", "Під час відправки заявки сталася помилка! Перевірте дані та спробуйте ще раз.");
                } else {
                    showAlertSuccess("#RequestForm", "Заявку прийнято!");
                }
            }
        }).then(function() {
            $(".fa-spinner").remove();
        }).then(function() {
            // window.location.reload();
        });
    }

    function getUserData(e) {
        var user = {
            surname: $("#surname").val(),
            firstName: $("#firstName").val(),
            middleName: $("#middleName").val(),
            birthDate: convertDateDashed($("#birthDate").val())
        }
        $(e.target.parentElement).append('<span class="fa fa-spinner fa-spin fa-2x fa-fw" style="color: slategrey;"></span>');
        $.ajax({
            url: dir + "Requests-Manager/GetUser.php",
            type: "POST",
            data: user,
            success: function(result) {
                result = JSON.parse(result);
                if (result) {
                    setUserValues(result);
                }
            }
        }).then(function() {
            $(".fa-spinner").remove();
            $(".anotherData").fadeIn(800);
        });
    }

    function setUserValues(data) {
        $("#region").val(data.region).change();
        $("#lastNameLikeInPass").val(data.last_name_pass);
        $("#firstNameLikeInPass").val(data.first_name_pass);
        $("#seriaOfpass").val(data.serial_number_pass);
        $("#numberOfPass").val(data.number_pass);
        $("#termOfPass").val(convertDateOposite(data.expiration_date_pass));
        $("#indNumber").val(data.individual_number);
        $("#isKnownAs").val(data.id);
        $("#phone").val(data.phone);
        $("#email").val(data.email);
        $("#photoOfNatPassId").val(data.photo_national_pass_id);
        $("#uploadPhotoOfNatPass").remove();
        $("#photoOfNatPassId").after("<button type='button' id='showPhotoOfNatPass' class='btn btn-default' data-show = '" + data.photo_national_pass_id + "' style='margin-right: 5px' >Показати</button>" +
            "<button type='button' id='removePhotoOfNatPass' class='btn btn-default' data-remove = '" + data.photo_national_pass_id + "'>Видалити</button>");
        $("#photoOfForPassId").val(data.photo_international_pass_id);
        $("#uploadPhotoOfForPass").remove();
        $("#photoOfForPassId").after("<button type='button' id='showPhotoOfForPass' class='btn btn-default' data-show = '" + data.photo_international_pass_id + "' style='margin-right: 5px' >Показати</button>" +
            "<button type='button' id='removePhotoOfForPass' class='btn btn-default' data-remove = '" + data.photo_international_pass_id + "'>Видалити</button>");
        $("#accreditationPhotoId").val(data.accreditation_photo_id);
        $("#uploadAccreditationPhoto").remove();
        $("#accreditationPhotoId").after("<button type='button' id='showPhotoForAccreditation' class='btn btn-default' data-show = '" + data.accreditation_photo_id + "' style='margin-right: 5px' >Показати</button>" +
            "<button type='button' id='removePhotoForAccreditation' class='btn btn-default' data-remove = '" + data.accreditation_photo_id + "'>Видалити</button>");
    }

    function getCoachData(e) {
        var coachNm = e.target.name.slice(9);
        var coach = {
            firstName: $("#coachFirstName" + coachNm).val(),
            lastName: $("#coachLastName" + coachNm).val(),
            middleName: $("#coachMiddleName" + coachNm).val(),
            birthDate: convertDateDashed($("#coachBirthDate" + coachNm).val())
        }
        $(e.target.parentElement).append('<span class="fa fa-spinner fa-spin fa-2x fa-fw" style="color: slategrey;"></span>');
        $.ajax({
            url: dir + "Requests-Manager/GetCoach.php",
            type: "POST",
            data: coach,
            success: function(result) {
                result = JSON.parse(result);
                if (result) {
                    setCoachValues(result, coachNm);
                }
            }
        }).then(function() {
            $(".fa-spinner").remove();
            $("#coachAdvancedData" + coachNm).fadeIn("800");
        });
    }

    function setCoachValues(data, n) {
        if (data.last_name_pass) $("#coachLastNameLikeInPass" + n).val(data.last_name_pass);
        if (data.first_name_pass) $("#coachFirstNameLikeInPass" + n).val(data.first_name_pass);
        if (data.serial_number_pass) $("#coachSeriaOfpass" + n).val(data.serial_number_pass);
        if (data.number_pass > 0) $("#coachNumberOfPass" + n).val(data.number_pass);
        if (data.expiration_date_pass !== "0000-00-00") $("#coachTermOfPass" + n).val(convertDateOposite(data.expiration_date_pass));
        if (data.individual_number) $("#coachIndNumber" + n).val(data.individual_number);
        if (data.id) $("#coachIsKnownAs" + n).val(data.id);
        if (data.phone) $("#coachPhone" + n).val(data.phone);
        if (data.email) $("#coachEmail" + n).val(data.email);
        if (data.photo_national_pass_id > 0) {
            $("#coachPhotoOfNatPassId" + n).val(data.photo_national_pass_id);
            $("#uploadCoachPhotoOfNatPass" + n).remove();
            $("#coachPhotoOfNatPassId" + n).after("<button type='button' id='showCoachPhotoOfNatPass" + n + "' class='btn btn-default load-photo-np' data-show = '" + data.photo_national_pass_id + "' style='margin-right: 5px' >Показати</button>" +
                "<button type='button' id='removeCoachPhotoOfNatPass" + n + "' class='btn btn-default remove-photo-np' data-remove = '" + data.photo_national_pass_id + "' data-rel='" + n + "'>Видалити</button>");
        }
        if (data.photo_international_pass_id > 0) {
            $("#coachPhotoOfForPassId" + n).val(data.photo_international_pass_id);
            $("#uploadCoachPhotoOfForPass" + n).remove();
            $("#coachPhotoOfForPassId" + n).after("<button type='button' id='showCoachPhotoOfForPass" + n + "' class='btn btn-default load-photo-fp' data-show = '" + data.photo_international_pass_id + "' style='margin-right: 5px' >Показати</button>" +
                "<button type='button' id='removeCoachPhotoOfForPass" + n + "' class='btn btn-default remove-photo-fp' data-remove = '" + data.photo_international_pass_id + "' data-rel='" + n + "'>Видалити</button>");
        }
        if (data.accreditation_photo_id > 0) {
            $("#coachAccreditationPhotoId" + n).val(data.accreditation_photo_id);
            $("#uploadCoachAccreditationPhoto" + n).remove();
            $("#coachAccreditationPhotoId" + n).after("<button type='button' id='showCoachPhotoForAccreditation" + n + "' class='btn btn-default load-photo-ap' data-show = '" + data.accreditation_photo_id + "' style='margin-right: 5px' >Показати</button>" +
                "<button type='button' id='removeCoachPhotoForAccreditation" + n + "' class='btn btn-default remove-photo-ap' data-remove = '" + data.accreditation_photo_id + "' data-rel='" + n + "'>Видалити</button>");
        }

    }

    function setDefaultButtons(numberOfCoaches) {
        var natPassParent = $("#coachPhotoOfNatPassId" + numberOfCoaches)[0].parentElement;
        $(natPassParent).html('');
        $(natPassParent).append('<p><label for="coachPhotoOfNatPass' + numberOfCoaches + '">Фото першої сторінки національного паспорту</label></p><button type="button" class="btn btn-default upl-coach-np" id="uploadCoachPhotoOfNatPass' + numberOfCoaches + '" data-rel="' + numberOfCoaches + '">Завантажити</button><input type="hidden" name="coachPhotoOfNatPassId' + numberOfCoaches + '" id="coachPhotoOfNatPassId' + numberOfCoaches + '" maxlength="10" />');
        var forPassParent = $("#coachPhotoOfForPassId" + numberOfCoaches)[0].parentElement;
        $(forPassParent).html('');
        $(forPassParent).append('<p><label for="coachPhotoOfForPass' + numberOfCoaches + '">Фото першої сторінки закордонного паспорту</label></p><button type="button" class="btn btn-default upl-coach-fp" id="uploadCoachPhotoOfForPass' + numberOfCoaches + '" data-rel="' + numberOfCoaches + '">Завантажити</button><input type="hidden" name="coachPhotoOfForPassId' + numberOfCoaches + '" id="coachPhotoOfForPassId' + numberOfCoaches + '" maxlength="10" />');
        var accrParent = $("#coachAccreditationPhotoId" + numberOfCoaches)[0].parentElement;
        $(accrParent).html('');
        $(accrParent).append('<p><label for="coachAccreditationPhoto">Фото для акредитації</label></p><button type="button" class="btn btn-default upl-coach-ap" id="uploadCoachAccreditationPhoto' + numberOfCoaches + '" data-rel="' + numberOfCoaches + '">Завантажити</button><input type="hidden" name="coachAccreditationPhotoId' + numberOfCoaches + '" id="coachAccreditationPhotoId' + numberOfCoaches + '" maxlength="10" />');
    }

    function getToday() {
        var today = new Date();
        var y = today.getFullYear();
        var m = (today.getMonth() > 8) ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1);
        var d = today.getDate();
        return y + '.' + m + '.' + d;
    }
})(jQuery)