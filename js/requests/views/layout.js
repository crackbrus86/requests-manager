import React from "react";
import Filter from "./partial/filter";
import * as services from "../services/services";
import ReqGrid from "./partial/requests.grid";
import Preloader from "../../components/preloader/preloader";
import moment from "moment";
import Paging from "../../components/paging/paging";
import ReqModal from "../modals/request.modal";
require("../../../css/requests.css");

class RequestsApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            requests: [],
            ageCat: [],
            weightCat: [],
            regions: [],
            games: [],
            preGames: [],
            coaches: [],
            editRequest: null,
            tmpCoach: {
                hide: true,
                id: null,
                follows: false
            },
            filter: {
                games: [],
                year: new Date(),
                currentGame: {}
            },
            paging: {
                total: 0,
                current: 1,
                perPage: 10,
                offset: 0
            },
            isLoading: false
        }
        this.changeFilter = this.onFielterChange.bind(this);
        this.changePage = this.changeCurrentPage.bind(this);
        this.onFilter = this.runFilter.bind(this);
        this.onEdit = this.editRequest.bind(this);
        this.onClose = this.closeRequest.bind(this);
        this.changeRequest = this.onRequestChange.bind(this);
        this.deleteCoach = this.onCoachDelete.bind(this);
        this.onTcChange = this.onTmpCoachChange.bind(this);
        this.onCoachAdd = this.onAddCoach.bind(this);
        this.onUpdate = this.updateRequest.bind(this);
    }

    changeCurrentPage(page){
        var paging = this.state.paging;
        paging.current = page;
        paging.offset = paging.perPage*paging.current - paging.perPage;
        this.setState({paging: paging});
        this.getCountOfAllRequests();
    }    

    onFielterChange(field, value){
        var newFilter = this.state.filter;
        newFilter[field] = value;
        this.setState({filter: newFilter});      
    }

    onRequestChange(field, value, parent = null){
        var request = this.state.editRequest;
        if(parent){
            request[parent][field] = value;
            if(parent === "results") request["results"]["total"] = parseFloat(request["results"]["squat"]) + parseFloat(request["results"]["press"]) + parseFloat(request["results"]["lift"]);
            if(parent === "doping" && field === "isPassed" && !JSON.parse(value)) request["doping"]["date"] = null;
        }else{
            request[field] = value;
        }        
        this.setState({editRequest: request});
        console.log(this.state);  
    }

    onCoachDelete(id){
        var request = this.state.editRequest;
        var coachesTmp = request.coaches;
        var cTmp = coachesTmp.filter(c => c[0] != parseInt(id));
        request.coaches = cTmp;
        var details = request.coach_details;
        var dTmp = details.filter(d => d.id !== id);
        request.coach_details = dTmp;
        this.setState({editRequest: request});
    }

    onTmpCoachChange(field, value){
        var tmp = this.state.tmpCoach;
        tmp[field] = value;
        this.setState({tmpCoach: tmp});
    }

    onAddCoach(){
        var request = this.state.editRequest;
        var coach = [parseInt(this.state.tmpCoach.id), JSON.stringify(this.state.tmpCoach.follows)];
        var coaches = request.coaches;
        var coach_details = request.coach_details;
        var duplicates = false;
        for(var i = 0; i < coaches.length; i++){
            if(coach[0] == coaches[i][0]) {
                alert("Увага! Цього тренера уже було додано!");
                duplicates = true;
            }
        }
        if(!duplicates){
            coaches.push(coach);
            var c = this.state.coaches.filter(x => x.id == this.state.tmpCoach.id)[0];
            var coach_detail = {id: c.id, name: c.name, surname: c.surname, mName: c.mName};
            coach_details.push(coach_detail);
            request.coaches = coaches;
            request.coach_details = coach_details;
            this.setState({editRequest: request});
        }
        var newTmpCoach = {
            hide: false,
            id: this.state.coaches[0].id,
            follows: false
        }
        this.setState({tmpCoach: newTmpCoach});
    }

    updateRequest(){
        this.setState({isLoading: true});
        var request = this.state.editRequest;
        services.updateRequest({
            id: request.id,
            age: request.age,
            weight: request.weight,
            game: request.game,
            results: request.results,
            pregame: request.pregame,
            doping: request.doping,
            coaches: request.coaches,
            year: request.year
        }).then(() => {
            this.closeRequest();
            this.getAllRequests();
            this.setState({isLoading: false});
        })
    }

    getGames(){
        this.setState({isLoading: true});
        services.getOpenedGames({currentDay: moment(new Date()).format("YYYY-MM-DD")}).then(data => {
            this.setState({games: JSON.parse(data)});
            this.onFielterChange("games", JSON.parse(data));
            this.onFielterChange("currentGame", JSON.parse(data)[0].id);
            this.setState({isLoading: false});
            this.setDefaultGame();
            this.getPreGames();
            this.getCountOfAllRequests(); 
            this.getAgeCategories();
            this.getWeightCategories();
            this.getRegions();
            this.getCoaches();
        })
    }

    getPreGames(){
        this.setState({isLoading: true});
        services.getAllBeforeGames().then(data => {
            this.setState({preGames: JSON.parse(data)});
            this.setState({isLoading: false});
        });
    }

    getAgeCategories(){
        this.setState({isLoading: true});
        services.getAgeCategories().then(data => {
            this.setState({ageCat: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    getWeightCategories(){
        this.setState({isLoading: true});
        services.getWeightCategories().then(data => {
            this.setState({weightCat: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    getRegions(){
        this.setState({isLoading: true});
        services.getAllRegions().then(data => {
            this.setState({regions: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    getCoaches(){
        this.setState({isLoading: true});
        services.getAllCoaches().then(data => {
            this.setState({coaches: JSON.parse(data)})
            this.onTmpCoachChange("id", this.state.coaches[0].id);
            this.setState({isLoading: false});
        });
    }

    setDefaultGame(){
        var filter = this.state.filter;
        if(filter.games.length) {
            filter["currentGame"] = filter.games[0].id;
            this.setState({filter: filter});
        }
    }

    getCountOfAllRequests(){
        this.setState({isLoading: true});
        services.getCountOfAllRequests({
            game: this.state.filter.currentGame,
            year: moment(this.state.filter.year).format("YYYY")
        }).then(data => {
            var paging = this.state.paging;
            paging.total =parseInt(data);
            this.setState({paging: paging});
            this.setState({isLoading: false});
            this.getAllRequests();
        })
    }

    getAllRequests(){
        this.setState({isLoading: true});
        services.getAllRequests({
            limit: this.state.paging.perPage,
            offset: this.state.paging.offset,
            game: this.state.filter.currentGame,
            year: moment(this.state.filter.year).format("YYYY")
        }).then(data => {
            this.setState({requests: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    editRequest(id){
        this.setState({isLoading: true});
        services.getRequest({id: id}).then(data => {
            var tmp = JSON.parse(data)[0];
            this.setState({editRequest: tmp});
            this.setState({isLoading: false});
        })
    }

    closeRequest(){
        this.setState({editRequest: null});
        this.onTcChange("hide", true);
    }

    runFilter(){
        this.changeCurrentPage(1);
    }

    componentDidMount(){
        this.getGames();
    }

    render(){
        return <div className="row requests-wrapper">
            <div className="col-md-12 requests-content-section">
                <h4>Заявки</h4>
                <Filter filter={this.state.filter} onChange={this.changeFilter} onFilter={this.onFilter} />
            </div>
            <ReqGrid data={this.state.requests} onEdit={this.onEdit} onDelete={() => null} />
            <Paging paging={this.state.paging} changePage={this.changePage} />
            <ReqModal target={this.state.editRequest} regions={this.state.regions} ages={this.state.ageCat} weights={this.state.weightCat} 
            games={this.state.games} preGames={this.state.preGames} coaches={this.state.coaches} 
            tmpCoach={this.state.tmpCoach} onTcChange={this.onTcChange} onClose={this.onClose} onChange={this.changeRequest} onCoachDelete={this.deleteCoach} 
            onAdd={this.onCoachAdd} onUpdate={this.onUpdate} />
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default RequestsApp;