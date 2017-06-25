(function($, undefined) {
    $(document).ready(function() {
        var servicesU = new UsersServices();
        var usersMgr = new Users();
        var spinnerU = new Spinner();
        var formU = new Form();
        var alertU = new Alert();


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

        $(".pagination li a").live("click", function(e) {
            usersMgr.currentPage = e.target.dataset["rel"];
            usersMgr.offsetRecalc();
            spinnerU.show();
            servicesU.getAllUsers(usersMgr.pageParams).then(function(data) {
                usersMgr.fetchGrid(data);
                usersMgr.fetchPaging(usersMgr.count);
                spinnerU.hide();
            })
        });

        $("#athletes .btn-edit").live("click", function() {
            // $("#userModal").modal("show");
        });

    });
})(jQuery)