import React from "react";
import NomFilter from "./partial/nominations.filter";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";
import NomGrid from "./partial/nominations.grid";

class NomApp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            filter: {
                games: [],
                year: new Date(),
                currentGame: {}
            },
            isLoading: false,
            nominations: [],
            divisions: [],
            game: null
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
            this.changeFilter("games", JSON.parse(data));
            this.getDivisions();
        })
    }

    getNominations(){
        this.setState({isLoading: true});
        var filter = this.state.filter;
        this.getCurrentGame();
        services.getNominations({
            game: (filter.currentGame.length)? filter.currentGame : filter.games[0].id,
            year: (new Date(filter.year)).getFullYear()
        }).then(data => {
            this.setState({isLoading: false});
            this.setState({nominations: JSON.parse(data)});
        })
    }

    getCurrentGame(){
        var filter = this.state.filter;
        var currentGameId = (filter.currentGame.length)? filter.currentGame : filter.games[0].id;
        this.setState({game: filter.games.filter(x => x.id == currentGameId)[0]});
    }

    getDivisions(){
        services.getDivisions().then(data => {
            this.setState({divisions: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    exportGrid(){
        this.openPreview();
        jQuery(".preview").wordExport();
        this.removePreview();
    }

    printGrid(){
        this.openPreview();
        jQuery.print(".preview");
        this.removePreview();  
    }

    openPreview(){
        jQuery("body").append("<div class='preview'></div>");
        jQuery(".preview").html(jQuery("#nomGrid").html());
        jQuery('.preview .btn-success, .preview .btn-danger').remove();
    }

    removePreview(){
        jQuery(".preview").html();
        jQuery(".preview").remove();
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
                        <div className="export-box">
                        <h4>Інші операції</h4>
                        <button type="button" className="word-export btn btn-default" onClick={this.exportGrid.bind(this)} title="Експорт у Word"><i className="fa fa-file-word-o"></i></button>
                        <button type="button" className="print-export btn btn-default" onClick={this.printGrid.bind(this)} title="Друк"><i className="fa fa-print"></i></button>                        
                        </div>
                    </div>
                </div>
                <div id="nomGrid"><NomGrid nominations={this.state.nominations} divisions={this.state.divisions} game={this.state.game} /></div>
                <Preloader loading={this.state.isLoading} />
            </div>
        </div>
    }
}
export default NomApp;