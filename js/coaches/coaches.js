(function($, undefined) {
    $(document).ready(function() {
        var spinnerC = new Spinner();
        var formC = new Form();
        var alertC = new Alert();
        var servicesC = new CoachesServices();
        var coachesMgr = new Coaches();

        $('a[href="#coaches"]').live('click', function() {
            spinnerC.show();
            servicesC.getCountOfAllCoaches().then(function(count) {
                coachesMgr.count = count;
                coachesMgr.fetchPaging(count);
            });
            servicesC.getAllCoaches(coachesMgr.pageParams).then(function(data) {
                coachesMgr.fetchGrid(data);
                spinnerC.hide();
            })
        });

        $("#coaches .pagination li a").live("click", function(e) {
            coachesMgr.currentPage = e.target.dataset["rel"];
            coachesMgr.offsetRecalc();
            spinnerC.show();
            servicesC.getAllCoaches(coachesMgr.pageParams).then(function(data) {
                coachesMgr.fetchGrid(data);
                coachesMgr.fetchPaging(coachesMgr.count);
                spinnerC.hide();
            })
        });

        $("#coaches .btn-edit").live("click", function(e) {
            var coachId = e.target.dataset["rel"];
            spinnerC.show();
            servicesC.getAllRegions().then(function(data) {
                formC.appendOptions("#regionC", JSON.parse(data));
                servicesC.getCoachById(coachId).then(function(data) {
                    coachesMgr.setModalData(JSON.parse(data)[0]);
                    $("#coachModal").modal("show");
                    spinnerC.hide();
                });
            });
        });

        $("#coaches .btn-delete").live("click", function(e) {
            var coachId = e.target.dataset["rel"];
            coachesMgr.showDeleteConfirm(coachId);
        });

        $("#removeCoach #deleteC").live("click", function() {
            spinnerC.show();
            servicesC.deleteCoach(coachesMgr.getCoachForDelete()).then(function() {
                $("#removeCoach").fadeOut();
                $(".modal-backdrop").fadeOut();
                servicesC.getCountOfAllCoaches().then(function(count) {
                    coachesMgr.count = count;
                    coachesMgr.fetchPaging(count);
                }).then(function() {
                    servicesC.getAllCoaches(coachesMgr.pageParams).then(function(data) {
                        coachesMgr.fetchGrid(data);
                        spinnerC.hide();
                    });
                });
            });
        });

        $("#coaches #showPhotoOfNatPassC," +
            "#coaches #showPhotoOfForPassC," +
            "#coaches #showPhotoForAccreditationC").live("click", function(e) {
            spinnerC.showInModal("coachModal");
            servicesC.loadPhoto(e.target.dataset.show).then(function(img) {
                spinnerC.hideInModal();
                coachesMgr.showPhoto(img);
            });
        });

        $("#coaches #uploadNatPassPhotoC," +
            "#coaches #uploadForPassPhotoC," +
            "#coaches #uploadAccreditationPhotoGoC").live("click", function(e) {
            var upload = coachesMgr.saveNewPhoto(e);
            if (!upload.type) {
                alertC(upload.message);
            } else {
                spinnerC.showInModal("coachModal");
                servicesC.uploadPhoto(upload.obj).then(function(data) {
                    spinnerC.hideInModal();
                    coachesMgr.updateButtons(e, data);
                });
            }
        });

        $("#coaches #removePhotoOfNatPassC," +
            "#coaches #removePhotoOfForPassC," +
            "#coaches #removePhotoForAccreditationC").live("click", function(e) {
            coachesMgr.removeModalPhoto(e);
        });

        $("#coaches #uploadPhotoOfNatPassC," +
            "#coaches #uploadPhotoOfForPassC," +
            "#coaches #uploadAccreditationPhotoC").live("click", function(e) {
            coachesMgr.uploadNewPhoto(e);
        });

        $("#coaches #coachModal .close, #coaches #removeCoach .close").live("click", function() {
            $("#coachModal, .modal-backdrop").fadeOut();
        });

        $("#saveCoach").live("click", function() {
            spinnerC.showInModal("coachModal");
            servicesC.saveCoach(coachesMgr.dataForSaving()).then(function(data) {
                spinnerC.hideInModal();
                $("#coachModal").modal("hide");
            });
        });

    });
})(jQuery)