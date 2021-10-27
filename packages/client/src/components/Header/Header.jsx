import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { PUBLIC } from "../../constants/routes";
// import { PUBLIC } from "../../constants/routes";
import { logOut } from "../../redux/user/actions";
import { signOut } from "../../services/auth";
import Button from "../Button";

import "./Header.scss";

function Header() {
  const location = useLocation();
  const searchInitialState =
    location.pathname === "/search"
      ? new URLSearchParams(useLocation().search).get("q")
      : "";
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState(searchInitialState);

  const handleSignOut = async () => {
    dispatch(logOut());
    await signOut();
    history.go(0);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchQuery.length > 0)
      history.push(`${PUBLIC.SEARCH}?q=${searchQuery}`);
  };

  const handleChange = async (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  return (
    <header className="p-3 text-white clr-primary ">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 gx-2">
            <li>
              <Link to={PUBLIC.HOME} className="p-2 secondary-link">
                Home
              </Link>
            </li>
            <li>
              <Link to={PUBLIC.UPLOAD} className="p-2 secondary-link">
                Upload
              </Link>
            </li>
            <li className="px-2">
              <div className="dropdown dropend">
                <button
                  className="m-0 text-end fnt-light dropdown-toggle"
                  type="button"
                  id="contextCategoryMenu"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </button>
                <ul
                  className="dropdown-menu  p-1"
                  aria-labelledby="contextCategoryMenu"
                >
                  <li className="nav-link">
                    <Link
                      className="secondary-link"
                      to={`${PUBLIC.CATEGORY}/sports`}
                    >
                      Sports
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      className="secondary-link"
                      to={`${PUBLIC.CATEGORY}/entertainment`}
                    >
                      Entertainment
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      className="secondary-link"
                      to={`${PUBLIC.CATEGORY}/reactions`}
                    >
                      Reactions
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      className="secondary-link"
                      to={`${PUBLIC.CATEGORY}/gaming`}
                    >
                      Gaming
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      className="secondary-link"
                      to={`${PUBLIC.CATEGORY}/meme`}
                    >
                      Meme
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      className="secondary-link"
                      to={`${PUBLIC.CATEGORY}/emotions`}
                    >
                      Emotions
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      className="secondary-link"
                      to={`${PUBLIC.CATEGORY}/action`}
                    >
                      Action
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      className="secondary-link"
                      to={`${PUBLIC.CATEGORY}/food`}
                    >
                      Food
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      className="secondary-link"
                      to={`${PUBLIC.CATEGORY}/animals`}
                    >
                      Animals
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            onSubmit={handleSearch}
          >
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
              value={searchQuery}
              onChange={handleChange}
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
