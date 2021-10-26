import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { PUBLIC } from "../../constants/routes";
// import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
// import { PUBLIC } from "../../constants/routes";
import { logOut } from "../../redux/user/actions";
import { signOut } from "../../services/auth";
import Button from "../Button";

import "./Header.scss";

function Header() {
  // const location = useLocation();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const history = useHistory();

  // const navlinkClasses =
  //   "fnt-caption d-flex justify-content-center align-items-center fnt-light nav-link header-links";

  const handleSignOut = async () => {
    dispatch(logOut());
    await signOut();
    history.go(0);
  };

  return (
    <header className="p-3 text-white clr-primary ">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>Prueba 1</li>
            <li>Pricing</li>
            <li>FAQs</li>
            <li>About</li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          {!userState.isLogged ? (
            <div className="text-end">
              <Link to={PUBLIC.SIGN_IN} className="btn btn-outline-light me-2">
                Login
              </Link>
              <Link to={PUBLIC.SIGN_UP} className="btn btn-warning">
                Sign-up
              </Link>
            </div>
          ) : (
            <>
              <p className="m-2">
                {`${userState.firstName} ${userState.lastName}`}{" "}
              </p>
              <div className="text-end">
                <Button handleClick={handleSignOut}>Sign out</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
