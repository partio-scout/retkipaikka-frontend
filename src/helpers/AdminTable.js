import React, { useState } from "react";
import Admin from "../containers/Admin";


const AdminTable = (props) => {
    //objEntries=[{id:"location_test",t:"admin.test"}]
    const { getRowData, data, objEntries, t } = props;
    const [currentSort, setCurrentSort] = useState("");
    // 1 asc, -1 desc
    const [sortType, setSortType] = useState(1);


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
            return getRowData(location)

        })

        let image = <img className={sortType === 1 ? "sort-icon" : "sort-icon inverse-icon"} alt="imgarrow" src={_ICON_PATH_ + "arrow.svg"} />
        let head = (<thead>
            <tr onClick={handleListClick}>
                {objEntries.map(entry => {
                    return <th id={entry.id} scope="col">{t(entry.t)}{currentSort === entry.id && image}</th>
                })}
            </tr>
        </thead>)

        let body = (<tbody>
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