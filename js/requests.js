(function($, undefined) {
    $(document).ready(function() {
        var service = new RequestsService();
        var requestMgr = new RequestMgr();
        var spinner = new Spinner();

        if ($("#requests").hasClass("active")) {
            spinner.show();
            service.GetAllRequests().then(function(data) {
                requestMgr.fetchRequests(data);
                var requestsGrid = new Grid(requestMgr.fields, requestMgr.getRequestsList());
                $("#requestsGrid").append(requestsGrid.renderGrid());
                spinner.hide();
            });

        }

        $('a[href="#requests"]').live('click', function() {
            alert('123');
        });

        $(".btn-edit").live('click', function(e) {
            service.GetRequest(e.target.dataset["rel"]);
            $("#requestModal").modal('show');
        });
    });

    function RequestMgr() {
        var requests = [];
        this.fields = [{
                title: "",
                field: "id",
                button: "edit"
            },
            {
                title: "",
                field: "id",
                button: "delete"
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
                title: "Вікова категорія",
                field: "title"
            },
            {
                title: "Вагова категорія",
                field: "title_w"
            },
            {
                title: "Змагання",
                field: "name"
            },
            {
                title: "Дата подачі",
                field: "create_date"
            }
        ];

        function appendRequest(request) {
            requests.push(request);
        }

        this.fetchRequests = function(data) {
            var dt = JSON.parse(data);
            for (var i = 0; i < dt.length; i++) {
                requests.push(dt[i]);
            }
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

        this.GetRequest = function(id) {
            return $.ajax({
                url: dir + "GetRequest.php",
                type: "POST",
                data: "id=" + id,
                success: function(data) {
                    return data;
                }
            })
        }
    }
})(jQuery)