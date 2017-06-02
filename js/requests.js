(function($, undefined) {
    $(document).ready(function() {
        var service = new RequestsService();
        var requestMgr = new RequestMgr();

        if ($("#requests").hasClass("active")) {
            service.GetAllRequests().then(function(data) {
                var dt = JSON.parse(data);
                dt.forEach(function(item) {
                    requestMgr.appendRequest(item);
                });
            });
            console.log(requestMgr.requests);
        }

        $('a[href="#requests"]').live('click', function() {
            alert('123');
        });
    });

    class RequestMgr {
        constructor() {
            this.requests = [];
        }
        appendRequest(request) {
            this.requests.push(request);
        }
        getRequestsList() {
            return this.requests;
        }
    }

    class RequestsService {
        constructor() {
            this.dir = "../wp-content/plugins/requests-manager/api/Requests/";
        }
        GetAllRequests() {
            return $.ajax({
                url: this.dir + "GetAllRequests.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            });
        }
    }
})(jQuery)