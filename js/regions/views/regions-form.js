import React from "react";
import * as validation from "../../components/validation/validation";

class RegionForm extends React.Component{
    render(){
        var required = ["region"];
        return <div>
            <h4>{ (this.props.region.id)? "Редагувати область" : "Додати область" }</h4>
            <form>
                <div className="form-group">
                    <label>Область {validation.isFieldValid(this.props.region.region, "Це поле є обов'язковим")}</label>
                    <input type="text" value={this.props.region.region} placeholder="Хмельницька область" className="form-control" onChange={e => this.props.onChange("region", e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" disabled={validation.isFormValid(this.props.region, required)} onClick={() => this.props.onSave()}>Зберегти</button>
                </div>
            </form>
        </div>
    }
}
export default RegionForm;