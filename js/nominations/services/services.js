var gamDir = "../wp-content/plugins/requests-manager/api/Games-Manager/";
var nomDir = "../wp-content/plugins/requests-manager/api/Nominations/";
var catDir = "../wp-content/plugins/requests-manager/api/Categories-Manager/";

export const getGames = () => {
    return jQuery.ajax({
        url: gamDir + "GetOpenedActualGames.php",
        type: "POST"
    })
}

export const getNominations = (contract) => {
    return jQuery.ajax({
        url: nomDir + "GetNominations.php",
        type: "POST",
        data: contract
    })
}

export const getDivisions = () => {
    return jQuery.ajax({
        url: catDir + "GetAgeCategories.php",
        type: "POST"
    })
}