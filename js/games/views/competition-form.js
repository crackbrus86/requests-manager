import React from "react";
import moment from "moment";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";
import * as validation from "../../components/validation/validation";

class GameForm extends React.Component{  
    render(){
        var required = ["name", "type", "year", "expireDay"];
        var types = [{id: 0, title: "пауерліфтинг"}, {id: 1, title: "жим лежачи"}];
        var typesList = types.map(type => <option key={type.id} value={type.id}>{type.title}</option>);
        var year = (this.props.game.year) ? this.props.game.year : "";
        var expiration = (this.props.game.expireDay)? new Date(this.props.game.expireDay) : null;
        return <div>
            <h4>{ (this.props.game.id)? "Редагувати змагання" : "Створити змагання" }</h4>
            <form>
                <div className="form-group">
                    <label>Назва змагань {validation.isFieldValid(this.props.game.name, "Це поле є обов'язковим")}</label>
                    <input type="text" value={this.props.game.name} placeholder="Чемпіонат Європи з пауерліфтингу" className="form-control" onChange={(e) => this.props.onChange("name", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Тип змагань</label>
                    <select value={this.props.game.type} className="form-control" onChange={(e) => this.props.onChange("type", e.target.value)}>{typesList}</select>
                </div> 
                <div className="form-group">
                    <label>Рік проведення {validation.isFieldValid(this.props.game.year, "Це поле є обов'язковим")}</label>
                    <input type="number" value={year} className="form-control" placeholder="рік проведення" onChange={(e) => this.props.onChange("year", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Крайній день подачі заявки  {validation.isFieldValid(this.props.game.expireDay, "Це поле є обов'язковим")}</label>
                    <Datetime value={expiration} dateFormat="DD-MM-YYYY" timeFormat={false} onChange={(v) => this.props.onChange("expireDay", v.format("YYYY-MM-DD"))} closeOnSelect={true} />
                </div> 
                <div className="form-group">
                    <button type="button" className="btn btn-primary" disabled={validation.isFormValid(this.props.game, required)} onClick={() => this.props.onSave()}>Зберегти</button>    
                </div>                                
            </form>
        </div>
    }
}
export default GameForm;