import React from "react";
import * as services from "../services/services";

class Categories extends React.Component{

    componentWillMount(){
        services.GetAllAgeCategories().then((data) => {
            this.setState({ageCategories: JSON.parse(data)});
            console.log(this.state);
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

            </div>
        </div>
    }
}
export default Categories;