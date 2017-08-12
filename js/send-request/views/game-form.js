import React from "react";

class GameForm extends React.Component{
    render(){
        if(!this.props.isVisible) return null;
        var ageCatList = (this.props.ageCategories)? this.props.ageCategories.map(item => <option key={item.id} value={item.id}>{item.title}</option>) : null;
        var weightCats = (this.props.weightCategories)? this.props.weightCategories.filter( item => item.parent == this.props.game.ageCat) : null;
        var weightCatList = weightCats.map(item => <option key={item.id} value={item.id}>{item.title_w}</option>);
        var aGamesList = (this.props.actualGames)? this.props.actualGames.map(item => <option key={item.id} value={item.id}>{item.name}</option>) : null;
        var type = (this.props.actualGames)? this.props.actualGames.filter(item => item.id === this.props.game.aGame)[0]["type"] : "0";
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
                                <input type="text" className="form-control" maxLength="6"  placeholder="00.00" disabled={type === "1"}/>
                            </div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    }
}
export default GameForm;