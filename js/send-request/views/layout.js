import React from "react";
import moment from "moment";
import NameForm from "./name-form";
import PersonalForm from "./personal-form";
import GameForm from "./game-form";
import CoachesSection from "./coaches-section";
import * as validation from "../../components/validation/validation";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";
import Modal from "../../components/modal/modal";
require("../../../css/coach-modal.css");

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
        this.onSetCoachFollowing = this.changeCoachIsFollowing.bind(this);
        this.onCoachDataChange = this.changeCoachDataField.bind(this);
        this.onCoachSet = this.appendCoach.bind(this);
        this.onCoachEdit = this.editCoach.bind(this);
        this.onCoachRemove = this.removeCoach.bind(this);
    }

    changeCoachStatus(value){
        this.setState({hasCoach: value});
    }

    changeCoachField(fieldName, value){
        var newModalCoach = this.state.modalCoach;
        newModalCoach[fieldName] = value;
        this.setState({modalCoach: newModalCoach});
    }

    changeCoachIsFollowing(value){
        var mCoach = this.state.modalCoach;
        mCoach.isFollowing = value;
        this.setState({modalCoach: mCoach});
        if(value === "false"){
            this.setState({showCoachData: false});
            var update = (this.state.coachData.update)? this.state.coachData.update : null;
            this.setDefaultCoachData();
            var newCD = this.state.coachData;
            if(update) newCD.update = update;
            this.setState({coachData: newCD});
        }else{
            this.getCoachData();
        }
    }

    changeUserField(fieldName, value){
        var newUser = this.state.user;
        newUser[fieldName] = value;
        this.setState({user: newUser});
    } 

    changeCoachDataField(fieldName, value, fieldParent = null){
        var newCoachData = this.state.coachData;
        if(fieldParent){
            newCoachData[fieldParent][fieldName] = value;
        }else{
            newCoachData[fieldName] = value;
        }
        this.setState({coachData: newCoachData}); 
        console.log(this.state);       
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

    appendCoach(){
        var coach = {
            firstName: this.state.modalCoach.firstName,
            lastName: this.state.modalCoach.lastName,
            middleName: this.state.modalCoach.middleName,
            birthDate: this.state.modalCoach.birthDate,
            isFollowing: this.state.modalCoach.isFollowing,
            id: this.state.coachData.id,
            accreditationPhotoId: this.state.coachData.accreditation_photo_id,
            email: this.state.coachData.email,
            expirationDatePass: this.state.coachData.expiration_date_pass,
            firstNamePass: this.state.coachData.first_name_pass,
            individualNumber: this.state.coachData.individual_number,
            lastNamePass: this.state.coachData.last_name_pass,
            numberPass: this.state.coachData.number_pass,
            phone: this.state.coachData.phone,
            photoInternationalPassId: this.state.coachData.photo_international_pass_id,
            photoNationalPassId: this.state.coachData.photo_national_pass_id,
            region: this.state.coachData.region,
            serialNumberPass: this.state.coachData.serial_number_pass  
        }
        if(this.state.coachData.visa) coach.visa = {
            hasVisa: this.state.coachData.visa.hasVisa,
            term: this.state.coachData.visa.term,
            type: this.state.coachData.visa.type            
        }
        var coaches = this.state.coaches;
        if(this.state.coachData.update){
            coaches[this.state.coachData.update.index] = coach;
        }else{
            coaches.push(coach);
        }
        this.setState({coaches: coaches});
        this.closeCoachModal();
        console.log(this.state);
    }

    removeCoach(index){
        var coaches = this.state.coaches;
        coaches.splice(index,1);
        this.setState({coaches: coaches});
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
        var update = (this.state.coachData.update)? this.state.coachData.update : null;
        this.setState({loading: true});
        this.setDefaultCoachData(this.state.regions[0].id);
        services.getCoachData(contract).then(data => {
            if(data != "null") this.setState({coachData: JSON.parse(data)});
            var newCD = this.state.coachData;
            newCD.visa = {
                hasVisa: "false",
                type: 0,
                term: null
            }
            if(update) newCD.update = update;
            this.setState({coachData: newCD})            
            this.setState({showCoachData: true});
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
        this.setDefaultUserData(this.state.regions[0].id);
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

    setDefaultUserData(regionId = ""){
        this.setState({userData: {
            accreditation_photo_id: "",
            email: "",
            expiration_date_pass: null,
            id: null,
            first_name_pass: "",
            individual_number: "",
            last_name_pass: "",
            number_pass: "",
            phone: "",
            photo_international_pass_id: "",
            photo_national_pass_id: "",
            region: regionId,
            serial_number_pass: ""
        }})
    }

    setDefaultCoachData(regionId = ""){
        this.setState({coachData: {
            accreditation_photo_id: "",
            email: "",
            expiration_date_pass: null,
            id: null,
            first_name_pass: "",
            individual_number: "",
            last_name_pass: "",
            number_pass: "",
            phone: "",
            photo_international_pass_id: "",
            photo_national_pass_id: "",
            region: regionId,
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

    editCoach(event, key){
        var coach = this.state.coaches[key];
        var coachData = {
            id: coach.id,
            accreditation_photo_id: coach.accreditationPhotoId,
            email: coach.email,
            expiration_date_pass: coach.expirationDatePass,
            first_name_pass: coach.firstNamePass,
            individual_number: coach.individualNumber,
            last_name_pass: coach.lastNamePass,
            number_pass: coach.numberPass,
            phone: coach.phone,
            photo_international_pass_id: coach.photoInternationalPassId,
            photo_national_pass_id: coach.photoNationalPassId,
            region: coach.region,
            serial_number_pass: coach.serialNumberPass,
            update: {
                index: key
            }                 
        }
        if(coach.visa) coachData.visa = {
            hasVisa: coach.visa.hasVisa,
            term: coach.visa.term,
            type: coach.visa.type
        }
        var showCoachData = (coach.isFollowing === "true")? true : false;
        this.setState({modalCoach:{
            firstName: coach.firstName,
            lastName: coach.lastName,
            middleName: coach.middleName,
            birthDate: coach.birthDate,
            isFollowing: coach.isFollowing   
        }, coachData: coachData, showCoachData: showCoachData});
        event.preventDefault();
    }

    openCoachModal(){
        this.setState({modalCoach: {
            firstName: "",
            lastName: "",
            middleName: "",
            birthDate: null,
            isFollowing: "false"          
        }})
    }

    closeCoachModal(){
        this.setState({modalCoach: null, showCoachData: false});
        this.setDefaultCoachData();
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
        modalCoach: null,
        showCoachData: false,
        coaches: []});
        this.setDefaultUserData();
        this.setDefaultGameData();
        this.setDefaultCoachData();
        this.getRegions();
        this.getAgeCategories();
        this.getWeightCategories();  
        this.getActualGames();
        this.getBeforeGames();
    }

    render(){
        var requiredGeneral = ["firstName", "lastName", "middleName", "birthDate"];
        var required = ["accreditation_photo_id", "email", "expiration_date_pass", "first_name_pass", "individual_number", "last_name_pass", "number_pass",
                        "phone", "photo_international_pass_id", "photo_national_pass_id", "region", "serial_number_pass"];        
        return <div>
            <NameForm person={this.state.user} onChange={this.onUserChange} onNext={this.onUserLoad} isReadOnly={this.state.showUserData} />
            <PersonalForm isVisible={this.state.showUserData} person={this.state.userData} regions={this.state.regions} onChange={this.onUserDataChange} />
            <GameForm isVisible={this.state.showGameData} game={this.state.gameData} ageCategories={this.state.ageCategories} 
            actualGames={this.state.actualGames} beforeGames={this.state.beforeGames} weightCategories={this.state.weightCategories} onChange={this.onGameChange} />
            <CoachesSection isVisible={this.state.showGameData} coaches={this.state.coaches} hasCoach={this.state.hasCoach} onChange={this.onCoachStatusChange} openCoachModal={this.openModal} editCoach={this.onCoachEdit} removeCoach={this.onCoachRemove} />
            <Modal target={this.state.modalCoach} onClose={this.onCloseModal}>
                <h4>Введіть дані тренера</h4>
                <div className="coach-wrap">
                    <NameForm isCoach={true} person={this.state.modalCoach} onChange={this.onCoachChange} onNext={this.onCoachLoad} 
                        setFollowing={this.onSetCoachFollowing} isReadOnly={this.state.showCoachData} />
                    <PersonalForm isVisible={this.state.showCoachData} person={this.state.coachData} regions={this.state.regions} onChange={this.onCoachDataChange} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" disabled={this.state.modalCoach && ((validation.isFormValid(this.state.modalCoach, requiredGeneral) && !this.state.showCoachData) || 
                    (validation.isFormValid(this.state.coachData, required) && !!this.state.showCoachData)) ? true : false } onClick={this.onCoachSet}>{(this.state.coachData.update)? "Зберегти" : "Додати"}</button>
                </div>                
            </Modal>
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default RequestForm;