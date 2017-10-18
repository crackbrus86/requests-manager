(function($, undefined) {
    $(document).ready(function() {
        var spinnerU = new Spinner();
        var formU = new Form();
        var alertU = new Alert();
        var servicesU = new UsersServices();
        var usersMgr = new Users();

        $('a[href="#athletes"]').live('click', function() {
            spinnerU.show();
            servicesU.getCountOfAllUsers().then(function(count) {
                usersMgr.count = count;
                usersMgr.fetchPaging(count);
            });
            servicesU.getAllUsers(usersMgr.pageParams).then(function(data) {
                usersMgr.fetchGrid(data);
                spinnerU.hide();
            })
        });

        $("#athletes .pagination li a").live("click", function(e) {
            usersMgr.currentPage = e.target.dataset["rel"];
            usersMgr.offsetRecalc();
            spinnerU.show();
            servicesU.getAllUsers(usersMgr.pageParams).then(function(data) {
                usersMgr.fetchGrid(data);
                usersMgr.fetchPaging(usersMgr.count);
                spinnerU.hide();
            })
        });

        $("#athletes .btn-edit").live("click", function(e) {
            var userId = e.target.dataset["rel"];
            spinnerU.show();
            servicesU.getAllRegions().then(function(data) {
                formU.appendOptions("#regionU", JSON.parse(data));
                servicesU.getUserById(userId).then(function(data) {
                    usersMgr.setModalData(JSON.parse(data)[0]);
                    $("#userModal").modal("show");
                    spinnerU.hide();
                });
            });
        });

        $("#athletes .btn-delete").live("click", function(e) {
            var userId = e.target.dataset["rel"];
            usersMgr.showDeleteConfirm(userId);
        });

        $("#removeUser #deleteU").live("click", function() {
            spinnerU.show();
            servicesU.deleteUser(usersMgr.getUserForDelete()).then(function() {
                $("#removeUser").fadeOut();
                $(".modal-backdrop").fadeOut();
                servicesU.getCountOfAllUsers().then(function(count) {
                    usersMgr.count = count;
                    usersMgr.fetchPaging(count);
                }).then(function() {
                    servicesU.getAllUsers(usersMgr.pageParams).then(function(data) {
                        usersMgr.fetchGrid(data);
                        spinnerU.hide();
                    });
                });
            });
        });

        $("#athletes #showPhotoOfNatPassU," +
            "#athletes #showPhotoOfForPassU," +
            "#athletes #showPhotoForAccreditationU").live("click", function(e) {
            spinnerU.showInModal("userModal");
            servicesU.loadPhoto(e.target.dataset.show).then(function(img) {
                spinnerU.hideInModal();
                usersMgr.showPhoto(img);
            });
        });

        $("#athletes #uploadNatPassPhotoU," +
            "#athletes #uploadForPassPhotoU," +
            "#athletes #uploadAccreditationPhotoGoU").live("click", function(e) {
            var upload = usersMgr.saveNewPhoto(e);
            if (!upload.type) {
                alertU.alertDanger(upload.message);
            } else {
                spinnerU.showInModal("userModal");
                servicesU.uploadPhoto(upload.obj).then(function(data) {
                    spinnerU.hideInModal();
                    usersMgr.updateButtons(e, data);
                });
            }
        });

        $("#athletes #removePhotoOfNatPassU," +
            "#athletes #removePhotoOfForPassU," +
            "#athletes #removePhotoForAccreditationU").live("click", function(e) {
            usersMgr.removeModalPhoto(e);
        });

        $("#athletes #uploadPhotoOfNatPassU," +
            "#athletes #uploadPhotoOfForPassU," +
            "#athletes #uploadAccreditationPhotoU").live("click", function(e) {
            usersMgr.uploadNewPhoto(e);
        });

        $("#athletes #userModal .close, #athletes #removeUser .close").live("click", function() {
            $("#userModal, .modal-backdrop").fadeOut();
        });

        $("#saveUser").live("click", function() {
            spinnerU.showInModal("userModal");
            servicesU.saveUser(usersMgr.dataForSaving()).then(function(data) {
                spinnerU.hideInModal();
                $("#userModal").modal("hide");
            });
        });

    });
})(jQuery)