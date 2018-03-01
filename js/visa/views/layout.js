import React from "react";
import Preloader from "../../components/preloader/preloader";
import * as services from "../services/services";
import VisaFilter from "./partial/visa.filter";
import VisaGrid from "./partial/visa.grid";
require("../../../css/visa.css");
import VisaModal from "../modal/visa.modal";
import Dialog from "../../components/modal/dialog";
import moment from "moment";

class VisaApp extends React.Component{
    constructor(props){
        super();
        this.state = {
            filter: {
                games: [],
                current: {},
                year: new Date().getFullYear().toString()
            },
            isLoading: false,
            records: [],
            game: null,
            visa: null,
            dialog: null
        }
        this.onFilterChange = this.changeFilter.bind(this);
        this.runFilter = this.getVisaRecords.bind(this);
        this.onEdit = this.editVisa.bind(this);
        this.onClose = this.closeVisa.bind(this);
        this.onChange = this.changeVisa.bind(this);
        this.onUpdate = this.updateVisa.bind(this);
        this.onDelete = this.deleteVisa.bind(this);
        this.onCancel = this.cancelDeleting.bind(this);
        this.onConfirm = this.confirmDeleting.bind(this);
        this.onCreate = this.addVisa.bind(this);
        this.onSelectOwner = this.selectOwner.bind(this);
        this.onInsert = this.insertVisa.bind(this);
    }

    changeFilter(field, value){
        var filter = this.state.filter;
        filter[field] = value;
        this.setState({filter: filter});
    }

    getGames(){
        this.setState({isLoading: true});
        services.getGames().then(data => {
            this.changeFilter("games", JSON.parse(data));
            this.setState({isLoading: false});
        })
    }

    getVisaRecords(){
        this.setState({isLoading: true});
        var filter = this.state.filter;
        this.getCurrentGame();
        services.getAllVisaRecords({
            event: (filter.current.length)? filter.current : filter.games[0].id,
            year: (new Date(filter.year)).getFullYear()
        }).then(data => {
            this.setState({records: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    getCurrentGame(){
        var filter = this.state.filter;
        var currentId = (filter.current.length)? filter.current : filter.games[0].id;
        this.setState({game: filter.games.filter(x => x.id == currentId)[0]});
    }   
    
    editVisa(id){
        var tmp = this.state.records.filter(x => x.visaId == id)[0];
        var visa = {
            id: tmp.visaId,
            fullName: tmp.fullName,
            type: tmp.visaType,
            expires: tmp.visaExpires
        };
        this.setState({visa: visa});
    }

    addVisa(){
        var persons = this.state.records.filter(x => !x.visaId && x.fullName !== " ");
        var visa = {
            id: null,
            type: 0,
            expires: moment(new Date()).format('YYYY-MM-DD'),
            persons: persons,
            defaultPerson: (persons.length > 0 ) ? persons[0].id + " " + persons[0].role : ""
        }
        this.setState({visa: visa});
    }

    closeVisa(){
        this.setState({visa: null})
    }

    changeVisa(field, value){
        var visa = this.state.visa;
        visa[field] = value;
        this.setState({visa: visa});
    }

    selectOwner(str){
        var tmpVisa = this.state.visa;
        tmpVisa.defaultPerson = str;
        this.setState({visa: tmpVisa});
    }

    insertVisa(){
        this.setState({isLoading: true});
        var visa = this.state.visa;
        var ownerArr = visa.defaultPerson.split(" ");
        services.insertVisa({
            ownerType: ownerArr[1],
            ownerId: ownerArr[0],
            type: visa.type,
            term: visa.expires,
            event: this.state.game.id,
            year: this.state.filter.year
        }).then(() => {
            this.closeVisa();
            this.setState({isLoading: false});
            this.getVisaRecords();
        });
    }

    updateVisa(){
        this.setState({isLoading: true});
        var visa = this.state.visa;
        services.updateVisa({
            id: visa.id,
            type: visa.type,
            expires: visa.expires
        }).then(() => {
            this.closeVisa();
            this.setState({isLoading: false});
            this.getVisaRecords();
        })
    }

    deleteVisa(id){
        this.setState({dialog: {
            id: id,
            text: "Ви дійсно хочете видалити цю візу?"
        }});
    }

    cancelDeleting(){
        this.setState({dialog: null});
    }

    confirmDeleting(){
        this.setState({isLoading: true});
        services.deleteVisa({id: this.state.dialog.id}).then(() => {
            this.setState({isLoading: false});
            this.cancelDeleting();
            this.getVisaRecords();
        })
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
        jQuery(".preview").html(jQuery("#visaGrid").html());
        jQuery('.preview .btn-success, .preview .btn-danger').remove();
    }

    removePreview(){
        jQuery(".preview").html();
        jQuery(".preview").remove();
    } 

    componentWillMount(){
        this.getGames();
    }

    render(){
        return <div className="row">
            <div className="col-md-12">
                <h4>Візова підтримка</h4>
                <div className="row">
                    <div className="col-md-10">
                        <VisaFilter filter={this.state.filter} onChange={this.onFilterChange} onFilter={this.runFilter} />
                    </div>
                    <div className="col-md-2">
                        <div className="export-box">
                            <h4>Інші операції</h4>
                            <button type="button" className="word-export btn btn-default" onClick={this.exportGrid.bind(this)} title="Експорт у Word"><i className="fa fa-file-word-o"></i></button>
                            <button type="button" className="print-export btn btn-default" onClick={this.printGrid.bind(this)} title="Друк"><i className="fa fa-print"></i></button>                        
                        </div>                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <button type="button" className="btn btn-success" disabled={!this.state.records.length} onClick={this.onCreate}><i className="fa fa-plus"></i> Додати візу</button>
                    </div>
                </div>
                <VisaGrid records={this.state.records} game={this.state.game} onEdit={this.onEdit} onDelete={this.onDelete} />
                <VisaModal visa={this.state.visa} onClose={this.onClose} onChange={this.onChange} onUpdate={this.onUpdate} onInsert={this.onInsert} onSelectOwner={this.onSelectOwner} />
                <Dialog dialog={this.state.dialog} onClose={this.onCancel} onConfirm={this.onConfirm} />
                <Preloader loading={this.state.isLoading} />
            </div>
        </div>
    }
}
export default VisaApp;