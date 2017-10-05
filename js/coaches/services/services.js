var coaDir = "../wp-content/plugins/requests-manager/api/Coaches/";

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