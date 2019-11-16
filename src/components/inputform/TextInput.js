import React from "react";
import "./inputform.css"
import { Typeahead } from "react-bootstrap-typeahead"
import 'react-bootstrap-typeahead/css/Typeahead.css';

class TextInput extends React.Component {
    state = {
        currentText: this.props.placeholder || "Kirjoita paikannimi"
    }

    getNamesFromData = (data) => {
        console.log(data);
        let newArr = data.map(value => {
            return value.object_name;
        })
        return newArr;
    }
    handleFiltering = (e) => {
        const { data } = this.props;
        let temp = e[0];
        if (temp !== "") {
            let value = data.filter(d => d.object_name === temp);
            if (value.length !== 0) {
                this.props.applyFilter(value[0]);
            }
        }

    }
    render() {
        const { currentText } = this.state;
        const { title, data, customClassName } = this.props;
        let className = customClassName ? customClassName : "inputform-select";
        return (
            <div className={customClassName}>
                {title !== undefined && <span className="inputform-title">{title}</span>}

                <Typeahead
                    id={"type-ahead " + className}
                    placeholder={currentText}
                    onChange={(selected) => {
                        this.handleFiltering(selected);
                        this.setState({ selected: [] })
                    }}
                    options={this.getNamesFromData(data)}
                    selected={this.state.selected}
                />


            </div>
        )
    }
}

export default TextInput;