import React from "react";
require("../../../css/validation.css");

export const isFormValid = (formObject, required) => {
    for(var i = 0; i < required.length; i++){
        if(!formObject[required[i]]) return true;
    }
    return false;
}

export const isFieldValid = (field, text = "") => {
    if(!!field) return null;
    return <i className="invalid">*<sub>{text}</sub></i>
}