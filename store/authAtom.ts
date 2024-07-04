import { atom } from "jotai";

interface UserType {
	name: string;
	email: string;
	userId: string;
	teamIds: [string];
	timezone: string;
	workingHours: { start: string; end: string };
}

export const userAtom = atom<UserType | undefined>("user", undefined);
