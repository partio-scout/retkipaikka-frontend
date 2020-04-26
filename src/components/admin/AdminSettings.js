import React from "react";


const AdminSettings = ({ handleClick, selectedTab, t }) => {
    // regular admin settings
    const regionNotifications = () => {


        // three options: none, all, selected regions
        // accept button 
        return (<div>
            region notification
        </div>)
    }

    const userInfo = () => {
        // email
        // amount of locations accepted, deleted
        // 
        return (<div>
            user info
        </div>)
    }
    const passwordChange = () => {
        //  two forms and a button, current pw, new pw, accept
        return (<div>
            password change
        </div>)
    }
    // settings for super admin
    const listAllUsers = () => {
        return (<div>
            list users
        </div>)

    }
    const newUserNotifications = () => {
        return (<div>
            new user notification
        </div>)

    }


    return (
        <div className="admin-settings-container">
            {regionNotifications()}
            {userInfo()}
            {passwordChange()}
            {listAllUsers()}
            {newUserNotifications()}


        </div>


    )

}

export default AdminSettings;