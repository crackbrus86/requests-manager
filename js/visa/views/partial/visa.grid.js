import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

const VisaGrid = (props) => {
    if(!props.game) return null;
    if(!props.records.length && props.game) return <p>Немає жодного запису для цих змагань</p>;
    var columns = [
        {
            title: "Прізвище, Ім'я",
            field: "fullName",
            width: "200px"
        },
        {
            title: "Роль",
            field: "role",
            width: "100px"
        },
        {
            title: "Дата народження",
            field: "born",
            width: "150px"
        },
        {
            title: "Номер паспорта",
            field: "passNo",
            width: "150px"
        },
        {
            title: "Термін дії паспорта",
            field: "passExpires",
            width: "180px"
        },
        {
            title: "",
            field: "",
            width: "*"
        }
    ];
    var visaRecords = props.records.filter(x => !!x.fullName.trim());
    var rows = visaRecords.map(x => {
        return {
            fullName: x.fullName,
            hasVisa: !!x.visaId ? false : true,
            role: x.role.replace(x.role[0], x.role[0].toUpperCase()),
            born: moment(new Date(x.born)).format("DD/MM/YYYY"),
            passNo: x.passNo,
            passExpires: moment(new Date(x.passExpires)).format("DD/MM/YYYY")
        }
    });
    return(<div id="visaGrid">
        <Grid data={{columns, rows}} />
    </div>)
}
export default VisaGrid;