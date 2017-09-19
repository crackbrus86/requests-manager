import React from "react";
import Modal from "../../components/modal/modal";
import moment from "moment";

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
    return (<Modal target={props.target} onClose={props.onClose} className="request-edit-modal">
        <h4>{"Редагувати заявку"}</h4>
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
                            <label>Присідання</label>
                            <input value={request.results.squat} type="text" className="form-control" placeholder="00.00" disabled={type === "1"} onChange={e => props.onChange("squat", e.target.value, "results")} />
                        </div>
                        <div className="col-md-3">
                            <label>Жим лежачи</label>
                            <input value={request.results.press} type="text" className="form-control" placeholder="00.00" onChange={e => props.onChange("press", e.target.value, "results")} />
                        </div>
                        <div className="col-md-3">
                            <label>Станова тяга</label>
                            <input value={request.results.lift} type="text" className="form-control" placeholder="00.00" disabled={type === "1"} onChange={e => props.onChange("lift", e.target.value, "results")} />                                
                        </div>
                        <div className="col-md-3">
                            <label>Сума</label>
                            <input value={total} type="text" className="form-control" placeholder="00.00" readOnly={true} />
                        </div>
                    </div>
                </div>                
            </div>
            </form>
        </div>
    </Modal>);
}
export default ReqModal;