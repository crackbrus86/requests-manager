import React from "react";
import WeightCategoriesGrid from "./weightCategories-grid";
import Modal from "../../components/modal/modal";
import WeightCategoryForm from "./weightCategories-form";
import Preloader from "../../components/preloader/preloader";
import * as services from "../services/services";
import Dialog from "../../components/modal/dialog";

class WeightCategories extends React.Component{
    componentWillMount(){
        this.setState({target: null, loading: false, dialog: null});
        this.onEdit = this.setTarget.bind(this);
        this.onClose = this.removeTarget.bind(this);
        this.onChange = this.changeTargetField.bind(this);
        this.onSave = this.saveTarget.bind(this);
        this.onCreate = this.createTarget.bind(this);
        this.onDelete = this.setDialog.bind(this);
        this.onCancel = this.removeDialog.bind(this);
        this.onConfirm = this.deleteWeightCategory.bind(this);
    }

    setTarget(id){
        this.setState({loading: true});
        services.GetWeightCategoryById({id: id}).then((data) => {
            var target = JSON.parse(data).map(item => {
                return {
                    id: item.id,
                    parent: item.parent,
                    title_w: item.title_w,
                }
            });
            target[0].ageCategories = this.props.ageCategories;
            this.setState({target: target[0], loading: false});
        });        
    }

    saveTarget(){
        var contract = {
            title: this.state.target.title_w,
            parent: this.state.target.parent
        }
        if(this.state.target.id){
            contract.id = this.state.target.id;
            this.setState({loading: true});
            services.UpdateWeightCategory(contract).then(() => {
                this.removeTarget();
                this.props.onUpdate();
                this.setState({loading: false});
            })
        }else{
            this.setState({loading: true});
            services.CreateWeightCategory(contract).then(() => {
                this.removeTarget();
                this.props.onUpdate();
                this.setState({loading: false});                
            })
        }
    }

    removeTarget(){
        this.setState({target: null});
    }  
    
    createTarget(){
        this.setState({target: {
            title_w: "",
            parent: this.props.ageCategories[0].id,
            ageCategories: this.props.ageCategories
        }})
    }
    
    changeTargetField(fieldName, value){
        var newTarget = this.state.target;
        newTarget[fieldName] = value;
        this.setState({target: newTarget});
        console.log(this.state);
    }    

    setDialog(id){
        this.setState({dialog: {
            text: "Ви впевнені що хочете видалити цю категорію?",
            id: id
        }})
    }

    removeDialog(){
        this.setState({dialog: null});
    }

    deleteWeightCategory(){
        this.setState({loading: true});
        services.DeleteWeightCategory({id: this.state.dialog.id}).then(() => {
            this.removeDialog();
            this.props.onUpdate();
            this.setState({loading: false});
        })
    }

    render(){
        var grid = (this.props.categories)? <WeightCategoriesGrid data={this.props.categories} onEdit={this.onEdit} onDelete={this.onDelete} /> : null;
        return <div>
            <h4>Вагові категорії</h4>
            {grid}
            <div className="form-group">
                <button type="button" className="btn btn-primary" onClick={this.onCreate}><i className="fa fa-plus"></i> Додати категорію</button>
            </div>            
            <Modal target={this.state.target} onClose={this.onClose}>
                <WeightCategoryForm category={this.state.target} onChange={this.onChange} onSave={this.onSave} />
            </Modal>
            <Dialog dialog={this.state.dialog} onConfirm={this.onConfirm} onClose={this.onCancel} />
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default WeightCategories;