function Users() {
    this.count = 0;
    this.usersPerPage = 10;
    this.currentPage = 1;
    this.offset = this.usersPerPage * this.currentPage - this.usersPerPage;
    this.pageParams = {
        limit: this.usersPerPage,
        offset: this.offset
    }

    this.offsetRecalc = function() {
        this.offset = this.usersPerPage * this.currentPage - this.usersPerPage;
        this.pageParams.offset = this.offset;
    }

    var usersPaging = null;

    this.fields = [{
            title: "",
            field: "id",
            button: "edit"
        },
        {
            title: "",
            field: "id",
            button: "delete"
        },
        {
            title: "Прізвище",
            field: "last_name"
        },
        {
            title: "Ім'я",
            field: "first_name"
        },
        {
            title: "По-батькові",
            field: "middle_name"
        },
        {
            title: "Дата народження",
            field: "birth_date"
        }
    ];

    this.fetchGrid = function(data) {
        jQuery("#usersGrid").html();
        var grid = new Grid(this.fields, JSON.parse(data));
        jQuery("#usersGrid").html(grid.renderGrid());
    }

    this.fetchPaging = function(count) {
        jQuery("#usersPaging").html("");
        usersPaging = new Paging(this.usersPerPage, count, this.currentPage);
        jQuery("#usersPaging").html(usersPaging.renderPaging());
    }
}