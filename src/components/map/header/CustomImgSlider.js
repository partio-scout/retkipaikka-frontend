import React, { useState, useCallback } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";

export const CustomImgSlider = (props) => {
    const [currentImage, setCurrentImage] = useState(0);


    const closeLightbox = () => {
        setCurrentImage(0);
        props.handleClose();
    };

    return (
        <div>
            <ModalGateway>
                <Modal imageCountSeparator=" / " onClose={closeLightbox}>
                    <Carousel
                        imageCountSeparator=" / "
                        currentIndex={currentImage}
                        views={props.photos.map(x => ({
                            ...x,
                        }))}
                    />
                </Modal>
            </ModalGateway>
        </div>
    );
}