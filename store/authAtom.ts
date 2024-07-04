import { atomWithStorage } from "jotai/utils";

interface UserType {
	name: string;
	email: string;
	userId: string;
	teamIds: [string];
	timezone: string;
	workingHours: { start: string; end: string };
}

export const userAtom = atomWithStorage<UserType | undefined>(
	"user",
	undefined
);
