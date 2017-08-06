var dir = "../wp-content/plugins/requests-manager/api/Others/";
var regionDir = "../wp-content/plugins/requests-manager/api/Regions-Manager/";

export const getPresidentSettings = () => {
    return jQuery.ajax({
        url: dir + "GetPresidentData.php",
        type: "POST"
    })
}

export const getAllRegions = () => {
    return jQuery.ajax({
        url: regionDir + "GetAllRegions.php",
        type: "POST"
    })
}

export const savePresident = (contract) => {
    return jQuery.ajax({
        url: dir + "SavePresident.php",
        type: "POST",
        data: contract
    })
}