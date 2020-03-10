import React from "react";
import * as services from "../services/services";
import moment from "moment";
import Preloader from "../../components/preloader/preloader";
import SharedFilter from "../../components/shared-filter/shared-filter";
import UsersGrid from "./partial/users.grid";
import Paging from "../../components/paging/paging";
import UserModal from "../modals/users.modal";
import UserRequests from "../modals/user.requests"
import Dialog from "../../components/modal/dialog";
import ReviewPhotosModal from "../../shared/review.photos.modal";
require("../../../css/users.css");

class UsersApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            user: null,
            passports: [],
            regions: [],
            paging: {
                total: 0,
                current: 1,
                perPage: 10,
                offset: 0
            },
            userPhotos: [],
            isLoading: false,
            filterText: '' ,
            isFiltered: false,
            showRequestsForId: null         
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
        this.onPassUpdate = this.updatePassports.bind(this);
        this.onGetPhotos = this.getUserPhotosById.bind(this);
        this.onCloseUserPhotos = this.clearUserPhotos.bind(this);

        this.handleFilterTextChange = (text) => {
            this.setState({filterText: text});
        }
        this.handleFilterRun = () => {
            if(!this.state.filterText.length){
                this.setState({isFiltered: false}, () => this.getRegions());
            }else{
                this.setState({isLoading: true});
                services.runFilter({
                    search: this.state.filterText
                }).then((data) => {
                    this.setUsers(data);
                    this.setState({isLoading: false, isFiltered: true});
                })
            }
        }
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
            var response = JSON.parse(data);
            this.setUser(response.user);
            this.setPassports(response.passports);
            this.setState({isLoading: false});
        })
    }

    setUser(data){
        this.setState({user: data[0]});
    }

    setPassports(data){
        this.setState({passports: data});
    }

    closeUser(){
        this.setState({user: null, passports: []});
    }

    changeUser(field, value){
        var user = this.state.user;
        user[field] = value;
        this.setState({user: user});
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
            apId: user.apId,
            n_pass: user.n_pass,
            passports: this.state.passports
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

    getUserPhotosById(id){
        this.setState({isLoading: true});
        services.getUserPhotosById({userId: id}).then((response) => {
            let photos = JSON.parse(response);
            this.setState({userPhotos: photos, isLoading: false});
        });
    }

    clearUserPhotos(){
        this.setState({ userPhotos: [] });
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
        services.getPhotos({
            limit: this.state.paging.perPage,
            offset: this.state.paging.offset
        }).then(data => {
            this.setState({isLoading: false});
            if(data === "false"){
                alert("Фото не знайдені");
            }else{
                location.href = "../wp-content/plugins/requests-manager/api/Users/GetPhotos.php?limit=" + this.state.paging.perPage + "&offset=" + this.state.paging.offset;
            }            
        });
    }

    updatePassports(passports){
        this.setState({passports: passports});
    }

    componentDidMount(){
        this.getRegions();
    }

    componentWillReceiveProps(props){
        if(props.update) this.getRegions();
    }

    closeRequests(){
        this.setState({showRequestsForId: null})
    }

    showRequests(id){
        this.setState({showRequestsForId: id})
    }

    render(){
        return <div className="row users-wrapper">
            <div className="col-md-12 users-content-section">
                <h4>Спортсмени</h4>
                <div className="row">
                    <div className="col-md-12">
                        <SharedFilter 
                        filterText={this.state.filterText}
                        onFilterTextChange={this.handleFilterTextChange}
                        onFilterRun={this.handleFilterRun} />
                    </div>
                </div>
                <UsersGrid users={this.state.users} onEdit={this.onEdit} onDelete = {this.onDelete} onGetPhotos={this.onGetPhotos} onOpenRequests={this.showRequests.bind(this)} />
                {(!this.state.isFiltered) ? <Paging paging={this.state.paging} changePage={this.onPage} /> : null}
            </div>
            <UserModal 
                user={this.state.user} 
                regions={this.state.regions} 
                onClose={this.onClose} 
                onChange={this.onChange} 
                onUpdate={this.onUpdate}
                passports={this.state.passports}
                onPassUpdate={this.onPassUpdate}
                />
            { this.state.showRequestsForId && <UserRequests userId={this.state.showRequestsForId} onClose={this.closeRequests.bind(this)} /> }
            <ReviewPhotosModal photos={this.state.userPhotos} title="Фото користувача" onClose={this.onCloseUserPhotos}  />
            <Dialog dialog={this.state.dialog} onClose={this.onCancel} onConfirm={this.onConfirm} />
            <Preloader loading={this.state.isLoading}/>
        </div>
    }
}
export default UsersApp;