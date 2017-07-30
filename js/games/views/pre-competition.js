import React from "react";
import PreGameGrid from "./pre-competition-grid";
import * as services from "../services/services";
import Modal from "../../components/modal/modal";
import PreGamesForm from "./pre-competition-form";
import Preloader from "../../components/preloader/preloader";
import Dialog from "../../components/modal/dialog";

class PreCompetition extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            games: [],
            target: null,
            loading: false,
            dialog: null
        }
        this.onEdit = this.setTarget.bind(this);
        this.onClose = this.removeTarget.bind(this);
        this.onChange = this.changeTargetField.bind(this);
        this.onSave = this.saveTarget.bind(this);
        this.onCreate = this.createTarget.bind(this);
        this.onDelete = this.setDialog.bind(this);
        this.onCancel = this.removeDialog.bind(this);
        this.onConfirm = this.deleteGame.bind(this);
    }

    setTarget(id){
        this.setState({loading: true});
        services.GetPreCompetition({id: id}).then(data => {
            var target = JSON.parse(data).map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    type: item.type
                }
            });
            this.setState({target: target[0], loading: false});
        });
    }

    changeTargetField(fieldName, value){
        var newTarget = this.state.target;
        newTarget[fieldName] = value;
        this.setState({target: newTarget});
    }

    createTarget(){
        this.setState({target: {
            name: "",
            type: "0"
        }})
    }

    saveTarget(){
        var contract = {
            name: this.state.target.name,
            type: this.state.target.type
        };
        if(this.state.target.id){
            contract.id = this.state.target.id;
            this.setState({loading: true});
            services.UpdatePreCompetition(contract).then(() => {
                this.setState({target: null});
                this.fetchGames();
            });
        }else{
            this.setState({loading: true});
            services.CreatePreCompetition(contract).then(() => {
                this.setState({target: null});
                this.fetchGames();
            })
        }
    }

    setDialog(id){
        this.setState({dialog: {
            text: "Ви впевнені що хочете видалити це змаганя?",
            id: id
        }})
    }

    removeDialog(){
        this.setState({dialog: null});
    }

    deleteGame(){
        this.setState({loading: true});
        services.DeletePreCompetition({id: this.state.dialog.id}).then(() => {
            this.setState({dialog: null});
            this.fetchGames();
        });
    }

    fetchGames(){
        services.GetPreCompetitions().then(data => {
            this.setState({games: JSON.parse(data), loading: false});
        });  
    }

    removeTarget(){
        this.setState({target:null});
    }

    componentWillMount(){
        this.setState({loading: true});
        this.fetchGames();
    }    
    render(){
        return <div>
            <h4>Відбіркові змагання</h4>
            <PreGameGrid data={this.state.games} onEdit={this.onEdit} onDelete={this.onDelete} />
            <div className="form-group">
                <button type="button" className="btn btn-primary" onClick={this.onCreate}><i className="fa fa-plus"></i> Додати змагання</button>
            </div>
            <Modal target={this.state.target} onClose={this.onClose}>
                <PreGamesForm game={this.state.target} onChange={this.onChange} onSave={this.onSave} />
            </Modal>
            <Dialog dialog={this.state.dialog} onClose={this.onCancel} onConfirm={this.onConfirm} />
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default PreCompetition;