import React from "react";



const Tag = (props) => {
    const { tag } = props;
    return (
        <span key={tag.object_name} className={"tag tag-" + tag.object_type}>
            {tag.object_name}
            <span className="tag-cross" onClick={() => props.handleTagRemove(tag)}>
                x
        </span>
        </span>)


}

export default Tag;
