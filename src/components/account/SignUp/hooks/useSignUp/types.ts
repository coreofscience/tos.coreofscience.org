import { SignUpFormFieldsType } from "../../types";

export type SignUpActionsType = {
  signUp: (data: SignUpFormFieldsType) => void;
};
