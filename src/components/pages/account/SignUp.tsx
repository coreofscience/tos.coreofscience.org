import useFirebase from "../../../hooks/useFirebase";
import { AsyncActionStateType } from "../../../types/asyncActionStateType";
import { Message } from "../../common/Message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  sendEmailVerification,
  User,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FC, Fragment } from "react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { object, string, boolean } from "yup";

type SignUpFormFieldsType = {
  name: string;
  email: string;
  password: string;
  acceptsEmail?: boolean;
};

const signUpSchema = object()
  .shape({
    name: string().required(),
    email: string().required().email("Invalid email address"),
    password: string().required().min(8, "Invalid password"),
    acceptsEmail: boolean(),
  })
  .required();

export type SignUpActionsType = {
  signUp: (data: SignUpFormFieldsType) => void;
};

export const useSignUp = (): [AsyncActionStateType, SignUpActionsType] => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [state, setState] = useState<AsyncActionStateType>({
    status: "idle",
    message: "",
  });

  const signUp = useCallback(
    (data: SignUpFormFieldsType) => {
      setState({
        status: "in-progress",
        message: "Creating account...",
      });
      createUserWithEmailAndPassword(firebase.auth, data.email, data.password)
        .then((userCredential: UserCredential) => {
          setState({
            status: "success",
            message:
              "Successfully signed up, you will be redirected to home in a few...",
          });

          setDoc(
            doc(firebase.firestore, `/users/${userCredential.user.uid}`),
            {
              acceptsEmail: data.acceptsEmail,
            },
            { merge: true },
          );

          updateProfile(userCredential.user, {
            displayName: data.name,
          });

          setTimeout(() => {
            navigate("/tos");
            const user: User = userCredential.user;
            if (user) sendEmailVerification(user);
          }, 500);
        })
        .catch((error) => {
          setState({
            status: "failure",
            message:
              error.code === "auth/email-already-in-use"
                ? "An account already exists with the email you entered"
                : "There was an error creating your account, please try again",
          });
        });
    },
    [firebase.auth, firebase.firestore, navigate],
  );

  return [state, { signUp }];
};

const SignUp: FC = () => {
  const form = useForm<SignUpFormFieldsType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      acceptsEmail: false,
    },
    resolver: yupResolver(signUpSchema),
  });

  const [signUpState, signUpActions] = useSignUp();

  return (
    <Fragment>
      <form
        className="m-auto flex max-w-md flex-col gap-4"
        onSubmit={form.handleSubmit(signUpActions.signUp)}
      >
        <h2 className="font-tall text-2xl uppercase md:text-4xl">Sign Up</h2>
        <div className="flex flex-col gap-2">
          <input
            {...form.register("name")}
            type="text"
            className="rounded-sm border border-stone-500 p-2"
            placeholder="Name"
          />
          <Message message={form.formState.errors.name?.message} type="error" />
        </div>
        <div className="flex flex-col gap-2">
          <input
            {...form.register("email")}
            type="email"
            className="rounded-sm border border-stone-500 p-2"
            placeholder="email@example.com"
          />
          <Message
            message={form.formState.errors.email?.message}
            type="error"
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            {...form.register("password")}
            type="password"
            className="rounded-sm border border-stone-500 p-2"
            placeholder="password"
          />
          <Message
            message={form.formState.errors.password?.message}
            type="error"
          />
        </div>
        <div className="flex flex-row items-baseline">
          <input
            {...form.register("acceptsEmail")}
            type="checkbox"
            className="mr-2 h-4 w-4"
          />
          <label className="text-gray-700" htmlFor="acceptsEmail">
            I like to receive the Tree of Science newsletter to stay in touch
            and to learn about latest trends on literature searches and new
            product features first.
          </label>
        </div>
        <div>
          <input
            type="submit"
            className="rounded-sm bg-leaf px-4 py-2 font-tall font-bold uppercase text-slate-50"
            value="SIGN UP"
          />
        </div>
        <Message
          message={signUpState.message}
          type={signUpState.status === "failure" ? "error" : "info"}
        />
      </form>
    </Fragment>
  );
};

export default SignUp;
