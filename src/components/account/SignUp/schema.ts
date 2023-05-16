import { object, string } from "yup";
import { errorMessages } from "../common/errorMessages";

export const signUpSchema = object()
  .shape({
    name: string().required(),
    email: string().email(errorMessages.email).required(),
    password: string().min(8, errorMessages.password).required(),
  })
  .required();
