import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
// import { PUBLIC } from "../../constants/routes";
// import { logOut } from "../../redux/user/actions";
// import { signOut } from "../../services/auth";

import "./Header.scss";

function Header({ props }) {
  // const location = useLocation();
  // const dispatch = useDispatch();
  // const userState = useSelector((state) => state.user);

  // const history = useHistory();

  // const navlinkClasses =
  //   "fnt-caption d-flex justify-content-center align-items-center fnt-light nav-link header-links";

  // const handleSignOut = async () => {
  //   dispatch(logOut());
  //   dispatch(clearQueue());
  //   await signOut();
  //   history.push(PUBLIC.SIGN_IN);
  // };

  return (
    <header
      {...props}
      className="container-fluid px-3 px-sm-5 h-85 d-flex align-items-center fx-blur"
    >
      <div className="row m-0 w-100 d-flex align-items-center">asd</div>
    </header>
  );
}

export default Header;
