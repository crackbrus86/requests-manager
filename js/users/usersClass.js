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
        if (data.photo_national_pass_id) {
            jQuery("#photoOfNatPassIdU").val(data.photo_national_pass_id);
            jQuery("#uploadPhotoOfNatPassU").remove();
            if (jQuery("#showPhotoOfNatPassU").length) jQuery("#showPhotoOfNatPassU").remove();
            if (jQuery("#removePhotoOfNatPassU").length) jQuery("#removePhotoOfNatPassU").remove();
            jQuery("#photoOfNatPassIdU").after("<button type='button' id='showPhotoOfNatPassU' class='btn btn-default' data-show = '" + data.photo_national_pass_id + "' style='margin-right: 5px' >Показати</button>" +
                "<button type='button' id='removePhotoOfNatPassU' class='btn btn-default' data-remove = '" + data.photo_national_pass_id + "'>Видалити</button>");
        }
        if (data.photo_international_pass_id) {
            jQuery("#photoOfForPassIdU").val(data.photo_international_pass_id);
            jQuery("#uploadPhotoOfForPassU").remove();
            if (jQuery("#showPhotoOfForPassU").length) jQuery("#showPhotoOfForPassU").remove();
            if (jQuery("#removePhotoOfForPassU").length) jQuery("#removePhotoOfForPassU").remove();
            jQuery("#photoOfForPassIdU").after("<button type='button' id='showPhotoOfForPassU' class='btn btn-default' data-show = '" + data.photo_international_pass_id + "' style='margin-right: 5px' >Показати</button>" +
                "<button type='button' id='removePhotoOfForPassU' class='btn btn-default' data-remove = '" + data.photo_international_pass_id + "'>Видалити</button>");
        }
        if (data.accreditation_photo_id) {
            jQuery("#accreditationPhotoIdU").val(data.accreditation_photo_id);
            jQuery("#uploadAccreditationPhotoU").remove();
            if (jQuery("#showPhotoForAccreditationU").length) jQuery("#showPhotoForAccreditationU").remove();
            if (jQuery("#removePhotoForAccreditationU").length) jQuery("#removePhotoForAccreditationU").remove();
            jQuery("#accreditationPhotoIdU").after("<button type='button' id='showPhotoForAccreditationU' class='btn btn-default' data-show = '" + data.accreditation_photo_id + "' style='margin-right: 5px' >Показати</button>" +
                "<button type='button' id='removePhotoForAccreditationU' class='btn btn-default' data-remove = '" + data.accreditation_photo_id + "'>Видалити</button>");
        }
    }

    this.showPhoto = function(img) {
        jQuery("#showPhotoModalU .modal-body").html(img);
        jQuery("#showPhotoModalU").modal("show");
    }
}