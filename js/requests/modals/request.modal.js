import React from "react";
import Modal from "../../components/modal/modal";
import moment from "moment";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";
import "../../../css/profile.css";
import { getDateValue } from '../../shared/helpers';

const ReqModal = (props) => {
    if(!props.target) return null;
    var request = props.target;
    var fullName = request.surname + " " + request.name + " " + request.mName;
    var region = props.regions.filter(r => r.id === request.region)[0].region;
    var born = moment(new Date(request.born)).format("DD-MM-YYYY");
    var agesList = props.ages.map(a => <option key={a.id} value={a.id}>{a.title}</option>);
    var weights = props.weights.filter(w => w.parent == request.age);
    var weightsList = weights.map(w => <option key={w.id} value={w.id}>{w.title_w}</option>);
    weightsList.unshift(<option key={0} value={0}>{""}</option>);
    var weight = (weights.filter(w => w.id === request.weight).length)? request.weight : 0;
    var gamesList = props.games.map(g => <option key={g.id} value={g.id}>{g.name}</option>); 
    var total = parseFloat(request.results.squat) + parseFloat(request.results.press) + parseFloat(request.results.lift);
    var type = props.games.filter(g => g.id === request.game)[0].type;
    var preGamesList = props.preGames.map(g => <option key={g.id} value={g.id}>{g.name}</option>);
    var dopingDate = (request.doping.date)? new Date(request.doping.date) : null;
    var getCoachStatus = (id) => {
        var coaches = request.coaches;
        for(var i = 0; i < coaches.length; i++){
            if(parseInt(coaches[i][0]) === parseInt(id) && JSON.parse(coaches[i][1])) return "(супроводжує)";
        }
        return "";
    }
    var coachesList = (request.coach_details)? request.coach_details.map(c => <li key={c.id} value={c.id}>{c.surname + " " + c.name + " " + c.mName + " " + getCoachStatus(c.id)}
        <i className="fa fa-lg fa-times" onClick={() => props.onCoachDelete(c.id)}></i></li>) : null;

    
    var allCoaches = props.coaches.map(c => <option key={c.id} value={c.id}>{c.surname + " " + c.name + " " + c.mName}</option>);
    var area = props.games.filter(x => x.id == request.game)[0].area;

    const onChangeExersiseValue = (field, value) => {
        const strValue = !!value ? value.replace(",", ".") : 0;
        props.onChange(field, strValue, "results")
    }
    return (<div>
        <Modal target={props.target} onClose={props.onClose} className="request-edit-modal">
        <h3>{"Редагувати заявку"}</h3>
        <div className="row">
            <form>
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
                    <input type="text" value={region} className="form-control" readOnly={true} />
                </div>  
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Вікова категорія</label>
                            <select value={request.age} className="form-control" onChange={e => props.onChange("age", e.target.value)} >{agesList}</select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Вагова категорія</label>
                            <select value={weight} className="form-control" onChange={e => props.onChange("weight", e.target.value)} >{weightsList}</select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Змагання, на які подається заявка</label>
                    <select value={request.game} className="form-control" onChange={e => props.onChange("game", e.target.value)} >{gamesList}</select>
                </div>                             
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <p className="bg-success"><strong>Заявлені результати</strong></p>
                    <div className="row">
                        <div className="col-md-3">
                            <label>Присід.</label>
                            <input value={request.results.squat} type="text" className="form-control" placeholder="00.00" disabled={type === "1"} onChange={e => onChangeExersiseValue("squat", e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label>Жим</label>
                            <input value={request.results.press} type="text" className="form-control" placeholder="00.00" onChange={e => onChangeExersiseValue("press", e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label>Тяга</label>
                            <input value={request.results.lift} type="text" className="form-control" placeholder="00.00" disabled={type === "1"} onChange={e => onChangeExersiseValue("lift", e.target.value)} />                                
                        </div>
                        <div className="col-md-3">
                            <label>Сума</label>
                            <input value={total} type="text" className="form-control" placeholder="00.00" readOnly={true} />
                        </div>
                    </div>
                </div>  
                <div className="form-group">
                    <label>Відбіркові змагання</label>
                    <select value={request.pregame} className="form-control" onChange={e => props.onChange("pregame", e.target.value)}>{preGamesList}</select>
                </div>  
                <div className="form-group">
                    <div><label>Чи здавав допінг-контроль?</label></div>
                    <label className="radio-inline">
                        <input type="radio" value="false" checked={!JSON.parse(request.doping.isPassed)} onChange={e => props.onChange("isPassed", e.target.value, "doping")} /> Ні
                    </label>
                    <label className="radio-inline">
                        <input type="radio" value="true" checked={JSON.parse(request.doping.isPassed)} onChange={e => props.onChange("isPassed", e.target.value, "doping")} /> Так
                    </label>
                </div>  
                <div className="form-group" hidden={!JSON.parse(request.doping.isPassed)}>
                    <Datetime 
                        value={dopingDate} 
                        dateFormat="DD-MM-YYYY" 
                        inputProps={{
                            placeholder: 'дд-мм-рррр'
                        }}
                        timeFormat={false} 
                        closeOnSelect={true} 
                        maxLength="10" 
                        onChange={(v) => props.onChange("date", getDateValue(v), "doping")} 
                    />
                </div>
            </div>
            </form>
        </div>
        <div className="coachesList" hidden={!request.coaches.length}>
                <h4>Тренери</h4>
                <ul>
                    {coachesList}
                </ul>
        </div>
        <div className="coachAddForm">
        <span onClick={() => props.onTcChange("hide", !props.tmpCoach.hide)} className="addCoach">Додати тренера</span>
                <div hidden={props.tmpCoach.hide}>
                    <div className="form-group">
                        <label>Оберіть тренера</label>
                        <select value={props.tmpCoach.id} className="form-control" onChange={e => props.onTcChange("id", e.target.value)}>{allCoaches}</select>
                    </div>
                    <div className="form-group">
                        <label>Чи супроводжує на змагання</label>
                        <div><input type="checkbox" checked={props.tmpCoach.follows} onChange={e => props.onTcChange("follows", e.target.checked)} /></div>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-default" onClick={() => props.onAdd()}><i className="fa fa-plus"></i> Додати тренера</button>
                    </div>
                </div>
        </div>        
        <div className="form-group text-right">
            <button type="button" className="btn btn-primary footer-update-button" onClick={() => props.onUpdate()}>Оновити</button>
            <button type="button" className="btn btn-default" onClick={() => props.onClose()}>Скасувати</button>
        </div>        
    </Modal>
    </div>);
}
export default ReqModal;