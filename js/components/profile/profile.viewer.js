import React from "react";
import "../../../css/profile.viewer.css";
import * as photoService from "../photo-loader/services";
import classname from "classnames";

export class ProfileViewer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profile: {
                profileId: null,
                userId: null,
                name: '',
                surname: '',
                nation: '',
                gender: '',
                age: '',
                category: '',
                experience: '',
                squat: '',
                benchPress: '',
                deadlift: '',
                total: '',
                job: '',
                photo: null
            },
            loading: false,
            img: null
        }
        this.handleProfileChange = (field, e) => {
            let profile = this.state.profile;
            profile[field] = e.target.value;
            this.setState({profile: profile});
        }

        this.handlePhotoLoad = (target) => {
            if(!target.files.length){
                alert("Файл не обрано");
                return;
            } 
            if (target.files[0].type != "image/jpeg" && target.files[0].type != "image/png"){
                alert("Не вірний тип файлу");
                return;            
            } 
            var fd = new FormData;
            fd.append('img', target.files[0]);
            this.setState({loading: true});
            if(fd){
                photoService.uploadPhoto(fd).then((id) => {
                    let profile = this.state.profile;
                    profile['photo'] = id;
                    this.setState({profile: profile, loading: false});
                    this.getImg();
                })
            }
        }

        this.handlePhotoDelete = () => {
            let profile = this.state.profile;
            profile['photo'] = null;
            this.setState({profile: profile, img: null});
        }

        this.handleSubmit = () => {
            this.props.onSubmit(this.state.profile);
        }
    }

    componentDidMount(){
        if(this.props.profile) { 
            var tmpProf = {};
            for(var key in this.props.profile){
                tmpProf[key] = this.props.profile[key];
            }
            this.setState({profile: tmpProf}, () => this.getImg()); 
        }
    }

    photoSpinner(){
        return this.state.loading && <i className="fa-spin fa fa-circle-o-notch fa-5x"></i>
    }

    getImg(){
        if(this.state.profile.photo){
            this.setState({loading: true});
            photoService.getPhotoSrc({photoId: this.state.profile.photo}).then((data) => {
                this.setState({loading: false, img: data});                
            })
            this.forceUpdate();
        }
    }

    renderPhoto(){
        if(!this.state.img){
            return <input type="file" onChange={(e) => this.handlePhotoLoad(e.target)} />
        }else{
            return <div className="wrap-photo">
                <img src={this.state.img} width="200" alt="" className="profile-photo-img" />
                <i className="fa fa-trash" onClick={this.handlePhotoDelete}></i>
            </div>
        }
    }

    exportProfile(){
        this.openPreview();
        jQuery(".preview").wordExport();
        this.removePreview();
    }

    printProfile(){
        this.openPreview();
        jQuery.print(".preview");
        this.removePreview();  
    }

    openPreview(){
        jQuery("body").append("<div class='preview'></div>");
        jQuery(".preview").html(jQuery("#athleteProfile").html());
        jQuery(".preview input").each((x, v) => jQuery(v).replaceWith(' ' + jQuery(v).val().trim()));
        jQuery(".preview label").each((x, v) => jQuery(v).replaceWith('<b>' + jQuery(v).text() + '</b>'));
        jQuery(".preview .profile-title h2").attr("style", "font-size: 16px; color: #3767d6; font-weight: 600; font-style: italic;");
        jQuery(".profile-photo-img").attr("height", jQuery(".profile-photo-img").height());
        jQuery('.preview .btn').remove();
        jQuery('.preview .fa-trash').remove();
    }

    removePreview(){
        jQuery(".preview").html();
        jQuery(".preview").remove();
    }

    render(){
        let path = "../wp-content/plugins/requests-manager/js/components/profile/content/";
        let image = this.props.area === 'euro' ? 'epf.png' : 'ipf.png';
        image = path + image;

        let title = this.props.area === 'euro' ? 'European Powerlifting Federation lifters Profile' 
            : 'International Powerlifting Federation lifters Profile' ;
        let profile = this.state.profile;
        let invalidCondition = (!profile.name.length || !profile.surname.length || !profile.nation.length || !profile.gender.length
        || !profile.age.length || !profile.category.length || !profile.photo || this.state.loading);
        return(<div id="athleteProfile">
            <div className="profile-logo">
                <img src={image} alt='logo' />
            </div>
            <div className="profile-title">
                <h2>{title}</h2>
            </div>
            <div className="profile-content">
                <div className="main-info">
                    <div className="profile-content-row">
                        <div className="profile-content-col">
                            <label style={{width: '120px'}} 
                            className={classname({'invalid': !this.state.profile.name.length})}>First Name:</label>
                            <input type="text" value={this.state.profile.name} onChange={(e) => this.handleProfileChange('name', e)} />
                        </div>
                        <div className="profile-content-col">
                            <label style={{width: '120px'}}
                            className={classname({'invalid': !this.state.profile.surname.length})}>Last Name:</label>
                            <input type="text" value={this.state.profile.surname} onChange={(e) => this.handleProfileChange('surname', e)} />
                        </div>
                    </div>
                    <div className="profile-content-row">
                        <div className="profile-content-col">
                            <label className={classname({'invalid': !this.state.profile.nation.length})}>Nation:</label>
                            <input type="text" value={this.state.profile.nation} onChange={(e) => this.handleProfileChange('nation', e)} />
                        </div>
                        <div className="profile-content-col">
                            <label style={{width: '180px'}} 
                            className={classname({'invalid': !this.state.profile.gender.length})}>Male or Female:</label>
                            <input type="text" value={this.state.profile.gender} onChange={(e) => this.handleProfileChange('gender', e)} />
                        </div>
                    </div>                    
                </div>
                <div className="profile-content-row">
                    <div className="profile-content-col">
                        <label className={classname({'invalid': !this.state.profile.age.length})}>Age:</label>
                        <input type="text" value={this.state.profile.age} onChange={(e) => this.handleProfileChange('age', e)} />
                    </div>                                       
                </div>
                <div className="profile-content-row">
                    <div className="profile-content-col">
                        <label style={{width: '95px'}}
                        className={classname({'invalid': !this.state.profile.category.length})}>Category:</label>
                        <input type="text" value={this.state.profile.category} onChange={(e) => this.handleProfileChange('category', e)} />
                    </div> 
                </div>
                <div className="profile-content-row">
                    <div className="profile-content-col">
                        <label style={{width: '545px'}}>How many years competing:</label>
                        <input type="text" value={this.state.profile.experience} onChange={(e) => this.handleProfileChange('experience', e)} />
                    </div>                  
                </div>
                <div className="profile-content-row">
                    <div>
                        <label style={{width: '120px'}}>Personal Bests</label>
                    </div>
                    <div>
                        <div className="profile-content-col">
                            <label style={{width: '120px'}}>Squat: </label>
                            <input type="number" value={this.state.profile.squat} onChange={(e) => this.handleProfileChange('squat', e)} />
                        </div>
                        <div className="profile-content-col">
                            <label style={{width: '390px'}}>Bench Press: </label>
                            <input type="number" value={this.state.profile.benchPress} onChange={(e) => this.handleProfileChange('benchPress', e)} />
                        </div>
                        <div className="profile-content-col">
                            <label style={{width: '390px'}}>Deadlift: </label>
                            <input type="number" value={this.state.profile.deadlift} onChange={(e) => this.handleProfileChange('deadlift', e)} />
                        </div>
                        <div className="profile-content-col">
                            <label style={{width: '390px'}}>Total: </label>
                            <input type="number" value={this.state.profile.total} onChange={(e) => this.handleProfileChange('total', e)} />
                        </div>
                    </div>
                </div>
                <div className="profile-content-row">
                    <div className="profile-content-col">
                        <label>Job: </label>
                        <input type="text" value={this.state.profile.job} onChange={(e) => this.handleProfileChange('job', e)} />
                    </div>
                </div>
                <div className="profile-content-photo">
                    <div>
                        <label
                        className={classname({'invalid': !this.state.profile.photo})}>Picture: </label>
                        {this.renderPhoto()}
                        {this.photoSpinner()}
                    </div>
                </div>
            </div>
            <div className="profile-footer">
                <button type="button" className="btn btn-primary" onClick={this.handleSubmit} disabled={!!invalidCondition} ><i className="fa fa-save"></i> Зберегти</button>
                {
                    this.props.canPrint ? <button type="button" className="btn btn-default" onClick={this.printProfile.bind(this)} disabled={!!invalidCondition}>
                    <i className="fa fa-print"></i> Друк</button> : null
                }
                {
                    this.props.canPrint ? <button type="button" className="btn btn-default" onClick={this.exportProfile.bind(this)} disabled={!!invalidCondition}>
                    <i className="fa fa-file-word-o"></i> Експорт у Word</button> : null
                }
            </div>
        </div>)
    }
}