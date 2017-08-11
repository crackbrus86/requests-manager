import React from "react";

const VisaForm = (props) => {
    if(props.visa.hasVisa === "false") return null;
    var types = [{id: 0, title: "Шенгенська віза"}, {id: 1, title: "Віза США"}];
    var typesList = types.map(type => <option key={type.id} value={type.id}>{type.title}</option>);
    return (<div>
        <select value={props.visa.type} className="form-control" onChange={e => props.onChange("type", e.target.value, "visa")}>{typesList}</select>
    </div>);
}

export default VisaForm;