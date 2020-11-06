import React from 'react';
import ImageUploader from 'react-images-upload';

class FormImageUpload extends React.Component {

    state = {
        // pictures is new pics from add picture button
        // previouspictures is for old pictures to show on edit page
        pictures: [],
        previousPictures: [],
        imageURLArr: [],
        uploaderKey: 0

    }

    onDrop = (picture) => {
        const { pictures, previousPictures } = this.state;
        if (pictures.length + picture.length + previousPictures.length > 10) {
            let maxImgs = 10 - (previousPictures.length + pictures.length);
            picture.splice(maxImgs);
        }
        let picturesToSet = picture;
        if (this.checkIfEditPage()) {
            picturesToSet = pictures.concat(picture);
            this.setState({
                pictures: picturesToSet,
                uploaderKey: this.state.uploaderKey + 1
            }, () => this.getPreviewPics());
        } else {
            this.setState({
                pictures: picturesToSet,
            }, () => this.getPreviewPics());
        }
    }
    handleImageRemove = (i, isOld) => {
        const { pictures, previousPictures } = this.state;
        if (isOld) {
            previousPictures.splice(i, 1);
        } else {
            pictures.splice(i, 1);
        }
        this.setState({ pictures: pictures, previousPictures: previousPictures }, () => this.getPreviewPics())
    }
    checkIfEditPage = () => {
        const { imagesFromLocation } = this.props;
        if (imagesFromLocation) {
            return imagesFromLocation.images.length > 0;
        }
    }
    async componentDidMount() {
        const { imagesFromLocation } = this.props;

        if (this.checkIfEditPage()) {
            const oldImgs = imagesFromLocation.images;
            let imgArr = [];

            for (let i = 0; i < oldImgs.length; ++i) {
                let file = await this.createFile(oldImgs[i], imagesFromLocation.location_id);
                imgArr.push(file);
            }
            this.setState({ previousPictures: imgArr }, () => this.getPreviewPics())


        }
    }

    // generate files from url to preview them in edit form
    createFile = async (url, id) => {
        let response = await fetch(_API_PATH_ + "/Images/" + id + "/download/" + url);
        let data = await response.blob();
        let metadata = {
            type: 'image/jpeg'
        };
        let file = new File([data], url, metadata);
        return file
    }
    generatePreviews = async (pictures, isOld) => {
        let arr = [];
        for (let i = 0; i < pictures.length; ++i) {
            await this.reader(pictures[i]).then(result => {
                return arr.push(<div key={pictures[i].lastModified + "" + i} className="preview-img"><span onClick={() => this.handleImageRemove(i, isOld)} className="slider-close-button">x</span><img style={{ width: "100%" }} src={result} /></div>)
            });
        }


        return arr;
    }
    getPreviewPics = async () => {
        const { pictures, previousPictures, imageURLArr } = this.state;
        const { applyImage } = this.props;
        let arr = [];
        //await arr.concat(this.generatePreviews(pictures, false));
        let prevs = await this.generatePreviews(previousPictures, true);
        let newPics = await this.generatePreviews(pictures, false);
        arr = arr.concat(prevs, newPics)
        this.setState({ imageURLArr: arr });
        applyImage(pictures, previousPictures);
    }
    reader = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
    }

    render() {
        const { pictures, previousPictures, imageURLArr, uploaderKey } = this.state;
        const { imagesFromLocation } = this.props;
        let className = "btn btn-primary"
        if (pictures.length + previousPictures.length >= 10) {
            className += " upload-btn-disabled"
        }
        return (
            <div >
                <ImageUploader
                    key={uploaderKey}
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
                    {imageURLArr}
                </div>
            </div>



            // <ImagePreviewComponent
        );
    }
}

export default FormImageUpload;