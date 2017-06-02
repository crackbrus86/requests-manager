(function($, undefined) {
    $(document).ready(function() {
        var service = new RequestsService();
        var requestMgr = new RequestMgr();

        if ($("#requests").hasClass("active")) {
            service.GetAllRequests().then(function(data) {
                var dt = JSON.parse(data);
                for (var i = 0; i < dt.length; i++) {
                    requestMgr.appendRequest(dt[i]);
                }
            });
            console.log(requestMgr.getRequestsList());
        }

        $('a[href="#requests"]').live('click', function() {
            alert('123');
        });
    });

    function RequestMgr() {
        var requests = [];

        this.appendRequest = function(request) {
            requests.push(request);
        }
        this.getRequestsList = function() {
            return requests;
        }
    }

    function RequestsService() {
        var dir = "../wp-content/plugins/requests-manager/api/Requests/";

        this.GetAllRequests = function() {
            return $.ajax({
                url: dir + "GetAllRequests.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            });
        }
    }
})(jQuery)