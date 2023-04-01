import React from "react";
import Grid from "../../../components/grid/grid";
import moment from "moment";

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
            width: "250px"
        },
        {
            title: "Прізвище, ім'я латиницею",
            field: "nameLatin",
            width: "300px"
        },
        {
            title: "Дата народження",
            field: "dateOfBirth",
            width: "150px"
        },
        {
            title: "Номер паспорта",
            field: "passNo",
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
            role: x.role,
            nameLatin: x.fullNameLatin,
            dateOfBirth: moment(new Date(x.dateOfBirth)).format("DD-MM-YYYY"),
            passNo: x.foreignPassData
        }
    })
    return (<div id="dlgGrid">
        <Grid data={{columns, rows}} />
    </div>)
}
export default DlgGrid;