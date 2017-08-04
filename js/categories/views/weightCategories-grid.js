import React from "react";
import Grid from "../../components/grid/grid";

class WeightCategoriesGrid extends React.Component{
    render(){
        var columns = [
            {
                title: "Вагова категорія",
                field: "title_w",
                width: "415px"
            },
            {
                title: "Вікова категорія",
                field: "title",
                width: "235px"
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
        var rows = this.props.data.map((item) => {
            return {
                id: item.id,
                title_w: item.title_w,
                title: item.title
            }
        });
        return <Grid data={{columns, rows}} />
    }
}
export default WeightCategoriesGrid;