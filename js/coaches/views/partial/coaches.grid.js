import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

const CoachesGrid = (props) => {
    if(!props.coaches.length) return <p>Не знайдено тренерів</p>;
    var columns = [
        {
            title: "",
            field: "id",
            button: "edit",
            width: "80px",
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
            title: "Прізвище",
            field: "surname",
            width: "150px"
        },
        {
            title: "Ім'я",
            field: "name",
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
    var rows = props.coaches.map(coach => {
        return {
            id: coach.id,
            name: coach.name,
            surname: coach.surname,
            mName: coach.mName,
            born: moment(new Date(coach.born)).format("DD/MM/YYYY")
        }
    })
    return(<div><Grid data={{columns, rows}}/></div>)
}
export default CoachesGrid;