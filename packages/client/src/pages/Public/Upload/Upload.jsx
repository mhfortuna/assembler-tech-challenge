/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import DragAndDrop from "../../../components/DragAndDrop";
import Select from "../../../components/Select";
import { PUBLIC } from "../../../constants/routes";
import Spinner from "../../../components/Spinner";
import { getCategories } from "../../../api/categories-api";

import uploadSchema from "./upload-schema";
import { uploadFileFirebase } from "../../../services/storage/firebase-storage";
import { addContent } from "../../../api/content-api";

export default function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [hasDropped, setHasDropped] = useState(false);
  const history = useHistory();

  const fetchCategories = async () => {
    const {
      data: { data },
    } = await getCategories();
    setCategories(data);
  };

  const validURL = (str) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i",
    ); // fragment locator
    return !!pattern.test(str);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "gif",
      category: "",
      image: "",
      externalImageUrl: "",
    },
    validationSchema: uploadSchema,
    onSubmit: async (uploadState) => {
      if (isLoading) return null;
      setIsLoading(true);

      try {
        if (!uploadState.image && !validURL(uploadState.externalImageUrl)) {
          setIsLoading(false);
          return toast("Choose a file!", { type: "error" });
        }
        const uploadedURL = hasDropped
          ? await uploadFileFirebase(uploadState.image)
          : uploadState.externalImageUrl;
        // if (hasDropped) const uploadedURL = await uploadFileFirebase(uploadState.image);

        await addContent({
          title: uploadState.title,
          type: uploadState.type,
          categoryId: uploadState.category,
          imageUrl: uploadedURL,
        });
        setIsLoading(false);
        toast("uploaded content!", { type: "success" });
        return history.push(PUBLIC.HOME);
      } catch (error) {
        setIsLoading(false);
        return toast(error.message, { type: "error" });
      }
    },
  });

  const handleDrop = (file) => {
    formik.setFieldValue("image", file[0]);
    setHasDropped(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mb-4 fnt-uppercase">Upload new content</h2>
        <form onSubmit={formik.handleSubmit} className="row">
          <div className="row">
            <div className="col-6">
              <Input
                classNames="col-12"
                label="Title"
                id="title"
                type="text"
                placeholder="Title"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.title}
                errorMessage={formik.errors.title}
                hasErrorMessage={formik.touched.title}
                disabled={isLoading}
              />
              <p className="ms-1">
                You can paste a link at the bottom or drag and drop a file on
                the right!
              </p>
            </div>
            <div className="col-6">
              <DragAndDrop
                dropText="Drop here the image file"
                handleChange={handleDrop}
              />
            </div>
          </div>
          <Input
            classNames="col-12"
            label="External image URL"
            id="externalImageUrl"
            type="text"
            placeholder="Title"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.externalImageUrl}
            errorMessage={formik.errors.externalImageUrl}
            hasErrorMessage={formik.touched.externalImageUrl}
            disabled={hasDropped || isLoading}
          />
          <Select
            classNames="col-12 col-lg-6"
            label="category"
            id="category"
            type="select"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.category}
            errorMessage={formik.errors.category}
            hasErrorMessage={formik.touched.category}
            options={categories}
          />
          <Select
            classNames="col-12 col-lg-6"
            label="type"
            id="type"
            type="select"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.type}
            errorMessage={formik.errors.type}
            hasErrorMessage={formik.touched.type}
            options={[
              { _id: "gif", name: "gif" },
              { _id: "meme", name: "meme" },
            ]}
          />

          <Button submitButton>{isLoading ? <Spinner /> : "Upload!"}</Button>
        </form>
      </div>
    </Layout>
  );
}
