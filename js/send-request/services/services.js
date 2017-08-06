var dir = "../wp-content/plugins/requests-manager/api/Requests-Manager/";
var regionDir = "../wp-content/plugins/requests-manager/api/Regions-Manager/";
var categoryDir = "../wp-content/plugins/requests-manager/api/Categories-Manager/";
var gamesDir = "../wp-content/plugins/requests-manager/api/Games-Manager/";

export const getAllRegions = () => {
    return jQuery.ajax({
        url: regionDir + "GetAllRegions.php",
        type: "POST"
    })
}

export const getUserData = (contract) => {
    return jQuery.ajax({
        url: dir + "GetUser.php",
        type: "POST",
        data: contract
    })
}

