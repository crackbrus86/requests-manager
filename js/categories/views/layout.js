import React from "react";
import * as services from "../services/services";
import AgeCategories from "./ageCategories";
import Preloader from "../../components/preloader/preloader";

class Categories extends React.Component{

    componentWillMount(){
        this.setState({loading: false});
        this.fetchAgeCategories();
        this.onUpdateAgeCat = this.fetchAgeCategories.bind(this);
    }

    fetchAgeCategories(){
        this.setState({loading: true});        
        services.GetAllAgeCategories().then((data) => {
            this.setState({ageCategories: JSON.parse(data)});
            this.setState({loading: false});
        })
    }

    componentWillUnmount(){
        this.setState(null)
    }

    render(){
        return <div className="row">
            <div className="col-md-6">

            </div>
            <div className="col-md-6">
                <AgeCategories  categories={this.state.ageCategories} onUpdate={this.onUpdateAgeCat} />
            </div>
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default Categories;