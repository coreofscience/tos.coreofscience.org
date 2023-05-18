import { useCallback, useContext } from "react";

import UserContext from "../context/UserContext";

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
