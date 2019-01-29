import React from "react";
import * as services from "../services/services";
import moment from "moment";
import Preloader from "../../components/preloader/preloader";
import CoachesGrid from "./partial/coaches.grid";
import Paging from "../../components/paging/paging";
import CoachModal from "../modals/coach.modal";
import Dialog from "../../components/modal/dialog";
import SharedFilter from "../../components/shared-filter/shared-filter";
import ReviewPhotosModal from "../../shared/review.photos.modal";
require("../../../css/coaches.css");

class CoachesApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            coaches: [],
            coach: null,
            regions: [],
            passports: [],
            paging: {
                total: 0,
                current: 1,
                perPage: 10,
                offset: 0
            },
            coachPhotos: [],
            isLoading: false,
            filterText: '',
            isFiltered: false
        }
        this.onEdit = this.editCoach.bind(this);
        this.onPage = this.goToPage.bind(this);
        this.onClose = this.closeCoach.bind(this);
        this.onChange = this.changeCoach.bind(this);
        this.onUpdate = this.updateCoach.bind(this);
        this.onDelete = this.deleteCoach.bind(this);
        this.onCancel = this.cancelDelete.bind(this);
        this.onConfirm = this.confirmDelete.bind(this);
        this.onDownload = this.getPhotos.bind(this);
        this.handlePassChanged = this.setPassports.bind(this);
        this.onGetPhotos = this.getCoachPhotosById.bind(this);
        this.onCloseCoachPhotos = this.clearCoachPhotos.bind(this);

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
                    this.setCoaches(data);
                    this.setState({isLoading: false, isFiltered: true});
                })
            }
        }
    }

    fetchCoaches(){
        this.setState({isLoading: true});
        services.getCount().then(count => {
            this.setPagesTotal(count);
            var paging = this.state.paging;
            services.getAll({
                limit: paging.perPage,
                offset: paging.offset
            }).then(data => {
                this.setCoaches(data);
                this.setState({isLoading: false});
            })
        })
    }

    setPagesTotal(total){
        var paging = this.state.paging;
        paging.total = total;
        this.setState({paging: paging});
    }

    setCoaches(data){
        this.setState({coaches: JSON.parse(data)});
    }

    editCoach(id){
        this.setState({isLoading: true});
        services.getCoach({id: id}).then(data => {
            var response = JSON.parse(data);
            this.setCoach(response.coach);
            this.setPassports(response.passports);
            this.setState({isLoading: false});
        })
    }

    setCoach(coach){
        this.setState({coach: coach});
    }

    setPassports(passports){
        this.setState({passports: passports});
    }

    closeCoach(){
        this.setState({coach: null, passports: []});
    }

    changeCoach(field, value){
        var coach = this.state.coach;
        coach[field] = value;
        this.setState({coach: coach});
    }

    goToPage(page){
        var paging = this.state.paging;
        paging.current = page;
        paging.offset = paging.perPage * paging.current - paging.perPage;
        this.setState({paging: paging});
        this.fetchCoaches();
    }

    updateCoach(){
        this.setState({isLoading: true});
        var coach = this.state.coach;
        services.saveCoach({
            id: coach.id,
            region: coach.region,
            latSurname: coach.latSurname,
            latFirstName: coach.latFirstName,
            passSeria: coach.passSeria,
            passNo: coach.passNo,
            passExpire: coach.passExpire,
            iin: coach.iin,
            phone: coach.phone,
            email: coach.email,
            pnpId: coach.pnpId,
            pipId: coach.pipId,
            apId: coach.apId,
            passports: this.state.passports
        }).then(() => {
            this.closeCoach();
            this.setState({isLoading: false});
            this.fetchCoaches();
        })
    }

    deleteCoach(id){
        this.setState({dialog: {
            id: id,
            text: "Ви дійсно бажаєте видалити цього тренера?"
        }})
    }

    cancelDelete(){
        this.setState({dialog: null});
    }

    confirmDelete(){
        this.setState({isLoading: true});
        services.deleteCoach({id: this.state.dialog.id}).then(() => {
            this.cancelDelete();
            this.setState({isLoading: false});
            this.fetchCoaches();
        })
    }

    getCoachPhotosById(id){
        this.setState({isLoading: true});
        services.getCoachPhotosById({coachId: id}).then(response => {
            let photos = JSON.parse(response);
            this.setState({ coachPhotos: photos, isLoading: false});
        })
    }

    clearCoachPhotos(){
        this.setState({ coachPhotos: [] });
    }

    getRegions(){
        this.setState({isLoading: true});
        services.getRegions().then(data => {
            this.setRegions(data);
            this.fetchCoaches();
        })
    }

    setRegions(data){
        this.setState({regions: JSON.parse(data)});
    }

    getPhotos(){
        this.setState({isLoading: true});
        services.getPhotos({
            limit: this.state.paging.perPage,
            offset: this.state.paging.offset
        }).then(data => {
            this.setState({isLoading: false});
            if(data == "false"){
                alert("Фото не знайдені");
            }else{
                location.href = "../wp-content/plugins/requests-manager/api/Coaches/GetPhotos.php?limit=" + this.state.paging.perPage + "&offset=" + this.state.paging.offset;
            }
        })
    }

    componentDidMount(){
        this.getRegions();
    }

    componentWillReceiveProps(props){
        if(props.update) this.getRegions();
    }

    render(){
        return <div className="row">
            <div className="col-md-12">
                <h4>Тренери</h4>
                <div className="row">
                    <div className="col-md-10">
                        <SharedFilter
                        filterText={this.state.filterText}
                        onFilterTextChange={this.handleFilterTextChange}
                        onFilterRun={this.handleFilterRun} />
                    </div>
                    <div className="col-md-2">
                        <div className="export-box">
                            <h4>Інші операції</h4>
                            <button type="button" className="btn btn-default" onClick={this.onDownload} title="Скачати усі фото" disabled={!this.state.coaches.length}><i className="fa fa-file-archive-o"></i></button>
                        </div>  
                    </div>
                    <div className="col-md-10"></div>
                </div>                
                <CoachesGrid coaches={this.state.coaches} onEdit={this.onEdit} onDelete={this.onDelete} onGetPhotos={this.onGetPhotos} />
                {!this.state.isFiltered && <Paging paging={this.state.paging} changePage={this.onPage} />}
                <CoachModal 
                coach={this.state.coach} 
                regions={this.state.regions} 
                onChange={this.onChange} 
                onClose={this.onClose} 
                onUpdate={this.onUpdate} 
                passports={this.state.passports}
                onPassUpdate={this.handlePassChanged}
                />
                <ReviewPhotosModal photos={this.state.coachPhotos} title="Фото тренера" onClose={this.onCloseCoachPhotos} />
                <Dialog dialog={this.state.dialog} onClose={this.onCancel} onConfirm={this.onConfirm} />
                <Preloader loading={this.state.isLoading} />
            </div>
        </div>
    }
}
export default CoachesApp;