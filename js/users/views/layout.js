import React from "react";
import * as services from "../services/services";
import moment from "moment";

class UsersApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            paging: {
                total: 0,
                current: 1,
                perPage: 10,
                offset: 0
            },
            isLoading: false            
        }
    }

    getUsersCount(){
        
    }

    render(){
        return <div className="row users-wrapper">
            <div className="col-md-12 users-content-section">
                <h4>Спортсмени</h4>
            </div>
        </div>
    }
}
export default UsersApp;