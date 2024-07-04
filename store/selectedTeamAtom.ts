import { atom } from "jotai";
import { UserType } from "./authAtom";
import { TeamType } from "./teamsAtom";

export interface SelectedTeamType extends TeamType {
	users: UserType[];
}

export const selectedTeamAtom = atom<[SelectedTeamType] | undefined>(undefined);
