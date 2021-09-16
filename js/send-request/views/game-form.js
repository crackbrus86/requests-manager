import React from "react";
import Modal from "../../components/modal/modal";
import "../../../css/profile.css";

class GameForm extends React.Component{
    constructor(props){
        super(props);
    }

    onChangeExersiseValue(key, value) {
        const strValue = !!value ? value.replace(",", ".") : 0;
        this.props.onChange(key, strValue, "exercises");
    }

    render(){
        if(!this.props.isVisible) return null;
        var ageCatList = (this.props.ageCategories)? this.props.ageCategories.map(item => <option key={item.id} value={item.id}>{item.title}</option>) : null;
        var weightCats = (this.props.weightCategories)? this.props.weightCategories.filter( item => item.parent == this.props.game.ageCat) : null;
        var weightCatList = weightCats.map(item => <option key={item.id} value={item.id}>{item.title_w}</option>);
        var aGamesList = (this.props.actualGames)? this.props.actualGames.map(item => <option key={item.id} value={item.id}>{item.name} ({item.year})</option>) : null;
        var bGamesList = (this.props.beforeGames)? this.props.beforeGames.map(item => <option key={item.id} value={item.id}>{item.name}</option>) : null;
        var type = (this.props.actualGames)? this.props.actualGames.filter(item => item.id === this.props.game.aGame)[0]["type"] : "0";
        var area = this.props.actualGames.length ? this.props.actualGames.filter(x => x.id === this.props.game.aGame)[0]["area"] : null;
        return <div>
            <form>
                <fieldset>
                    <legend>Дані про змагання</legend>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Вікова категорія</label>
                                <select value={this.props.game.ageCat} className="form-control" onChange={e => this.props.onChange("ageCat", e.target.value)}>{ageCatList}</select>
                            </div>
                            <div className="col-md-6">
                                <label>Вагова категорія</label>
                                <select value={this.props.game.weightCat} className="form-control" onChange={e => this.props.onChange("weightCat", e.target.value)}>{weightCatList}</select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Змагання, на які подаєте заявку</label>
                        <select value={this.props.game.aGame} className="form-control" onChange={e => this.props.onChange("aGame", e.target.value)}>{aGamesList}</select>
                    </div>
                    <div className="form-group">
                        <p className="bg-success"><strong>Заявлені результати</strong></p>
                        <div className="row">
                            <div className="col-md-3">
                                <label>Присідання</label>
                                <input value={this.props.game.exercises.squat} type="text" className="form-control" maxLength="6"  placeholder="00.00" disabled={type === "1"} onChange={e => this.onChangeExersiseValue("squat", e.target.value)} />
                            </div>
                            <div className="col-md-3">
                                <label>Жим лежачи</label>
                                <input value={this.props.game.exercises.press} type="text" className="form-control" maxLength="6" placeholder="00.00" onChange={e => this.onChangeExersiseValue("press", e.target.value)} />
                            </div>
                            <div className="col-md-3">
                                <label>Станова тяга</label>
                                <input value={this.props.game.exercises.lift} type="text" className="form-control" maxLength="6" placeholder="00.00" disabled={type === "1"} onChange={e => this.onChangeExersiseValue("lift", e.target.value)} />                                
                            </div>
                            <div className="col-md-3">
                                <label>Сума</label>
                                <input value={this.props.game.exercises.total} type="text" className="form-control" maxLength="6" placeholder="00.00" readOnly={true} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Відбіркові змагання</label>
                        <select value={this.props.game.bGame} className="form-control" onChange={e => this.props.onChange("bGame", e.target.value)}>{bGamesList}</select>
                    </div>
                </fieldset>
            </form>
        </div>
    }
}
export default GameForm;