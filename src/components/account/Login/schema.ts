import { object, string } from "yup";
import { errorMessages } from "../common/errorMessages";

export const loginSchema = object()
  .shape({
    email: string().email(errorMessages.email).required(),
    password: string().min(8, errorMessages.password).required(),
  })
  .required();
