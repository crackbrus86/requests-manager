var useDir = "../wp-content/plugins/requests-manager/api/Users/";
var regDir = "../wp-content/plugins/requests-manager/api/Regions-Manager/";

export const getUsersCount = () => {
    return jQuery.ajax({
        url: useDir + "GetCountOfAllUsers.php",
        type: "POST"
    })
}

export const getAll = (contract) => {
    return jQuery.ajax({
        url: useDir + "GetAllUsers.php",
        type: "POST",
        data: contract
    })
}

export const getUser = (contract) => {
    return jQuery.ajax({
        url: useDir + "GetUserById.php",
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