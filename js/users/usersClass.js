function Users() {
    this.count = 0;
    this.usersPerPage = 10;
    this.currentPage = 1;
    this.offset = this.usersPerPage * this.currentPage - this.usersPerPage;
    this.pageParams = {
        limit: this.usersPerPage,
        offset: this.offset
    }

    this.offsetRecalc = function() {
        this.offset = this.usersPerPage * this.currentPage - this.usersPerPage;
        this.pageParams.offset = this.offset;
    }

    var usersPaging = null;

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
        jQuery("#usersGrid").html();
        var grid = new Grid(this.fields, JSON.parse(data));
        jQuery("#usersGrid").html(grid.renderGrid());
    }

    this.fetchPaging = function(count) {
        jQuery("#usersPaging").html("");
        usersPaging = new Paging(this.usersPerPage, count, this.currentPage);
        jQuery("#usersPaging").html(usersPaging.renderPaging());
    }

    var natPass = {
        title: "Завантажити фото національного паспорта",
        fileInput: "photoOfNatPassU",
        fileUplBut: "uploadNatPassPhotoU",
        photoId: "photoOfNatPassIdU",
        uplButton: "uploadPhotoOfNatPassU",
        shwButton: "showPhotoOfNatPassU",
        delButton: "removePhotoOfNatPassU"
    }

    var forPass = {
        title: "Завантажити фото закордонного паспорта",
        fileInput: "photoOfForPassU",
        fileUplBut: "uploadForPassPhotoU",
        photoId: "photoOfForPassIdU",
        uplButton: "uploadPhotoOfForPassU",
        shwButton: "showPhotoOfForPassU",
        delButton: "removePhotoOfForPassU"
    }

    var accPhoto = {
        title: "Завантажити фото для акредитації",
        fileInput: "photoForAccreditationU",
        fileUplBut: "uploadAccreditationPhotoGoU",
        photoId: "accreditationPhotoIdU",
        uplButton: "uploadAccreditationPhotoU",
        shwButton: "showPhotoForAccreditationU",
        delButton: "removePhotoForAccreditationU"
    }

    this.setModalData = function(data) {
        jQuery("#userId").val(data.id);
        jQuery("#fullnameU").val(data.last_name + " " + data.first_name + " " + data.middle_name);
        jQuery("#birthDateU").val(data.birth_date);
        jQuery("#regionU").val(data.region).change();
        jQuery("#lastNamePassU").val(data.last_name_pass);
        jQuery("#firstNamePassU").val(data.first_name_pass);
        jQuery("#seriaOfpassU").val(data.serial_number_pass);
        jQuery("#numberOfPassU").val(data.number_pass);
        jQuery("#termOfPassU").val(data.expiration_date_pass);
        jQuery("#indNumberU").val(data.individual_number);
        jQuery("#phoneU").val(data.phone);
        jQuery("#emailU").val(data.email);
        if (data.photo_national_pass_id) appendPhotoButtons(data.photo_national_pass_id, natPass);
        if (data.photo_international_pass_id) appendPhotoButtons(data.photo_international_pass_id, forPass);
        if (data.accreditation_photo_id) appendPhotoButtons(data.accreditation_photo_id, accPhoto);
    }

    this.removeModalPhoto = function(e) {
        switch (e.target.id) {
            case "removePhotoOfNatPassU":
                deletePhoto(natPass);
                break;
            case "removePhotoOfForPassU":
                deletePhoto(forPass);
                break;
            case "removePhotoForAccreditationU":
                deletePhoto(accPhoto);
                break;
        }
    }

    this.uploadNewPhoto = function(e) {
        switch (e.target.id) {
            case "uploadPhotoOfNatPassU":
                showUploadModal(natPass);
                break;
            case "uploadPhotoOfForPassU":
                showUploadModal(forPass);
                break;
            case "uploadAccreditationPhotoU":
                showUploadModal(accPhoto);
                break;
        }
    }

    this.saveNewPhoto = function(e) {
        switch (e.target.id) {
            case "uploadNatPassPhotoU":
                return savePhoto(natPass);
            case "uploadForPassPhotoU":
                return savePhoto(forPass);
            case "uploadAccreditationPhotoGoU":
                return savePhoto(accPhoto);
        }
    }

    this.updateButtons = function(e, data) {
        switch (e.target.id) {
            case "uploadNatPassPhotoU":
                setupButtons(natPass, data);
                break;
            case "uploadForPassPhotoU":
                setupButtons(forPass, data);
                break;
            case "uploadAccreditationPhotoGoU":
                setupButtons(accPhoto, data);
                break;
        }
    }

    this.showPhoto = function(img) {
        jQuery("#showPhotoModalU .modal-body").html(img);
        jQuery("#showPhotoModalU").modal("show");
    }

    this.dataForSaving = function() {
        return {
            id: jQuery("#userId").val(),
            region: jQuery("#regionU").val(),
            lastNamePass: jQuery("#lastNamePassU").val(),
            firstNamePass: jQuery("#firstNamePassU").val(),
            seria: jQuery("#seriaOfpassU").val(),
            passNumb: jQuery("#numberOfPassU").val(),
            passExpire: jQuery("#termOfPassU").val(),
            indNumber: jQuery("#indNumberU").val(),
            phone: jQuery("#phoneU").val(),
            email: jQuery("#emailU").val(),
            natPassId: jQuery("#photoOfNatPassIdU").val(),
            forPassId: jQuery("#photoOfForPassIdU").val(),
            accId: jQuery("#accreditationPhotoIdU").val()
        }
    }

    this.showDeleteConfirm = function(id) {
        jQuery("#removeUser #removeUId").val(id);
        jQuery("#removeUser").modal("show");
    }

    this.getUserForDelete = function() {
        return {
            id: jQuery("#removeUId").val()
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
        jQuery("#uploadPhotoModalU .modal-header h6").html(selector.title);
        jQuery("#uploadPhotoModalU .modal-body").html("<form><input type='file' class='form-control' id='" + selector.fileInput + "' accept='image/jpeg,image/png' /></form>");
        jQuery("#uploadPhotoModalU .modal-footer").html("<button type='button' class='btn btn-primary' id='" + selector.fileUplBut + "' >Завантажити</button>");
        jQuery("#uploadPhotoModalU").modal("show");
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
        jQuery("#uploadPhotoModalU").modal("hide");
        jQuery("#" + selector.uplButton).remove();
        jQuery("#" + selector.photoId).after("<button type='button' id='" + selector.shwButton + "' class='btn btn-default' data-show = '" + data + "' style='margin-right: 5px' >Показати</button>" +
            "<button type='button' id='" + selector.delButton + "' class='btn btn-default' data-remove = '" + data + "'>Видалити</button>");
    }
}