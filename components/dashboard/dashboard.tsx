"use client";

import { FC, useEffect, useState } from "react";
import AssignUserToTeamForm from "@/components/dashboard/assign-user-to-team-form";
import { useUser } from "reactfire";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { UserType, userAtom } from "@/store/authAtom";
import { ScheduleType } from "@/store/selectedTeamAtom";
import { teamsAtom } from "@/store/teamsAtom";
import { useAtom } from "jotai";
import TeamSelector from "@/components/team-selector";
import { selectedTeamAtom } from "@/store/selectedTeamAtom";
import TimezoneCard from "@/components/overview/timezone-card";
import UserTimeBar from "@/components/overlap/user-time-bar";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import UpdateTeamForm from "@/components/dashboard/update-team-form";
import { TimezoneSelect } from "@/components/timezone-select";
import { HourSelect } from "@/components/dashboard/hour-select";
import moment from "moment-timezone";
import { AddSchedule } from "@/components/dashboard/add-schedule";
import { viewAtom } from "@/store/viewAtom";

export const Dashboard: FC = () => {
	const [startHour, setStartHour] = useState<number>(6);
	const [baseTimezone, setBaseTimezone] = useState<string>("GMT");
	const [sliderValue, setSliderValue] = useState<number>(0);
	const [selectedTeam, setSelectedTeam] = useAtom(selectedTeamAtom);
	const [view] = useAtom(viewAtom);
	const [userData, setUserData] = useAtom(userAtom);
	const [teams, setTeams] = useAtom(teamsAtom);
	const { data: user } = useUser();
	const { fetchUserData, fetchTeamData, readUserInfoFromTeam } =
		useFirebaseOperations();

	const [timezoneMap, setTimezoneMap] = useState<
		Map<string, { users: UserType[]; schedules: ScheduleType[] }>
	>(new Map());

	useEffect(() => {
		const newTimezoneMap = new Map<
			string,
			{ users: UserType[]; schedules: ScheduleType[] }
		>();

		if (selectedTeam) {
			// Group users by timezone
			selectedTeam.users.forEach((user: UserType) => {
				if (!newTimezoneMap.has(user.timezone)) {
					newTimezoneMap.set(user.timezone, { users: [], schedules: [] });
				}
				newTimezoneMap.get(user.timezone)!.users.push(user);
			});
			// Group schedules by timezone
			selectedTeam.schedules.forEach((schedule: ScheduleType) => {
				if (!newTimezoneMap.has(schedule.timezone)) {
					newTimezoneMap.set(schedule.timezone, { users: [], schedules: [] });
				}
				newTimezoneMap.get(schedule.timezone)!.schedules.push(schedule);
			});
		}

		setTimezoneMap(newTimezoneMap);
	}, [selectedTeam]);
	// Convert map to an array for rendering
	const timezoneCards = Array.from(timezoneMap.entries()).map(
		([timezone, data]) => (
			<TimezoneCard
				key={timezone}
				timezone={timezone}
				users={data.users}
				schedules={data.schedules}
			/>
		)
	);

	const handleValueChange = (value: number[]) => {
		setSliderValue(value);
	};

	const generateTimestamp = (): string => {
		const date = moment
			.tz(baseTimezone)
			.startOf("day")
			.hour(startHour ? startHour : 6);
		return date;
	};

	useEffect(() => {
		const fetchData = async () => {
			if (user) {
				const data = await fetchUserData(user.uid);
				const teamIds = Object.keys(data.team_ids ? data.team_ids : {});
				if (data) {
					setUserData({
						name: data.name,
						email: data.email,
						userId: user.uid,
						timezone: data.timezone,
						workingHours: data.workingHours,
						teamIds,
					});
				} else {
					toast({
						title: "Error",
						description: "We had an error fetching your data. Sorry.",
					});
				}
				if (teamIds.length > 0) {
					let newTeamsList = [...(teams || [])];
					for (let i = 0; i < teamIds.length; i++) {
						const currentTeamId = teamIds[i];
						const data = await fetchTeamData(currentTeamId);
						if (data !== null) {
							newTeamsList.push({
								name: data.teamName,
								teamId: currentTeamId,
								description: data.description,
								userIds: Object.keys(data.user_ids ? data.user_ids : {}),
							});
						}
					}
					setTeams(newTeamsList);
				}
			}
		};

		fetchData();
	}, [user]);

	useEffect(() => {
		const fetchFirstTeam = async () => {
			if (user && teams && teams.length > 0) {
				const data = await readUserInfoFromTeam(teams[0]);
				setSelectedTeam(data);
			}
		};

		fetchFirstTeam();
	}, [user, teams]);

	return (
		<>
			{teams && teams.length > 0 ? (
				<div className="flex md:flex-row gap-3 md:gap-6 pb-4 md:pb-1 flex-col items-center w-full justify-between">
					<TeamSelector teams={teams} />
					<AddSchedule />
				</div>
			) : (
				<h1 className="text-muted-foreground">Create your first team</h1>
			)}
			<div className="flex flex-col gap-3  w-full">
				{selectedTeam && (
					<>
						<div>
							{view === "overview" ? (
								<>
									<div>
										<span className="text-muted-foreground text-sm">
											{selectedTeam.description}
										</span>
										<div className="my-3 flex gap-2">
											<AssignUserToTeamForm />
											<UpdateTeamForm />
										</div>
									</div>
									<div className="flex pt-4 justify-start gap-3 flex-wrap w-full ">
										{/* {selectedTeam.users.map((user: UserType) => (
											<TimezoneCard timezone={user.timezone} />
										))}
										{selectedTeam.schedules.map((schedule: ScheduleType) => (
											<TimezoneCard timezone={schedule.timezone} />
										))} */}
										{timezoneCards}
									</div>
								</>
							) : (
								<>
									<div>
										<span className="text-muted-foreground text-sm">
											Start time:
										</span>
										<div className="my-3 flex gap-2">
											<TimezoneSelect
												value={baseTimezone}
												onChange={setBaseTimezone}
											/>
											<HourSelect value={startHour} onChange={setStartHour} />
										</div>
									</div>
									<div className="overflow-y-hidden overflow-x-visible py-8 relative">
										<div className="ml-14 mr-1">
											<div
												className="absolute h-full "
												style={{ width: "calc(100% - 3.5rem)" }}
											>
												<div
													className={`absolute h-full top-[-50px] w-[2px] bg-gradient-to-t opacity-40 from-[#5248e8] to-[#ffffff]`}
													style={{ left: `${(sliderValue / 1505) * 100}%` }}
												></div>
											</div>
											<Slider
												className="pb-7"
												defaultValue={[0]}
												max={1500}
												step={1}
												onValueChange={handleValueChange}
											/>
										</div>
										<div className="flex flex-col gap-7">
											{selectedTeam.users.map((user: UserType) => (
												<UserTimeBar
													currentSliderValue={sliderValue}
													timezone={user.timezone}
													workingHours={user.workingHours}
													name={user.name}
													startTime={generateTimestamp()}
												/>
											))}
											{selectedTeam.schedules.map((schedule: ScheduleType) => (
												<UserTimeBar
													currentSliderValue={sliderValue}
													timezone={schedule.timezone}
													workingHours={schedule.workingHours}
													name={schedule.name}
													startTime={generateTimestamp()}
												/>
											))}
										</div>
									</div>
								</>
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
};
