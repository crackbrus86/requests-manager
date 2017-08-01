import React from "react";
import AgeCategoriesGrid from "./ageCategories-grid";
import Modal from "../../components/modal/modal";
class AgeCaegories extends React.Component{
    componentWillMount(){
        this.setState({target: null});
        this.onEdit = this.setTarget.bind(this);
        this.onClose = this.removeTarget.bind(this);
    }

    setTarget(id){
        this.setState({target: id})
    }

    removeTarget(){
        this.setState({target: null});
    }    

    render(){
        var grid = (this.props.categories)? <AgeCategoriesGrid data={this.props.categories} onEdit={this.onEdit} onDelete={() => {}} /> : null
        return <div>
            <h4>Вікові категорії</h4>
            {grid}
            <Modal target={this.state.target} onClose={this.onClose}>
                {this.state.id}
            </Modal>
        </div>
    }
}
export default AgeCaegories;