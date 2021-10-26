import React from "react";

import { capitalizeFirstLetter } from "../../utils/stringManipulation";

import "../Input/Input.scss";
import "./Select.scss";

export default function Select({
  label = "input-01",
  id = "input-01",
  classNames,
  value,
  isNegative = false,
  fullWidth = false,
  handleChange = () => {},
  handleBlur = () => {},
  errorMessage,
  hasErrorMessage,
  options = [],
}) {
  let selectClassNames =
    "fnt-input-light fx-rounded positive-input px-3 col custom-select ";
  let labelClassNames = "label-select fnt-label-bold mb-2 col col-12 p-0 ";
  const errorClassNames = "error-msg fnt-smallest mt-2 mb-0 ps-1 col col-12 ";

  if (isNegative) {
    labelClassNames += "negative-select-label";
    selectClassNames += "custom-negative-select";
  } else {
    labelClassNames += "positive-select-label";
    selectClassNames += "custom-positive-select";
  }

  if (fullWidth) {
    selectClassNames += " w-100";
  }
  return (
    <div
      className={`${
        fullWidth && "w-100"
      } ${classNames} d-flex flex-column mb-1 row m-0`}
    >
      <label className={labelClassNames} htmlFor={id}>
        {label}
      </label>
      <div className="col col-12 p-0">
        <select
          className={`${selectClassNames} form-input col-12`}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          id={id}
          name={id}
        >
          {options.map((option) => (
            <option
              key={option._id}
              value={option._id}
              className="custom-option"
            >
              {capitalizeFirstLetter(option.name)}
            </option>
          ))}
        </select>
      </div>
      {hasErrorMessage && errorMessage ? (
        <p className={errorClassNames}>{errorMessage}</p>
      ) : (
        <p className={errorClassNames}>&nbsp;</p>
      )}
    </div>
  );
}
