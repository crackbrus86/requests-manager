import React from "react";
import PhotoLoader from "../photo-loader/photo-loader";
import Datetime from "react-datetime";
import moment from "moment";

class ForeignPassportsComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            passports: !!this.props.passports ? this.props.passports : []
        }
        this.handleRenderPassports = this.renderPassports.bind(this);
        this.handleAddPassport = this.addPassport.bind(this);
        this.handleUpdatePassportNo = this.updatePassportNo.bind(this);
        this.handleUpdatePassportSeria = this.updatePassportSeria.bind(this);
        this.handleUpdatePhotoId = this.updatePassportPhoto.bind(this);
        this.handleUpdateExpirationDate = this.updatePassportExpirationDate.bind(this);
        this.handleDeletePassport = this.deletePassport.bind(this);
        this.displayExpireDate = this.displayExpireDate.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.props.passports != prevProps.passports) 
        {
               this.setState({passports: this.props.passports});
        }
    }

    addPassport(){
        var passports = this.state.passports;
        passports.push({
            id: null,
            seria: "",
            no: "",
            photoId: null,
            expireDate: null
        });
        this.setState({passports: passports});
        this.props.onUpdate(this.state.passports);
    }

    updatePassportNo(no, index){
        var passports = this.state.passports;
        passports[index].no = no;
        this.setState({passports: passports});
        this.props.onUpdate(this.state.passports);        
    }

    updatePassportSeria (seria, index){
        var passports = this.state.passports;
        passports[index].seria = seria;
        this.setState({passports: passports});
        this.props.onUpdate(this.state.passports);        
    }

    updatePassportPhoto(photoId, index){
        var passports = this.state.passports;
        passports[index].photoId = photoId;
        this.setState({passports: passports});
        this.props.onUpdate(this.state.passports);        
    }

    updatePassportExpirationDate(date, index){
        var passports = this.state.passports;
        passports[index].expireDate = date;
        this.setState({passports: passports});
        this.props.onUpdate(this.state.passports);  
    }

    deletePassport(index){
        var passports = this.state.passports;
        passports.splice(index, 1);
        this.setState({passports: passports});
        this.props.onUpdate(this.state.passports);        
    }

    displayExpireDate(date){
        return date ? moment(date).format("DD-MM-YYYY") : null; 
    }

    renderPassports(){
        return this.state.passports.map((passport, index) => <div key={index}>    
            <span className="fa fa-close" onClick={() => this.handleDeletePassport(index)}></span>
            <div className="form-group">
                <label>Серія та номер закордонного паспорту</label>
                <div className="row">
                    <div className="col-md-4">
                        <input value={passport.seria} onChange={(e) => this.handleUpdatePassportSeria(e.target.value, index)} type="text" className="form-control" placeholder="НН" maxLength="4" />
                    </div>
                    <div className="col-md-8">
                        <input value={passport.no} onChange={(e) => this.handleUpdatePassportNo(e.target.value, index)} type="text" className="form-control" placeholder="ХХХХХХ" maxLength="8" />
                    </div>                        
                </div>
            </div> 
            <div className="form-group">
                    <label>Термін дії паспорту</label>
                    <Datetime value={this.displayExpireDate(passport.expireDate)} dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true} maxLength="10" onChange={(v) => this.handleUpdateExpirationDate(v.format("YYYY-MM-DD"), index)} />
                </div>    
            <div className="form-group">
                <label>Фото першої сторінки закордонного паспорту</label>
                <PhotoLoader 
                value={passport.photoId} 
                desc={"Фото першої сторінки закордонного паспорту"}  
                onRemove={() => this.handleUpdatePhotoId(null, index)} 
                onUpdate={(id) => this.handleUpdatePhotoId(id, index)} /> 
            </div> 
            </div> )
    }

    render(){
        return <div className="additional-passports">
            <div className="form-group">
                <button type="button" className="btn btn-primary" onClick={this.handleAddPassport}>Додати закордонний паспорт</button>
            </div>
            {this.handleRenderPassports()}
        </div>
    }
}
export default ForeignPassportsComponent;