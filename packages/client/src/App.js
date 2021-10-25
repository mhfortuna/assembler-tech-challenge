import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "./services/auth";
// import { logIn } from "./redux/user/actions";
// import { signInUserData } from "./api/account-api";
// import { on } from "./utils/customEvents";

import RouterComponent from "./components/Router";

function App() {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userState = useSelector((state) => state.user);

  // async function handleExistingUser(firebaseUser) {
  //   const token = firebaseUser.multiFactor.user.accessToken;
  //   const dbUser = (await signInUserData(token)).data.data;

  //   dispatch(
  //     logIn({
  //       firstName: dbUser.firstName,
  //       profilePicture: dbUser.profilePicture || "",
  //       isLogged: true,
  //       mongoId: dbUser._id,
  //       googleProvider:
  //         firebaseUser.multiFactor.user.providerData[0].providerId ===
  //         "google.com",
  //     }),
  //   );
  //   setLoading(false);
  // }

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user && user.emailVerified && !userState.isRegistering) {
        // handleExistingUser(user);
      } else {
        setLoading(false);
      }
    });
  }, []);

  // useEffect(() => {
  //   on("setLoginReduxState", () => {
  //     const firebaseUser = getCurrentUser();
  //     handleExistingUser(firebaseUser);
  //   });
  // });

  return (
    <>
      {!loading && <RouterComponent />}

      <ToastContainer draggable theme="colored" />
    </>
  );
}

export default App;
