import React from "react";
import * as validation from "../../components/validation/validation";

class SendButton extends React.Component{
    constructor(props){
        super(props);
        this.validateDoping = this.isDopingControlValid.bind(this);
        this.validatePassports = this.isAdditionalPassportsValid.bind(this);
    }
    isDopingControlValid(){
        return this.props.doping.isPassed === "true" ? validation.isFormValid(this.props.doping, ["date"]) : false;
    }
    isAdditionalPassportsValid(){
        if(!this.props.passports) return false;
        var invalidPassports = this.props.passports.filter(passport => !passport.no || !passport.seria || 
            !passport.expireDate || !parseInt(passport.photoId));
        return !!invalidPassports.length;
    }
    render(){
        if(!this.props.isVisible) return null;
        var requiredUserData = ["first_name_pass", "last_name_pass", "serial_number_pass", "number_pass",
                        "expiration_date_pass", "individual_number", "phone", "email",
                        "photo_national_pass_id", "photo_international_pass_id", "accreditation_photo_id"];
        return <div className="form-group">
            <button 
                type="button" 
                className="btn btn-success" 
                disabled={validation.isFormValid(this.props.userData, requiredUserData) || this.validateDoping() || this.validatePassports() } 
                onClick={() => this.props.onSend()}
            >Подати заявку</button>
        </div>;
    }
}

export default SendButton;