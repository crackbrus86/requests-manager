var visDir = "../wp-content/plugins/requests-manager/api/Visa/";
var gamDir = "../wp-content/plugins/requests-manager/api/Games-Manager/";

export const getGames = () => {
    return jQuery.ajax({
        url: gamDir + "GetOpenedActualGames.php",
        type: "POST"
    })
}