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

export const GetAllWeightCategories = () => {
    return jQuery.ajax({
        url: dir + "GetWeightCategories.php",
        type: "POST"
    })
}

export const GetWeightCategoryById = (id) => {
    return jQuery.ajax({
        url: dir + "GetWeightCategoryById.php",
        type: "POST",
        data: id
    })
}

export const UpdateWeightCategory = (contract) => {
    return jQuery.ajax({
        url: dir + "UpdateWeightCategory.php",
        type: "POST",
        data: contract
    })
}

export const CreateWeightCategory = (contract) => {
    return jQuery.ajax({
        url: dir + "InsertWeightCategory.php",
        type: "POST",
        data: contract
    })
}

export const DeleteWeightCategory = (id) => {
    return jQuery.ajax({
        url: dir + "DeleteWeightCategory.php",
        type: "POST",
        data: id
    })
}