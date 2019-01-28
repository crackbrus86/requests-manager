import React from "react";
import Modal from "../../components/modal/modal";
import PropTypes from "prop-types";

class RequestPhotosModal extends React.PureComponent{
    render(){
        if(!this.props.photos.length) return null;
        return <Modal target={this.props.photos} onClose={this.props.onClose}>
            <h3>Фото до заявки</h3>
            <div style={{ width: 625, overflowY: "auto", height: 450, marginTop: 15 }}>
            {this.props.photos.map((photo, index) => <div key={index} style={{ width: 200, height: 200, float: 'left', padding: 5, cursor: "pointer" }}>
                <a href={photo} download>
                    <img src={photo} className="img-thumbnail" />
                </a>
            </div>)}</div>
        </Modal>
    }
}
RequestPhotosModal.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.string),
    onClose: PropTypes.func
}
export default RequestPhotosModal;