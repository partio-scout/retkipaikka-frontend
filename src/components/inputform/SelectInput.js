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
        const { selectedValues } = this.state;
        const { applyFilter, data } = this.props;
        let temp = e.target.value;
        let value = data.filter(d => d.text === temp);
        this.props.applyFilter(value[0]);



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
        const { selectedValues } = this.state;
        let mappedData = data.map((value, i) => {
            //return (<option className={selectedValues.find(f => f === value) ? "inputform-checked" : null} key={i}>{value}</option>)
            return (<option key={i}>{value.text}</option>)
        })
        return mappedData;
    }
    render() {
        const { data, title } = this.props;
        let dataForDropDown = this.generateData(data);
        return (
            <div className="inputform-select">
                {title !== undefined && <span className="inputform-title">{title}</span>}
                <select onChange={this.handleSelect} selected="s" className="form-control">
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