import React from "react";
import GameGrid from "./competition-grid";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";
import Modal from "../../components/modal/modal";
import GameForm from "./competition-form";

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
                    expireDay: item.expire_day
                }
            });
            this.setState({target: target[0], loading: false});
        })
    }

    removeTarget(){
        this.setState({target: null});
    }

    changeTargetField(fieldName, value){
        var newTarget = this.state.target;
        newTarget[fieldName] = value;
        this.setState({target: newTarget});
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
            <GameGrid data={this.state.games} onEdit={this.onEdit} onDelete={() => null} />
            <Modal target={this.state.target} onClose={this.onClose}>
                <GameForm game={this.state.target} onChange={this.onChange} />
            </Modal>
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default Competition;