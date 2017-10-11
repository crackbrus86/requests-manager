import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

const NomGrid = (props) => {
    if(!props.nominations.length && props.game) return <p>Немає жодного запису для цих змагань</p>;
    var nameColumns = [
        {
            title: "Class",
            field: "wClass",
            width: "100px"
        },
        {
            title: "Family Name",
            field: "lastName",
            width: "200px"
        },
        {
            title: "First Name",
            field: "firstName",
            width: "200px"
        },
        {
            title: "Birthday",
            field: "born",
            width: "100px"
        },
        {
            title: "",
            field: "",
            width: "*"
        }
    ];
    var resultColumns = [];
    if(props.game){
        resultColumns = (props.game.type === "0")? [
            {  
                title: "SQ",
                field: "squat"
            },
            {
                title: "BP",
                field: "press"
            },
            {
                title: "DL",
                field: "lift"
            },
            {
                title: "TOTAL",
                field: "total"
            }
        ] : [
            {
                title: "BP",
                field: "press"
            }
        ];
    }

    var columns = nameColumns.concat(resultColumns);

    var divisionsList = props.divisions.map(d => {
        var divTmpNom = props.nominations.filter(n => n.divisionId == d.id);
        if(divTmpNom.length) {
            var rows = divTmpNom.map(x => {
                return {
                    wClass: x.weightClass,
                    lastName: x.lastName,
                    firstName: x.firstName,
                    born: moment(new Date(x.born)).format("DD-MM-YYYY")
                }
            });
            return <div key={d.id}>{d.title}
                <Grid data={{columns: columns, rows: rows}} />
            </div>
        }
    })
    return(<div>{divisionsList}</div>);
}
export default NomGrid;