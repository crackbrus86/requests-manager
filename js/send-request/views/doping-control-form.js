import React from "react";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";
import * as validation from "../../components/validation/validation";
require("../../../css/text-doc-modal.css")
import moment from "moment";

const DopingControlForm = (props) => {
    if(!props.isVisible) return null;
    var date = (props.data.date)? new Date(props.data.date) : null;
    var dcDate = (props.data.isPassed === "true")? <div className="form-group">
            <label>Дата проходження допінг-контролю {validation.isFieldValid(date, "Це поле є обов'язковим")}</label>
            <Datetime value={date} dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true} maxLength="10" onChange={(v) => props.onChange("date", v.format("YYYY-MM-DD"))} />
        </div> : null;
    return (<div>
        <fieldset>
            <legend>Дані про допінг-контроль</legend>
                <div className="form-group">
                    <div><label>Чи здавали Ви допінг-контроль?</label></div>
                    <label className="radio-inline">
                        <input type="radio" value="false" checked={props.data.isPassed === "false"} onChange={e => props.onChange("isPassed", e.target.value)} /> Ні
                    </label>
                    <label className="radio-inline">
                        <input type="radio" value="true" checked={props.data.isPassed === "true"} onChange={e => props.onChange("isPassed", e.target.value)} /> Так
                    </label>
                </div> 
                {dcDate} 
                {
                    !!props.isFormValid &&
                    <div>
                        <div><label>Антидопінгова заява</label></div>
                        <div className="form-group">
                            <button type="button" className="btn btn-info txt-btn" onClick={() => props.showDoc("athleteNote")}>Заява спортсмена</button>
                            {
                                !!props.isCoachValid &&
                                    <span>
                                        <button type="button" className="btn btn-info txt-btn" onClick={() => props.showDoc("coachNote")}>Заява тренера</button>
                                        <button type="button" className="btn btn-info txt-btn" onClick={() => props.showDoc("noteToTeam")}>Заява в збірну</button>
                                    </span>
                                    
                            }
                        </div> 
                    </div>
                }         
        </fieldset>
    </div>);
}

export default DopingControlForm;