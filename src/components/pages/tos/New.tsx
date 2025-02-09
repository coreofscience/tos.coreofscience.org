/**
 * Create trees from search queries.
 */
import useFirebase from "../../../hooks/useFirebase";
import useUser from "../../../hooks/useUser";
import { FirebaseContextType } from "../../../types/firebaseContext";
import { UserContextType } from "../../../types/userContextType";
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
import { logEvent } from "firebase/analytics";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const createOpenAlexTree = async ({
  firebase,
  search,
  user,
}: {
  firebase: FirebaseContextType;
  search: string;
  user: UserContextType | null;
}): Promise<string> => {
  const treesCollection = collection(
    firebase.firestore,
    user?.uid ? `users/${user.uid}/trees` : "trees",
  );
  const treeDoc = await addDoc(treesCollection, {
    queries: [
      {
        engine: "openalex",
        search,
      },
    ],
    createdDate: new Date().getTime(), // UTC timestamp.
    planId: user?.uid ? user.plan : null,
  });
  if (!treeDoc.path) {
    throw new Error("Failed creating a new document.");
  }
  return treeDoc.path;
};

const openAlexSchema = z.object({
  search: z.string().nonempty({ message: "Search query is required." }),
});

type OpenAlexFieldsType = z.infer<typeof openAlexSchema>;

const New = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const user = useUser();
  const form = useForm<OpenAlexFieldsType>({
    resolver: zodResolver(openAlexSchema),
    defaultValues: { search: "" },
  });

  const { mutate: create, isPending } = useMutation({
    mutationFn: createOpenAlexTree,
    onSuccess: (treePath: string) => {
      logEvent(firebase.analytics, "openalex_tree_created");
      navigate(`/${treePath}`, { replace: true });
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <Form {...form}>
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit((data) => {
            create({ firebase, search: data.search, user });
          })}
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Search</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="text-xl px-6 py-3"
                    placeholder="bit patterned media OR bit patterned magnetic recording"
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Your search query.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-center">
            <small className="text-slate-600">
              Your search will be executed in{" "}
              <Button variant="link" size="link" asChild>
                <a
                  href="https://openalex.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenAlex
                </a>
              </Button>{" "}
              before processing.
            </small>{" "}
            {(!user || user.plan !== "pro") && (
              <small className="text-slate-600">
                Works better using the pro plan, see{" "}
                <Button variant="link" size="link" asChild>
                  <Link to="/pricing">plans and pricing.</Link>
                </Button>
              </small>
            )}
          </p>
          <div className="flex flex-row items-center justify-center">
            <Button
              className="uppercase"
              size="huge"
              type="submit"
              disabled={isPending || !form.formState.isValid}
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
      {user && (
        <div className="flex flex-row items-center justify-center">
          <Button variant="link" size="link" asChild>
            <Link to="/history">Tree History</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default New;
