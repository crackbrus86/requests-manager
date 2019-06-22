import React from "react";
import Modal from "../../components/modal/modal"
import moment from "moment";
require("../../../css/text-doc-modal.css")

export const TextDocModal = props => {
    let text = parseText(props.textDoc, getTemplates(props.user, props.coach, props.event))

    const printDoc = () => {
        jQuery.print("#txtDoc");
    }
    
    return <Modal target={props.textDoc} onClose={() => props.onClose()} className={props.className}>
        <div><button type="button" className="print-export btn btn-default" onClick={() => printDoc()} title="Друк"><i className="fa fa-print"></i></button></div>
        <div dangerouslySetInnerHTML={{__html: text}} id="txtDoc"></div>
    </Modal>
}

function parseText(textStr, templates){
    for(var i = 0; i < templates.length; i++){
        textStr = textStr.split(templates[i].template).join(templates[i].value);
    }
    return textStr;
}

function getTemplates(user, coach, event){
    return [
        {template: '[%last_name%]', value: user.lastName}, 
        {template: '[%first_name%]', value: user.firstName}, 
        {template: '[%middle_name%]', value: user.middleName}, 
        {template: '[%year_born%]', value: moment(user.birthDate).format('YYYY')}, 
        {template: '[%n_pass%]', value: user.n_pass }, 
        {template: '[%current_date%]', value: moment(new Date()).format("DD/MM/YYYY") }, 
        {template: '[%first_name_initial%]', value: user.firstName[0]}, 
        {template: '[%middle_name_initial%]', value: user.middleName[0]},
        {template: '[%date_born%]', value: moment(user.birthDate).format("DD/MM/YYYY")},
        {template: '[%c_last_name%]', value: coach ? coach.lastName : ""}, 
        {template: '[%c_first_name%]', value: coach ? coach.firstName : ""}, 
        {template: '[%c_middle_name%]', value: coach ? coach.middleName : ""}, 
        {template: '[%c_year_born%]', value: coach ? moment(coach.birthDate).format('YYYY') : ""},
        {template: '[%c_n_pass%]', value: coach ? coach.n_pass  : ""}, 
        {template: '[%c_first_name_initial%]', value: coach ? coach.firstName[0]  : ""}, 
        {template: '[%c_middle_name_initial%]', value: coach ? coach.middleName[0] : ""},
        {template: '[%c_date_born%]', value: coach ? moment(coach.birthDate).format("DD/MM/YYYY") : ""},
        {template: '[%event%]', value: event || ""}
    ]
};