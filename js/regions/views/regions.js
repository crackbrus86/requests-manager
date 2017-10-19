import React from "react";
import RegionsGrid from "./regions-grid";
import * as services from "../services/services";
import Modal from "../../components/modal/modal";
import RegionForm from "./regions-form";
import Preloader from "../../components/preloader/preloader";
import Dialog from "../../components/modal/dialog";

class RegionsView extends React.Component{
    constructor(props){
        super(props);
        this.onEdit = this.setTarget.bind(this);
        this.onClose = this.removeTarget.bind(this);
        this.onChange = this.changeField.bind(this);
        this.onSave = this.saveTarget.bind(this);
        this.onCreate = this.createTarget.bind(this);
        this.onDelete = this.setDialod.bind(this);
        this.onCancel = this.removeDialog.bind(this);
        this.onConfirm = this.deleteRegion.bind(this);
    }

    setTarget(id){
        this.setState({loading: true});
        services.getRegionById({id: id}).then(data => {
            var target = JSON.parse(data).map(item => {
                return {
                    id: item.id,
                    region: item.region
                }
            });
            this.setState({target: target[0], loading: false});
        });
    }

    changeField(fieldName, value){
        var newTarget = this.state.target;
        newTarget[fieldName] = value;
        this.setState({target: newTarget});
    }

    saveTarget(){
        var contract = {
            region: this.state.target.region
        };
        if(this.state.target.id){
            contract.id = this.state.target.id;
            this.setState({loading: true});
            services.updateRegion(contract).then(() => {
                this.removeTarget();
                this.fetchRegions();
            })
        }else{
            this.setState({loading: true});
            services.createRegion(contract).then(() => {
                this.removeTarget();
                this.fetchRegions();
            })
        }
    }

    createTarget(){
        this.setState({target: {
            region: ""
        }});
    }

    removeTarget(){
        this.setState({target: null});
    }

    setDialod(id){
        this.setState({dialog: {
            text: "Ви впевнені що хочете видалити цю область?",
            id: id
        }})
    }

    removeDialog(){
        this.setState({dialog: null});
    }

    deleteRegion(){
        this.setState({loading: true});
        services.deleteRegion({id: this.state.dialog.id}).then(() => {
            this.removeDialog();
            this.fetchRegions();
        })
    }

    fetchRegions(){
        this.setState({loading: true});
        services.getAllRegions().then(data => {
            this.setState({regions: JSON.parse(data), loading: false});
        })
    }

    componentWillMount(){
        this.setState({regions: [], target: null, loading: false, dialog: null});
        this.fetchRegions();
    }
    render(){
        return <div>
            <h4>Області України</h4>
            <RegionsGrid data={this.state.regions} onEdit={this.onEdit} onDelete={this.onDelete} />
            <div className="form-group">
                <button type="button" className="btn btn-primary" onClick={this.onCreate}><i className="fa fa-plus"></i> Додати область</button>
            </div>                
            <Modal target={this.state.target} onClose={this.onClose}>
                <RegionForm region={this.state.target} onChange={this.onChange} onSave={this.onSave} />
            </Modal>
            <Dialog dialog={this.state.dialog} onClose={this.onCancel} onConfirm={this.onConfirm} />
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default RegionsView;