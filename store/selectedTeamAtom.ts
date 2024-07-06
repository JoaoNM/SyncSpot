import { atom } from "jotai";
import { UserType } from "@/store/authAtom";
import { TeamType } from "@/store/teamsAtom";

export interface SelectedTeamType extends TeamType {
	users: UserType[];
	schedules: ScheduleType[];
}

interface WorkingHours {
	start: string;
	end: string;
}
export interface ScheduleType {
	id: string;
	name: string;
	timezone: string;
	workingHours: WorkingHours;
}

export const selectedTeamAtom = atom<[SelectedTeamType] | undefined>(undefined);
