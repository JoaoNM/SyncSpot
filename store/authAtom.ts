import { atom } from "jotai";

export interface UserType {
	name: string;
	email: string;
	userId: string;
	teamIds: string[];
	timezone: string;
	workingHours: { start: string; end: string };
}

export const userAtom = atom<UserType | undefined>(undefined);
