import { atom } from "jotai";
import { UserType } from "./authAtom";

interface SelectedTeamType {
	name: string;
	description: string;
	users: UserType[];
}

export const selectedTeamAtom = atom<[SelectedTeamType] | undefined>(undefined);
