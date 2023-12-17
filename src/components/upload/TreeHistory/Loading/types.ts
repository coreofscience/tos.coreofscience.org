import { UserContextType } from "../../../../types/userContextType";
import { useTreesType } from "../hooks/type";

export type LoadingPropsType = {
 user: UserContextType;
 proTrees: useTreesType;
 trees: useTreesType;
};
