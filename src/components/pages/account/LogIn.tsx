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
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";

const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty({ message: "Password is required." }),
});

type LogInFormFieldsType = z.infer<typeof logInSchema>;

const logIn = async ({
  auth,
  email,
  password,
}: {
  auth: Auth;
  email: string;
  password: string;
}): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

const LogIn = () => {
  const form = useForm<LogInFormFieldsType>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { next, nextSearch } = useNext();
  const user = useUser();
  const firebase = useFirebase();

  const {
    mutate: signIn,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: logIn,
    onSuccess: () => {
      navigate(next || "/tos");
    },
  });

  if (user && next) {
    return <Navigate to={next} />;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Form {...form}>
        <form
          className="m-auto flex w-full max-w-md flex-col gap-4"
          onSubmit={form.handleSubmit((data) =>
            signIn({
              auth: firebase.auth,
              email: data.email,
              password: data.password,
            }),
          )}
        >
          <h2 className="font-tall text-2xl uppercase md:text-4xl">Log In</h2>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="password" />
                </FormControl>
                <FormDescription>A very secure password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button className="uppercase" asChild>
              <input type="submit" value="log in" />
            </Button>
          </div>
          <Message
            message={
              isSuccess
                ? "Successfully logged you in."
                : isError
                  ? "There was an issue logging you in."
                  : ""
            }
            type={isError ? "error" : "info"}
          />
        </form>
      </Form>
      <Button variant="link" size="link" asChild>
        <Link
          to={{
            pathname: "/reset-password",
            search: nextSearch,
          }}
        >
          Forgot your password?
        </Link>
      </Button>
    </div>
  );
};

export default LogIn;
