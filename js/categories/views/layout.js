import React from "react";
import * as services from "../services/services";
import AgeCategories from "./ageCategories";
import WeightCategories from "./weightCategories";
import Preloader from "../../components/preloader/preloader";

class Categories extends React.Component{

    componentWillMount(){
        // this.setState({loading: false});
        this.fetchAgeCategories();
        this.onUpdateAgeCat = this.fetchAgeCategories.bind(this);
        this.onUpdateWeightCat = this.fetchWeightCategories.bind(this);
    }

    fetchAgeCategories(){
        this.setState({loading: true});        
        services.GetAllAgeCategories().then((data) => {
            this.setState({ageCategories: JSON.parse(data)});
            this.setState({loading: false});
            this.fetchWeightCategories();
        })
    }

    fetchWeightCategories(){
        this.setState({loading: true});
        services.GetAllWeightCategories().then((data) => {
            this.setState({weightCategories: JSON.parse(data)});
            this.setState({loading: false});
        })
    }

    componentWillUnmount(){
        this.setState(null)
    }

    render(){
        return <div className="row">
            <div className="col-md-6">
                <WeightCategories categories={this.state.weightCategories} onUpdate={this.onUpdateWeightCat }/>
            </div>
            <div className="col-md-6">
                <AgeCategories  categories={this.state.ageCategories} onUpdate={this.onUpdateAgeCat} />
            </div>
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default Categories;