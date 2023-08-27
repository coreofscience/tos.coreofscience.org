import { object, string } from "yup";
import { errorMessages } from "../common/errorMessages";

export const passwordResetSchema = object()
  .shape({
    email: string().required().email(errorMessages.email),
  })
  .required();
