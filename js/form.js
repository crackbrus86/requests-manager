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
}