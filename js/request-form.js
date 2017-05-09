var dir = "../wp-content/plugins/requests-manager/api/";
(function($, undefined) {
    $(document).ready(function() {



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
            yearRange: "1900:2200",
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
            $("#coachAdvancedData input").each(function(e) {
                this.value = "";
            });
            $("#coachAdvancedData").toggle("800");
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
            $("#wrapDopingControlDate").toggle();
        });

        $("input[name='activeVisa']").on("change", function() {
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

        var coachNationalPass = {
            title: "Завантажити фото національного паспорта",
            fileInput: "#coachPhotoOfNatPass",
            fileUplBut: "#uploadCoachNatPassPhoto",
            photoId: "#coachPhotoOfNatPassId",
            uplButton: "#uploadCoachPhotoOfNatPass",
            showPhoto: "showCoachPhotoOfNatPass",
            delPhoto: "removeCoachPhotoOfNatPass"
        }

        $(coachNationalPass.uplButton).live("click", function() {
            showUploadModal(coachNationalPass);
        });

        $(coachNationalPass.fileUplBut).live("click", function() {
            uploadPhoto(coachNationalPass);
        });

        $("#" + coachNationalPass.showPhoto).live("click", function(e) {
            loadPhoto(e);
        });

        $("#" + coachNationalPass.delPhoto).live("click", function() {
            deletePhoto(coachNationalPass);
        });

        var coachForeignPass = {
            title: "Завантажити фото закордонного паспорта",
            fileInput: "#coachPhotoOfForPass",
            fileUplBut: "#uploadCoachForPassPhoto",
            photoId: "#coachPhotoOfForPassId",
            uplButton: "#uploadCoachPhotoOfForPass",
            showPhoto: "showCoachPhotoOfForPass",
            delPhoto: "removeCoachPhotoOfForPass"
        }

        $(coachForeignPass.uplButton).live("click", function() {
            showUploadModal(coachForeignPass);
        });

        $(coachForeignPass.fileUplBut).live("click", function() {
            uploadPhoto(coachForeignPass);
        });

        $("#" + coachForeignPass.showPhoto).live("click", function(e) {
            loadPhoto(e);
        });

        $("#" + coachForeignPass.delPhoto).live("click", function() {
            deletePhoto(coachForeignPass);
        });

        var coachAccreditPhoto = {
            title: "Завантажити фото для акредитації",
            fileInput: "#coachPhotoForAccreditation",
            fileUplBut: "#uploadCoachAccreditationPhotoGo",
            photoId: "#coachAccreditationPhotoId",
            uplButton: "#uploadCoachAccreditationPhoto",
            showPhoto: "showCoachPhotoForAccreditation",
            delPhoto: "removeCoachPhotoForAccreditation"
        }

        $(coachAccreditPhoto.uplButton).live("click", function() {
            showUploadModal(coachAccreditPhoto);
        });

        $(coachAccreditPhoto.fileUplBut).live("click", function() {
            uploadPhoto(coachAccreditPhoto);
        });

        $("#" + coachAccreditPhoto.showPhoto).live("click", function(e) {
            loadPhoto(e);
        });

        $("#" + coachAccreditPhoto.delPhoto).live("click", function() {
            deletePhoto(coachAccreditPhoto);
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

        $("#submitRequest").on("click", function() {
            if (inputHasValue() && checkPhotos() && validateEmail() &&
                checkOptionalDateField("#dopingControlDate") &&
                checkOptionalDateField("#termOfVisa")) { alert('valid') } else { alert('not valid') }
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
            .append('<div class="form-group"><label for="coachBirthDate' + numberOfCoaches + '">Дата народження</label><input type="text" class="form-control" id="coachBirthDate' + numberOfCoaches + '" maxlength="10" /></div>')
            .append('<div class="form-group coachNo' + numberOfCoaches + '"><div><label>Чи супроводжує Вас на змагання?</label></div><label class="radio-inline"><input type="radio" name="following' + numberOfCoaches + '" value="false" checked /> Ні</label><label class="radio-inline"><input type="radio" name="following' + numberOfCoaches + '" value="true" /> Так</label></div>')
            .append($('<div id="coachAdvancedData' + numberOfCoaches + '" style="display: none" />')
                .append('<div class="form-group"><label for="coachLastNameLikeInPass' + numberOfCoaches + '">Прізвище тренера як у закордонному паспорті</label><input type="text" class="form-control" name="coachLastNameLikeInPass' + numberOfCoaches + '" id="coachLastNameLikeInPass' + numberOfCoaches + '" placeholder="Surname" maxlength="50" /></div>')
                .append('<div class="form-group"><label for="coachFirstNameLikeInPass' + numberOfCoaches + '">Ім\'я тренера як у закордонному паспорті</label><input type="text" class="form-control" name="coachFirstNameLikeInPass' + numberOfCoaches + '" id="coachFirstNameLikeInPass' + numberOfCoaches + '" placeholder="Name" maxlength="30" /></div>')
                .append('<div class="form-group"><label>Серія та номер закордонного паспорту тренера</label><div class="row"><div class="col-sm-4"><input type="text" class="form-control" id="coachSeriaOfpass' + numberOfCoaches + '" placeholder="НН" maxlength="4" /></div><div class="col-sm-8"><input type="text" class="form-control" id="coachNumberOfPass' + numberOfCoaches + '" placeholder="ХХХХХХ" maxlength="8" /></div></div></div>')
                .append('<div class="form-group"><label for="coachTermOfPass' + numberOfCoaches + '">Термін дії закордонного паспорту тренера</label><input type="text" class="form-control" id="coachTermOfPass' + numberOfCoaches + '" maxlength="10" /></div>')
                .append('<div class="form-group"><label for="coachPhone' + numberOfCoaches + '">Номер телефону тренера</label><input type="tel" class="form-control" id="coachPhone' + numberOfCoaches + '" placeholder="+38 (999) 999-99-99" maxlength="20" /></div>')
                .append('<div class="form-group"><label for="coachEmail' + numberOfCoaches + '">Електронна адреса тренера</label><input type="email" class="form-control" id="coachEmail' + numberOfCoaches + '" placeholder="email.adress@gmail.com" maxlength="50" /></div>')
                .append('<div class="form-group"><p><label for="coachPhotoOfNatPass' + numberOfCoaches + '">Фото першої сторінки національного паспорту</label></p><button type="button" class="btn btn-default upl-coach-np" data-rel="' + numberOfCoaches + '">Завантажити</button><input type="hidden" name="coachPhotoOfNatPassId' + numberOfCoaches + '" id="coachPhotoOfNatPassId' + numberOfCoaches + '" maxlength="10" /></div>')
                .append('<div class="form-group"><p><label for="coachPhotoOfForPass' + numberOfCoaches + '">Фото першої сторінки закордонного паспорту</label></p><button type="button" class="btn btn-default upl-coach-fp" data-rel="' + numberOfCoaches + '">Завантажити</button><input type="hidden" name="coachPhotoOfForPassId' + numberOfCoaches + '" id="coachPhotoOfForPassId' + numberOfCoaches + '" maxlength="10" /></div>')
                .append('<div class="form-group"><p><label for="coachAccreditationPhoto">Фото для акредитації</label></p><button type="button" class="btn btn-default upl-coach-ap" data-rel="' + numberOfCoaches + '">Завантажити</button><input type="hidden" name="coachAccreditationPhotoId' + numberOfCoaches + '" id="coachAccreditationPhotoId' + numberOfCoaches + '" maxlength="10" /></div>')
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
                        $(parent.lastElementChild).remove();
                        $("#uploadPhotoModal").modal("hide");
                        $(obj.uplButton).remove();
                        $(obj.photoId).after("<button type='button' id='" + obj.showPhoto + "' class='btn btn-default' data-show = '" + data + "' style='margin-right: 5px' >Показати</button>" +
                            "<button type='button' id='" + obj.delPhoto + "' class='btn btn-default' data-remove = '" + data + "'>Видалити</button>");
                    }
                });
            } else {
                alert("Недопустимий тип файлу!");
                $(obj.fileInput).val("");
            }

        } else {
            alert("Оберіть файл!");
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
                alert("Недопустимий тип файлу!");
                $("#" + coach.fileInput).val("");
            }

        } else {
            alert("Оберіть файл!");
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
})(jQuery)