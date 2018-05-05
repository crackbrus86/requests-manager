var gamesDir = "../wp-content/plugins/requests-manager/api/Games-Manager/";
var reqDir = "../wp-content/plugins/requests-manager/api/Requests/";
var catDir = "../wp-content/plugins/requests-manager/api/Categories-Manager/";
var regDir = "../wp-content/plugins/requests-manager/api/Regions-Manager/";
var coaDir = "../wp-content/plugins/requests-manager/api/Coaches/";
var profDir = "../wp-content/plugins/requests-manager/api/Profiles/";

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

export const getAllCoaches = () => {
    return jQuery.ajax({
        url: coaDir + "GetCoachesList.php",
        type: "POST"
    })
}

export const updateRequest = (contract) => {
    return jQuery.ajax({
        url: reqDir + "UpdateRequest.php",
        type: "POST",
        data: contract
    })
}

export const deleteRequest = (contract) => {
    return jQuery.ajax({
        url: reqDir + "DeleteRequest.php",
        type: "POST",
        data: contract
    })
}

export const getPhotos = (contract) => {
    return jQuery.ajax({
        url: reqDir + "GetPhotos.php",
        type: "GET",
        data: contract
    })
}

export const getEmails = (contract) => {
    return jQuery.ajax({
        url: reqDir + "GetUsersEmail.php",
        type: "POST",
        data: contract
    })
}

export const getProfile = (contract) => {
    return jQuery.ajax({
        url: profDir + "GetProfile.php",
        type: "POST",
        data: contract
    })
}

export const saveProfile = (contract) => {
    return !!contract.profile.profileId ? jQuery.ajax({
        url: profDir + 'UpdateProfile.php',
        type: "POST",
        data: contract
    }):
    jQuery.ajax({
        url: profDir + "CreateProfile.php",
        type: "POST",
        data: contract
    });
}