import React from "react";
import Datetime from "react-datetime";
import moment from "moment";
require("../../../../css/react-datetime.css");
require("../../../../css/filter.css");

const Filter = (props) => {
    var gameList = props.filter.games.map(game => <option key={game.id} value={game.id}>{game.name}</option>)
    return (<div className="filter-box">
        <h4>Фільтрувати заявки</h4>
        <form className="form-inline">
            <div className="form-group">
                <label>Змагання</label>
                <div>
                    <select value={props.filter.currentGame} className="form-control" onChange={e => props.onChange("currentGame", e.target.value)}>{gameList}</select>
                </div>
            </div>
            <div className="form-group">
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