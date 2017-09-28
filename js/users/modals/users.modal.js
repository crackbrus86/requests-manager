import React from "react";
import Modal from "../../components/modal/modal";
import moment from "moment";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";
import PhotoLoader from "../../components/photo-loader/photo-loader";
require("../../../css/users.css");
import * as validation from "../../components/validation/validation";

const UserModal = (props) => {
    if(!props.user) return null;
    jQuery(".phone").mask("+38 (999) 999-99-99");
    var user = props.user;
    var fullName = user.lastName + " " + user.firstName + " " + user.mName;
    var born = moment(new Date(user.born)).format("DD-MM-YYYY");
    var regionsList = props.regions.map(r => <option key={r.id} value={r.id}>{r.region}</option>);
    var expireDate = (user.passExpire)? new Date(user.passExpire) : null;
    var required = ["latLastName","latFirstName","passSeria","passNo","iin","phone","email","pnpId","pipId","apId"];
    return (<Modal target={props.user} onClose={props.onClose} className="users-edit-modal">
        <h3>{"Редагувати дані спортсмена"}</h3>
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
                    <label>Область</label>
                    <select value={user.region} className="form-control" onChange={e => props.onChange("region", e.target.value) }>{regionsList}</select>
                </div>
                <div className="form-group">
                    <label>Прізвище як у закордонному{validation.isFieldValid(user.latLastName, "Це поле є обов'язковим")}</label>
                    <input type="text" value={user.latLastName} className="form-control" onChange={e => props.onChange("latLastName", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Ім'я як у закордонному паспорті{validation.isFieldValid(user.latFirstName, "Це поле є обов'язковим")}</label>
                    <input type="text" value={user.latFirstName} className="form-control" onChange={e => props.onChange("latFirstName", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Серія{validation.isFieldValid(user.passSeria, "Введіть серію")} та номер{validation.isFieldValid(user.passNo, "Введіть номер")} закордонного паспорту</label>
                    <div className="row">
                        <div className="col-md-4">
                            <input type="text" value={user.passSeria} className="form-control" onChange={e => props.onChange("passSeria", e.target.value)} />
                        </div>
                        <div className="col-md-8">
                            <input type="text" value={user.passNo} className="form-control" onChange={e => props.onChange("passNo", e.target.value)} />
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
                    <label>Ідентифікаційний номер{validation.isFieldValid(user.iin, "Це поле є обов'язковим")}</label>
                    <input type="text" value={user.iin} className="form-control" onChange={e => props.onChange("iin", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Номер телефону{validation.isFieldValid(user.phone, "Це поле є обов'язковим")}</label>
                    <input type="text" value={user.phone} className="form-control phone" onChange={e => props.onChange("phone", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Електронна адреса{validation.isEmailValid(user.email)}</label>
                    <input type="email" value={user.email} className="form-control" onChange={e => props.onChange("email", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Фото першої сторінки національного паспорту{validation.isFieldValid(user.pnpId, "Це поле є обов'язковим")}</label>
                    <PhotoLoader value={user.pnpId} desc={"Фото першої сторінки національного паспорту"} onRemove={() => props.onChange("pnpId", "")} onUpdate={id => props.onChange("pnpId", id) } />
                </div>
                <div className="form-group">
                    <label>Фото першої сторінки закордонного паспорту{validation.isFieldValid(user.pipId, "Це поле є обов'язковим")}</label>
                    <PhotoLoader value={user.pipId} desc={"Фото першої сторінки закордонного паспорту"} onRemove={() => props.onChange("pipId", "")} onUpdate={id => props.onChange("pipId", id)} />
                </div>
                <div className="form-group">
                    <label>Фото для акредитації{validation.isFieldValid(user.apId, "Це поле є обов'язковим")}</label>
                    <PhotoLoader value={user.apId} desc={"Фото для акредитації"} onRemove={() => props.onChange("apId", "")} onUpdate={id => props.onChange("apId", id)} />
                </div>
            </div>
        </div>
        <div className="form-group text-right">
                <button type="button" className="btn btn-primary footer-update-button" onClick={() => null} disabled={validation.isFormValid(user, required)}>Оновити</button>
                <button type="button" className="btn btn-default" onClick={() => props.onClose()}>Скасувати</button>                
            </div>        
    </Modal>);
}
export default UserModal;