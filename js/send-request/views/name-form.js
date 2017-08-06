import React from "react";
import moment from "moment";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";
import * as validation from "../../components/validation/validation";

class NameForm extends React.Component{
    render(){
        var required = ["firstName", "lastName", "middleName", "birthDate"];
        var birthDate = (this.props.person.birthDate)? new Date(this.props.person.birthDate) : null;
        return <div>
            <form>
                <div className="form-group">
                    <label>Прізвище {validation.isFieldValid(this.props.person.lastName, "Це поле є обов'язковим")}</label>
                    <input type="text" value={this.props.person.lastName} onChange={e => this.props.onChange("lastName", e.target.value)} className="form-control" placeholder="Прізвище" maxLength="50" />
                </div>
                <div className="form-group">
                    <label>Ім'я {validation.isFieldValid(this.props.person.firstName, "Це поле є обов'язковим")}</label>
                    <input type="text" value={this.props.person.firstName} onChange={e => this.props.onChange("firstName", e.target.value)} className="form-control" placeholder="Ім'я" maxLength="30" />
                </div>
                <div className="form-group">
                    <label>По-батькові {validation.isFieldValid(this.props.person.middleName, "Це поле є обов'язковим")}</label>
                    <input type="text" value={this.props.person.middleName} onChange={e => this.props.onChange("middleName", e.target.value)} className="form-control" placeholder="По-батькові" maxLength="30" />
                </div>
                <div className="form-group">
                    <label>Дата народження {validation.isFieldValid(birthDate, "Це поле є обов'язковим")}</label>
                    <Datetime value={birthDate} dateFormat="DD-MM-YYYY" onChange={v => this.props.onChange("birthDate", v.format("YYYY-MM-DD"))} timeFormat={false} closeOnSelect={true} maxLength="10" />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" disabled={validation.isFormValid(this.props.person, required)} onClick={() => this.props.onNext()}>Далі</button>
                </div>
            </form>
        </div>
    }
}
export default NameForm;


