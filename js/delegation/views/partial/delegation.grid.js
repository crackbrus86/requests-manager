import React from "react";
import Grid from "../../../components/grid/grid";
import moment from "moment";

import { capitalizeFullName } from '../../../helpers';

const DlgGrid = (props) => {
    if(!props.members.length) return null;
    var columns = [
        {
            title: "П.І.П.",
            field: "fullName",
            width: "250px"
        },
        {
            title: "Область",
            field: "region",
            width: "200px"
        },
        {
            title: "Роль",
            field: "role",
            width: "200px"
        },
        {
            title: "Прізвище, ім'я латиницею",
            field: "nameLatin",
            width: "250px"
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
            title: "Орган що видав",
            field: "passIssuedBy",
            width: "200px"
        },
        {
            title: "Термін дії закордонного паспорту",
            field: "passExpiredAt",
            width: "150px"
        },
        {
            title: "Ідентифікаційний номер",
            field: "individualNo",
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
            nameLatin: capitalizeFullName(x.fullNameLatin),
            dateOfBirth: !!x.dateOfBirth ? moment(new Date(x.dateOfBirth)).format("DD.MM.YYYY") : null,
            passNo: x.foreignPassData,
            passIssuedBy: x.foreignPassIssuedBy,
            passExpiredAt: !!x.foreignPassExpirationDate ? moment(new Date(x.foreignPassExpirationDate)).format("DD.MM.YYYY") : null,
            individualNo: x.individualNo
        }
    })
    return (<div id="dlgGrid">
        <Grid data={{columns, rows}} />
    </div>)
}
export default DlgGrid;