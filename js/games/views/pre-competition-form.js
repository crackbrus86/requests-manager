import React from "react";
import * as validation from "../../components/validation/validation";

class PreGamesForm extends React.Component{
    render(){
        var required = ["name", "type"];
        var types = [{id: 0, title: "пауерліфтинг"}, {id: 1, title: "жим лежачи"}];
        var typesList = types.map(type => <option key={type.id} value={type.id}>{type.title}</option>)
        return <div>
            <h4>{ (this.props.game.id)? "Редагувати змагання" : "Створити змагання" }</h4>
            <form>
                <div className="form-group">
                    <label>Назва змагань {validation.isFieldValid(this.props.game.name, "Це поле є обов'язковим")}</label>
                    <input type="text" value={this.props.game.name} placeholder="Кубок України" className="form-control" onChange={(e) => this.props.onChange("name", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Тип змагань</label>
                    <select value={this.props.game.type} className="form-control" onChange={(e) => this.props.onChange("type", e.target.value)}>{typesList}</select>
                </div>  
                <div className="form-group">
                    <button type="button" className="btn btn-primary" disabled={validation.isFormValid(this.props.game, required)} onClick={() => this.props.onSave()}>Зберегти</button>    
                </div>              
            </form>
        </div>
    }
}
export default PreGamesForm;