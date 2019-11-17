import React from "react";
import "./inputform.css"
import Select from "react-select"
import 'react-bootstrap-typeahead/css/Typeahead.css';

class SelectInput extends React.Component {
    state = {
        selectedOption: this.props.placeholder || "Valitse",
        selectedValues: []
    }
    handleSelect = (e) => {
        const { data, applyFilter, useFiltering, handleFormSelect } = this.props;
        if (useFiltering) {
            let temp = e.target.value;
            let value = data.filter(d => d.object_name === temp);
            applyFilter(value[0]);
        } else {
            //newE.target.value = data.filter(d => d.object_name === newE.target.value)[0].category_id;
            handleFormSelect(e);
        }




        // let inputValue = e.target.value;
        // let newValues = [...selectedValues];
        // if (inputValue === "Kaikki" || inputValue === "Ei suodattimia") {
        //     newValues = [];
        // } else {
        //     let index = newValues.indexOf(e.target.value);
        //     if (index !== -1) {
        //         newValues.splice(index, 1);
        //     } else {
        //         newValues.push(e.target.value);
        //     }
        // }
        // this.setState({ selectedValues: newValues });
    }

    generateData = (data) => {
        let mappedData = data.map((value, i) => {
            let id = value.category_id ? value.category_id : value.filter_id;
            //return (<option className={selectedValues.find(f => f === value) ? "inputform-checked" : null} key={i}>{value}</option>)
            return (<option id={id} key={i}>{value.object_name}</option>)
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