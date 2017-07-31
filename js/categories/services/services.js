var dir = "../wp-content/plugins/requests-manager/api/Categories-Manager/";

export const GetAllAgeCategories = () => {
    return jQuery.ajax({
        url: dir + "GetAgeCategories.php",
        type: "POST"
    })
}