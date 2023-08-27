import { PaswordResetFormFieldsType } from "../../types";

export type PasswordResetActionsType = {
  sendEmail: (data: PaswordResetFormFieldsType) => void;
};
