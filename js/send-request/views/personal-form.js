import React from "react";
import moment from "moment";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";
import * as validation from "../../components/validation/validation";
import PhotoLoader from "../../components/photo-loader/photo-loader";
import PDFLoader from "../../components/pdf-loader/pdf-loader";
import ForeignPassportsComponent from "../../components/for_passports/for_passports";

class PersonalForm extends React.Component{
componentWillMount(){
    jQuery(".phone").mask("+38 (999) 999-99-99");
}

    render(){
        if(!this.props.isVisible) return null;
        var regionsList = (this.props.regions)? this.props.regions.map(item => <option key={item.id} value={item.id}>{item.region}</option>) : null;
        var region = (this.props.person.region)? this.props.person.region : this.props.regions[0].id;
        var expiration_pass = (this.props.person.expiration_date_pass)? new Date(this.props.person.expiration_date_pass) : null;
        return <div>
            <form>
                <fieldset>
                    <legend>Особисті дані</legend>
                <div className="form-group">
                    <label>Область {validation.isFieldValid(region, "Це поле є обов'язковим")}</label>
                    <select value={region} className="form-control" onChange={e => this.props.onChange("region", e.target.value)}>{regionsList}</select>
                </div>
                <div className="form-group">
                    <label>Серія та номер національного паспорту {validation.isFieldValid(this.props.person.n_pass, "Це поле є обов'язковим")}</label>
                    <input value={this.props.person.n_pass} onChange={e => this.props.onChange("n_pass", e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Прізвище як у закордонному паспорті {validation.isFieldValid(this.props.person.last_name_pass, "Це поле є обов'язковим")}</label>
                    <input value={this.props.person.last_name_pass} onChange={e => this.props.onChange("last_name_pass", e.target.value)} type="text" className="form-control" placeholder="Last Name" maxLength="50" />
                </div>
                <div className="form-group">
                    <label>Ім'я як у закордонному паспорті {validation.isFieldValid(this.props.person.first_name_pass, "Це поле є обов'язковим")}</label>
                    <input value={this.props.person.first_name_pass} onChange={e => this.props.onChange("first_name_pass", e.target.value)} type="text" className="form-control" placeholder="First Name" maxLength="30" />
                </div>  
                <div className="form-group">
                    <label>Серія {validation.isFieldValid(this.props.person.serial_number_pass, "Введіть серію")} та номер {validation.isFieldValid(this.props.person.number_pass, "Введіть номер")} закордонного паспорту</label>
                    <div className="row">
                        <div className="col-md-4">
                            <input value={this.props.person.serial_number_pass} onChange={e => this.props.onChange("serial_number_pass", e.target.value)} type="text" className="form-control" placeholder="НН" maxLength="4" />
                        </div>
                        <div className="col-md-8">
                            <input value={this.props.person.number_pass} onChange={e => this.props.onChange("number_pass", e.target.value)} type="text" className="form-control" placeholder="ХХХХХХ" maxLength="8" />
                        </div>                        
                    </div>
                </div> 
                <div className="form-group">
                    <label>Термін дії паспорту {validation.isFieldValid(expiration_pass, "Це поле є обов'язковим")}</label>
                    <Datetime value={expiration_pass} dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true} maxLength="10" onChange={(v) => this.props.onChange("expiration_date_pass", v.format("YYYY-MM-DD"))} />
                </div>  
                <div className="form-group">
                    <label>Фото першої сторінки закордонного паспорту {validation.isFieldValid(this.props.person.photo_international_pass_id, "Це поле є обов'язковим")}</label>
                    <PhotoLoader value={this.props.person.photo_international_pass_id} desc={"Фото першої сторінки закордонного паспорту"}  onRemove={() => this.props.onChange("photo_international_pass_id", "")} onUpdate={(id) => this.props.onChange("photo_international_pass_id", id)} /> 
                </div> 
                <ForeignPassportsComponent passports={this.props.passports} onUpdate={this.props.onPassUpdate} />
                <div className="form-group">
                    <label>Ідентифікаційний номер {validation.isFieldValid(this.props.person.individual_number, "Це поле є обов'язковим")}</label>
                    <input value={this.props.person.individual_number} onChange={e => this.props.onChange("individual_number", e.target.value)} type="text" className="form-control" maxLength="10" />
                </div>
                <div className="form-group">
                    <label>Номер телефону {validation.isFieldValid(this.props.person.phone, "Це поле є обов'язковим")}</label>  
                    <input value={this.props.person.phone} onChange={e => this.props.onChange("phone", e.target.value)} type="text" className="form-control phone" placeholder="+38 (999) 999-99-99" maxLength="20" />  
                </div>
                <div className="form-group">
                    <label>Електронна адреса {validation.isEmailValid(this.props.person.email)}</label> 
                    <input value={this.props.person.email} onChange={e => this.props.onChange("email", e.target.value)} type="text" className="form-control" placeholder="email.adress@gmail.com" maxLength="50" />   
                </div>
                <div className="form-group">
                    <label>Фото першої сторінки національного паспорту {validation.isFieldValid(this.props.person.photo_national_pass_id, "Це поле є обов'язковим")}</label>
                    <PhotoLoader value={this.props.person.photo_national_pass_id} desc={"Фото першої сторінки національного паспорту"}  onRemove={() => this.props.onChange("photo_national_pass_id", "")} onUpdate={(id) => this.props.onChange("photo_national_pass_id", id)} /> 
                </div>   
                <div className="form-group">
                    <label>Фото для акредитації {validation.isFieldValid(this.props.person.accreditation_photo_id, "Це поле є обов'язковим")}</label>
                    <PhotoLoader value={this.props.person.accreditation_photo_id} desc={"Фото для акредитації"}  onRemove={() => this.props.onChange("accreditation_photo_id", "")} onUpdate={(id) => this.props.onChange("accreditation_photo_id", id)} /> 
                </div>
                <div className="form-group">
                    <label>Сертифікат ADEL</label>
                    <PDFLoader 
                        value={this.props.person.certificate_adel}
                        desc='Сертифікат ADEL'
                        onRemove={() => this.props.onChange('certificate_adel', '')}
                        onUpdate={(id) => this.props.onChange('certificate_adel', id)}
                    /> 
                </div>
                </fieldset>
            </form>
        </div>
    }
}
export default PersonalForm;