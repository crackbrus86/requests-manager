import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

const UsersGrid = (props) => {
    if(!props.users.length) return <p>Немає збережених спортсменів</p>;
    var columns = [
        {
            title: "",
            field: "id",
            button: "edit",
            width: "60px",
            action: (e) => {
                props.onEdit(e.target.dataset["rel"]);
            }            
        },
        {
            title: "",
            field: "id",
            button: "delete",
            width: "80px",
            action: (e) => {
                props.onDelete(e.target.dataset["rel"]);
            }            
        },
        {
            title: "",
            field: "id",
            button: "photos",
            color: "warning",
            width: "80px",
            action: (e) => {
                props.onGetPhotos(e.target.dataset["rel"]);
            }
        },
        {
            title: "Прізвище",
            field: "lastName",
            width: "150px"
        },
        {
            title: "Ім'я",
            field: "firstName",
            width: "150px"
        },
        {
            title: "По-батькові",
            field: "mName",
            width: "150px"
        },
        {
            title: "Дата народження",
            field: "born",
            width: "*"
        }
    ];
    var rows = props.users.map(user => {
        return {
            id: user.id,
            lastName: user.lastName,
            firstName: user.firstName,
            mName: user.mName,
            born: moment(new Date(user.born)).format("DD/MM/YYYY")
        }
    })
    return (<div><Grid data={{columns, rows}} /></div>)
}
export default UsersGrid;