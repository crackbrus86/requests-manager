var useDir = "../wp-content/plugins/requests-manager/api/Users/";

export const getUsersCount = () => {
    return jQuery.ajax({
        url: useDir + "GetCountOfAllUsers.php",
        type: "POST"
    })
}

export const getAll = (contract) => {
    return jQuery.ajax({
        url: useDir + "GetAllUsers.php",
        type: "POST"
    })
}