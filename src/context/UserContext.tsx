import { createContext } from "react";
import { UserContextType } from "../types/userContextType";

const UserContext = createContext<UserContextType | null>(null);
UserContext.displayName = "UserContext";

export default UserContext;
