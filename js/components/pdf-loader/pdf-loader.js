import React from 'react';
import PropTypes from 'prop-types';

import Preloader from '../preloader/preloader';
import PDFLoaderModal from './pdf-loader-modal';
import { openPDF, uploadPDF } from './services';

const PDFLoader = ({ value, desc, onRemove, onUpdate }) => {
    const hasValue = !!value && value !== '0';
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpenedPDFLoaderModal, setIsOpenedPDFLoaderModal] = React.useState(false);
    const [error, setError] = React.useState('Файл не обрано');
    const [filesForLoading, setFilesForLoading] = React.useState(null);

    const openPDFPreview = () => {
        if(!value) return;
        setIsLoading(true);
        openPDF({ pdfId: value }).then(url => { 
            setIsLoading(false);
            window.open(url, '_blank');
        });
    };

    const onOpenPDFLoaderModal = () => {
        setIsOpenedPDFLoaderModal(true);
    }

    const onClosePDFLoaderModal = () => {
        setIsOpenedPDFLoaderModal(false);
    };

    const onSelectPDF = (target) => {
        setError(null);
        setFilesForLoading(null);
        if(!target.files.length)
        {
            setError('Файл не обрано!');
            return;
        }
        if(target.files[0].type != 'application/pdf')
        {
            setError('Не вірний тип файлу. Оберіть файл у форматі pdf!');
            return;
        }
        const formData = new FormData;
        formData.append('pdfDoc', target.files[0]);
        setFilesForLoading(formData);
        setError(null);
    };

    const onSavePDF = () => {
        setIsLoading(true);
        if(!!filesForLoading)
        {
            uploadPDF(filesForLoading).then(id => { 
                onUpdate(id);
                setIsOpenedPDFLoaderModal(false);
                setFilesForLoading(false);
                setIsLoading(false);
            });
        }
    };

    return <React.Fragment>
        {
            hasValue ? 
            <FullPDFLoader onShow={openPDFPreview} onRemove={onRemove} /> : 
            <EmptyPDFLoader openLoadPDFModal={onOpenPDFLoaderModal} />
        }
        <PDFLoaderModal 
            show={isOpenedPDFLoaderModal}
            pdfDesc={desc}
            error={error}
            onClose={onClosePDFLoaderModal}
            onSelectPDF={onSelectPDF}
            onSave={onSavePDF}
        />
        <Preloader loading={isLoading} />
    </React.Fragment>
}

PDFLoader.propTypes = {
    value: PropTypes.string
}

const EmptyPDFLoader = ({ openLoadPDFModal }) => {
    return <div className="photoPanel">
        <button type="button" className="btn btn-default" onClick={openLoadPDFModal}>Завантажити</button>
    </div>
}

EmptyPDFLoader.propTypes = {
    openLoadPDFModal: PropTypes.func.isRequired
}

const FullPDFLoader = ({ onShow, onRemove }) => {
    return <div className="photoPanel">
        <button type="button" className="btn btn-default" onClick={onShow}>Показати</button>
        <button type="button" className="btn btn-default" onClick={onRemove} >Видалити</button>
    </div>
}

FullPDFLoader.propTypes = {
    onShow: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default PDFLoader;