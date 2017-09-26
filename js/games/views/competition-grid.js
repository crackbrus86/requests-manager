import React from "react";
import Grid from "../../components/grid/grid";

class GameGrid extends React.Component{
    render(){
        var columns = [
            {
                title: "Назва",
                field: "name",
                width: "410px"
            },
            {
                title: "Тип",
                field: "type",
                width: "110px"
            },
            {
                title: "Рік",
                field: "year",
                width: "70px"
            },     
            {
                title: "Статус",
                field: "active",
                width: "60px"
            },      
            {
                title: "",
                field: "id",
                button: "edit",
                width: "80px",
                action: (e) => {
                    this.props.onEdit(e.target.dataset["rel"]);
                }
            },
            {
                title: "",
                field: "id",
                button: "delete",
                width: "80px",
                action: (e) => {
                    this.props.onDelete(e.target.dataset["rel"]);
                }
            }               
        ];
        var rows = this.props.data.map(item => {
            return {
                id: item.id,
                name: item.name,
                type: (item.type == "1")? "жим лежачи" : "пауерліфтинг",
                year: item.year,
                active: JSON.parse(item.active)? <i className="fa fa-plus-square-o"></i>:<i className="fa fa-minus-square-o"></i>
            }
        });
        return <Grid data={{columns, rows}} />       
    }
}
export default GameGrid;