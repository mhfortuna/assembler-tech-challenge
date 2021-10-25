import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

import Button from "../Button";

import { PUBLIC } from "../../constants/routes";

import "./Input.scss";

export default function Input({
  label = false,
  id = "input-01",
  type = "",
  classNames,
  fullWidth = false,
  placeholder = "",
  inputFileText = "Choose your file",
  acceptFiles = "image/*",
  handleChange = () => {},
  handleBlur = () => {},
  handleInput = () => {},
  hasSubmitIcon,
  errorMessage,
  hasErrorMessage,
  hasForgotPassword,
  ...props
}) {
  const [fileName, setFileName] = useState(inputFileText);
  const onHandleChange = (e) => {
    setFileName(e.target.files[0]?.name || inputFileText);
    handleChange(e);
  };

  const componentClasses = `${classNames} custom-input d-flex flex-column mb-3`;
  const errorClassNames =
    "col col-12 error-msg fnt-smallest mt-2 mb-0 ps-3 w-100";

  let labelClassNames = "fnt-label-bold p-0 mb-2 ";
  let inputClassNames = "fnt-input-light fx-rounded ps-3 ";
  const uploadClassNames =
    "form-input positive-custom-upload-input fx-rounded file-input-wrapper ps-0";

  if (type === "file") {
    inputClassNames += "upload-input m-0 ";
  }

  labelClassNames += "positive-label";
  inputClassNames += "positive-input";

  if (fullWidth) {
    inputClassNames += " w-100";
  }

  return (
    <div
      className={
        hasSubmitIcon ? `${componentClasses} px-0 ` : `${componentClasses}`
      }
    >
      {label ? (
        <label className={labelClassNames} htmlFor={id}>
          {label}
        </label>
      ) : (
        <label className={labelClassNames} htmlFor={id}>
          &nbsp;
        </label>
      )}
      {type === "file" ? (
        <div className={uploadClassNames}>
          <div className="custom-upload-input fnt-input-light d-flex align-items-center px-3 truncate no-overflow">
            {fileName}
          </div>
          <input
            type={type}
            className="upload-input"
            id={id}
            name={id}
            placeholder={placeholder}
            onChange={onHandleChange}
            onBlur={handleBlur}
            onInput={handleInput}
            accept={acceptFiles}
            {...props}
          />
        </div>
      ) : (
        <div
          className={
            hasSubmitIcon
              ? "d-flex justify-content-between px-3"
              : "col col-12 p-0"
          }
        >
          <input
            type={type}
            className={
              hasSubmitIcon
                ? `${inputClassNames} flex-search flex-grow-1 px-0`
                : `${inputClassNames} form-input col-12`
            }
            id={id}
            name={id}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            onInput={handleInput}
            {...props}
          />
          {hasSubmitIcon && (
            <div className="ps-2 h-100 custom-add-icon">
              <Button isNegative submitButton>
                <IconContext.Provider
                  value={{
                    style: { fontSize: 18, margin: 4 },
                  }}
                >
                  <FaSearch />
                </IconContext.Provider>
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="row m-0">
        {hasErrorMessage && errorMessage ? (
          <p
            className={
              hasForgotPassword
                ? `${errorClassNames} col-md-6`
                : errorClassNames
            }
          >
            {errorMessage}
          </p>
        ) : (
          <p
            className={
              hasForgotPassword
                ? `${errorClassNames} col-md-6`
                : errorClassNames
            }
          >
            &nbsp;
          </p>
        )}
        {hasForgotPassword && (
          <p className="col col-12 col-md-6 mt-2 mb-0 fnt-smallest text-end w-100">
            Forgot your password? Reset it
            <Link to={PUBLIC.RESET_PASSWORD}>here.</Link>
          </p>
        )}
      </div>
    </div>
  );
}
