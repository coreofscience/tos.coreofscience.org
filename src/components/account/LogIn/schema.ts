import { errorMessages } from "../common/errorMessages";
import { object, string } from "yup";

export const loginSchema = object()
  .shape({
    email: string().required().email(errorMessages.email),
    password: string().required().min(8, errorMessages.password),
  })
  .required();
