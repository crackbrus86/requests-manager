const apiUrlPath = '../wp-content/plugins/requests-manager/api/';

export const uploadPDF = (files) => {
    return jQuery.ajax({
        url: apiUrlPath + 'UploadPDF.php',
        data: files,
        processData: false,
        contentType: false,
        type: 'POST'
    });
};

export const openPDF = (pdfId) => {
    return jQuery.ajax({
        url: apiUrlPath + 'GetPDF.php',
        type: 'POST',
        data: pdfId
    });
};