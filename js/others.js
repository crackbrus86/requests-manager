(function($, undefined) {
    var rootDir = "../wp-content/plugins/requests-manager/api/";
    var othersDir = "../wp-content/plugins/requests-manager/api/Others/";
    $(document).ready(function() {
        var formO = new Form();
        $.ajax({
            url: rootDir + "Regions-Manager/GetAllRegions.php",
            type: "POST"
        }).then(function(data) {
            formO.appendOptions("#regionPr", JSON.parse(data));
        });

    });

    function President() {
        this.id = null;
        this.name = "";
        this.region = "";

        this.getPresidentData = function() {
            return $.ajax({
                url: othersDir + "GetPresidentData.php",
                type: "POST"
            });
        }
    }
})(jQuery)