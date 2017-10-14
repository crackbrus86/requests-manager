import React from "react";
import Preloader from "../../components/preloader/preloader";
import DlgFilter from "./partial/delegation.filter";
import * as services from "../services/services";
import DlgGrid from "./partial/delegation.grid";

class DlgApp extends React.Component{
    constructor(props){
        super();
        this.state={
            filter: {
                games: [],
                current: {},
                year: new Date()
            },
            isLoading: false,
            members: []
        }
        this.onFilterChange = this.changeFilter.bind(this);
        this.runFilter = this.getDelegation.bind(this);
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
            this.setState({isLoading: false});
        })
    }  
    
    getDelegation(){
        this.setState({isLoading: true});
        var filter = this.state.filter;
        services.getDelegation({
            game: (filter.current.length)? filter.current : filter.games[0].id,
            year: (new Date(filter.year)).getFullYear()
        }).then(data => {
            this.setState({members: JSON.parse(data)});
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
        jQuery(".preview").html(jQuery("#dlgGrid").html());
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
                <h4>Делегація</h4>
                <div className="row">
                    <div className="col-md-10">
                        <DlgFilter filter={this.state.filter} onChange={this.onFilterChange} onFilter={this.runFilter} />
                    </div>
                    <div className="col-md-2">
                        <div className="export-box">
                            <h4>Інші операції</h4>
                            <button type="button" className="word-export btn btn-default" onClick={this.exportGrid.bind(this)} title="Експорт у Word"><i className="fa fa-file-word-o"></i></button>
                            <button type="button" className="print-export btn btn-default" onClick={this.printGrid.bind(this)} title="Друк"><i className="fa fa-print"></i></button>                        
                        </div>
                    </div>
                </div>
                <DlgGrid members={this.state.members} />
                <Preloader loading={this.state.isLoading} />
            </div>
        </div>
    }
}
export default DlgApp;