import React from "react";
import Grid from "../../../components/grid/grid";
import moment from "moment";

const ReqGrid = (props) => {
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
            field: "last_name",
            width: "*"            
        },   
        {
            title: "Ім'я",
            field: "first_name",
            width: "*"            
        },  
        {
            title: "Вікова категорія",
            field: "title",
            width: "*"            
        },      
        {
            title: "Вагова категорія",
            field: "title_w",
            width: "*"            
        },    
        {
            title: "Змагання",
            field: "name",
            width: "*"            
        },  
        {
            title: "Дата подачі",
            field: "create_date",
            width: "*"            
        }                                   
    ];
    var rows = props.data.map(item => {
        return {
            id: item.id,
            last_name: item.last_name,
            first_name: item.first_name,
            title: item.title,
            title_w: item.title_w,
            name: item.name,
            create_date: moment(new Date(item.create_date)).format("DD/MM/YYYY")
        }
    })
    return (<div id="reqGrid">
        <Grid data={{columns, rows}} /> 
    </div>)
}
export default ReqGrid;