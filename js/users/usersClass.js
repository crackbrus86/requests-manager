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
        photoId: "photoOfNatPassIdU",
        uplButton: "uploadPhotoOfNatPassU",
        shwButton: "showPhotoOfNatPassU",
        delButton: "removePhotoOfNatPassU"
    }

    var forPass = {
        photoId: "photoOfForPassIdU",
        uplButton: "uploadPhotoOfForPassU",
        shwButton: "showPhotoOfForPassU",
        delButton: "removePhotoOfForPassU"
    }

    var accPhoto = {
        photoId: "accreditationPhotoIdU",
        uplButton: "uploadAccreditationPhotoU",
        shwButton: "showPhotoForAccreditationU",
        delButton: "removePhotoForAccreditationU"
    }

    this.setModalData = function(data) {
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

    this.showPhoto = function(img) {
        jQuery("#showPhotoModalU .modal-body").html(img);
        jQuery("#showPhotoModalU").modal("show");
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
}