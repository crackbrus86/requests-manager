function Paging(per_page, total, current) {
    this.perPage = per_page;
    this.total = total;
    this.current = current;
    var count = Math.ceil(this.total / this.perPage);

    this.update = function(per_page, total, current) {
        this.perPage = per_page;
        this.total = total;
        this.current = current;
        count = Math.ceil(this.total / this.perPage);
    }

    this.renderPaging = function() {
        var paging = '<nav aria-label="Page navigation"><ul class="pagination">';
        for (var i = 1; i <= count; i++) {
            var active = (this.current == i) ? ' class="active"' : '';
            paging += '<li' + active + '><a href="javascript:void(0)" data-rel="' + i + '">' + i + '</a></li>';
        }
        paging += '</ul></nav>';
        return paging;
    }
}