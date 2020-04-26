import React from "react";
import "./inputform.css"
import Select from "react-select"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getCorrectFilter } from "../../actions/FilterActions";
class SelectInput extends React.Component {
    state = {
        selectedOption: this.props.placeholder || "Valitse",
        selectedValues: []
    }
    handleSelect = (e) => {
        const { data, applyFilter, useFiltering, handleFormSelect } = this.props;
        if (useFiltering) {
            let temp = e.target.options[e.target.options.selectedIndex].id;
            let value = data.filter(d => {
                if (d.category_id === Number(temp) || d.filter_id === Number(temp)) {
                    return d;
                }
            })
            applyFilter(value[0]);
        } else {
            handleFormSelect(e);
        }

    }

    generateData = (data) => {
        const { language } = this.props;
        let mappedData = data.map((value, i) => {
            let id = value.category_id ? value.category_id : value.filter_id;
            //return (<option className={selectedValues.find(f => f === value) ? "inputform-checked" : null} key={i}>{value}</option>)
            return (<option id={id} key={i}>{getCorrectFilter(value, language)}</option>)
        })
        return mappedData;
    }
    render() {
        const { data, title, customClassName, defaultValue, id } = this.props;
        let dataForDropDown = this.generateData(data);
        let className = customClassName ? customClassName : "inputform-select";

        return (
            <div className={className}>
                {title !== undefined && <span className="inputform-title">{title}</span>}
                <select id={"location_category" + id} defaultValue={defaultValue ? defaultValue : ""} onChange={this.handleSelect} selected="s" className="form-control">
                    {dataForDropDown}
                </select>
                {/* <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={data}
                    placeholder={selectedOption}
                /> */}
            </div>
        )
    }
}

export default SelectInput;