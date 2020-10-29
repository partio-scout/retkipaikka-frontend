import React from "react";
import "./inputform.css"
import { Typeahead } from "react-bootstrap-typeahead"
import 'react-bootstrap-typeahead/css/Typeahead.css';


class AutoCompleteInput extends React.Component {
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
        console.log(this.state)
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
        const { title, data, customClassName, helper, required, defaultInputValue, id, t, clearSelection } = this.props;
        let req = required;
        let inputVal = defaultInputValue;
        return (
            <div className={customClassName}>
                {title !== undefined && helper ? <label >{title}</label> : <span className="inputform-title">{title}</span>}
                <Typeahead
                    paginationText={t("main.show_more")}
                    inputProps={{ required: req, id: "type-ahead-" + id }}
                    defaultInputValue={inputVal}
                    id={"type-ahead-" + id}
                    placeholder={t("main.location_placeholder")}
                    onChange={(selected) => {
                        this.handleFiltering(selected);
                        clearSelection && this.setState({ selected: [] })
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

AutoCompleteInput.defaultProps = {
    title: undefined,
    data: [],
    customClassName: "",
    helper: undefined,
    required: false,
    defaultInputValue: "",
    id: null,
    t: () => { },
    applyFilter: () => { },
    clearSelection: true,


}

export default AutoCompleteInput;