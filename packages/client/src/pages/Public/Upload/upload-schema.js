import * as Yup from "yup";

const uploadSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "The title is too short")
    .max(30, "The title is too long"),
});

export default uploadSchema;
