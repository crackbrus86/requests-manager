var dir = "../wp-content/plugins/requests-manager/api/";

export const uploadPhoto = (files) => {
    return jQuery.ajax({
        url: dir + "UploadPhoto.php",
        data: files,
        processData: false,
        contentType: false,
        type: 'POST'     
    })
}