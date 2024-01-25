import { UserContextType } from "../types/userContextType";
import { createContext } from "react";

const UserContext = createContext<UserContextType | null>(null);
UserContext.displayName = "UserContext";

export default UserContext;
