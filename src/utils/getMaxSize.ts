import { UserContextType } from "../types/userContextType";

const getMaxSize = (user: UserContextType | null): number => {
 const maxSizeByUser: { [plan: string]: number } = {
  pro: 100,
  basic: 10,
  free: 5,
 };
 if (user) {
  return maxSizeByUser[user.plan];
 }
 return maxSizeByUser.free;
};

export default getMaxSize
