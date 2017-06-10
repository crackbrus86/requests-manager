function Form() {
    this.appendOptions = function(select, data) {
        var list = '';
        data.forEach(function(item) {
            var id = item.id;
            var title = item.title || item.title_w || item.name || item.region;
            list += '<option value="' + id + '">' + title + '</option>';
        });
        jQuery(select).html(list);
    }

    this.getToday = function() {
        var day = new Date();
        var dayPrefix = (day.getDate() < 10) ? "0" : "";
        var monthPrefix = (day.getMonth() < 9) ? "0" : '';
        return day.getFullYear() + "-" + monthPrefix + (day.getMonth() + 1) + "-" + dayPrefix + day.getDate();
    }
}