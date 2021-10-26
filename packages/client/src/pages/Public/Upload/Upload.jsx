/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
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
  const history = useHistory();

  const fetchCategories = async () => {
    const {
      data: { data },
    } = await getCategories();
    setCategories(data);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "gif",
      category: "",
      image: "",
    },
    validationSchema: uploadSchema,
    onSubmit: async (uploadState) => {
      if (isLoading) return null;
      setIsLoading(true);

      try {
        if (!uploadState.image)
          return toast("Choose a file!", { type: "error" });
        const uploadedURL = await uploadFileFirebase(uploadState.image);
        // const formData = new FormData();
        // formData.append("title", uploadState.title);
        // formData.append("type", uploadState.type);
        // formData.append("categoryId", uploadState.category);
        // formData.append("imageUrl", uploadedURL);

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
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mb-4 fnt-uppercase">Upload new content</h2>
        <form onSubmit={formik.handleSubmit} className="row">
          <Input
            classNames="col-12 col-md-6"
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
          <DragAndDrop
            dropText="Drop here the image file"
            handleChange={handleDrop}
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
