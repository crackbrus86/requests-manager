import React from "react";
import Preloader from "../../components/preloader/preloader";
import * as services from "../services/services";
import VisaFilter from "./partial/visa.filter";

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
            records: []
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
        services.getAllVisaRecords({
            event: (filter.current.length)? filter.current : filter.games[0].id,
            year: (new Date(filter.year)).getFullYear()
        }).then(data => {
            this.setState({records: JSON.parse(data)});
            this.setState({isLoading: false});
            console.log(this.state);
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
                <Preloader loading={this.state.isLoading} />
            </div>
        </div>
    }
}
export default VisaApp;