import React, { useEffect, useState } from "react";
import { locationFetch } from "../../actions/SearchResultsActions";
import { fetchFilters, fetchRegionsAndMunicipalities } from "../../actions/FilterActions"
import LocationEditDialog from "../admin/dialogs/LocationEditDialog"
import { useDispatch, batch } from "react-redux";

const SingleLocation = (props) => {
    const { match, t } = props;
    const [data, setData] = useState({})
    const dispatch = useDispatch();
    const handleInitialFetch = () => {
        batch(() => {
            dispatch(fetchFilters());
            dispatch(fetchRegionsAndMunicipalities());
        })

    }
    useEffect(() => {
        const id = match.params.id;

        if (id) {
            handleInitialFetch()
            const query = {
                where: {
                    location_id: id
                }

            }
            locationFetch(query).then(res => {
                if (res.length > 0) {
                    setData(res[0])
                }

            })
        }

    }, [])
    return (<div className="single-location-container">{data.location_id != null ? <LocationEditDialog data={data} t={t} /> : t("admin.triplocation_not_found")}</div>)

}

export default SingleLocation;