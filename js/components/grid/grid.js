import React from "react";

class Grid extends React.Component{
    getCells(row){
        var cells = [];
        this.props.data.columns.forEach((column) => {
            cells.push(<td key={row[column.field] + column.field} width={column.width}>{row[column.field]}</td>)
        })
        return cells
    }
    render(){
        let cols = this.props.data.columns.map((column) => {
            return <th key={column.field} width={column.width}>{column.title}</th>;
        });
        let rows = this.props.data.rows.map((row) => {
            return <tr key={row.id}>{this.getCells(row)}</tr>
        });
        return <table className="table table-striped">
            <thead><tr>{cols}</tr></thead>
            <tbody>{rows}</tbody>
        </table>
    }
}

export default Grid