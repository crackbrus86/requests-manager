import React from "react";
import Modal from "../../components/modal/modal";
import moment from "moment";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";
import PhotoLoader from "../../components/photo-loader/photo-loader";
import * as validation from "../../components/validation/validation";

const CoachModal = (props) => {
    if(!props.coach) return null;
    jQuery(".phone").mask("+38 (999) 999-99-99");
    var coach = props.coach;
    var fullName = coach.surname + " " + coach.name + " " + coach.mName;
    var born = moment(new Date(coach.born)).format("DD-MM-YYYY");
    var regionsList = props.regions.map(r => <option key={r.id} value={r.id}>{r.region}</option>);
    var expireDate = (coach.passExpire)? new Date(coach.passExpire):null;
    var required = ["latSurname", "latFirstName", "region", "passSeria", "passNo", "iin", "phone", "email", "pnpId", "pipId", "apId"];
    return(<Modal target={props.coach} onClose={props.onClose} className="coaches-edit-modal">
        <h3>{"Редагувати дані тренера"}</h3>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>П.І.П.</label>
                    <input type="text" value={fullName} className="form-control" readOnly={true} />
                </div>
                <div className="form-group">
                    <label>Дата народження</label>
                    <input type="text" value={born} className="form-control" readOnly={true} />
                </div>
                <div className="form-group">
                    <label>Область{validation.isFieldValid(parseInt(coach.region), "Це поле є обов'язковим")}</label>
                    <select value={coach.region} className="form-control" onChange={e => props.onChange("region", e.target.value)}>
                        <option key={0} value={0}>-не обрано</option>
                        {regionsList}
                    </select>
                </div>
                <div className="form-group">
                    <label>Прізвище як у закордонному паспорті{validation.isFieldValid(coach.latSurname, "Це поле є обов'язковим")}</label>
                    <input type="text" value={coach.latSurname} className="form-control" onChange={e => props.onChange("latSurname", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Ім'я як у закордонному паспорті{validation.isFieldValid(coach.latFirstName, "Це поле є обов'язковим")}</label>
                    <input type="text" value={coach.latFirstName} className="form-control" onChange={e => props.onChange("latFirstName", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Серія{validation.isFieldValid(coach.passSeria, "Введіть серію")} та номер{validation.isFieldValid(coach.passNo, "Введіть номер")} закордонного паспорту</label>
                    <div className="row">
                        <div className="col-md-4">
                            <input type="text" value={coach.passSeria} className="form-control" onChange={e => props.onChange("passSeria", e.target.value)} />
                        </div>
                        <div className="col-md-8">
                            <input type="text" value={coach.passNo} className="form-control" onChange={e => props.onChange("passNo", e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Термін дії закордонного паспорту</label>
                    <Datetime value={expireDate} dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true} maxLength="10" onChange={(v) => props.onChange("passExpire", v.format("YYYY-MM-DD"))} />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Ідентифікаційний номер{validation.isFieldValid(coach.iin, "Це поле є обов'язковим")}</label>
                    <input type="text" value={coach.iin} className="form-control" onChange={e => props.onChange("iin", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Номер телефону{validation.isFieldValid(coach.phone, "Це поле є обов'язковим")}</label>
                    <input type="text" value={coach.phone} className="form-control phone" onChange={e => props.onChange("phone", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Електронна адреса{validation.isEmailValid(coach.email)}</label>
                    <input type="email" value={coach.email} className="form-control" onChange={e => props.onChange("email", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Фото першої сторінки національного паспорту{validation.isFieldValid(coach.pnpId, "Це поле є обов'язковим")}</label>
                    <PhotoLoader value={coach.pnpId} desc={"Фото першої сторінки національного паспорту"} onRemove={e => props.onChange("pnpId", "")} onUpdate={id => props.onChange("pnpId", id)} />
                </div>
                <div className="form-group">
                    <label>Фото першої сторінки закордонного паспорту{validation.isFieldValid(coach.pipId, "Це поле є обов'язковим")}</label>
                    <PhotoLoader value={coach.pipId} desc={"Фото першої сторінки закордонного паспорту"} onRemove={e => props.onChange("pipId", "")} onUpdate={id => props.onChange("pipId", id)} />
                </div>
                <div className="form-group">
                    <label>Фото для акредитації{validation.isFieldValid(coach.apId, "Це поле є обов'язковим")}</label>
                    <PhotoLoader value={coach.apId} desc={"Фото для акредитації"} onRemove={e => props.onChange("apId", "")} onUpdate={id => props.onChange("apId", id)} />
                </div>                                
            </div>
        </div>
        <div className="form-group text-right">
            <button type="button" className="btn btn-primary footer-update-button" onClick={() => props.onUpdate()} disabled={validation.isFormValid(coach, required)}>Оновити</button>
            <button type="button" className="btn btn-default" onClick={() => props.onClose()}>Скасувати</button>  
        </div>
    </Modal>);
}
export default CoachModal;