import { errorMessages } from "../common/errorMessages";
import { object, string } from "yup";

export const passwordResetSchema = object()
  .shape({
    email: string().required().email(errorMessages.email),
  })
  .required();
