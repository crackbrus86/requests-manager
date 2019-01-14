import React from "react";
import Preloader from "../../components/preloader/preloader";
import * as services from "../services/services";
import VisaFilter from "./partial/visa.filter";
import VisaGrid from "./partial/visa.grid";
require("../../../css/visa.css");

class VisaApp extends React.Component{
    constructor(props){
        super();
        this.state = {
            filter: {
                games: [],
                current: {},
                year: new Date().getFullYear().toString()
            },
            isLoading: false,
            records: [],
            game: null
        }
        this.onFilterChange = this.changeFilter.bind(this);
        this.runFilter = this.getVisaRecords.bind(this);    
    }

    changeFilter(field, value){
        var filter = this.state.filter;
        filter[field] = value;
        this.setState({filter: filter});
    }

    getGames(){
        this.setState({isLoading: true});
        services.getGames().then(data => {
            this.changeFilter("games", JSON.parse(data));
            this.setState({isLoading: false});
        })
    }

    getVisaRecords(){
        this.setState({isLoading: true});
        var filter = this.state.filter;
        this.getCurrentGame();
        services.getAllVisaRecords({
            event: (filter.current.length)? filter.current : filter.games[0].id,
            year: (new Date(filter.year)).getFullYear()
        }).then(data => {
            this.setState({records: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    getCurrentGame(){
        var filter = this.state.filter;
        var currentId = (filter.current.length)? filter.current : filter.games[0].id;
        this.setState({game: filter.games.filter(x => x.id == currentId)[0]});
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
        jQuery(".preview").html(jQuery("#visaGrid").html());
        jQuery('.preview .btn-success, .preview .btn-danger').remove();
    }

    removePreview(){
        jQuery(".preview").html();
        jQuery(".preview").remove();
    } 

    componentWillMount(){
        this.getGames();
    }

    render(){
        return <div className="row">
            <div className="col-md-12">
                <h4>Візова підтримка</h4>
                <div className="row">
                    <div className="col-md-10">
                        <VisaFilter filter={this.state.filter} onChange={this.onFilterChange} onFilter={this.runFilter} />
                    </div>
                    <div className="col-md-2">
                        <div className="export-box">
                            <h4>Інші операції</h4>
                            <button type="button" className="word-export btn btn-default" onClick={this.exportGrid.bind(this)} title="Експорт у Word"><i className="fa fa-file-word-o"></i></button>
                            <button type="button" className="print-export btn btn-default" onClick={this.printGrid.bind(this)} title="Друк"><i className="fa fa-print"></i></button>                        
                        </div>                        
                    </div>
                </div>
                <VisaGrid records={this.state.records} game={this.state.game} onEdit={this.onEdit} onDelete={this.onDelete} />
                <Preloader loading={this.state.isLoading} />
            </div>
        </div>
    }
}
export default VisaApp;