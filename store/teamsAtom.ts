import { atom } from "jotai";

interface TeamType {
	name: string;
	description: string;
	userIds?: [string];
}

export const teamsAtom = atom<[TeamType] | undefined>(undefined);