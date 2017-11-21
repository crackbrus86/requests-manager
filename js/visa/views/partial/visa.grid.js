import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

const VisaGrid = (props) => {
    if(!props.game) return null;
    if(!props.records.length && props.game) return <p>Немає жодного запису для цих змагань</p>;
    var columns = [
        {
            title: "",
            field: "visaId",
            button: "edit",
            width: "80px",
            action: (e) => {
                props.onEdit(e.target.dataset["rel"]);
            }            
        },
        {
            title: "",
            field: "visaId",
            button: "delete",
            width: "80px",
            action: (e) => {
                props.onDelete(e.target.dataset["rel"]);
            }            
        },
        {
            title: "Тип візи",
            field: "visaType",
            width: "80px",
        },
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
            title: "Термін дії візи",
            field: "visaExpires",
            width: "150px"
        },
        {
            title: "",
            field: "",
            width: "*"
        }
    ];
    var visaRecords = props.records.filter(x => !!x.fullName.trim());
    var rows = visaRecords.map(x => {
        var visaT = "";
        if(x.visaType){
            visaT = (x.visaType === "0")? <div className="visa-type sheng" title="Шенген">{"Ш"}</div> : <div className="visa-type usa" title="США">{"С"}</div>
        }
        var visaE = "";
        if(x.visaExpires){
            visaE = moment(new Date(x.visaExpires)).format("DD-MM-YYYY");
        }
        return {
            visaId: x.visaId,
            visaType: visaT,
            fullName: x.fullName,
            role: x.role.replace(x.role[0], x.role[0].toUpperCase()),
            born: moment(new Date(x.born)).format("DD-MM-YYYY"),
            passNo: x.passNo,
            passExpires: moment(new Date(x.passExpires)).format("DD-MM-YYYY"),
            visaExpires: visaE
        }
    });
    return(<div id="visaGrid">
        <Grid data={{columns, rows}} />
    </div>)
}
export default VisaGrid;