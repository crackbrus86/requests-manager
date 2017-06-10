    function RequestsService() {
        var dir = "../wp-content/plugins/requests-manager/api/Requests/";
        var rootDir = "../wp-content/plugins/requests-manager/api/";

        this.GetAllRequests = function() {
            return jQuery.ajax({
                url: dir + "GetAllRequests.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            });
        }

        this.GetRequest = function(id) {
            return jQuery.ajax({
                url: dir + "GetRequest.php",
                type: "POST",
                data: "id=" + id,
                success: function(data) {
                    return data;
                }
            })
        }

        this.GetAgeCategories = function() {
            return jQuery.ajax({
                url: rootDir + "Categories-Manager/GetAgeCategories.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            })
        }

        this.GetWeightCategories = function() {
            return jQuery.ajax({
                url: rootDir + "Categories-Manager/GetWeightCategoriesStrict.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            })
        }

        this.GetActualGames = function() {
            return jQuery.ajax({
                url: rootDir + "Games-Manager/GetActualGames.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            })
        }

        this.GetBeforeGames = function() {
            return jQuery.ajax({
                url: rootDir + "Games-Manager/GetBeforeGames.php",
                type: "POST",
                success: function(data) {
                    return data;
                }
            })
        }

        this.UpdateRequest = function(request) {
            return jQuery.ajax({
                url: dir + "UpdateRequest.php",
                type: "POST",
                data: request,
                success: function(data) {
                    return data;
                }
            })
        }

        this.DeleteRequest = function(id) {
            return jQuery.ajax({
                url: dir + "DeleteRequest.php",
                type: "POST",
                data: "rqstId=" + id,
                success: function(data) {
                    return data;
                }
            })
        }

        this.GetFilteredRequests = function(filter) {
            return jQuery.ajax({
                url: dir + "GetFilteredRequests.php",
                type: "POST",
                data: filter,
                success: function(data) {
                    return data;
                }
            })
        }

        this.GetCountOfAllRequests = function() {
            return jQuery.ajax({
                url: dir + "GetCountOfAllRequests",
                type: "POST",
                success: function(data) {
                    return data;
                }
            })
        }
    }