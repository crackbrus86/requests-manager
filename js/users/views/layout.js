import React from "react";
import * as services from "../services/services";
import moment from "moment";
import Preloader from "../../components/preloader/preloader";
import UsersGrid from "./partial/users.grid";
import Paging from "../../components/paging/paging";
import UserModal from "../modals/users.modal";
import Dialog from "../../components/modal/dialog";
require("../../../css/users.css");

class UsersApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            user: null,
            regions: [],
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
        this.onClose = this.closeUser.bind(this);
        this.onChange = this.changeUser.bind(this);
        this.onUpdate = this.updateUser.bind(this);
        this.onDelete = this.deleteUser.bind(this);
        this.onCancel = this.cancelDelete.bind(this);
        this.onConfirm = this.confirmDialog.bind(this);
        this.onDownload = this.getPhotos.bind(this);
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

    closeUser(){
        this.setState({user: null});
    }

    changeUser(field, value){
        var user = this.state.user;
        user[field] = value;
        this.setState({user: user});
        console.log(this.state);
    }

    getRegions(){
        this.setState({isLoading: true});
        services.getRegions().then(data => {
            this.setRegions(data);
            this.fetchUsers();
        })
    }

    setRegions(regions){
        this.setState({regions: JSON.parse(regions)});
    }

    goToPage(page){
        var paging = this.state.paging;
        paging.current = page;
        paging.offset = paging.perPage*paging.current - paging.perPage;
        this.setState({paging: paging});
        this.fetchUsers();
    }

    updateUser(){
        this.setState({isLoading: true});
        var user = this.state.user;
        services.saveUser({
            id: user.id,
            region: user.region,
            latLastName: user.latLastName,
            latFirstName: user.latFirstName,
            passSeria: user.passSeria,
            passNo: user.passNo,
            passExpire: user.passExpire,
            iin: user.iin,
            phone: user.phone,
            email: user.email,
            pnpId: user.pnpId,
            pipId: user.pipId,
            apId: user.apId
        }).then(() => {
            this.closeUser();
            this.setState({isLoading: false});
            this.fetchUsers();
        })
    }

    deleteUser(id){
        this.setState({dialog: {
                id: id,
                text: "Ви дійсно бажаєте видалити цього спортсмена?"
            }
        })
    }

    cancelDelete(){
        this.setState({dialog: null})
    }

    confirmDialog(){
        this.setState({isLoading: true});
        services.deleteUser({id: this.state.dialog.id}).then(() => {
            this.cancelDelete();
            this.setState({isLoading: false});
            this.fetchUsers();
        })
    }

    getPhotos(){
        this.setState({isLoading: true});
        services.getPhotos().then(data => {
            this.setState({isLoading: false});
            if(data === "false"){
                alert("Фото не знайдені");
            }else{
                location.href = "../wp-content/plugins/requests-manager/api/Users/GetPhotos.php";
            }            
        });
    }

    componentDidMount(){
        this.getRegions();
    }

    render(){
        return <div className="row users-wrapper">
            <div className="col-md-12 users-content-section">
                <h4>Спортсмени</h4>
                <div className="row">
                    <div className="col-md-2">
                        <div className="export-box">
                            <h4>Інші операції</h4>
                            <button type="button" className="btn btn-default" onClick={this.onDownload} title="Скачати усі фото"><i className="fa fa-file-archive-o"></i></button>
                        </div>  
                    </div>
                    <div className="col-md-10"></div>
                </div>
                <UsersGrid users={this.state.users} onEdit={this.onEdit} onDelete = {this.onDelete} />
                <Paging paging={this.state.paging} changePage={this.onPage} />
            </div>
            <UserModal user={this.state.user} regions={this.state.regions} onClose={this.onClose} onChange={this.onChange} onUpdate={this.onUpdate} />
            <Dialog dialog={this.state.dialog} onClose={this.onCancel} onConfirm={this.onConfirm} />
            <Preloader loading={this.state.isLoading}/>
        </div>
    }
}
export default UsersApp;