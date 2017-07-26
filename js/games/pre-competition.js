import React from "react";
import Grid from "../components/grid/grid";

var data = {
    columns: [
        {
            title: "Name",
            field: "name",
            width: "200px"
        },
        {
            title: "Age",
            field: "age",
            width: "100px"
        },
        {
            title: "Position",
            field: "pos"
        }                
    ],
    rows: [
        {
            id: 11,
            name: "John",
            age: "27",
            pos: "dev"
        },
        {
            id: 13,
            name: "Bill",
            age: "31",
            pos: "qa"
        },
        {
            id: 55,
            name: "Steve",
            age: "28",
            pos: "seo"
        }                
    ]
}

class PreCompetition extends React.Component{
    render(){
        return <div>
            <h4>Відбіркові змагання</h4>
            <Grid data={data} />
        </div>
    }
}
export default PreCompetition;