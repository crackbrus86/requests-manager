import React from "react";
import * as services from "../services/services";
import moment from "moment";
import Preloader from "../../components/preloader/preloader";
import CoachesGrid from "./partial/coaches.grid";
import Paging from "../../components/paging/paging";
import CoachModal from "../modals/coach.modal";

class CoachesApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            coaches: [],
            coach: null,
            regions: [],
            paging: {
                total: 0,
                current: 1,
                perPage: 10,
                offset: 0
            },
            isLoading: false
        }
        this.onEdit = this.editCoach.bind(this);
        this.onPage = this.goToPage.bind(this);
        this.onClose = this.closeCoach.bind(this);
        this.onChange = this.changeCoach.bind(this);
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
            this.setCoach(data);
            this.setState({isLoading: false});
        })
    }

    setCoach(data){
        this.setState({coach: JSON.parse(data)[0]});
    }

    closeCoach(){
        this.setState({coach: null});
    }

    changeCoach(field, value){
        var coach = this.state.coach;
        coach[field] = value;
        this.setState({coach: coach});
        console.log(this.state);
    }

    goToPage(page){
        var paging = this.state.paging;
        paging.current = page;
        paging.offset = paging.perPage * paging.current - paging.perPage;
        this.setState({paging: paging});
        this.fetchCoaches();
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
                <CoachesGrid coaches={this.state.coaches} onEdit={this.onEdit} onDelete={()=>null} />
                <Paging paging={this.state.paging} changePage={this.onPage} />
                <CoachModal coach={this.state.coach} regions={this.state.regions} onChange={this.onChange} onClose={this.onClose} />
                <Preloader loading={this.state.isLoading} />
            </div>
        </div>
    }
}
export default CoachesApp;