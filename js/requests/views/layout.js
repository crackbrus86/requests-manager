import React from "react";
import Filter from "./partial/filter";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";
import moment from "moment";

class RequestsApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filter: {
                games: [],
                year: new Date(),
                currentGame: null
            },
            isLoading: false
        }
        this.changeFilter = this.onFielterChange.bind(this);
    }

    onFielterChange(field, value){
        var newFilter = this.state.filter;
        newFilter[field] = value;
        this.setState({filter: newFilter});
    }

    getGames(){
        this.setState({isLoading: true});
        services.getOpenedGames({currentDay: moment(new Date()).format("YYYY-MM-DD")}).then(data => {
            this.onFielterChange("games", JSON.parse(data));
            this.onFielterChange("currentGame", JSON.parse(data)[0].id);
            this.setState({isLoading: false});
            console.log(this.state);
        })
    }

    componentWillMount(){
        this.getGames();
    }

    render(){
        return <div className="row requests-wrapper">
            <div className="col-md-12 requests-content-section">
                <h4>Заявки</h4>
                <Filter filter={this.state.filter} onChange={this.changeFilter}  />
            </div>
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default RequestsApp;