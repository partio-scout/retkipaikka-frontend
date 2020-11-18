import React, { useState } from "react";
import Admin from "../../containers/Admin";
import { useScreenSize } from "../../helpers/Helpers"

const AdminTable = (props) => {
    //objEntries=[{id:"location_test",t:"admin.test"}]
    const { getRowData, data, objEntries, t } = props;
    const [currentSort, setCurrentSort] = useState("");
    // 1 asc, -1 desc
    const [sortType, setSortType] = useState(1);
    const { isMobile } = useScreenSize();
    const handleListClick = (e) => {
        let id = e.target.id;
        // get the id and compare it to current sort type
        // if same column is clicked, change sort type
        // if other column is clicked set it to current sort
        if (id) {
            if (id === currentSort) {
                setSortType(sortType * -1)
            } else {
                setCurrentSort(id)
            }
        }

    }


    const handleSort = () => {
        // component is used in two places, if it's in locations, use search results
        let newResults = [...data]
        newResults = newResults.sort((a, b) => {
            switch (sortType) {
                case 1:
                    return ('' + a[currentSort]).localeCompare(b[currentSort])

                case -1:
                    return ('' + b[currentSort]).localeCompare(a[currentSort])

                default:
                    return a.id - b.id;
            }

        })
        return newResults;

    }
    const generateListItems = () => {
        let results = handleSort();
        const values = results.map((location) => {
            let val = getRowData(location)
            if (isMobile) {
                let sliced = val.props.children.slice(0, 2);
                val = React.cloneElement(val, { children: sliced })

            }
            return val;

        })
        let tempEntries = objEntries
        if (isMobile) {
            tempEntries = objEntries.slice(0, 2)
        }
        let image = <img className={sortType === 1 ? "sort-icon" : "sort-icon inverse-icon"} alt="imgarrow" src={_ICON_PATH_ + "arrow.svg"} />
        let head = (<thead>
            <tr onClick={handleListClick}>
                {tempEntries.map(entry => {
                    return <th key={entry.id} id={entry.id} scope="col">{t(entry.t)}{currentSort === entry.id && image}</th>
                })}
            </tr>
        </thead>)

        let body = (<tbody className="admin-table-row">
            {values}
        </tbody>)

        return (<table className="table table-hover">
            {head}
            {body}
        </table>)


    }

    return generateListItems()
}
AdminTable.defaultProps = {
    getRowData: () => { },
    data: [],
    objEntries: [],
    t: () => { }
}

export default AdminTable;