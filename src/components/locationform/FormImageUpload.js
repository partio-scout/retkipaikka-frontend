import React from 'react';
import ImageUploader from 'react-images-upload';

class FormImageUpload extends React.Component {

    state = {
        pictures: []
    }

    onDrop = (picture) => {
        const { applyImage } = this.props;
        console.log(picture.length);


        this.setState({
            pictures: picture,
        });
        if (picture.length > 5) {
            picture.splice(5);
        }
        applyImage(picture);
    }

    getPreviewPics = () => {
        const { pictures } = this.state;
        let previewData = pictures.map(pic => {

            return <img className="preview-img" src={img} />
        })

        return previewData
    }

    render() {
        const { pictures } = this.state;
        let className = "btn btn-primary"
        if (pictures.length >= 5) {
            className += " upload-btn-disabled"
        }
        console.log(this.state.pictures.length, "pictures in state");
        let previewImages = this.getPreviewPics();

        return (
            <div>
                <ImageUploader
                    withIcon={false}
                    buttonText='Lisää kuvia'
                    buttonClassName={className}
                    fileSizeError="Kuva on liian suuri"
                    fileTypeError="Vääränlainen tiedostomuoto"
                    onChange={this.onDrop}
                    label="Maksimi tiedostokoko 7 MB, MAX 10 kuvaa. Sallitut tiedostomuodot jpg, png"
                    imgExtension={['.jpg', '.png',]}
                    maxFileSize={7000000}
                    withPreview={false}
                />
                <div className="preview-wrapper" >
                    {previewImages}
                </div>
            </div>



            // <ImagePreviewComponent
        );
    }
}
export default FormImageUpload;