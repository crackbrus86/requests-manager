import React from "react";
var classNames = require("classnames");

class Grid extends React.Component{
    getCells(row){
        var cells = [];
        this.props.data.columns.forEach((column, counter = 0) => {
            counter++;
            if(column.button) {
                var color = (column.button === "edit")? "success" : "danger";
                color = column.color || color;
                var buttonTitle = column.button[0].toUpperCase() + column.button.slice(1);
                var hide = (row[column.hide]) ? { display: "none" } : {};
                cells.push(<td key={counter} width={column.width}>
                    <button type="button" className={classNames("btn", "btn-" + color)} data-rel={row[column.field]} style={hide} onClick={(v) => column.action(v)}>{buttonTitle}</button>
                </td>)
            }else{
                cells.push(<td key={counter} width={column.width}>{row[column.field]}</td>)
            }            
        })
        return cells
    }
    render(){
        let cols = this.props.data.columns.map((column, counter = 0) => {
            counter++;
            return <th key={counter} width={column.width}>{column.title}</th>;
        });
        let rows = this.props.data.rows.map((row, counter = 0) => {
            counter++;
            return <tr key={counter}>{this.getCells(row)}</tr>
        });
        return <table className="table table-striped">
            <thead><tr>{cols}</tr></thead>
            <tbody>{rows}</tbody>
        </table>
    }
}

export default Grid