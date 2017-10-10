import React from "react";
import NomFilter from "./partial/nominations.filter";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";

class NomApp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            filter: {
                games: [],
                year: new Date(),
                currentGame: {}
            },
            isLoading: false
        }
        this.onFilterChange = this.changeFilter.bind(this);
        this.onRunFilter = this.getNominations.bind(this);
    }

    changeFilter(field, value){
        var newFilter = this.state.filter;
        newFilter[field] = value;
        this.setState({filter: newFilter});      
    }

    getGames(){
        this.setState({isLoading: true});
        services.getGames().then(data => {
            this.setState({isLoading: false});
            this.changeFilter("games", JSON.parse(data));
        })
    }

    getNominations(){
        this.setState({isLoading: true});
        var filter = this.state.filter;
        services.getNominations({
            game: (filter.currentGame.length)? filter.currentGame : filter.games[0].id,
            year: (new Date(filter.year)).getFullYear()
        }).then(data => {
            this.setState({isLoading: false});
            console.log(JSON.parse(data));
        })
    }

    componentDidMount(){
        this.getGames();
    }

    render(){
        return <div className="row">
            <div className="col-md-12">
                <h4>Номінації</h4>
                <div className="row">
                    <div className="col-md-10">
                        <NomFilter filter={this.state.filter} onChange={this.onFilterChange} onFilter={this.onRunFilter} />
                    </div>
                    <div className="col-md-2">

                    </div>
                </div>
                <Preloader loading={this.state.isLoading} />
            </div>
        </div>
    }
}
export default NomApp;