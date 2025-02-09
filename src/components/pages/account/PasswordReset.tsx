import useFirebase from "../../../hooks/useFirebase";
import useNext from "../../../hooks/useNext";
import useUser from "../../../hooks/useUser";
import { Message } from "../../common/Message";
import Button from "../../ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import { Input } from "../../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Auth, sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";

const sendEmail = async ({
  auth,
  email,
}: {
  auth: Auth;
  email: string;
}): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

const passwordResetSchema = z.object({
  email: z.string().email(),
});

type PaswordResetFormFieldsType = z.infer<typeof passwordResetSchema>;

const PasswordReset = () => {
  const form = useForm<PaswordResetFormFieldsType>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: "",
    },
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
    <Form {...form}>
      <form
        className="m-auto flex max-w-md flex-col gap-4"
        onSubmit={form.handleSubmit((data) =>
          send({ auth: firebase.auth, email: data.email }),
        )}
      >
        <h2 className="font-tall text-2xl uppercase md:text-4xl">
          Reset your passrword
        </h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="email@example.com"
                />
              </FormControl>
              <FormDescription>Enter your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
    </Form>
  );
};

export default PasswordReset;
