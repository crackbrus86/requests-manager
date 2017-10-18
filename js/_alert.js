function Alert() {
    var dangerStyle = "position: absolute; top: 40%; left: 20%; right: 20%; z-index: 1000; padding: 20px 30px 10px; box-shadow: 0 0 9px 0px #000;";
    this.alertDanger = function(message) {
        jQuery("body").append(jQuery('<div class="alert alert-danger alert-dismissible fade in" style="' + dangerStyle + '" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' +
            '<h4>' + message + '</h4> </div>'));
    }
}