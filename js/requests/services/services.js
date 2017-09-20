var gamesDir = "../wp-content/plugins/requests-manager/api/Games-Manager/";
var reqDir = "../wp-content/plugins/requests-manager/api/Requests/";
var catDir = "../wp-content/plugins/requests-manager/api/Categories-Manager/";
var regDir = "../wp-content/plugins/requests-manager/api/Regions-Manager/";

export const getOpenedGames = (contract) => {
    return jQuery.ajax({
        url: gamesDir + "GetOpenedActualGames.php",
        type: "POST",
        data: contract
    })
}

export const getCountOfAllRequests = (contract) => {
    return jQuery.ajax({
        url: reqDir + "GetCountOfAllRequests.php",
        type: "POST",
        data: contract
    })
}

export const getAllRequests = (contract) => {
    return jQuery.ajax({
        url: reqDir + "GetAllRequests.php",
        type: "POST",
        data: contract
    })
}

export const getRequest = (contract) => {
    return jQuery.ajax({
        url: reqDir + "GetRequestById.php",
        type: "POST",
        data: contract
    })
}

export const getAgeCategories = () => {
    return jQuery.ajax({
        url: catDir + "GetAgeCategories.php",
        type: "POST"
    })
}

export const getWeightCategories = () => {
    return jQuery.ajax({
        url: catDir + "GetWeightCategoriesStrict.php",
        type: "POST"
    })
}

export const getAllRegions = () => {
    return jQuery.ajax({
        url: regDir + "GetAllRegions.php",
        type: "POST"
    })
}

export const getAllBeforeGames = () => {
    return jQuery.ajax({
        url: gamesDir + "GetBeforeGames.php",
        type: "POST"
    })
}