import React from "react";
import { getCorrectFilter } from "../../actions/FilterActions"
const Tag = (props) => {
    const { tag, language } = props;
    return (
        <span key={tag.object_name} className={"tag tag-" + tag.object_type}>
            {getCorrectFilter(tag, language)}
            <span className="tag-cross" onClick={() => props.handleTagRemove(tag)}>
                x
        </span>
        </span>)


}

export default Tag;
