import React from "react";
import NameForm from "./name-form";
import PersonalForm from "./personal-form";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";

class RequestForm extends React.Component{
    constructor(props){
        super(props);
        this.onUserChange = this.changeUserField.bind(this);
        this.onUserDataChange = this.changeUserDataField.bind(this);
        this.onUserLoad = this.getUserData.bind(this);
    }

    changeUserField(fieldName, value){
        var newUser = this.state.user;
        newUser[fieldName] = value;
        this.setState({user: newUser});
    } 

    changeUserDataField(fieldName, value){
        var newUserData = this.state.userData;
        newUserData[fieldName] = value;
        this.setState({userData: newUserData});
        console.log(this.state);        
    }     

    getRegions(){
        this.setState({loading: true});
        services.getAllRegions().then(data => {
            this.setState({regions: JSON.parse(data)});
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
            this.showUserData();
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

    showUserData(){
        this.setState({showUserData: true});
    }

    componentWillMount(){
        this.setState({user:{
            firstName: "",
            lastName: "",
            middleName: "",
            birthDate: null,
        }, loading: false, showUserData: false});
        this.setDefaultUserData();
        this.getRegions();
    }
    render(){
        return <div>
            <NameForm person={this.state.user} onChange={this.onUserChange} onNext={this.onUserLoad} />
            <PersonalForm isVisible={this.state.showUserData} person={this.state.userData} regions={this.state.regions} onChange={this.onUserDataChange} />
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default RequestForm;