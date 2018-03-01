import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";
require("../../../../css/nominations.css");

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
            width: "150px"
        },
        {
            title: "First Name",
            field: "firstName",
            width: "150px"
        },
        {
            title: "Birthday",
            field: "born",
            width: "120px"
        }
    ];
    var resultColumns = [];
    if(props.game){
        resultColumns = (props.game.type === "0")? [
            {  
                title: "SQ",
                field: "squat",
                width: "80px"
            },
            {
                title: "BP",
                field: "press",
                width: "80px"
            },
            {
                title: "DL",
                field: "lift",
                width: "80px"
            },
            {
                title: "TOTAL",
                field: "total",
                width: "80px"
            },
            {
                title: "",
                field: "",
                width: "*"
            }
        ] : [
            {
                title: "BP",
                field: "press",
                width: "80px"
            },
            {
                title: "",
                field: "",
                width: "*"
            }
        ];
    }

    var columns = nameColumns.concat(resultColumns);

    var weightClassCut = (wClass) => {
        var string = wClass.replace("до ", "");
        string = string.replace(" кг", "");
        string = string.replace("понад ", "");
        return parseFloat(string);
    }

    var compareWClasses = (a,b) => {
        var result;
        var newA = weightClassCut(a.wClass); 
        var newB = weightClassCut(b.wClass);
        if(newA != newB){
            result = newA - newB;
        }else{
            result = (props.game.type == "0")? b.total - a.total : b.press - a.press;
        }
        return result;
    }

    var divisionsList = props.divisions.map(d => {
        var divTmpNom = props.nominations.filter(n => n.divisionId == d.id);
        if(divTmpNom.length) {
            var rows = divTmpNom.map(x => {
                var row = {
                    wClass: x.weightClass,
                    lastName: x.lastName,
                    firstName: x.firstName,
                    born: moment(new Date(x.born)).format("DD/MM/YYYY")
                };
                if(props.game.type=="0"){
                    row.squat = x.results.squat,
                    row.press = x.results.press,
                    row.lift = x.results.lift,
                    row.total = x.results.total
                }else{
                    row.press = x.results.press
                }
                return row;
            });

            rows = rows.sort(compareWClasses);

            return <div key={d.id} className="nominations-grid">
                <div className="division-title">{d.title[0].toUpperCase() + d.title.substring(1)}</div>
                <Grid data={{columns: columns, rows: rows}} />
            </div>
        }
    })
    return(<div>{divisionsList}</div>);
}
export default NomGrid;