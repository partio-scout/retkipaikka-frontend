import React from 'react';
import ImageUploader from 'react-images-upload';

class FormImageUpload extends React.Component {

    state = {
        pictures: []
    }

    onDrop = (picture) => {
        const { applyImage } = this.props;
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        applyImage(picture);
    }

    render() {
        console.log(JSON.stringify(this.state.pictures));
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png',]}
                maxFileSize={5242880}
            />
        );
    }
}
export default FormImageUpload;