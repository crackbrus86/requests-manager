import React from "react";
import Grid from "../../components/grid/grid";

class PreGameGrid extends React.Component{
    render(){
        var columns = [
            {
                title: "Назва",
                field: "name",
                width: "430px"
            },
            {
                title: "Тип",
                field: "type",
                width: "220px"
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
                type: (item.type == "1")? "жим лежачи" : "пауерліфтинг"
            }
        })
        return <div><Grid data={{columns, rows}} /></div>
    }
}
export default PreGameGrid;