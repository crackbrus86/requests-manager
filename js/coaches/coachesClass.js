function Coaches() {
    this.count = 0;
    this.coachesPerPage = 10;
    this.currentPage = 1;
    this.offset = this.coachesPerPage * this.currentPage - this.coachesPerPage;
    this.pageParams = {
        limit: this.coachesPerPage,
        offset: this.offset
    }

    this.offsetRecalc = function() {
        this.offset = this.coachesPerPage * this.currentPage - this.coachesPerPage;
        this.pageParams.offset = this.offset;
    }

    var coachesPaging = null;

    this.fields = [{
            title: "",
            field: "id",
            button: "edit",
            width: "80px"
        },
        {
            title: "",
            field: "id",
            button: "delete",
            width: "80px"
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
            title: "По-батькові",
            field: "middle_name"
        },
        {
            title: "Дата народження",
            field: "birth_date"
        }
    ];

    this.fetchGrid = function(data) {
        jQuery("#coachesGrid").html();
        var grid = new Grid(this.fields, JSON.parse(data).sort(compareLastName));
        jQuery("#coachesGrid").html(grid.renderGrid());
    }

    this.fetchPaging = function(count) {
        jQuery("#coachesPaging").html("");
        coachesPaging = new Paging(this.coachesPerPage, count, this.currentPage);
        jQuery("#coachesPaging").html(coachesPaging.renderPaging());
    }

    var natPass = {
        title: "Завантажити фото національного паспорта",
        fileInput: "photoOfNatPassC",
        fileUplBut: "uploadNatPassPhotoC",
        photoId: "photoOfNatPassIdC",
        uplButton: "uploadPhotoOfNatPassC",
        shwButton: "showPhotoOfNatPassC",
        delButton: "removePhotoOfNatPassC"
    }

    var forPass = {
        title: "Завантажити фото закордонного паспорта",
        fileInput: "photoOfForPassC",
        fileUplBut: "uploadForPassPhotoC",
        photoId: "photoOfForPassIdC",
        uplButton: "uploadPhotoOfForPassC",
        shwButton: "showPhotoOfForPassC",
        delButton: "removePhotoOfForPassC"
    }

    var accPhoto = {
        title: "Завантажити фото для акредитації",
        fileInput: "photoForAccreditationC",
        fileUplBut: "uploadAccreditationPhotoGoC",
        photoId: "accreditationPhotoIdC",
        uplButton: "uploadAccreditationPhotoC",
        shwButton: "showPhotoForAccreditationC",
        delButton: "removePhotoForAccreditationC"
    }

    this.setModalData = function(data) {
        jQuery("#coachId").val(data.id);
        jQuery("#fullnameC").val(data.last_name + " " + data.first_name + " " + data.middle_name);
        jQuery("#birthDateC").val(data.birth_date);
        jQuery("#regionC").val(data.region).change();
        jQuery("#lastNamePassC").val(data.last_name_pass);
        jQuery("#firstNamePassC").val(data.first_name_pass);
        jQuery("#seriaOfpassC").val(data.serial_number_pass);
        jQuery("#numberOfPassC").val(data.number_pass);
        jQuery("#termOfPassC").val(data.expiration_date_pass);
        jQuery("#indNumberC").val(data.individual_number);
        jQuery("#phoneC").val(data.phone);
        jQuery("#emailC").val(data.email);
        if (data.photo_national_pass_id) appendPhotoButtons(data.photo_national_pass_id, natPass);
        if (data.photo_international_pass_id) appendPhotoButtons(data.photo_international_pass_id, forPass);
        if (data.accreditation_photo_id) appendPhotoButtons(data.accreditation_photo_id, accPhoto);
    }

    this.removeModalPhoto = function(e) {
        switch (e.target.id) {
            case "removePhotoOfNatPassC":
                deletePhoto(natPass);
                break;
            case "removePhotoOfForPassC":
                deletePhoto(forPass);
                break;
            case "removePhotoForAccreditationC":
                deletePhoto(accPhoto);
                break;
        }
    }

    this.uploadNewPhoto = function(e) {
        switch (e.target.id) {
            case "uploadPhotoOfNatPassC":
                showUploadModal(natPass);
                break;
            case "uploadPhotoOfForPassC":
                showUploadModal(forPass);
                break;
            case "uploadAccreditationPhotoC":
                showUploadModal(accPhoto);
                break;
        }
    }

    this.saveNewPhoto = function(e) {
        switch (e.target.id) {
            case "uploadNatPassPhotoC":
                return savePhoto(natPass);
            case "uploadForPassPhotoC":
                return savePhoto(forPass);
            case "uploadAccreditationPhotoGoC":
                return savePhoto(accPhoto);
        }
    }

    this.updateButtons = function(e, data) {
        switch (e.target.id) {
            case "uploadNatPassPhotoC":
                setupButtons(natPass, data);
                break;
            case "uploadForPassPhotoC":
                setupButtons(forPass, data);
                break;
            case "uploadAccreditationPhotoGoC":
                setupButtons(accPhoto, data);
                break;
        }
    }

    this.showPhoto = function(img) {
        jQuery("#showPhotoModalC .modal-body").html(img);
        jQuery("#showPhotoModalC").modal("show");
    }

    this.dataForSaving = function() {
        return {
            id: jQuery("#coachId").val(),
            region: jQuery("#regionC").val(),
            lastNamePass: jQuery("#lastNamePassC").val(),
            firstNamePass: jQuery("#firstNamePassC").val(),
            seria: jQuery("#seriaOfpassC").val(),
            passNumb: jQuery("#numberOfPassC").val(),
            passExpire: jQuery("#termOfPassC").val(),
            indNumber: jQuery("#indNumberC").val(),
            phone: jQuery("#phoneC").val(),
            email: jQuery("#emailC").val(),
            natPassId: jQuery("#photoOfNatPassIdC").val(),
            forPassId: jQuery("#photoOfForPassIdC").val(),
            accId: jQuery("#accreditationPhotoIdC").val()
        }
    }

    this.showDeleteConfirm = function(id) {
        jQuery("#removeCoach #removeCId").val(id);
        jQuery("#removeCoach").modal("show");
    }

    this.getCoachForDelete = function() {
        return {
            id: jQuery("#removeCId").val()
        }
    }

    function appendPhotoButtons(id, selector) {
        jQuery("#" + selector.photoId).val(id);
        jQuery("#" + selector.uplButton).remove();
        if (jQuery("#" + selector.shwButton).length) jQuery("#" + selector.shwButton).remove();
        if (jQuery("#" + selector.delButton).length) jQuery("#" + selector.delButton).remove();
        jQuery("#" + selector.photoId).after("<button type='button' id='" + selector.shwButton + "' class='btn btn-default' data-show = '" + id + "' style='margin-right: 5px' >Показати</button>" +
            "<button type='button' id='" + selector.delButton + "' class='btn btn-default' data-remove = '" + id + "'>Видалити</button>");
    }

    function deletePhoto(selector) {
        jQuery("#" + selector.photoId).val('');
        jQuery("#" + selector.shwButton).remove();
        jQuery("#" + selector.delButton).remove();
        jQuery("#" + selector.photoId).after("<button type='button' class='btn btn-default' id='" + selector.uplButton + "' >Завантажити фото</button>");
    }

    function showUploadModal(selector) {
        jQuery("#uploadPhotoModalC .modal-header h6").html(selector.title);
        jQuery("#uploadPhotoModalC .modal-body").html("<form><input type='file' class='form-control' id='" + selector.fileInput + "' accept='image/jpeg,image/png' /></form>");
        jQuery("#uploadPhotoModalC .modal-footer").html("<button type='button' class='btn btn-primary' id='" + selector.fileUplBut + "' >Завантажити</button>");
        jQuery("#uploadPhotoModalC").modal("show");
    }

    function savePhoto(selector) {
        var input = jQuery("#" + selector.fileInput);
        var fd = new FormData;
        if (input[0].files.length) {
            if (input[0].files[0].type == "image/jpeg" || input[0].files[0].type == "image/png") {
                fd.append('img', input[0].files[0]);
                return {
                    type: true,
                    obj: fd
                }
            } else {
                return {
                    type: false,
                    message: "Недопустимий тип файлу!"
                }
            }
        } else {
            return {
                type: false,
                message: "Оберіть файл!"
            }
        }
    }

    function setupButtons(selector, data) {
        jQuery("#" + selector.photoId).val(data);
        jQuery("#uploadPhotoModalC").modal("hide");
        jQuery("#" + selector.uplButton).remove();
        jQuery("#" + selector.photoId).after("<button type='button' id='" + selector.shwButton + "' class='btn btn-default' data-show = '" + data + "' style='margin-right: 5px' >Показати</button>" +
            "<button type='button' id='" + selector.delButton + "' class='btn btn-default' data-remove = '" + data + "'>Видалити</button>");
    }

    function compareLastName(a, b) {
        var textA = a.last_name.toUpperCase();
        var textB = b.last_name.toUpperCase();
        return textA.localeCompare(textB);
    }
}