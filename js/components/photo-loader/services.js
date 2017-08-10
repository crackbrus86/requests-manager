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

export const getPhotoSrc = (photoId) => {
    return jQuery.ajax({
        url: dir + "GetPhotoSrc.php",
        type: "POST",
        data: photoId
    })
}