import { object, string } from "yup";
import { errorMessages } from "../common/errorMessages";

export const signUpSchema = object()
  .shape({
    email: string().email(errorMessages.email).required(),
  })
  .required();
