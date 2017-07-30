import React from "react";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";

class GameForm extends React.Component{  
    render(){
        var types = [{id: 0, title: "пауерліфтинг"}, {id: 1, title: "жим лежачи"}];
        var typesList = types.map(type => <option key={type.id} value={type.id}>{type.title}</option>);
        var year = (this.props.game.year) ? this.props.game.year : (new Date()).getFullYear();
        var expiration = (this.props.game.expireDay)? this.props.game.expireDay : new Date();
        return <div>
            <h4>{ (this.props.game.id)? "Редагувати змагання" : "Створити змагання" }</h4>
            <form>
                <div className="form-group">
                    <label>Назва змагань</label>
                    <input type="text" value={this.props.game.name} placeholder="Чемпіонат Європи з пауерліфтингу" className="form-control" onChange={(e) => this.props.onChange("name", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Тип змагань</label>
                    <select value={this.props.game.type} className="form-control" onChange={(e) => this.props.onChange("type", e.target.value)}>{typesList}</select>
                </div> 
                <div className="form-group">
                    <label>Рік проведення</label>
                    <input type="number" value={year} className="form-control" onChange={(e) => this.props.onChange("year", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Крайній день подачі заявки</label>
                    <Datetime value={expiration} dateFormat="DD-MM-YYYY" timeFormat={false} onChange={(e) => this.props.onChange("expireDay", e.target.value)} />
                </div>                
            </form>
        </div>
    }
}
export default GameForm;