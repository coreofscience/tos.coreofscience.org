export type UserContextType = {
 uid: string;
 name: string;
 email: string;
 emailVerified: boolean;
 plan: "pro" | "basic";
 acceptsEmail?: boolean;
};
