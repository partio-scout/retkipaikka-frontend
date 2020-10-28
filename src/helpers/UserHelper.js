import axios from "axios";



export const login = async (dataObj) => {
    //localStorage.setItem('user', JSON.stringify(user));
    // axios.post(
    // _API_PATH_ + "/Filters", data
    let status = false;
    try {
        await axios.post(_API_PATH_ + "/Users/login?include=user", dataObj).then(res => {
            console.log(res);
            if (res.data.id) {
                localStorage.setItem('user', JSON.stringify(res.data))
                status = true;
                // dispatch({
                //     type: LOG_IN,
                //     payload: res.data.id
                // })
            } else {
                window.alert("Kirjautuminen epäonnistui!")

            }
        })
    } catch (error) {
        console.error(error)
        window.alert("Kirjautuminen epäonnistui!")
    }
    return status;
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


export const getUser = () => {
    const user = localStorage.getItem('user')
    if (IsJsonString(user) && user !== null) {
        return JSON.parse(user)
    }
    return {};
}

export const changePassword = async (object) => {
    const { id } = getUser();
    let status = false;

    await axios.post(_API_PATH_ + "/Users/change-password?access_token=" + id, object).then(res => {
        console.log(res)
        if (res.status === 204) {
            status = true;
            window.alert("Salasana vaihdettu")
        }
    }).catch(e => {
        window.alert("Salasanan vaihto epäonnistui")
    })
    return status;
}
export const register = async (object) => {
    let status = false;
    await axios.post(_API_PATH_ + "/Users/createUser", object).then(res => {
        if (res.status === 204) {
            status = true
            window.alert("Käyttäjä luotu")
        } else {
            window.alert("Käyttäjän luonti epäonnistui!")
        }

    })
    return status;

}
export const logOut = async () => {
    const { id } = getUser();
    let status = false;
    await axios.post(_API_PATH_ + "/Users/logout?access_token=" + id, id).then(res => {
        if (res.status === 204) {
            status = true;
            localStorage.removeItem('user')
        } else {
            window.alert("Uloskirjautuminen epäonnistui!")
        }
        //console.log(res, "RSEPONSE")
    })
    return status

}


export const checkLoginStatus = async () => {
    const user = localStorage.getItem('user')
    console.log("checkLoginStatus", "LOGINSTATUS")
    if (user) {
        if (IsJsonString(user)) {
            const { id, userId } = JSON.parse(user);
            return await axios.get(_API_PATH_ + "/Users/checkAccessToken/" + id).then(res => {
                console.log(res, "RESASDASD")
                if (!res.data) {
                    localStorage.removeItem('user')
                }
                return res.data;
            })
        }



    }
    return false
}





