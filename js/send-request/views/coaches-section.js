import React from "react";
require("../../../css/coaches-section.css");

class CoachesSection extends React.Component{
    render(){
        if(!this.props.isVisible) return null;
        var coachesControl = (this.props.hasCoach === "true")? <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.props.openCoachModal}><i className="fa fa-plus"></i> Додати тренера</button>
        </div> : null;
        var coachList = this.props.coaches.map((item, index) => <li key={index}><a href="#" onClick={e => this.props.editCoach(e, index)} >{item.firstName} {item.lastName}</a><i className="fa fa-lg fa-times" onClick={() => this.props.removeCoach(index)}></i></li>)
        return <div>
            <fieldset>
                <legend>Дані тренера</legend>
                <div className="form-group">
                    <label className="radio-inline">
                        <input type="radio" value="false" checked={this.props.hasCoach === "false"} onChange={e => this.props.onChange(e.target.value)} /> Індивідуально
                    </label>
                    <label className="radio-inline">
                        <input type="radio" value="true" checked={this.props.hasCoach === "true"} onChange={e => this.props.onChange(e.target.value)} /> Тренер
                    </label>                    
                </div>
                <ul className="coaches-section">
                    {coachList}
                </ul>
                {coachesControl}
            </fieldset>
        </div>
    }
}
export default CoachesSection;