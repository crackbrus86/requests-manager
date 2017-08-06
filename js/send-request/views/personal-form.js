import React from "react";
import moment from "moment";
require("../../../css/react-datetime.css");
import Datetime from "react-datetime";
import * as validation from "../../components/validation/validation";

class PersonalForm extends React.Component{
componentWillMount(){
    jQuery(".phone").mask("+38 (999) 999-99-99");
}

    render(){
        if(!this.props.isVisible) return null;
        var regionsList = (this.props.regions)? this.props.regions.map(item => <option key={item.id} value={item.id}>{item.region}</option>) : null;
        var region = (this.props.person.region)? this.props.person.region : this.props.regions[0].id;
        return <div>
            <form>
                <div className="form-group">
                    <label>Область</label>
                    <select value={region} className="form-control" onChange={e => this.props.onChange("region", e.target.value)}>{regionsList}</select>
                </div>
                <div className="form-group">
                    <label>Прізвище як у закордонному паспорті</label>
                    <input type="text" className="form-control" placeholder="Last Name" maxLength="50" />
                </div>
                <div className="form-group">
                    <label>Ім'я як у закордонному паспорті</label>
                    <input type="text" className="form-control" placeholder="First Name" maxLength="30" />
                </div>  
                <div className="form-group">
                    <label>Серія та номер закордонного паспорту</label>
                    <div className="row">
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="НН" maxLength="4" />
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control" placeholder="ХХХХХХ" maxLength="8" />
                        </div>                        
                    </div>
                </div> 
                <div className="form-group">
                    <label>Термін дії паспорту</label>
                    <Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true} maxLength="10" />
                </div>  
                <div className="form-group">
                    <label>Ідентифікаційний номер</label>
                    <input type="text" className="form-control" maxLength="10" />
                </div>
                <div className="form-group">
                    <label>Номер телефону</label>  
                    <input type="text" className="form-control phone" placeholder="+38 (999) 999-99-99" maxLength="20" />  
                </div>
                <div className="form-group">
                    <label>Електронна адреса</label> 
                    <input type="text" className="form-control" placeholder="email.adress@gmail.com" maxLength="50" />   
                </div>                                            
            </form>
        </div>
    }
}
export default PersonalForm;