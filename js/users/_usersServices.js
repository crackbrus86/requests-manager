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

    this.getAllRegions = function() {
        return jQuery.ajax({
            url: rootDir + "Regions-Manager/GetAllRegions.php",
            type: "POST"
        })
    }

    this.getUserById = function(id) {
        return jQuery.ajax({
            url: usersDir + "GetUserById.php",
            type: "POST",
            data: "userId=" + id
        });
    }

    this.saveUser = function(data) {
        return jQuery.ajax({
            url: usersDir + "SaveUser.php",
            type: "POST",
            data: data
        });
    }

    this.deleteUser = function(id) {
        return jQuery.ajax({
            url: usersDir + "DeleteUser.php",
            type: "POST",
            data: id
        });
    }

    this.loadPhoto = function(id) {
        return jQuery.ajax({
            url: rootDir + "GetPhoto.php",
            type: "POST",
            data: "photoId=" + id
        });
    }

    this.uploadPhoto = function(fd) {
        return jQuery.ajax({
            url: rootDir + "UploadPhoto.php",
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST'
        });
    }
}