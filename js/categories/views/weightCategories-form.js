import React from "react";
import * as validation from "../../components/validation/validation";

class WeightCategoryForm extends React.Component{
    render(){
        var required = ["title_w"];
        var catList = this.props.category.ageCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)
        return <div>
            <h4>{(this.props.category.id)? "Редагувати вагову категорію" : "Створити вагову категорію"}</h4>
            <form>
                <div className="form-group">
                    <label>Вагова категорія {validation.isFieldValid(this.props.category.title_w, "Це поле є обов'язковим")}</label>
                    <input type="text" value={this.props.category.title_w} placeholder="до 74,00" className="form-control" onChange={e => this.props.onChange("title_w", e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Вікова категорія</label>
                    <select value={this.props.category.parent} className="form-control" onChange={e => this.props.onChange("parent", e.target.value)}>{catList}</select>
                </div>
                <div className="form-group">
                <div className="form-group">
                    <button type="button" className="btn btn-primary" disabled={validation.isFormValid(this.props.category, required)} onClick={() => this.props.onSave()}>Зберегти</button>    
                </div>                      
                </div>
            </form>
        </div>
    }
}
export default WeightCategoryForm;