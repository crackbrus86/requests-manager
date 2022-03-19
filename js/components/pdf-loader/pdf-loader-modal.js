import React from 'react';

import Modal from '../modal/modal';

const PDFLoaderModal = ({ show, onClose, pdfDesc, error, onSelectPDF, onSave }) => {
    return <Modal target={show} onClose={onClose} >
        <React.Fragment>
            <h6>Завантажити документ</h6>
            <div className='form-group'>
                <label>{pdfDesc} <PDFLoaderError error={error} /></label>
                <input 
                    type='file'
                    className='form-control'
                    onChange={e => onSelectPDF(e.target)}
                />
            </div>
            <div className='form-group'>
                <button type='button' className='btn btn-primary' onClick={() => onSave()} disabled={!!error}>Завантажити</button>
            </div>
        </React.Fragment>
    </Modal>
}

const PDFLoaderError = ({ error }) => {
    return error && (<i className='invalid'>*<sub>{error}</sub></i>);
}

export default PDFLoaderModal;