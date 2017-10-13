var gamDir = "../wp-content/plugins/requests-manager/api/Games-Manager/";
var dlgDir = "../wp-content/plugins/requests-manager/api/Delegation/";

export const getGames = () => {
    return jQuery.ajax({
        url: gamDir + "GetOpenedActualGames.php",
        type: "POST"
    })
}

export const getDelegation = (contract) => {
    return jQuery.ajax({
        url: dlgDir + "GetDelegation.php",
        type: "POST",
        data: contract
    })
}