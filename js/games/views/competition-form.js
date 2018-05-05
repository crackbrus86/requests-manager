import React from "react";
import moment from "moment";
import * as validation from "../../components/validation/validation";

class GameForm extends React.Component{  
    render(){
        var required = ["name", "type", "year"];
        var types = [{id: 0, title: "пауерліфтинг"}, {id: 1, title: "жим лежачи"}];
        var typesList = types.map(type => <option key={type.id} value={type.id}>{type.title}</option>);
        var year = (this.props.game.year) ? this.props.game.year : "";
        var expiration = (this.props.game.expireDay)? new Date(this.props.game.expireDay) : null;
        var active = (JSON.parse(this.props.game.active))?true:false;
        var area = this.props.game.area || "euro";
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
                    <label>Ранг змагань</label>
                    <select value={area} className="form-control" onChange={(e) => this.props.onChange("area", e.target.value)}>
                        <option key="1" value="euro">Європейські</option>
                        <option key="2" value="world">Світові</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Рік проведення {validation.isFieldValid(this.props.game.year, "Це поле є обов'язковим")}</label>
                    <input type="number" value={year} className="form-control" placeholder="рік проведення" onChange={(e) => this.props.onChange("year", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Статус</label>
                    <div><input type="checkbox" checked={active} onChange={e => this.props.onChange("active", e.target.checked)} /></div>
                </div> 
                <div className="form-group">
                    <button type="button" className="btn btn-primary" disabled={validation.isFormValid(this.props.game, required)} onClick={() => this.props.onSave()}>Зберегти</button>    
                </div>                                
            </form>
        </div>
    }
}
export default GameForm;