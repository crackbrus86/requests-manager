function UsersServices() {
    var usersDir = "../wp-content/plugins/requests-manager/api/Users/";
    var rootDir = "../wp-content/plugins/requests-manager/api/";
    this.getAllUsers = function(data) {
        return jQuery.ajax({
            url: usersDir + "GetAllUsers.php",
            type: "POST",
            data: data
        });
    }

    this.getCountOfAllUsers = function() {
        return jQuery.ajax({
            url: usersDir + "GetCountOfAllUsers.php",
            type: "POST"
        })
    }

    this.getUserById = function(id) {
        return jQuery.ajax({

        });
    }

    this.saveUser = function(data) {
        return jQuery.ajax({

        });
    }

    this.deleteUser = function(id) {
        return jQuery.ajax({

        });
    }
}