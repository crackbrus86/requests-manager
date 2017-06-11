function Spinner() {
    this.blackout = "<div id='blackout' style='position: absolute; top: 0; left: 0; bottom: 0; right: 0; background-color: #000; z-index: 10000; opacity: 0.3;'></div>";
    this.spinner = "<span class='fa-spin fa fa-circle-o-notch fa-5x' style='position: absolute; top: 50%; left: 50%; color: #fff'></span>"
    this.show = function() {
        document.body.innerHTML += this.blackout;
        document.getElementById("blackout").innerHTML += this.spinner;
    }

    this.hide = function() {
        document.getElementById("blackout").remove();
    }
}