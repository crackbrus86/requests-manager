import React from "react";
import Datetime from "react-datetime";
import moment from "moment";
require("../../../../css/react-datetime.css");
require("../../../../css/filter.css");

const NomFilter = (props) => {
    var filter = props.filter;
    var gamesList = filter.games.map(x => <option key={x.id} value={x.id}>{x.name}</option>);
    return(<div className="filter-box">
        <h4>Фільтрувати номінації</h4>
        <form className="form-inline">
            <div className="form-group">
                <label>Змагання</label>
                <div>
                    <select value={filter.currentGame} className="form-control" onChange={e => props.onChange("currentGame", e.target.value)}>{gamesList}</select>
                </div>
            </div>
            <div className="form-group">
                <label>Рік проведення</label>
                <Datetime value={filter.year} dateFormat="YYYY" timeFormat={false} closeOnSelect={true} onChange={v => props.onChange("year", v.format("YYYY"))} />
            </div>
            <div className="form-group">
                <button type="button"  className="btn btn-info" onClick={() => props.onFilter()}>Фільтрувати</button>
            </div>
        </form>
    </div>)
}
export default NomFilter;