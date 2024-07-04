import { atom } from "jotai";

export interface TeamType {
	name: string;
	teamId: string;
	description: string;
	userIds?: string[];
}

export const teamsAtom = atom<[TeamType] | undefined>(undefined);
