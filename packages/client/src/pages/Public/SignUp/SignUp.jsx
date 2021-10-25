import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";

import signUpSchema from "./sign-up-schema";
// import { createClient, signInUserData } from "../../../api/account-api";
import {
  signIn,
  signOut,
  // setCredentialsPersistance,
} from "../../../services/auth";

import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
// import Spinner from "../../../components/Spinner";

// import { isRegistering } from "../../../redux/user/actions";

import { PUBLIC } from "../../../constants/routes";
import Input from "../../../components/Input/Input";

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
    validationSchema: signUpSchema,
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
      <div className="row p-0 m-0 col col-12 pb-5 pb-sm-0 justify-content-center">
        {/* {loading ? (
          <div className="col col-12 col-lg-6">
            <Spinner />
          </div>
        ) : (
          <div className="col col-12 col-lg-6">Sign In</div>
        )} */}

        <div className="col col-12 col-lg-6">
          <h1 className="fnt-page-title mb-5">Sign up:</h1>
          <form onSubmit={formik.handleSubmit} className="row">
            <Input
              classNames="col-12 col-md-6"
              label="First Name"
              id="firstName"
              type="text"
              placeholder="First name"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.firstName}
              errorMessage={formik.errors.firstName}
              hasErrorMessage={formik.touched.firstName}
              disabled={loading}
            />
            <Input
              classNames="col-12 col-md-6"
              label="Last Name"
              id="lastName"
              type="text"
              placeholder="Last name"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.lastName}
              errorMessage={formik.errors.lastName}
              hasErrorMessage={formik.touched.lastName}
              disabled={loading.isLoading || loading.isError}
            />
            <Input
              classNames="col-12 col-md-6"
              label="Email"
              id="email"
              type="email"
              placeholder="name@example.com"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.email}
              errorMessage={formik.errors.email}
              hasErrorMessage={formik.touched.email}
              disabled={loading.isLoading || loading.isError}
            />

            <Input
              classNames="col-12 col-md-6"
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.password}
              errorMessage={formik.errors.password}
              hasErrorMessage={formik.touched.password}
              disabled={loading.isLoading || loading.isError}
            />

            <Input
              classNames="col-12 col-md-6"
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              errorMessage={formik.errors.confirmPassword}
              hasErrorMessage={formik.touched.confirmPassword}
              disabled={loading.isLoading || loading.isError}
            />
            <div className="form-footer-wrapper d-flex row mt-3">
              <div className="fnt-caption col col-6">
                Already have an account? <br /> Please,{" "}
                <Link to={PUBLIC.SIGN_IN}>sign in.</Link>
              </div>
              <div className="d-flex justify-content-end col col-6 text-end p-0">
                <div className="p-2">
                  <Button type="submit">Sign Up</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
