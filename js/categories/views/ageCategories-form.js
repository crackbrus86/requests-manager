import React from "react";
import * as validation from "../../components/validation/validation";

class AgeCategoriesForm extends React.Component{
    render(){
        var required = ["title"];
        return <div>
            <h4>{(this.props.category.id)? "Редагувати вікову категорію" : "Створити вікову категорію"}</h4>
            <form>
                <div className="form-group">
                    <label>Вікова категорія {validation.isFieldValid(this.props.category.title, "Це поле є обов'язковим")}</label>
                    <input type="text" value={this.props.category.title} placeholder="Юніори" className="form-control" onChange={(e) => this.props.onChange("title", e.target.value)} />
                </div> 
                <div className="form-group">
                    <button type="button" className="btn btn-primary" disabled={validation.isFormValid(this.props.category, required)} onClick={() => this.props.onSave()}>Зберегти</button>    
                </div>                                 
            </form>
        </div>
    }
}
export default AgeCategoriesForm;