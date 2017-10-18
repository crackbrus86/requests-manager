import React from "react";
import * as validation from "../../components/validation/validation";

class OthersForm extends React.Component{
    render(){
        var required = ["name", "region", "email"];
        var regionsList = this.props.regions.map(item => <option key={item.id} value={item.id}>{item.region}</option>);
        var adminEmail = (this.props.president.email)? this.props.president.email : "";
        return <div>
            <form>
                <div className="form-group">
                    <label>П.І.П {validation.isFieldValid(this.props.president.name, "Це поле є обов'язковим")}</label>
                    <input type="text" value={this.props.president.name} className="form-control" onChange={(e) => this.props.onChange("name", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Область</label>
                    <select value={this.props.president.region} className="form-control" onChange={(e) => this.props.onChange("region", e.target.value)}>{regionsList}</select>
                </div>
                <div className="form-group">
                    <label>Email адміністратора {validation.isEmailValid(adminEmail)}</label>
                    <input type="text" value={adminEmail} className="form-control" onChange={e => this.props.onChange("email", e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" disabled={validation.isFormValid(this.props.president, required)} onClick={() => this.props.onSave()}>Зберегти</button> 
                </div>
            </form>
        </div>
    }
}
export default OthersForm;