var visDir = "../wp-content/plugins/requests-manager/api/Visa/";
var gamDir = "../wp-content/plugins/requests-manager/api/Games-Manager/";

export const getGames = () => {
    return jQuery.ajax({
        url: gamDir + "GetOpenedActualGames.php",
        type: "POST"
    })
}

export const getAllVisaRecords = (contract) => {
    return jQuery.ajax({
        url: visDir + "GetAllVisaRecords.php",
        type: "POST",
        data: contract
    })
}