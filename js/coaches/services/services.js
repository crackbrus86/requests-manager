var coaDir = "../wp-content/plugins/requests-manager/api/Coaches/";
var regDir = "../wp-content/plugins/requests-manager/api/Regions-Manager/";

export const getCount = () => {
    return jQuery.ajax({
        url: coaDir + "GetCountOfAllCoaches.php",
        type: "POST"
    })
}

export const getAll = (contract) => {
    return jQuery.ajax({
        url: coaDir + "GetAllCoaches.php",
        type: "POST",
        data: contract
    })
}

export const getCoach = (contract) => {
    return jQuery.ajax({
        url: coaDir + "GetCoachById.php",
        type: "POST",
        data: contract
    })
}

export const getRegions = () => {
    return jQuery.ajax({
        url: regDir + "GetAllRegions.php",
        type: "POST"
    })
}