import React from "react";
import GameGrid from "./competition-grid";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";
import Modal from "../../components/modal/modal";
import GameForm from "./competition-form";
import Dialog from "../../components/modal/dialog";

class Competition extends React.Component{
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
        services.GetCompetition({id: id}).then((data) =>{
            var target = JSON.parse(data).map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    year: item.year,
                    active: item.active
                }
            });
            this.setState({target: target[0], loading: false});
        })
    }

    saveTarget(){
        var contract = {
            name: this.state.target.name,
            type: this.state.target.type,
            year: this.state.target.year,
            active: this.state.target.active
        }
        if(this.state.target.id){
            contract.id = this.state.target.id;
            this.setState({loading: true});
            services.UpdateCompetition(contract).then(() => {
                this.setState({target: null});
                this.fetchGames();
            })
        }else{
            this.setState({loading: true});
            services.CreateCompetition(contract).then(() => {
                this.setState({target: null});
                this.fetchGames();
            })
        }
    }

    createTarget(){
        this.setState({target: {
            name: "",
            type: "0",
            year: null,
            active: "false"
        }})
    }

    removeTarget(){
        this.setState({target: null});
    }

    changeTargetField(fieldName, value){
        var newTarget = this.state.target;
        newTarget[fieldName] = value;
        this.setState({target: newTarget});
    }   
    
    setDialog(id){
        this.setState({dialog: {
            text: "Ви впевнені що хочете видалити це змагання?",
            id: id
        }})
    }

    removeDialog(){
        this.setState({dialog: null});
    }

    deleteGame(){
        this.setState({loading: true});
        services.DeleteCompetition({id: this.state.dialog.id}).then(() => {
            this.removeDialog();
            this.fetchGames();
        })
    }

    fetchGames(){
        services.GetCompetitions().then(data => {
            this.setState({loading: false});
            this.setState({games: JSON.parse(data)});
        })
    }

    componentWillMount(){
        this.setState({loading: true});
        this.fetchGames();
    }

    render(){
        return <div>
            <h4>Змагання, на які подається заявка</h4>
            <GameGrid data={this.state.games} onEdit={this.onEdit} onDelete={this.onDelete} />
            <div className="form-group">
                <button type="button" className="btn btn-primary" onClick={this.onCreate}><i className="fa fa-plus"></i> Додати змагання</button>
            </div>                
            <Modal target={this.state.target} onClose={this.onClose}>
                <GameForm game={this.state.target} onChange={this.onChange} onSave={this.onSave} />
            </Modal>
            <Dialog dialog={this.state.dialog} onClose={this.onCancel} onConfirm={this.onConfirm} />
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default Competition;