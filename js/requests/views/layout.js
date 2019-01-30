import React from "react";
import Filter from "./partial/filter";
import * as services from "../services/services";
import ReqGrid from "./partial/requests.grid";
import Preloader from "../../components/preloader/preloader";
import moment from "moment";
import Paging from "../../components/paging/paging";
import ReqModal from "../modals/request.modal";
import EmailsModal from "../modals/emails.modal";
import PhoneNumbersModal from "../modals/phone.numbers.modal";
import ReviewPhotosModal from "../../shared/review.photos.modal";
require("../../../css/requests.css");
import Dialog from "../../components/modal/dialog";

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
            emails: [],
            requestPhotos: [],
            phoneNumbers: [],
            editRequest: null,
            dialog: null,
            tmpCoach: {
                hide: true,
                id: null,
                follows: false
            },
            filter: {
                games: [],
                year: new Date(),
                currentGame: {},
                filterGames: []
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
        this.onDelete = this.deleteRequest.bind(this);
        this.onCancel = this.cancelDelete.bind(this);
        this.onConfirm = this.confirmDelete.bind(this);
        this.onDownload = this.getPhotos.bind(this);
        this.addToFilter = this.addToFilter.bind(this);
        this.removeFromFilter = this.removeFromFilter.bind(this);
        this.onGetEmails = this.getEmails.bind(this);
        this.onCloseEmails = this.resetEmails.bind(this);
        this.onGetPhoneNumbers = this.getPhoneNumbers.bind(this);
        this.onClosePhoneNumbers = this.resetPhoneNumbers.bind(this);
        this.onGetPhotosByRequest = this.getPhotosByRequest.bind(this);
        this.onCloseRequestPhotos = this.clearRequestPhotos.bind(this);
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
            this.getCountOfAllRequests();
        })
    }

    getGames(){
        this.setState({isLoading: true});
        services.getOpenedGames({currentDay: moment(new Date()).format("YYYY-MM-DD")}).then(data => {
            this.setState({games: JSON.parse(data)});
            this.onFielterChange("games", JSON.parse(data));
            this.onFielterChange("currentGame", JSON.parse(data)[0].id);
            this.onFielterChange("filterGames", []);
            this.onFielterChange("year", new Date());
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
        services.getAllBeforeGames().then(data => {
            this.setState({preGames: JSON.parse(data)});
        });
    }

    getAgeCategories(){
        services.getAgeCategories().then(data => {
            this.setState({ageCat: JSON.parse(data)});
        })
    }

    getWeightCategories(){
        services.getWeightCategories().then(data => {
            this.setState({weightCat: JSON.parse(data)});
        })
    }

    getRegions(){
        services.getAllRegions().then(data => {
            this.setState({regions: JSON.parse(data)});
        })
    }

    getCoaches(){
        services.getAllCoaches().then(data => {
            this.setState({coaches: JSON.parse(data)})
            if(this.state.coaches.length) this.onTmpCoachChange("id", this.state.coaches[0].id);
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
            year: moment(this.state.filter.year).format("YYYY"),
            games: (this.state.filter.filterGames.length)? this.state.filter.filterGames.map(g => g.id) : [this.state.filter.currentGame],
        }).then(data => {
            var paging = this.state.paging;
            paging.total =parseInt(data);
            this.setState({paging: paging});
            this.getAllRequests();
        })
    }

    getAllRequests(){
        this.setState({isLoading: true});
        services.getAllRequests({
            limit: this.state.paging.perPage,
            offset: this.state.paging.offset,
            games: (this.state.filter.filterGames.length)? this.state.filter.filterGames.map(g => g.id) : [this.state.filter.currentGame],
            year: moment(this.state.filter.year).format("YYYY")
        }).then(data => {
            this.setState({requests: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    getEmails(){
        this.setState({isLoading: true});
        var contract = {
                games: (this.state.filter.filterGames.length)? this.state.filter.filterGames.map(g => g.id) : [this.state.filter.currentGame],
                year: moment(this.state.filter.year).format("YYYY")
            }
        services.getEmails(contract).then(data => {
            var emails = JSON.parse(data).map(x => x.email);
            services.getCoachesEmails(contract).then((coachData) => {
                var coachEmails = JSON.parse(coachData).map(x => x.email);
                emails = emails.concat(coachEmails);
                this.setState({isLoading: false});            
                this.setState({emails: emails});
            });
        });
    }

    resetEmails(){
        this.setState({emails: []});
    }

    getPhoneNumbers(){
        this.setState({isLoading: true});
        var contract = {
            games: (this.state.filter.filterGames.length)? this.state.filter.filterGames.map(g => g.id) : [this.state.filter.currentGame],
            year: moment(this.state.filter.year).format("YYYY")
        }
        services.getUsersPhoneNumbers(contract).then(data => {
            var phoneNumbers = JSON.parse(data).map(x => x.phone);
            services.getCoachesPhoneNumbers(contract).then(coachData => {
                var coachPhoneNumbers = JSON.parse(coachData).map(x => x.phone);
                phoneNumbers = phoneNumbers.concat(coachPhoneNumbers);
                this.setState({isLoading: false});
                this.setState({phoneNumbers: phoneNumbers});
            })
        })
    }

    resetPhoneNumbers(){
        this.setState({phoneNumbers: []});
    }

    editRequest(id){
        this.setState({isLoading: true});
        services.getRequest({id: id}).then(data => {
            var tmp = JSON.parse(data)[0];
            this.setState({editRequest: tmp, isLoading: false});
        });
    }

    mapServerModel(sModel){
        var cModel = {};
        for(var key in sModel){
            var cKey = key.replace(key[0], key[0].toLowerCase());
            cModel[cKey] = sModel[key];
        }
        return cModel;
    }

    deleteRequest(id){
        this.setState({dialog: {
            id: id,
            text: "Ви впевнені що хочете видалити цю заявку?"
        }})
    }

    getPhotosByRequest(id){
        this.setState({isLoading: true});
        services.getPhotosByRequest({id: id}).then((response) => {
            let photos = JSON.parse(response);
            this.setState({requestPhotos: photos, isLoading: false});
        });
    }

    clearRequestPhotos(){
        this.setState({requestPhotos: [] });
    }

    cancelDelete(){
        this.setState({dialog: null});
    }

    confirmDelete(){
        this.setState({isLoading: true});
        services.deleteRequest({id: this.state.dialog.id}).then(() => {
            this.cancelDelete();
            this.getCountOfAllRequests();
        })
    }

    closeRequest(){
        this.setState({editRequest: null});
        this.onTcChange("hide", true);
    }

    addToFilter(){
        var filter = this.state.filter;
        var currentIndex = filter.games.findIndex(g => g.id === filter.currentGame);
        filter.filterGames.push(filter.games[currentIndex]);
        filter.games = filter.games.filter(x => x !== filter.games[currentIndex]);
        filter.currentGame = null;
        this.setState({filter: filter});
    }

    removeFromFilter(game){
        var filter = this.state.filter;
        var removeIndex = filter.filterGames.findIndex(g => g.id === game.id);
        filter.filterGames = filter.filterGames.filter(g => g !== filter.filterGames[removeIndex]);
        filter.games.push(game);
        this.setState({filter: filter});
    }

    runFilter(){
        this.changeCurrentPage(1);
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
        jQuery(".preview").html(jQuery("#reqGrid").html());
        jQuery('.preview .btn-success, .preview .btn-danger').remove();
    }

    removePreview(){
        jQuery(".preview").html();
        jQuery(".preview").remove();
    }

    getPhotos(){
        this.setState({isLoading: true});
        services.getPhotos({
            limit: this.state.paging.perPage,
            offset: this.state.paging.offset,
            game: this.state.filter.currentGame,
            year: moment(this.state.filter.year).format("YYYY")
        }).then(data => {
            this.setState({isLoading: false});
            if(data === "false"){
                alert("Фото не знайдені");
            }else{
                location.href = "../wp-content/plugins/requests-manager/api/Requests/GetPhotos.php?limit=" + 
                this.state.paging.perPage + "&offset=" + this.state.paging.offset + "&game=" + this.state.filter.currentGame + "&year=" + moment(this.state.filter.year).format("YYYY");
            }
        })
    }

    componentDidMount(){
        this.getGames();
    }

    componentWillReceiveProps(props){
        if(props.update) this.getGames();
    }

    render(){
        return <div className="row requests-wrapper">
            <div className="col-md-12 requests-content-section">
                <h4>Заявки</h4>
                <div className="row">
                    <div className="col-md-10">
                        <Filter filter={this.state.filter} onChange={this.changeFilter} onFilter={this.onFilter} filterGames={this.state.filter.filterGames} addToFilter={this.addToFilter} removeFromFilter={this.removeFromFilter} />
                    </div>
                    <div className="col-md-2">
                        <div className="export-box">
                        <h4>Інші операції</h4>
                        <button type="button" className="word-export btn btn-default" onClick={this.exportGrid.bind(this)} title="Експорт у Word"><i className="fa fa-file-word-o"></i></button>
                        <button type="button" className="print-export btn btn-default" onClick={this.printGrid.bind(this)} title="Друк"><i className="fa fa-print"></i></button>
                        <button type="button" className="btn btn-default" onClick={this.onDownload} title="Скачати усі фото" disabled={!this.state.requests.length}><i className="fa fa-file-archive-o"></i></button>
                        <button type="button" className="btn btn-default" onClick={this.onGetEmails} title="Отримати email-и учасників"><i className="fa fa-envelope"></i></button>
                        <button type="button" className="btn btn-default" onClick={this.onGetPhoneNumbers} title="Отримати телефонні номери учасників"><i className="fa fa-mobile"></i></button>
                        </div>
                    </div>                    
                </div>
            </div>
            <ReqGrid data={this.state.requests} onEdit={this.onEdit} onDelete={this.onDelete} onGetPhotos={this.onGetPhotosByRequest} />
            <Paging paging={this.state.paging} changePage={this.changePage} />
            <ReqModal target={this.state.editRequest} regions={this.state.regions} ages={this.state.ageCat} weights={this.state.weightCat} 
            games={this.state.games} preGames={this.state.preGames} coaches={this.state.coaches} 
            tmpCoach={this.state.tmpCoach} onTcChange={this.onTcChange} onClose={this.onClose} onChange={this.changeRequest} onCoachDelete={this.deleteCoach} 
            onAdd={this.onCoachAdd} onUpdate={this.onUpdate} />
            <EmailsModal emails={this.state.emails} onClose={this.onCloseEmails} />
            <PhoneNumbersModal numbers={this.state.phoneNumbers} onClose={this.onClosePhoneNumbers} />
            <ReviewPhotosModal photos={this.state.requestPhotos} title="Фото до заявки" onClose={this.onCloseRequestPhotos} />
            <Dialog dialog={this.state.dialog} onClose={this.onCancel} onConfirm={this.onConfirm} />
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default RequestsApp;