import React from "react";
import * as services from "../services/services";
import moment from "moment";
import Preloader from "../../components/preloader/preloader";
import UsersGrid from "./partial/users.grid";
import Paging from "../../components/paging/paging";

class UsersApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            user: null,
            paging: {
                total: 0,
                current: 1,
                perPage: 10,
                offset: 0
            },
            isLoading: false            
        }
        this.onEdit = this.editUser.bind(this);
        this.onPage = this.goToPage.bind(this);
    }

    fetchUsers(){
        this.setState({isLoading: true});
        services.getUsersCount().then(count => {
            this.setPagesTotal(count);
            services.getAll({
                limit: this.state.paging.perPage,
                offset: this.state.paging.offset
            }).then(data => {
                this.setUsers(data);
                this.setState({isLoading: false});
            })
        })
    }

    setPagesTotal(count){
        var paging = this.state.paging;
        paging.total = parseInt(count);
        this.setState({paging: paging});
    }

    setUsers(data){
        this.setState({users: JSON.parse(data)});
    }

    editUser(id){
        this.setState({isLoading: true});
        services.getUser({id: id}).then(data => {
            this.setUser(data);
            this.setState({isLoading: false});
        })
    }

    setUser(data){
        this.setState({user: JSON.parse(data)[0]});
    }

    goToPage(page){
        var paging = this.state.paging;
        paging.current = page;
        paging.offset = paging.perPage*paging.current - paging.perPage;
        this.setState({paging: paging});
        this.fetchUsers();
    }

    componentDidMount(){
        this.fetchUsers();
    }

    render(){
        return <div className="row users-wrapper">
            <div className="col-md-12 users-content-section">
                <h4>Спортсмени</h4>
                <UsersGrid users={this.state.users} onEdit={this.onEdit} onDelete = {() => null} />
                <Paging paging={this.state.paging} changePage={this.onPage} />
            </div>
            <Preloader loading={this.state.isLoading}/>
        </div>
    }
}
export default UsersApp;