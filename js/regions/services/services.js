var dir = "../wp-content/plugins/requests-manager/api/Regions-Manager/";

export const getAllRegions = () => {
    return jQuery.ajax({
        url: dir + "GetAllRegions.php",
        type: "POST"
    })
}

export const getRegionById = (id) => {
    return jQuery.ajax({
        url: dir + "GetRegionById.php",
        type: "POST",
        data: id
    })
}

export const updateRegion = (contract) => {
    return jQuery.ajax({
        url: dir + "UpdateRegion.php",
        type: "POST",
        data: contract
    })
}

export const createRegion = (contract) => {
    return jQuery.ajax({
        url: dir + "InsertRegion.php",
        type: "POST",
        data: contract
    })
}

export const deleteRegion = (id) => {
    return jQuery.ajax({
        url: dir + "DeleteRegion.php",
        type: "POST",
        data: id
    })
}