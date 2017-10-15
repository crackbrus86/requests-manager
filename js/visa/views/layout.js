import React from "react";
import Preloader from "../../components/preloader/preloader";
import * as services from "../services/services";
import VisaFilter from "./partial/visa.filter";
import VisaGrid from "./partial/visa.grid";
require("../../../css/visa.css");
import VisaModal from "../modal/visa.modal";

class VisaApp extends React.Component{
    constructor(props){
        super();
        this.state = {
            filter: {
                games: [],
                current: {},
                year: new Date()
            },
            isLoading: false,
            records: [],
            game: null,
            visa: null
        }
        this.onFilterChange = this.changeFilter.bind(this);
        this.runFilter = this.getVisaRecords.bind(this);
        this.onEdit = this.editVisa.bind(this);
        this.onClose = this.closeVisa.bind(this);
        this.onChange = this.changeVisa.bind(this);
        this.onUpdate = this.updateVisa.bind(this);
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
    
    editVisa(id){
        var tmp = this.state.records.filter(x => x.id == id)[0];
        var visa = {
            id: tmp.id,
            name: tmp.name,
            surname: tmp.surname,
            type: tmp.type,
            expires: tmp.visaExpires
        };
        this.setState({visa: visa});
    }

    closeVisa(){
        this.setState({visa: null})
    }

    changeVisa(field, value){
        var visa = this.state.visa;
        visa[field] = value;
        this.setState({visa: visa});
    }

    updateVisa(){
        this.setState({isLoading: true});
        var visa = this.state.visa;
        services.updateVisa({
            id: visa.id,
            type: visa.type,
            expires: visa.expires
        }).then(() => {
            this.closeVisa();
            this.setState({isLoading: false});
            this.getVisaRecords();
        })
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
                    <div className="col-md-2"></div>
                </div>
                <VisaGrid records={this.state.records} game={this.state.game} onEdit={this.onEdit} onDelete={()=>null} />
                <VisaModal visa={this.state.visa} onClose={this.onClose} onChange={this.onChange} onUpdate={this.onUpdate} />
                <Preloader loading={this.state.isLoading} />
            </div>
        </div>
    }
}
export default VisaApp;