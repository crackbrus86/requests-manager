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

        $("#athletes #showPhotoOfNatPassU," +
            "#athletes #showPhotoOfForPassU," +
            "#athletes #showPhotoForAccreditationU").live("click", function(e) {
            spinnerU.show();
            servicesU.loadPhoto(e.target.dataset.show).then(function(img) {
                usersMgr.showPhoto(img);
                spinnerU.hide();
            });
        });

        $("#athletes #userModal .close").live("click", function() {
            $("#userModal, .modal-backdrop").fadeOut();
        });

    });
})(jQuery)