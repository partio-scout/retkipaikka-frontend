import axios from "axios";
import React, { useEffect, useState } from "react"
import { getItemFromLocalStore } from "./Helpers"
export const superRoleIds = [2];

export const checkRoleValidity = () => {
    const user = getUser();
    const roles = user?.user?.roles;
    if (roles) {
        if (roles.find(r => superRoleIds.find(sRole => sRole === r.id))) {
            return true;
        }
    }
    return false;
}
export const login = async (dataObj) => {
    let status = false;

    await axios.post(_API_PATH_ + "/Users/login?include=user", dataObj).then(res => {
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
    }).catch((error) => {
        console.error(error)
        let msg = error?.response?.data?.error?.message;
        msg = msg != null ? msg : "Kirjautuminen epäonnistui";
        msg = msg.charAt(0).toUpperCase() + msg.slice(1)
        window.alert(msg)
    })
    return status;
}



export const getUser = () => {
    return getItemFromLocalStore("user", {});
}

export const changePassword = async (object) => {
    const { id } = getUser();
    let status = false;
    if (id) {
        await axios.post(_API_PATH_ + "/Users/change-password?access_token=" + id, object).then(res => {
            if (res.status === 204) {
                status = true;
                window.alert("Salasana vaihdettu")
            }
        }).catch(e => {
            window.alert("Salasanan vaihto epäonnistui")
        })
    }

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
    if (id) {
        await axios.post(_API_PATH_ + "/Users/logout?access_token=" + id, id).then(res => {
            if (res.status === 204) {
                status = true;
                localStorage.removeItem('user')
            } else {
                window.alert("Uloskirjautuminen epäonnistui!")
            }
        })
    }

    return status

}

export const modifyUserNotifications = async (notificationType, regions) => {
    const user = getUser();
    let status = false;

    if (user.id) {
        let userCopy = JSON.parse(JSON.stringify(user.user));
        userCopy.notifications = notificationType;
        let dataObj = { regions: regions, user: userCopy }
        await axios.patch(_API_PATH_ + "/Users/modifyUserNotifications?access_token=" + user.id, dataObj).then(res => {
            window.alert("Tallennus onnistui")
            status = true
        }).catch(err => {
            console.error(err);
            window.alert("Tallennus epäonnistui")

        })

    }
    return status;
}

export const modifyUser = async (data) => {
    const { id } = getUser();
    let status = false;
    if (id) {
        await axios.patch(_API_PATH_ + "/Users/editUser?access_token=" + id, data).then(res => {
            status = true;
            window.alert("Käyttäjän muokkaus onnistui")
        }).catch((e) => {
            console.error(e);
            window.alert("Käyttäjän muokkaus epäonnistui")
        })
    }
    return status;
}

export const deleteUser = async (data) => {
    const { id } = getUser();
    let status = false;
    if (id) {
        await axios.delete(_API_PATH_ + "/Users/" + data.admin_id + "?access_token=" + id).then(res => {
            status = true;
            window.alert("Käyttäjän poisto onnistui")
        }).catch((e) => {
            console.error(e);
            window.alert("Käyttäjän poisto epäonnistui")
        })
    }
    return status;

}
export const modifyOwnSettings = async (data) => {
    const { id } = getUser();
    let status = false;
    if (id) {
        await axios.patch(_API_PATH_ + "/Users/updateSettings?access_token=" + id, data).then(res => {
            status = true;
            window.alert("Tietojen tallennus onnistui")
        }).catch((e) => {
            console.error(e);
            window.alert("Tietojen tallennus epäonnistui")
        })
    }
    return status;

}

export const checkLoginStatus = async () => {
    const { id } = getUser();
    let status = false;
    if (id) {
        await axios.get(_API_PATH_ + "/Users/checkAccessToken/" + id).then(res => {
            if (!res.data) {
                localStorage.removeItem('user')
            }
            status = res.data;
        })
    }
    return status;
}
export const fetchSingleUser = async () => {
    const user = getUser();
    const { id, userId } = user;
    if (id) {
        return await axios.get(_API_PATH_ + "/Users/fetchUserData/" + userId + "?access_token=" + id).then(res => {
            let tempUser = { ...user };
            tempUser.user = res.data;
            localStorage.setItem('user', JSON.stringify(tempUser))
            return true
        }).catch(e => {
            console.error(e);
            return false
        })
    }
}

export const useLoginData = () => {
    const [loginStatus, setLoginStatus] = useState({ loading: true, loggedIn: false });
    const { id } = getUser();
    useEffect(() => {
        async function handleLogin() {
            const loggedIn = await checkLoginStatus();
            let obj = { loading: false, loggedIn: loggedIn }
            if (!loggedIn) {
                localStorage.removeItem("user")
            }
            setLoginStatus(obj)

        }
        handleLogin()

    }, [id])

    const changeLoginStatus = (bool) => {
        setLoginStatus({ loading: false, loggedIn: bool })
    }
    return {
        loading: loginStatus.loading,
        loggedIn: loginStatus.loggedIn,
        changeLoginStatus
    };
}

export const useUserData = () => {
    const { id, userId } = getUser();

    const [data, setData] = useState({
        currentUsers: [],
        newUsers: [],
        allRoles: [],
    });

    const fetchData = async () => {
        console.log("IN FETCHDATA", id, checkRoleValidity())
        if (id && checkRoleValidity()) {
            let filter = {
                include: [{ "relation": "roles" }]
            }
            await axios.get(_API_PATH_ + "/Users?filter=" + JSON.stringify(filter) + "&access_token=" + id).then(async res => {
                await axios.get(_API_PATH_ + "/Users/fetchAllRoles?access_token=" + id).then(response => {
                    let currentUsers = res.data.filter(u => !u.new_user);
                    let newUsers = res.data.filter(u => u.new_user);
                    setData({ currentUsers, newUsers, fetched: true, allRoles: response.data });
                })

            }).catch(e => {
                console.error(e);
            })
        }
    }

    useEffect(() => {
        fetchData();
    }, [id])



    return {
        ...data,
        fetchData
    }

}











