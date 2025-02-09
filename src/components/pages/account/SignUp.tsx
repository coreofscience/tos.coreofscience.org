import useFirebase from "../../../hooks/useFirebase";
import useNext from "../../../hooks/useNext";
import useUser from "../../../hooks/useUser";
import { Message } from "../../common/Message";
import Button from "../../ui/Button";
import { Checkbox } from "../../ui/Checkbox";
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
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  Auth,
} from "firebase/auth";
import { Firestore, doc, setDoc } from "firebase/firestore";
import { omit } from "lodash";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";

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
  acceptsEmail?: boolean;
}): Promise<void> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  if (acceptsEmail !== undefined) {
    await setDoc(
      doc(firestore, `/users/${userCredential.user.uid}`),
      {
        acceptsEmail: acceptsEmail,
      },
      { merge: true },
    );
  }
  await updateProfile(userCredential.user, {
    displayName: name,
  });
  await sendEmailVerification(userCredential.user);
};

const signUpSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  acceptsEmail: z.boolean().default(false).optional(),
});

type SignUpFormFieldsType = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const form = useForm<SignUpFormFieldsType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      acceptsEmail: false,
    },
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
    <Form {...form}>
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="John Doe" />
              </FormControl>
              <FormDescription>Enter your name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormDescription>A strong and secure password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acceptsEmail"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-2 leading-none">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  {...omit(field, "value", "onChange")}
                />
              </FormControl>
              <div className="flex flex-col gap-2">
                <FormLabel>Accept email marketing</FormLabel>
                <FormDescription>
                  I like to receive the Tree of Science newsletter to stay in
                  touch and to learn about latest trends on literature searches
                  and new product features first.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button className="uppercase" type="submit">
            Sing up
          </Button>
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
    </Form>
  );
};

export default SignUp;
