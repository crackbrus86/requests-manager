import React from "react";
import Grid from "../../components/grid/grid";

class RegionsGrid extends React.Component{
    render(){
        var columns = [
            {
                title: "Область",
                field: "region",
                width: "100%"
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
                region: item.region
            }
        });
        return <div><Grid data={{columns, rows}} /></div>
    }
}
export default RegionsGrid;