import React from "react";
import "./mapHeader.css";
import moment from "moment"
import { connect } from "react-redux";
import { selectLocation } from "../../../actions/MapActions"
import { getCorrectFilter } from "../../../actions/FilterActions"
import { CustomImgSlider } from "./CustomImgSlider"
// import ImageGallery from 'react-image-gallery';

// import "react-image-gallery/styles/css/image-gallery.css";


class SideSlider extends React.Component {
    state = {
        showGallery: null
    }
    getCorrectName = (id, type) => {
        const { commonFilters, filterTypes, language } = this.props;
        let loopArr = type === "filter" ? commonFilters : filterTypes;
        for (let i = 0; i < loopArr.length; ++i) {
            let filter = loopArr[i];
            if (filter[type + "_id"] === id) {
                return getCorrectFilter(filter, language)
            }

        }



    }
    generateFromSingleData = (obj) => {
        const { selectLocation, t, language } = this.props;
        return (
            <div>
                <h4>{t("admin.name")}:</h4>
                <span>{obj.location_name}</span>
                <br />

                {obj.location_description &&
                    <span>
                        <h4>{t("form.description")}</h4>
                        <span> {obj.location_description}</span>
                        <br />
                    </span>
                }
                {obj.location_pricing &&
                    <span>
                        <h4>{t("form.pricing")}:</h4>
                        <span> {obj.location_pricing}</span>

                    </span>}
                <h4>{t("form.contact")}:</h4>
                <span>{t("admin.owner")}: </span>
                <span>{obj.location_owner}</span>
                {obj.location_website &&
                    <span>
                        <br />
                        <span>{t("form.website")}: </span>
                        <span>{obj.location_website}</span>
                    </span>}
                {obj.location_mail &&
                    <span>
                        <br />
                        <span>{t("form.email")}: </span>
                        <span>{obj.location_mail}</span>
                    </span>}
                {obj.location_phone &&
                    <span>
                        <br />
                        <span>{t("form.phone")}: </span>
                        <span>{obj.location_phone}</span>
                    </span>}
                <h4>{t("form.info")}: </h4>
                <span>{t("admin.type")}: </span>
                <span>{this.getCorrectName(obj.location_category, "category")}</span>
                <br />
                {obj.filters.length !== 0 &&
                    <span>
                        <span>{t("form.properties")}: </span>
                        {obj.filters.map(f => {
                            return <span>{this.getCorrectName(f, "filter")}<br /></span>
                        })}
                    </span>
                }

                <br />
                <span>{t("form.added")}: </span>
                <span>{moment(obj.createdAt).format("DD.MM.YYYY")}</span>
                <br />
                <span>{t("form.edited")}: </span>
                <span>{moment(obj.updatedAt).format("DD.MM.YYYY")}</span>
                <br />
                <br />
                {obj.images.length > 0 &&
                    <h4 onClick={() => this.setState({ showGallery: obj })}><u>{t("form.photos")}</u></h4>

                }
                <h4 onClick={() => selectLocation(obj)} ><u>{t("form.show_on_map")}</u></h4>

            </div>
        )
    }
    getText = () => {
        return "<-";
    }
    getImages = () => {
        const { data } = this.props;
        let imgArr = data.images.map(img => {
            return { src: _API_PATH_ + "/Images/" + data.location_id + "/download/" + img }

        })
        return imgArr;
    }
    render() {
        const { showGallery } = this.state;
        console.log("render slider")
        let className = "map-side-slider component"
        let imgs = this.getImages();
        console.log(imgs)
        return (
            <div>
                <div className={this.props.class ? className + this.props.class : className}>
                    <img onClick={this.props.handleClose} className={"side-slider-icon-black-open"} src={_ICON_PATH_ + "arrow.svg"}></img>
                    {/* <button onClick={this.props.handleClose}>{this.getText()}</button> */}
                    <div className="side-slider-data">
                        {this.generateFromSingleData(this.props.data)}
                    </div>

                </div>
                {showGallery &&
                    <div>
                        <CustomImgSlider handleClose={() => this.setState({ showGallery: null })} photos={imgs} />


                        {/* <div className="image-gallery-blur"></div>
                        <div className="image-gallery-container">
                            <span onClick={() => this.setState({ showGallery: null })} className="slider-close-button">x</span>
                            <ImageGallery showIndex={true} showPlayButton={false} showThumbnails={false} items={imgs} />

                        </div> */}
                    </div>}




            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        results: state.searchResults.filteredResults,
        coords: state.map.coords,
        filterTypes: state.filters.locationTypeFilterList,
        commonFilters: state.filters.commonFilterList,
        language: state.general.language
    }
}
export default connect(mapStateToProps, { selectLocation })(SideSlider);