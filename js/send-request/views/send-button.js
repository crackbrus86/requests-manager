import React from "react";
import * as validation from "../../components/validation/validation";

const SendButton = (props) => {
    if(!props.isVisible) return null;
    var isVisaValid = (props.visa.hasVisa === "true")? validation.isFormValid(props.visa, ["term"]) : false;
    var isDopingControlValid = (props.doping.isPassed === "true")? validation.isFormValid(props.doping, ["date"]) : false;
    var requiredUserData = ["first_name_pass", "last_name_pass", "serial_number_pass", "number_pass",
                    "expiration_date_pass", "individual_number", "phone", "email",
                    "photo_national_pass_id", "photo_international_pass_id", "accreditation_photo_id"];
    return (<div className="form-group">
        <button type="button" className="btn btn-success" disabled={validation.isFormValid(props.userData, requiredUserData) || isVisaValid || isDopingControlValid } onClick={() => props.onSend()} >Подати заявку</button>
    </div>);
}

export default SendButton;