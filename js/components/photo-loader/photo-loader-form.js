import React from "react";

class PhotoLoaderForm extends React.Component{
    render(){
        var error = (this.props.error)? <i className="invalid">*<sub>{this.props.error}</sub></i> : null;
        return <div>
            <h6>Завантаження фото</h6>
                <div className="form-group">
                    <label>{this.props.photoDesc} {error}</label>
                    <input type="file" className="form-control" onChange={(e) => this.props.onChose(e.target)} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" onClick={() => {this.props.onSave()}}>Завантажити</button>
                </div>
        </div>
    }
}
export default PhotoLoaderForm;