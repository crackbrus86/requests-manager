import React from "react";
import Modal from "../modal/modal";
import PhotoLoaderForm from "./photo-loader-form";
import * as services from "./services";
import Preloader from "../preloader/preloader";
require("../../../css/photo-loader.css");

class PhotoLoader extends React.Component{
    constructor(props){
        super(props);
        this.closeLoadForm = this.loadOff.bind(this);
        this.openLoadForm = this.loadOn.bind(this);
        this.onChose = this.chosePhoto.bind(this);
        this.onSave = this.savePhoto.bind(this);
        this.onShow = this.showPhoto.bind(this);
    }
    componentWillMount(){
        this.setState({load: false, error: "Файл не обрано", filesForLoading: null, loading: false, img: null});
    }

    loadOn(){
        this.setState({load: true});
    }

    loadOff(){
        this.setState({load: false, img: null});
    }

    savePhoto(){
        this.setState({loading: true});
        if(this.state.filesForLoading){
            services.uploadPhoto(this.state.filesForLoading).then((id) => {
                this.props.onUpdate(id);
                this.setState({load: false, filesForLoading: null, loading: false});
            })
        }
    }

    showPhoto(){
        if(!this.props.value) return;
        this.setState({loading: true});
        services.getPhotoSrc({photoId: this.props.value}).then((data) => {
            this.setState({img: data, loading: false});
        })
    }

    chosePhoto(target){
        this.setState({error: null, filesForLoading: null});
        if(!target.files.length){
            this.setState({error: "Файл не обрано"});
            return;
        } 
        if (target.files[0].type != "image/jpeg" && target.files[0].type != "image/png"){
            this.setState({error: "Не вірний тип файлу"});
            return;            
        } 
        var fd = new FormData;
        fd.append('img', target.files[0]);
        this.setState({filesForLoading: fd, error: null});
    }

    render(){
        var photoControl = <div className="photoPanel">
            <button type="button" className="btn btn-default" onClick={this.onShow}>Показати</button>
            <button type="button" className="btn btn-default" onClick={this.props.onRemove} >Видалити</button>
        </div>;

        var addPhoto = <div className="photoPanel">
            <button type="button" className="btn btn-default" onClick={this.openLoadForm}>Завантажити</button>
        </div>;

        var modalChild = (this.state.img)? <img src={this.state.img} className="user-photo" alt="" /> : <PhotoLoaderForm photoDesc={this.props.desc} onChose={this.onChose}  onSave={this.onSave} error={this.state.error} />;

        return <div>
            {(this.props.value && this.props.value !== "0")? photoControl : addPhoto}
            <Modal target={this.state.load || this.state.img} onClose={this.closeLoadForm}>
                {modalChild}
            </Modal>
            <Preloader loading={this.state.loading} />
        </div>
    }
}
export default PhotoLoader;