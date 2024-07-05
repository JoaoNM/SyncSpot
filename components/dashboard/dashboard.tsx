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

export const Dashboard: FC = () => {
	const [selectedTeam] = useAtom(selectedTeamAtom);
	const { data: user } = useUser();
	const { fetchUserData, fetchTeamData, readUserInfoFromTeam } =
		useFirebaseOperations();
	const [userData, setUserData] = useAtom(userAtom);
	const [teams, setTeams] = useAtom(teamsAtom);

	const [sliderValue, setSliderValue] = useState<number[]>(0);

	const handleValueChange = (value: number[]) => {
		setSliderValue(value);
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
			{teams && teams.length > 0 && <TeamSelector teams={teams} />}
			<div className="flex justify-start gap-3 flex-wrap w-full ">
				{selectedTeam &&
					selectedTeam.users.map((user: UserType) => (
						<>
							<TimezoneCard timezone={user.timezone} />

							{/* <br />
							{user.name} – {user.workingHours.start} until{" "}
							{user.workingHours.end} ({user.timezone}) */}
						</>
					))}
				{/* <TimezoneCard timezone="Singapore" />
				<TimezoneCard timezone="UTC" />
				<TimezoneCard timezone="UTC" />
				<TimezoneCard timezone="Singapore" /> */}
			</div>

			<div>
				<NewScheduleSlider />
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
					{userData && (
						<>
							<UserTimeBar
								currentSliderValue={sliderValue}
								timezone="Europe/London"
								workingHours={userData.workingHours}
								name={userData.name}
							/>
							<UserTimeBar
								currentSliderValue={sliderValue}
								timezone="Europe/London"
								workingHours={userData.workingHours}
								name={userData.name}
							/>
							<UserTimeBar
								currentSliderValue={sliderValue}
								timezone="Europe/London"
								workingHours={userData.workingHours}
								name={userData.name}
							/>
							<UserTimeBar
								currentSliderValue={sliderValue}
								timezone="Europe/London"
								workingHours={userData.workingHours}
								name={userData.name}
							/>
							<UserTimeBar
								currentSliderValue={sliderValue}
								timezone="Europe/London"
								workingHours={userData.workingHours}
								name={userData.name}
							/>
							<UserTimeBar
								currentSliderValue={sliderValue}
								timezone="Europe/London"
								workingHours={userData.workingHours}
								name={userData.name}
							/>
							<UserTimeBar
								currentSliderValue={sliderValue}
								timezone="Europe/London"
								workingHours={userData.workingHours}
								name={userData.name}
							/>
						</>
					)}
				</div>
			</div>

			<div className="mt-8">
				<TeamForm />
				<AssignUserToTeamForm />
				<UpdateTeamForm />
			</div>
		</>
	);
};
