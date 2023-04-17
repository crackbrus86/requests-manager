import React from "react";
import Datetime from "react-datetime";
require("../../../../css/react-datetime.css");
require("../../../../css/filter.css");
import { getDateValue } from '../../../shared/helpers';

const DlgFilter = (props) => {
    var filter = props.filter;
    var gamesList = filter.games.map(x => <option key={x.id} value={x.id}>{x.name}</option>);
    return(<div className="filter-box">
        <h4>Фільтрувати делегацію</h4>
        <form className="form-inline">
            <div className="form-group">
            <label>Змагання</label>
                <div>
                    <select value={filter.current} className="form-control" onChange={e => props.onChange("current", e.target.value)}>{gamesList}</select>
                </div>
            </div>
            <div className="form-group">
            <label>Рік проведення</label>
                <Datetime 
                    value={filter.year} 
                    dateFormat="YYYY" 
                    timeFormat={false} 
                    closeOnSelect={true} 
                    inputProps={{
                        placeholder: 'рррр'
                    }}
                    onChange={v => props.onChange("year", getDateValue(v, 'YYYY'))} 
                />
            </div>
            <div className="form-group">
                <button type="button"  className="btn btn-info" onClick={() => props.onFilter()}>Фільтрувати</button>                
            </div>
        </form>
    </div>)
}
export default DlgFilter;