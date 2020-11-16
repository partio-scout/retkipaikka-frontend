import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getUser, logOut } from "../../helpers/UserHelper"
import { askForConfirmation } from "../../helpers/Helpers"
import { useHistory } from "react-router-dom"

const AdminLogout = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery('(min-width:768px');
  const { user } = getUser()
  const { t } = props;
  let history = useHistory();
  const acceptFunc = async () => {
    let res = await logOut()
    if (res) {
      history.push("/")
    }
    handleClose()
  }
  const confirmationDialog = () => {
    askForConfirmation(t("main.logout_confirm_text"), t("main.logout_confirm"), acceptFunc, false)
  }
  const redirectToControl = () => {
    history.push("/hallinta")
    handleClose()
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <> {user ?
      !isMobile ?
        <div className="header-user-container">
          <button className="btn btn-primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Menu
      </button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <u style={{ margin: "5px" }} onClick={redirectToControl}>{user ? user.email : ""}</u>
            <button style={{ margin: "5px", width: "auto" }} onClick={confirmationDialog} className="btn btn-primary">{t("main.logout")}</button>
          </Menu>
        </div> :
        <div className="header-user-container">
          <u onClick={redirectToControl}>{user ? user.email : ""}</u>
          <button onClick={confirmationDialog} className="btn btn-primary">{t("main.logout")}</button>
        </div>
      : <></>}
    </>



  );
}

export default AdminLogout;