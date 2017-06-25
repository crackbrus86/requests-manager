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
        var president = new President();
        var spinnerO = new Spinner();

        president.getPresidentDataService().then(function(data) {
            president.setPresidentData(JSON.parse(data));
            president.setupPresidentData();
        })

        $("#savePresident").live("click", function() {
            president.updatePresidentData();
            spinnerO.show();
            president.savePresidentService(president.savePresident()).then(function() {
                president.getPresidentDataService().then(function(data) {
                    president.setPresidentData(JSON.parse(data));
                    president.setupPresidentData();
                    spinnerO.hide();
                });
            });
        });


    });

    function President() {
        this.id = null;
        this.name = "";
        this.region = "";

        this.getPresidentDataService = function() {
            return $.ajax({
                url: othersDir + "GetPresidentData.php",
                type: "POST"
            });
        }

        this.setPresidentData = function(data) {
            this.id = data[0].id;
            this.name = data[0].name;
            this.region = data[0].region;
        }

        this.updatePresidentData = function() {
            this.id = $("#idPr").val();
            this.name = $("#fullNamePr").val();
            this.region = $("#regionPr").val();
        }

        this.setupPresidentData = function() {
            if (this.id) {
                $("#idPr").val(this.id);
                $("#fullNamePr").val(this.name);
                $("#regionPr").val(this.region).change();
            }
        }

        this.savePresident = function() {
            var presidentData = {
                id: this.id,
                name: this.name,
                region: this.region
            }
            return presidentData;
        }

        this.savePresidentService = function(data) {
            return $.ajax({
                url: othersDir + "SavePresident.php",
                type: "POST",
                data: data
            });
        }
    }
})(jQuery)