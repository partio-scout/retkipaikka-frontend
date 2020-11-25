import React from "react";


const AmountSelect = (props) => {
    const { t, changeLocationCount, customClassName, defaultVal } = props;
    return (
        <div className={customClassName}>
            <select id={"locationCount"} defaultValue={defaultVal} onChange={(e) => changeLocationCount(e.target.value)} className="form-control">
                <option value={100}>100</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
                <option value={"all"}>{t("main.all")}</option>
            </select>
        </div>
    )
}
AmountSelect.defaultProps = {
    customClassName: "header-location-select",
    defaultVal: 500
}
export default AmountSelect;