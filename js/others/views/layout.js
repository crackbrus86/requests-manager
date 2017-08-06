import React from "react";
import * as services from "../services/services";
import OthersForm from "./others-form";
import Preloader from "../../components/preloader/preloader";

class OthersView extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.changeField.bind(this);
        this.onRefresh = this.loadData.bind(this);
        this.onSave = this.savePresident.bind(this);
    }

    savePresident(){
        var contract = {
            name: this.state.president.name,
            region: this.state.president.region
        }
        if(this.state.president.id) contract.id = this.state.president.id;
        this.setState({loading: true});
        services.savePresident(contract).then(() => {
            this.loadData();
        })
    }

    getRegions(){
        this.setState({loading: true});
        services.getAllRegions().then(data => {
            this.setState({regions: JSON.parse(data)});
            this.setState({loading: false});
        })
    }

    getPresident(){
        this.setState({loading: true});
        services.getPresidentSettings().then(data => {
            this.setState({president: JSON.parse(data)[0], loading: false});
        })
    }

    changeField(fieldName, value){
        var newPresident = this.state.president;
        newPresident[fieldName] = value;
        this.setState({president: newPresident});
    }
    
    loadData(){
        this.getPresident();
        this.getRegions();        
    }
    componentWillMount(){
        this.setState({loading: false});
        this.loadData();
    }

    render(){
        var othersForm = (this.state.president && this.state.regions)? <OthersForm president={this.state.president} regions={this.state.regions} onChange={this.onChange} onSave={this.onSave} /> : null;
        return <div>
            <h4>Голова делегації</h4>
            <div className="form-group">
                <button type="button" className="btn btn-default" onClick={this.onRefresh} ><i className="fa fa-refresh"></i> Оновити</button>
            </div>
            {othersForm}
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default OthersView;