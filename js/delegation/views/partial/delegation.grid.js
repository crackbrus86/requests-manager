import React from "react";
import Grid from "../../../components/grid/grid";

const DlgGrid = (props) => {
    if(!props.members.length) return null;
    var columns = [
        {
            title: "П.І.П.",
            field: "fullName",
            width: "350px"
        },
        {
            title: "Область",
            field: "region",
            width: "250px"
        },
        {
            title: "Роль",
            field: "role",
            width: "150px"
        },
        {
            title: "",
            field: "",
            width: "*"
        }
    ];
    var rows = props.members.map(x => {
        return {
            fullName: x.fullName,
            region: x.region,
            role: x.role
        }
    })
    return (<div id="dlgGrid">
        <Grid data={{columns, rows}} />
    </div>)
}
export default DlgGrid;