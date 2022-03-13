import React from "react";
require("../../../css/coaches-section.css");

class CoachesSection extends React.Component {
    render() {
        if (!this.props.isVisible) return null;
        return this.props.isVisible && (<div>
            <fieldset>
                <legend>Дані тренера</legend>
                {
                    !this.props.coaches.length &&
                    <i className="invalid">*<sub>Потрібно додати тренера</sub></i>
                }
                <ul className="coaches-section">
                    {
                        this.props.coaches.map((item, index) => <li key={index}>
                            <a
                                href="#"
                                onClick={e => this.props.editCoach(e, index)}
                            >
                                {`${item.firstName} ${item.lastName}`}
                            </a>
                            <i className="fa fa-lg fa-times" onClick={() => this.props.removeCoach(index)}></i>
                        </li>)
                    }
                </ul>
                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.props.openCoachModal}
                    >
                        <i className="fa fa-plus"></i> Додати тренера
                    </button>
                </div>
            </fieldset>
        </div>)
    }
}
export default CoachesSection;