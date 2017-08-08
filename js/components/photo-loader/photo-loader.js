import React from "react";
import Modal from "../modal/modal";
import PhotoLoaderForm from "./photo-loader-form";
import * as services from "./services";

class PhotoLoader extends React.Component{
    constructor(props){
        super(props);
        this.closeLoadForm = this.loadOff.bind(this);
        this.openLoadForm = this.loadOn.bind(this);
        this.onChose = this.chosePhoto.bind(this);
        this.onSave = this.savePhoto.bind(this);
    }
    componentWillMount(){
        this.setState({load: false, error: null, filesForLoading: null});
    }

    loadOn(){
        this.setState({load: true});
    }

    loadOff(){
        this.setState({load: false});
    }

    savePhoto(){
        if(this.state.filesForLoading){
            services.uploadPhoto(this.state.filesForLoading).then((id) => {
                console.log(id);
                this.props.onUpdate(id);
                this.setState({load: false, filesForLoading: null});
            })
        }
    }

    chosePhoto(target){
        this.setState({error: null, filesForLoading: null});
        if(!target.files.length){
            console.log("Файл не обрано");
            this.setState({error: "Файл не обрано"});
            return;
        } 
        if (target.files[0].type != "image/jpeg" && target.files[0].type != "image/png"){
            console.log("Не вірний тип файлу");
            this.setState({error: "Не вірний тип файлу"});
            return;            
        } 
        var fd = new FormData;
        fd.append('img', target.files[0]);
        this.setState({filesForLoading: fd});
        console.log(this.state);
    }

    render(){
        var photoControl = <div>
            <button type="button" className="btn btn-default">Показати</button>
            <button type="button" className="btn btn-default" onClick={this.props.onRemove} >Видалити</button>
        </div>;

        var addPhoto = <div>
            <button type="button" className="btn btn-default" onClick={this.openLoadForm}>Завантажити</button>
        </div>;

        return <div>
            {(this.props.value)? photoControl : addPhoto}
            <Modal target={this.state.load} onClose={this.closeLoadForm}>
                <PhotoLoaderForm photoDesc={this.props.desc} onChose={this.onChose}  onSave={this.onSave} error={this.state.error} />
            </Modal>
        </div>
    }
}
export default PhotoLoader;