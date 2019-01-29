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

export const saveUser = (contract) => {
    return jQuery.ajax({
        url: useDir + "SaveUser.php",
        type: "POST",
        data: contract
    })
}

export const deleteUser = (contract) => {
    return jQuery.ajax({
        url: useDir + "DeleteUser.php",
        type: "POST",
        data: contract
    })
}

export const getPhotos = (contract) => {
    return jQuery.ajax({
        url: useDir + "GetPhotos.php",
        type: "GET",
        data: contract
    })
}

export const runFilter = (contract) => {
    return jQuery.ajax({
        url: useDir + "FilterUsers.php",
        type: "POST",
        data: contract
    })
}

export const getUserPhotosById = (contract) => {
    return jQuery.ajax({
        url: useDir + "GetUserPhotosById.php",
        type: "GET",
        data: contract
    })
}