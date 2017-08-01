import React from "react";
import AgeCategoriesGrid from "./ageCategories-grid";
import Modal from "../../components/modal/modal";
import AgeCategoriesForm from "./ageCategories-form";
import Preloader from "../../components/preloader/preloader";
import * as services from "../services/services";
import Dialog from "../../components/modal/dialog";

class AgeCaegories extends React.Component{
    componentWillMount(){
        this.setState({target: null, loading: false, dialog: null});
        this.onEdit = this.setTarget.bind(this);
        this.onClose = this.removeTarget.bind(this);
        this.onChange = this.changeTargetField.bind(this);
        this.onSave = this.saveTarget.bind(this);
        this.onCreate = this.createTarget.bind(this);
        this.onDelete = this.setDialog.bind(this);
        this.onCancel = this.removeDialog.bind(this);
        this.onConfirm = this.deleteAgeCategory.bind(this);
    }

    setTarget(id){
        this.setState({loading: true});
        services.GetAgeCategoryById({id: id}).then((data) => {
            var target = JSON.parse(data).map(item => {
                return {
                    id: item.id,
                    title: item.title
                }
            });
            this.setState({target: target[0], loading: false});
        })

    }

    saveTarget(){
        var contract = {
            title: this.state.target.title
        };
        if(this.state.target.id){
            contract.id = this.state.target.id;
            this.setState({loading: true});
            services.UpdateAgeCategory(contract).then(() => {
                this.removeTarget();
                this.props.onUpdate();
                this.setState({loading: false});
            });
        }else{
            this.setState({loading: true});
            services.CreateAgeCategory(contract).then(() => {
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
            title: ""
        }})
    }
    
    changeTargetField(fieldName, value){
        var newTarget = this.state.target;
        newTarget[fieldName] = value;
        this.setState({target: newTarget});
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

    deleteAgeCategory(){
        this.setState({loading: true});
        services.DeleteAgeCaegory({id: this.state.dialog.id}).then(() => {
            this.removeDialog();
            this.props.onUpdate();
            this.setState({loading: false});
        })
    }

    render(){
        var grid = (this.props.categories)? <AgeCategoriesGrid data={this.props.categories} onEdit={this.onEdit} onDelete={this.onDelete} /> : null
        return <div>
            <h4>Вікові категорії</h4>
            {grid}
            <div className="form-group">
                <button type="button" className="btn btn-primary" onClick={this.onCreate}><i className="fa fa-plus"></i> Додати категорію</button>
            </div>             
            <Modal target={this.state.target} onClose={this.onClose}>
                <AgeCategoriesForm category={this.state.target} onChange={this.onChange} onSave={this.onSave} />
            </Modal>
            <Dialog dialog={this.state.dialog} onClose={this.onCancel} onConfirm={this.onConfirm} />
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default AgeCaegories;