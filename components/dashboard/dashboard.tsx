"use client";

import { FC, useEffect, useState } from "react";
import TeamForm from "./team-form";
import AssignUserToTeamForm from "./assign-user-to-team-form";
import { useUser } from "reactfire";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { UserType, userAtom } from "@/store/authAtom";
import { teamsAtom } from "@/store/teamsAtom";
import { useAtom } from "jotai";
import TeamSelector from "@/components/team-selector";
import { selectedTeamAtom } from "@/store/selectedTeamAtom";
import TimezoneCard from "@/components/overview/timezone-card";
import UserTimeBar from "@/components/overlap/user-time-bar";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import UpdateTeamForm from "@/components/dashboard/update-team-form";
import NewScheduleSlider from "@/components/dashboard/new-schedule-slider";
import { Button } from "../ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { TimezoneSelect } from "@/components/timezone-select";
import { HourSelect } from "@/components/dashboard/hour-select";
import moment from "moment-timezone";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddSchedule = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="xs">
					<PlusCircledIcon className="mr-1.5 h-3 w-3 stroke-primary" />
					<span className="text-primary">Add Schedule</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[525px]">
				<DialogHeader>
					<DialogTitle>Set up a Schedule</DialogTitle>
					<DialogDescription>
						Share your agenda and optimize overlapping hours within your day.
						Let's start setting up your schedule!
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4 py-4">
					<div className="items-center gap-4">
						<Input
							id="name"
							value=""
							placeholder="Schedule Name"
							className="col-span-3"
						/>
					</div>
					<NewScheduleSlider />
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export const Dashboard: FC = () => {
	const [startHour, setStartHour] = useState<number>(6);
	const [baseTimezone, setBaseTimezone] = useState<string>("GMT");
	const [sliderValue, setSliderValue] = useState<number[]>(0);
	const [selectedTeam] = useAtom(selectedTeamAtom);
	const [userData, setUserData] = useAtom(userAtom);
	const [teams, setTeams] = useAtom(teamsAtom);
	const { data: user } = useUser();
	const { fetchUserData, fetchTeamData, readUserInfoFromTeam } =
		useFirebaseOperations();

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
				console.log(data);
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
				console.log("Set user data here");
				if (teamIds.length > 0) {
					let newTeamsList = [...(teams || [])];
					for (let i = 0; i < teamIds.length; i++) {
						const currentTeamId = teamIds[i];
						console.log("team current ", currentTeamId);
						const data = await fetchTeamData(currentTeamId);
						console.log("teams: ", teams);
						console.log("data: ", data);
						newTeamsList.push({
							name: data.teamName,
							teamId: currentTeamId,
							description: data.description,
							userIds: Object.keys(data.user_ids ? data.user_ids : {}),
						});
					}
					setTeams(newTeamsList);
				}
			}
		};

		fetchData();
	}, [user]);
	return (
		<>
			{/* <h1>
				{userData
					? `Welcome ${userData.name} ${JSON.stringify(userData)}`
					: "Loading"}
			</h1>
			<h2>Select Your Team</h2>
			{selectedTeam && selectedTeam.name} */}
			{teams && teams.length > 0 ? (
				<div className="flex items-center w-full justify-between">
					<TeamSelector teams={teams} />

					<AddSchedule />
				</div>
			) : (
				<h1>Loading!</h1>
			)}
			<div className="flex flex-col gap-3  w-full">
				{selectedTeam && (
					<>
						<div>
							<span className="opacity-50 text-sm">
								{selectedTeam.description}
							</span>
							<div className="my-3">
								<UpdateTeamForm />
							</div>
						</div>
						<div className="flex justify-start gap-3 flex-wrap w-full  ">
							{selectedTeam.users.map((user: UserType) => (
								<>
									<TimezoneCard timezone={user.timezone} />
									<UserTimeBar
										currentSliderValue={sliderValue}
										timezone={user.timezone}
										workingHours={user.workingHours}
										name={user.name}
										startTime={generateTimestamp()}
									/>
								</>
							))}
						</div>
					</>
				)}
				{/* <TimezoneCard timezone="Singapore" />
				<TimezoneCard timezone="UTC" />
				<TimezoneCard timezone="UTC" />
				<TimezoneCard timezone="Singapore" /> */}
			</div>

			<div className="pt-10">
				<span className="text-xs">
					Start time: {baseTimezone} {startHour}{" "}
				</span>
				<br />
				<div className="flex gap-2">
					<TimezoneSelect value={baseTimezone} onChange={setBaseTimezone} />
					<HourSelect value={startHour} onChange={setStartHour} />
				</div>
			</div>

			{/* <div className="overflow-y-hidden overflow-x-visible py-8 relative">
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
					{userData && (
						<>
							<UserTimeBar
								currentSliderValue={sliderValue}
								timezone={userData.timezone}
								workingHours={userData.workingHours}
								name={userData.name}
								startTime={generateTimestamp()}
							/>
						</>
					)}
				</div>
			</div> */}

			{/* <div className="mt-8">
				<AssignUserToTeamForm />
				<UpdateTeamForm />
			</div> */}
		</>
	);
};
