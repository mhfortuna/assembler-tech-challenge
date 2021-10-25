import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";

import signInSchema from "./sign-in-schema";
// import { createClient, signInUserData } from "../../../api/account-api";
import {
  signIn,
  signOut,
  // setCredentialsPersistance,
} from "../../../services/auth";

import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";

// import { isRegistering } from "../../../redux/user/actions";

import { PUBLIC } from "../../../constants/routes";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  // const [saveCredentials, setSaveCredentials] = useState(false);
  // const dispatch = useDispatch();
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
        const signInResponse = await signIn(
          signInState.email,
          signInState.password,
        );
        const token = signInResponse.user.multiFactor.user.accessToken;
        // await signInUserData(token);
        console.log(token);

        if (!signInResponse.user.multiFactor.user.emailVerified) {
          signOut();
          toast("Please verify your email!", { type: "error" });
        }
      } catch (error) {
        setLoading(false);
        toast(error.message, { type: "error" });
      }
    },
  });

  return (
    <Layout>
      <div className="row p-0 m-0 col col-12 pb-5 pb-sm-0">
        {loading ? (
          <div className="col col-12 col-lg-6">
            <Spinner />
          </div>
        ) : (
          <div className="col col-12 col-lg-6">Sign In</div>
        )}

        <div className="col col-12 col-lg-6">
          <form onSubmit={formik.handleSubmit} className="row">
            {/* <Input
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
              hasForgotPassword
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.password}
              errorMessage={formik.errors.password}
              hasErrorMessage={formik.touched.password}
              classNames="mb-4"
              disabled={loading}
            /> */}
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
            First time in WaveApp?
            <br />
            Please, <Link to={PUBLIC.SIGN_UP}>sign up.</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
