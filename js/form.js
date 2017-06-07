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

    this.formatForDatepicker = function(date, separator) {
        if (!date) return null;
        var dateArray = date.split(separator);
        return dateArray[2] + "." + dateArray[1] + "." + dateArray[0];
    }

    this.getToday = function() {
        var day = new Date();
        var dayPrefix = (day.getDate() < 10) ? "0" : "";
        var monthPrefix = (day.getMonth() < 9) ? "0" : '';
        return dayPrefix + day.getDate() + "." + monthPrefix + (day.getMonth() + 1) + "." + day.getFullYear();
    }
}