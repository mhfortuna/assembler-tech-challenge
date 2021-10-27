import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Scrollbars } from "react-custom-scrollbars";
import { getCurrentUser, onAuthStateChanged } from "./services/auth";
import { logIn } from "./redux/user/actions";
import { signInUserData } from "./api/auth-api";
import { on } from "./utils/customEvents";

import RouterComponent from "./components/Router";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  async function handleExistingUser() {
    const dbUser = (await signInUserData()).data.data;

    dispatch(
      logIn({
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        isLogged: true,
        mongoId: dbUser._id,
      }),
    );
    setLoading(false);
  }

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        handleExistingUser();
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    on("setLoginReduxState", () => {
      const firebaseUser = getCurrentUser();
      handleExistingUser(firebaseUser);
    });
  });

  return (
    <Scrollbars
      autoHide
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            zIndex: 1000,
            position: "absolute",
            width: "6px",
            transition: "opacity 200ms ease 0s",
            opacity: 0,
            right: "2px",
            bottom: "2px",
            top: "2px",
            borderRadius: "3px",
          }}
        />
      )}
    >
      {!loading && <RouterComponent />}

      <ToastContainer draggable theme="colored" />
    </Scrollbars>
  );
}

export default App;
