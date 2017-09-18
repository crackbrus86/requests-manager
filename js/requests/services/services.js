var gamesDir = "../wp-content/plugins/requests-manager/api/Games-Manager/";
var reqDir = "../wp-content/plugins/requests-manager/api/Requests/";

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