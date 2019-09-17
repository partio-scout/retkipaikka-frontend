import React from "react";



const Tag = (props) => {
    const { tag } = props;
    return (
        <span className={"tag tag-" + tag.type}>
            {tag.text}
            <span className="tag-cross" onClick={() => props.handleTagRemove(tag)}>
                x
        </span>
        </span>)


}

export default Tag;
