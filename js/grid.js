function Grid(fields, datasource) {
    var columns = fields;
    var data = datasource;

    function createHeader() {
        var header = "<thead><tr>";
        for (var i = 0; i < columns.length; i++) {
            header += "<th>" + columns[i].title + "</th>";
        }
        header += "</tr></thead>";
        return header;
    }

    function createButton(type, rel) {
        switch (type) {
            case 'edit':
                return "<td><button type='button' class='btn btn-success btn-edit' data-rel='" + rel + "'>Edit</button></td>";
            case 'delete':
                return "<td><button type='button' class='btn btn-danger btn-delete' data-rel='" + rel + "'>Delete</button></td>"
        }
    }

    function createTbody() {
        var body = "<tbody>";
        for (var i = 0; i < data.length; i++) {
            body += "<tr>";
            for (var j = 0; j < columns.length; j++) {
                var key = columns[j].field;
                body += (columns[j].hasOwnProperty("button")) ? createButton(columns[j]["button"], data[i][key]) : "<td>" + data[i][key] + "</td>";
            }
            body += "</tr>";
        }
        body += "</tbody>";
        return body;
    }

    this.renderGrid = function() {
        return "<table class='table table-striped table-hover table-condensed'>" + createHeader() + createTbody() + "</table>";
    }
}