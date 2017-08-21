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

export const getAgeCategories = () => {
    return jQuery.ajax({
        url: categoryDir + "GetAgeCategories.php",
        type: "POST"
    })
}

export const getWeightCategories = () => {
    return jQuery.ajax({
        url: categoryDir + "GetWeightCategoriesStrict.php",
        type: "POST"
    })
}

export const getOpenedActualGames = (currentDay) => {
    return jQuery.ajax({
        url: gamesDir + "GetOpenedActualGames.php",
        type: "POST",
        data: currentDay
    })
}

export const getBeforeGames = () => {
    return jQuery.ajax({
        url: gamesDir + "GetBeforeGames.php",
        type: "POST"
    })
}

export const getCoachData = (contract) => {
    return jQuery.ajax({
        url: dir + "GetCoach.php",
        type: "POST",
        data: contract
    })
}

export const saveRequestData = (contract) => {
    return jQuery.ajax({
        url: dir + "SaveRequestData.php",
        type: "POST",
        data: contract
    })
}

