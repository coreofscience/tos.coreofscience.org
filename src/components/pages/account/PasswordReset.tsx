import useFirebase from "../../../hooks/useFirebase";
import useNext from "../../../hooks/useNext";
import useUser from "../../../hooks/useUser";
import { Message } from "../../common/Message";
import Button from "../../ui/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Auth, sendPasswordResetEmail } from "firebase/auth";
import { FC, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { object, string } from "yup";

const sendEmail = async ({
  auth,
  email,
}: {
  auth: Auth;
  email: string;
}): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

type PaswordResetFormFieldsType = {
  email: string;
};

const passwordResetSchema = object()
  .shape({
    email: string().required().email("Invalid email address"),
  })
  .required();

const PasswordReset: FC = () => {
  const form = useForm<PaswordResetFormFieldsType>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(passwordResetSchema),
  });
  const firebase = useFirebase();
  const {
    mutate: send,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: sendEmail,
  });

  const user = useUser();
  const { next } = useNext();

  if (user && next) {
    return <Navigate to={next || "/"} />;
  }

  return (
    <Fragment>
      <form
        className="m-auto flex max-w-md flex-col gap-4"
        onSubmit={form.handleSubmit((data) =>
          send({ auth: firebase.auth, email: data.email }),
        )}
      >
        <h2 className="font-tall text-2xl uppercase md:text-4xl">
          Reset your passrword
        </h2>
        <div className="flex flex-col gap-2">
          <input
            {...form.register("email")}
            type="email"
            className="border border-stone-500 p-2"
            placeholder="email@example.com"
          />
          <Message
            message={form.formState.errors.email?.message}
            type="error"
          />
        </div>
        <div>
          <Button className="uppercase" asChild>
            <input type="submit" value="send" />
          </Button>
        </div>
        <Message
          message={
            isSuccess
              ? "Password reset email sent successfully."
              : isError
                ? "There was an issue sending your password reset email."
                : ""
          }
          type={isError ? "error" : "info"}
        />
      </form>
    </Fragment>
  );
};

export default PasswordReset;
