import React from "react";
import Datetime from "react-datetime";
import * as validation from "../../components/validation/validation";
import { getDateValue } from '../../shared/helpers';

class OthersForm extends React.Component{
    render(){
        var required = ["name", "region", "email", "nameLatin", "dateOfBirth", "foreignPassNoPrefix", "foreignPassNo", "foreignPassIssuedBy", "foreignPassExpirationDate"];
        var regionsList = this.props.regions.map(item => <option key={item.id} value={item.id}>{item.region}</option>);
        var adminEmail = (this.props.president.email)? this.props.president.email : "";
        const dateOfBirth = this.props.president.dateOfBirth ? new Date(this.props.president.dateOfBirth) : null;
        const foreignPassExpirationDate = this.props.president.foreignPassExpirationDate ? new Date(this.props.president.foreignPassExpirationDate) : null;
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
                    <label>Прізвище, Ім'я (латиницею) {validation.isFieldValid(this.props.president.nameLatin, "Це поле є обов'язковим")}</label>
                    <input 
                        type="text"
                        value={this.props.president.nameLatin}
                        className="form-control"
                        onChange={e => this.props.onChange("nameLatin", e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Дата народження {validation.isFieldValid(this.props.president.dateOfBirth, "Це поле є обов'язковим")}</label>
                    <Datetime
                        value={dateOfBirth}
                        dateFormat="DD-MM-YYYY"
                        inputProps={{
                            placeholder: 'дд-мм-рррр'
                        }}
                        timeFormat={false}
                        closeOnSelect={true}
                        maxLength={10}
                        onChange={v => this.props.onChange("dateOfBirth", getDateValue(v, 'YYYY-MM-DD'))}
                    />
                </div>
                <div className="form-group">
                    <label>Ідентифікаційний номер</label>
                    <input 
                        value={this.props.president.individualNo} 
                        onChange={e => this.props.onChange("individualNo", e.target.value)} 
                        type="text" 
                        className="form-control" 
                        maxLength={10}
                    />
                </div>
                <div className="form-group">
                    <label>Серія{validation.isFieldValid(this.props.president.foreignPassNoPrefix, "Введіть серію")} та номер{validation.isFieldValid(this.props.president.foreignPassNo, "Введіть номер")} закордонного паспорту</label>
                    <div className="row">
                        <div className="col-md-4">
                            <input 
                                type="text"
                                className="form-control"
                                value={this.props.president.foreignPassNoPrefix}
                                onChange={e => this.props.onChange("foreignPassNoPrefix", e.target.value)}
                            />
                        </div>
                        <div className="col-md-8">
                            <input
                                type="text"                                
                                className="form-control"
                                value={this.props.president.foreignPassNo}
                                onChange={e => this.props.onChange("foreignPassNo", e.target.value)}
                            />
                        </div>
                    </div>
                </div> 
                <div className="form-group">
                    <label>Орган що видав{validation.isFieldValid(this.props.president.foreignPassIssuedBy, "Введіть ким виданий")}</label>
                    <textarea 
                        value={this.props.president.foreignPassIssuedBy}
                        className="form-control" 
                        maxLength={300} 
                        rows={3}
                        onChange={e => this.props.onChange("foreignPassIssuedBy", e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Термін дії закордонного паспорта {validation.isFieldValid(this.props.president.foreignPassExpirationDate, "Це поле є обов'язковим")}</label>
                    <Datetime 
                        value={foreignPassExpirationDate}
                        dateFormat="DD-MM-YYYY"
                        inputProps={{
                            placeholder: 'дд-мм-рррр'
                        }}
                        timeFormat={false}
                        closeOnSelect={true}
                        maxLength={10}
                        onChange={v => this.props.onChange("foreignPassExpirationDate", getDateValue(v, 'YYYY-MM-DD'))}
                    />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" disabled={validation.isFormValid(this.props.president, required)} onClick={() => this.props.onSave()}>Зберегти</button> 
                </div>
            </form>
        </div>
    }
}
export default OthersForm;