import useFirebase from "../../../hooks/useFirebase";
import useNext from "../../../hooks/useNext";
import useUser from "../../../hooks/useUser";
import { Message } from "../../common/Message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  Auth,
} from "firebase/auth";
import { Firestore, doc, setDoc } from "firebase/firestore";
import { FC, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { object, string, boolean } from "yup";

const signUp = async ({
  auth,
  firestore,
  name,
  email,
  password,
  acceptsEmail,
}: {
  auth: Auth;
  firestore: Firestore;
  name: string;
  email: string;
  password: string;
  acceptsEmail: boolean;
}): Promise<void> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await setDoc(
    doc(firestore, `/users/${userCredential.user.uid}`),
    {
      acceptsEmail: acceptsEmail,
    },
    { merge: true },
  );
  await updateProfile(userCredential.user, {
    displayName: name,
  });
  await sendEmailVerification(userCredential.user);
};

type SignUpFormFieldsType = {
  name: string;
  email: string;
  password: string;
  acceptsEmail: boolean;
};

const signUpSchema = object()
  .shape({
    name: string().required(),
    email: string().required().email("Invalid email address"),
    password: string().required().min(8, "Invalid password"),
    acceptsEmail: boolean().required(),
  })
  .required();

export type SignUpActionsType = {
  signUp: (data: SignUpFormFieldsType) => void;
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
  const firebase = useFirebase();
  const navigate = useNavigate();
  const { next } = useNext();
  const user = useUser();

  const {
    mutate: create,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      setTimeout(() => {
        navigate(next || "/tos");
      }, 500);
    },
  });

  if (user && next) {
    return <Navigate to={next} />;
  }

  return (
    <Fragment>
      <form
        className="m-auto flex max-w-md flex-col gap-4"
        onSubmit={form.handleSubmit((data) =>
          create({
            auth: firebase.auth,
            firestore: firebase.firestore,
            ...data,
          }),
        )}
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
          message={
            isSuccess
              ? "Account created successfully."
              : isError
                ? "There was an issue creating your account."
                : ""
          }
          type={isError ? "error" : "info"}
        />
      </form>
    </Fragment>
  );
};

export default SignUp;
