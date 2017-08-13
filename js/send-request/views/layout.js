import React from "react";
import moment from "moment";
import NameForm from "./name-form";
import PersonalForm from "./personal-form";
import GameForm from "./game-form";
import CoachesSection from "./coaches-section";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";
import Modal from "../../components/modal/modal";

class RequestForm extends React.Component{
    constructor(props){
        super(props);
        this.onUserChange = this.changeUserField.bind(this);
        this.onUserDataChange = this.changeUserDataField.bind(this);
        this.onUserLoad = this.getUserData.bind(this);
        this.onGameChange = this.changeGameField.bind(this);
        this.onCoachStatusChange = this.changeCoachStatus.bind(this);
        this.onCloseModal = this.closeCoachModal.bind(this);
        this.openModal = this.openCoachModal.bind(this);
        this.onCoachChange = this.changeCoachField.bind(this);
        this.onCoachLoad = this.getCoachData.bind(this);
    }

    changeCoachStatus(value){
        this.setState({hasCoach: value});
    }

    changeCoachField(fieldName, value){
        var newModalCoach = this.state.modalCoach;
        newModalCoach[fieldName] = value;
        this.setState({modalCoach: newModalCoach});
    }

    changeUserField(fieldName, value){
        var newUser = this.state.user;
        newUser[fieldName] = value;
        this.setState({user: newUser});
    } 

    changeUserDataField(fieldName, value, fieldParent = null){
        var newUserData = this.state.userData;
        if(fieldParent){
            newUserData[fieldParent][fieldName] = value;
        }else{
            newUserData[fieldName] = value;
        }
        this.setState({userData: newUserData}); 
        console.log(this.state);       
    } 
    
    changeGameField(fieldName, value, fieldParent = null){
        var newGame = this.state.gameData;
        if(fieldParent){
            newGame[fieldParent][fieldName] = value;
            if(fieldParent === "exercises"){
                var exercises = this.state.gameData.exercises;
                newGame["exercises"]["total"] = parseFloat(exercises.squat) + parseFloat(exercises.press) + parseFloat(exercises.lift);
            } 
        }else{
            newGame[fieldName] = value;
        }
        this.setState({gameData: newGame});
        console.log(this.state);          
    }

    getRegions(){
        this.setState({loading: true});
        services.getAllRegions().then(data => {
            this.setState({regions: JSON.parse(data)});
            if(this.state.regions.length) this.changeUserDataField("region", this.state.regions[0].id);
            this.setState({loading: false});
        })
    }

    getAgeCategories(){
        this.setState({loading: true});
        services.getAgeCategories().then(data => {
            this.setState({ageCategories: JSON.parse(data)});
            if(this.state.ageCategories.length) this.changeGameField("ageCat", this.state.ageCategories[0].id);
            this.setState({loading: false});
        })
    }

    getWeightCategories(){
        this.setState({loading: true});
        services.getWeightCategories().then(data => {
            this.setState({weightCategories: JSON.parse(data)});
            if(this.state.weightCategories.length) this.changeGameField("weightCat", this.state.weightCategories[0].id);
            this.setState({loading: false});
        })
    }

    getActualGames(){
        this.setState({loading: true});
        services.getOpenedActualGames({currentDay: moment(new Date()).format("YYYY-MM-DD")}).then(data => {
            this.setState({actualGames: JSON.parse(data)});
            if(this.state.actualGames.length) this.changeGameField("aGame", this.state.actualGames[0].id);
            this.setState({loading: false});
        })
    }

    getBeforeGames(){
        this.setState({loading: true});
        services.getBeforeGames().then(data => {
            this.setState({beforeGames: JSON.parse(data)});
            if(this.state.beforeGames.length) this.changeGameField("bGame", this.state.beforeGames[0].id);
            this.setState({loading: false});
        })
    }

    getCoachData(){
        var contract = {
            lastName: this.state.modalCoach.lastName,
            firstName: this.state.modalCoach.firstName,
            middleName: this.state.modalCoach.middleName,
            birthDate: this.state.modalCoach.birthDate
        }
        this.setState({loading: true});
        services.getCoachData(contract).then(data => {
            this.setState({loading: false});
        })
    }

    getUserData(){
        var conract = {
            surname: this.state.user.lastName,
            firstName: this.state.user.firstName,
            middleName: this.state.user.middleName,
            birthDate: this.state.user.birthDate
        }
        this.setState({loading: true});
        this.setDefaultUserData();
        services.getUserData(conract).then(data => {
            if(data != "null") this.setState({userData: JSON.parse(data)});
            var newUD = this.state.userData;
            newUD.visa = {
                hasVisa: "false",
                type: 0,
                term: null
            }
            this.setState({userData: newUD});
            this.showUserData();
            this.showGameData();
            this.setState({loading: false});
        }) 
    }

    setDefaultUserData(){
        this.setState({userData: {
            accreditation_photo_id: "",
            email: "",
            expiration_date_pass: null,
            first_name_pass: "",
            individual_number: "",
            last_name_pass: "",
            number_pass: "",
            phone: "",
            photo_international_pass_id: "",
            photo_national_pass_id: "",
            region: "",
            serial_number_pass: ""
        }})
    }

    setDefaultGameData(){
        this.setState({gameData: {
            ageCat: "",
            weightCat: "",
            aGame: "",
            exercises: {
                squat: 0,
                press: 0,
                lift: 0,
                total: 0
            },
            bGame: ""
        }})
    }

    showUserData(){
        this.setState({showUserData: true});
    }

    showGameData(){
        this.setState({showGameData: true});
    }

    openCoachModal(){
        this.setState({modalCoach: {
            firstName: "",
            lastName: "",
            middleName: "",
            birthDate: null          
        }})
    }

    closeCoachModal(){
        this.setState({modalCoach: null});
    }

    componentWillMount(){
        this.setState({user:{
            firstName: "",
            lastName: "",
            middleName: "",
            birthDate: null
        }, loading: false, 
        showUserData: false, 
        showGameData: false, 
        hasCoach: "false",
        modalCoach: null});
        this.setDefaultUserData();
        this.setDefaultGameData();
        this.getRegions();
        this.getAgeCategories();
        this.getWeightCategories();  
        this.getActualGames();
        this.getBeforeGames();
    }

    render(){
        return <div>
            <NameForm person={this.state.user} onChange={this.onUserChange} onNext={this.onUserLoad} isReadOnly={this.state.showUserData} />
            <PersonalForm isVisible={this.state.showUserData} person={this.state.userData} regions={this.state.regions} onChange={this.onUserDataChange} />
            <GameForm isVisible={this.state.showGameData} game={this.state.gameData} ageCategories={this.state.ageCategories} 
            actualGames={this.state.actualGames} beforeGames={this.state.beforeGames} weightCategories={this.state.weightCategories} onChange={this.onGameChange} />
            <CoachesSection isVisible={this.state.showGameData} hasCoach={this.state.hasCoach} onChange={this.onCoachStatusChange} openCoachModal={this.openModal} />
            <Modal target={this.state.modalCoach} onClose={this.onCloseModal}>
                <h4>Введіть дані тренера</h4>
                <NameForm person={this.state.modalCoach} onChange={this.onCoachChange} onNext={this.onCoachLoad} />
            </Modal>
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default RequestForm;