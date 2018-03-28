import React from "react";
require("../../../css/filter.css");

class SharedFilter extends React.Component {
    constructor(props){
        super(props);
        this.handleFilterTextChange = (e) => {
            this.props.onFilterTextChange(e.target.value);
        }
        this.handleFilterRun = () => {
            this.props.onFilterRun();
        }
    }
    render(){
        return (<div className="filter-box">
            <h4>Фільтрувати заявки</h4>
            <form>
                <div className="form-group">
                    <label>Пошук за іменем або прізвищем</label>
                    <input type="text" className="form-control" value={this.props.searchText} onChange={this.handleFilterTextChange} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-info" onClick={this.handleFilterRun}>Фільтрувати</button>
                </div>
            </form>
        </div>);
    }
}
export default SharedFilter;