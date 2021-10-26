import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import signInSchema from "./sign-in-schema";
import { signInUserData } from "../../../api/auth-api";
import {
  signIn,
  // setCredentialsPersistance,
} from "../../../services/auth";

import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
// import Spinner from "../../../components/Spinner";

// import { isRegistering } from "../../../redux/user/actions";

import { PUBLIC } from "../../../constants/routes";
import Input from "../../../components/Input/Input";
import { logIn } from "../../../redux/user/actions";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  // const [saveCredentials, setSaveCredentials] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  // const credentialsCheckbox = useRef();

  // const handleSaveCredentials = () => {
  //   if (credentialsCheckbox.current.checked) {
  //     setSaveCredentials(true);
  //   } else {
  //     setSaveCredentials(false);
  //   }
  //   setCredentialsPersistance(credentialsCheckbox);
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (signInState) => {
      setLoading(true);

      // Set save credentials
      // handleSaveCredentials();
      try {
        await signIn(signInState.email, signInState.password);
        const dbUser = await signInUserData();
        const { firstName, lastName, _id: mongoId } = dbUser.data.data;
        console.log(dbUser);
        toast("Sign in successful", { type: "success" });

        dispatch(logIn({ firstName, lastName, isLogged: true, mongoId }));
        history.push(PUBLIC.HOME);
      } catch (error) {
        setLoading(false);
        toast(error.message, { type: "error" });
      }
    },
  });

  return (
    <Layout>
      <div className="row p-0 m-0 col col-12 pb-5 pb-sm-0 justify-content-center">
        {/* {loading ? (
          <div className="col col-12 col-lg-6">
            <Spinner />
          </div>
        ) : (
          <div className="col col-12 col-lg-6">Sign In</div>
        )} */}

        <div className="col col-12 col-lg-6">
          <h1 className="fnt-page-title mb-5">Sign in:</h1>
          <form onSubmit={formik.handleSubmit} className="row">
            <Input
              label="email"
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.email}
              errorMessage={formik.errors.email}
              hasErrorMessage={formik.touched.email}
              classNames="mb-1"
              disabled={loading}
            />
            <Input
              label="password"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.password}
              errorMessage={formik.errors.password}
              hasErrorMessage={formik.touched.password}
              classNames="mb-4"
              disabled={loading}
            />
            <div className="form-footer-wrapper">
              <div className="fnt-caption mt-4 row d-flex justify-content-between">
                <div className="d-flex justify-content-end col col-12 col-md-7 p-0">
                  <div className="p-2">
                    <Button submitButton>Log in</Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="fnt-caption mt-4 pe-4 text-end">
            Dont have an account yet?
            <br />
            Please, <Link to={PUBLIC.SIGN_UP}>sign up.</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
