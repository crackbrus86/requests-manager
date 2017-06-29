function CoachesServices() {
    var coachesDir = "../wp-content/plugins/requests-manager/api/Coaches/";
    var rootDir = "../wp-content/plugins/requests-manager/api/";

    this.getAllCoaches = function(data) {
        return jQuery.ajax({
            url: coachesDir + "GetAllCoaches.php",
            type: "POST",
            data: data
        });
    }

    this.getCountOfAllCoaches = function() {
        return jQuery.ajax({
            url: coachesDir + "GetCountOfAllCoaches.php",
            type: "POST"
        });
    }

    this.getAllRegions = function() {
        return jQuery.ajax({
            url: rootDir + "Regions-Manager/GetAllRegions.php",
            type: "POST"
        });
    }

    this.getCoachById = function(id) {
        return jQuery.ajax({
            url: coachesDir + "GetCoachById.php",
            type: "POST",
            data: "coachId=" + id
        });
    }

    this.saveCoach = function(data) {
        return jQuery.ajax({
            url: coachesDir + "SaveCoach.php",
            type: "POST",
            data: data
        });
    }

    this.deleteCoach = function(id) {
        return jQuery.ajax({
            url: coachesDir + "DeleteCoach.php",
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