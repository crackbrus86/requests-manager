import React from "react";
import Grid from "../../components/grid/grid";

class AgeCategoriesGrid extends React.Component{
    render(){
        var columns = [
            {
                title: "Вікова категорія",
                field: "title",
                width: "650px"
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
                title: item.title
            }
        });
        return <Grid data={{columns, rows}} />        
    }
}
export default AgeCategoriesGrid;