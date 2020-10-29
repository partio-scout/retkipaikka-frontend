import React from "react";
import Tag from "./Tag";
import "./tag.css";
import { connect } from "react-redux";
import { removeFilter } from "../../actions/FilterActions"




class TagBar extends React.Component {
    handleTagRemove = (tag) => {
        const { removeFilter } = this.props;
        console.log("tag remove", tag)
        removeFilter(tag);
    }
    createTags = () => {
        const { tagList, language, localTags, useGlobalState, handleDelete } = this.props;
        let tagArr = localTags;
        if (useGlobalState) {
            tagArr = tagArr.concat(tagList.commonFilters, tagList.locationFilters, tagList.locationTypeFilters);
        }
        console.log(tagArr)

        //tag types are
        //filter
        //locationtype
        //city
        //let tagList = [{ type: "city", text: "Tampere" }, { type: "filter", text: "sauna" }, { type: "filter", text: "vessa" }, { type: "locationtype", text: "laavu" }]
        return tagArr.map((tag, i) => {
            return (
                <Tag key={tag.object_name + i} language={language} tag={tag} handleTagRemove={useGlobalState ? this.handleTagRemove : handleDelete} />
            )
        })
    }

    render() {
        const { adminPage } = this.props;
        let tags = this.createTags();
        return (
            <div className="tag-container" style={adminPage ? { backgroundColor: 'white' } : {}}>
                {tags}
            </div>
        )
    }
}
TagBar.defaultProps = {
    useGlobalState: true,
    handleDelete: () => { },
    localTags: []
}
const mapStateToProps = state => {
    return {
        tagList: state.filters,
        language: state.general.language
    }
}
export default connect(mapStateToProps, { removeFilter })(TagBar);

