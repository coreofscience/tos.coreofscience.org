import { boolean, object, string } from "yup";
import { errorMessages } from "../common/errorMessages";

export const signUpSchema = object()
  .shape({
    name: string().required(),
    email: string().required().email(errorMessages.email),
    password: string().required().min(8, errorMessages.password),
    acceptsEmail: boolean(),
  })
  .required();
