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

export const saveCoach = (contract) => {
    return jQuery.ajax({
        url: coaDir + "SaveCoach.php",
        type: "POST",
        data: contract
    })
}

export const deleteCoach = (contract) => {
    return jQuery.ajax({
        url: coaDir + "DeleteCoach.php",
        type: "POST",
        data: contract
    })
}

export const getPhotos = (contract) => {
    return jQuery.ajax({
        url: coaDir + "GetPhotos.php",
        type: "GET",
        data: contract
    })
}

export const runFilter = (contract) => {
    return jQuery.ajax({
        url: coaDir + "FilterCoaches.php",
        type: "POST",
        data: contract
    })
}