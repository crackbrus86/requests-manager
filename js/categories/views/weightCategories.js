import React from "react";
import WeightCategoriesGrid from "./weightCategories-grid";
import Modal from "../../components/modal/modal";

import Preloader from "../../components/preloader/preloader";
import * as services from "../services/services";
import Dialog from "../../components/modal/dialog";

class WeightCategories extends React.Component{
    componentWillMount(){
        this.setState({target: null, loading: false, dialog: null});
        this.onEdit = this.setTarget.bind(this);
        this.onClose = this.removeTarget.bind(this);
    }

    setTarget(id){
        this.setState({loading: true});
        services.GetWeightCategoryById({id: id}).then((data) => {
            var target = JSON.parse(data).map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    title_w: item.title_w
                }
            });
            this.setState({target: target, loading: false});
        });        
    }

    removeTarget(){
        this.setState({target: null});
    }     

    render(){
        var grid = (this.props.categories)? <WeightCategoriesGrid data={this.props.categories} onEdit={this.onEdit} onDelete={()=>null} /> : null;
        return <div>
            <h4>Вагові категорії</h4>
            {grid}
            <Modal target={this.state.target} onClose={this.onClose}>
                <div>123</div>
            </Modal>
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default WeightCategories;