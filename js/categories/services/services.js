var dir = "../wp-content/plugins/requests-manager/api/Categories-Manager/";

export const GetAllAgeCategories = () => {
    return jQuery.ajax({
        url: dir + "GetAgeCategories.php",
        type: "POST"
    })
}

export const GetAgeCategoryById = (id) => {
    return jQuery.ajax({
        url: dir + "GetAgeCategoryById.php",
        type: "POST",
        data: id
    })
}

export const UpdateAgeCategory = (contract) => {
    return jQuery.ajax({
        url: dir + "UpdateAgeCategory.php",
        type: "POST",
        data: contract
    })
}

export const CreateAgeCategory = (contract) => {
    return jQuery.ajax({
        url: dir + "InsertAgeCategory.php",
        type: "POST",
        data: contract
    })
}

export const DeleteAgeCaegory = (id) => {
    return jQuery.ajax({
        url: dir + "DeleteAgeCategory.php",
        type: "POST",
        data: id
    })
}