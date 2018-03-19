import React from "react";
import Datetime from "react-datetime";
import moment from "moment";
require("../../../../css/react-datetime.css");
require("../../../../css/filter.css");

const Filter = (props) => {
    var gameList = props.filter.games.map(game => <option key={game.id} value={game.id}>{game.name}</option>)
    var filterGames = props.filterGames.map((fg, index) => 
        <div key={index}>
            <p className="game-in-filter">{fg.name}
            <i className="fa fa-close" onClick={() => props.removeFromFilter(fg)}></i></p>
        </div>)
    var currentGame = parseInt(props.filter.currentGame)? props.filter.currentGame : 0;
    return (<div className="filter-box">
        <h4>Фільтрувати заявки</h4>
        <form>
            <fieldset>
                <legend>Фільтр по змаганням</legend>
            <div>
                {filterGames}
            </div>
            <div className="form-group">
                <label>Змагання</label>
                <div>
                    <select value={currentGame} className="form-control" onChange={e => props.onChange("currentGame", e.target.value)}>
                    <option value={0}></option>
                    {gameList}
                    </select>
                </div>
            </div>
            <div className="form-group">
                <button type="button" className="btn btn-link" onClick={e => props.addToFilter()} disabled={!currentGame}>+ Додати змагання</button>
            </div>
            </fieldset>
            <div className="form-group year-filter">
                <label>Рік проведення</label>
                <Datetime value={props.filter.year} dateFormat="YYYY" timeFormat={false} closeOnSelect={true} onChange={(v) => props.onChange("year", v.format("YYYY"))} />
            </div>
            <div className="form-group">
                <button type="button" className="btn btn-info" onClick={() => props.onFilter()}>Фільтрувати</button>
            </div>
        </form>
    </div>)
}
export default Filter;