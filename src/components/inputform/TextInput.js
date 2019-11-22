import React from "react";
import "./inputform.css"
import { Typeahead } from "react-bootstrap-typeahead"
import 'react-bootstrap-typeahead/css/Typeahead.css';

class TextInput extends React.Component {
    state = {
        currentText: this.props.placeholder || "Kirjoita paikannimi"
    }

    getNamesFromData = () => {
        const { data } = this.props;
        let newArr = [];
        data.forEach(value => {
            newArr.push(value.object_name);

        })
        return newArr


        //data.forEach(value => {
        //  if (
        //}
        // })


    }
    handleFiltering = (e) => {
        const { data } = this.props;
        console.log(e);
        let temp = e[0];
        if (temp !== "") {
            let value = data.filter(d => d.object_name === temp);
            if (value.length !== 0) {
                let modifiedObj = JSON.parse(JSON.stringify(value[0]));
                modifiedObj["object_type"] = "city"
                this.props.applyFilter(modifiedObj);
            }
        }

    }
    render() {
        const { currentText } = this.state;
        const { title, data, customClassName, helper, required, defaultInputValue } = this.props;
        let req = required ? true : false;
        let className = customClassName ? customClassName : "inputform-select";
        return (
            <div className={customClassName}>
                {title !== undefined && helper ? <label >{title}</label> : <span className="inputform-title">{title}</span>}

                <Typeahead
                    paginationText="Näytä lisää"
                    inputProps={{ required: req }}
                    defaultInputValue={defaultInputValue ? defaultInputValue : ""}
                    id={"type-ahead " + className}
                    placeholder={currentText}
                    onChange={(selected) => {
                        this.handleFiltering(selected);
                        !helper && this.setState({ selected: [] })
                    }}
                    options={this.getNamesFromData(data)}
                    selected={this.state.selected}
                    maxResults={5}
                />
                {helper && <small id={title + "Help"} className="form-text text-muted">{helper}</small>}


            </div>
        )
    }
}

export default TextInput;