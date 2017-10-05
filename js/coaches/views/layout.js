import React from "react";
import * as services from "../services/services";
import moment from "moment";
import Preloader from "../../components/preloader/preloader";
import CoachesGrid from "./partial/coaches.grid";

class CoachesApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            coaches: [],
            paging: {
                total: 0,
                current: 1,
                perPage: 10,
                offset: 0
            },
            isLoading: false
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

    componentDidMount(){
        this.fetchCoaches();
    }

    componentWillReceiveProps(props){
        if(props.update) this.fetchCoaches();
    }

    render(){
        return <div className="row">
            <div className="col-md-12">
                <h4>Тренери</h4>
                <CoachesGrid coaches={this.state.coaches} onEdit={()=>null} onDelete={()=>null} />
                <Preloader loading={this.state.isLoading} />
            </div>
        </div>
    }
}
export default CoachesApp;