import React from "react";
import * as validation from "../validation/validation";
import "../../../css/profile.control.css";

export const ProfileControl = (props) => {
    let buttonText = !!props.profile ? 'Редагувати профайл' : 'Додати профайл';
    let tip = 'Спочатку оберіть змагання';
    let profile = props.profile;
    
    return <div className="form-group">
        <label>Профайл спортсмена {validation.isFieldValid(props.profile, 'Не додано профайл')}</label>
        {
            !props.area ? <div>{validation.isFieldValid(props.area, 'Спочатку оберіть змагання')}</div> : null
        }
        <div className="profile-control-buttons">
            <button type="button" className="btn btn-default" onClick={() => props.action()} disabled={!props.area} >{buttonText}</button>
        </div>
    </div>;
}