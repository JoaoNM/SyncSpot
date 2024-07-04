"use client";

import { FC, useEffect, useState } from "react";
import TeamForm from "./team-form";
import AssignUserToTeamForm from "./assign-user-to-team-form";
import { useUser } from "reactfire";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { UserType, userAtom } from "@/store/authAtom";
import { teamsAtom } from "@/store/teamsAtom";
import { useAtom } from "jotai";
import TeamSelector from "@/components/TeamSelector";
import { selectedTeamAtom } from "@/store/selectedTeamAtom";
import TimezoneCard from "../overview/timezone-card";

export const DemoDashboard: FC = () => {
	const [selectedTeam] = useAtom(selectedTeamAtom);
	const { data: user } = useUser();
	const { fetchUserData, fetchTeamData, readUserInfoFromTeam } =
		useFirebaseOperations();
	const [userData, setUserData] = useAtom(userAtom);
	const [teams, setTeams] = useAtom(teamsAtom);

	useEffect(() => {
		const fetchData = async () => {
			if (user) {
				const data = await fetchUserData(user.uid);
				console.log(data);
				const teamIds = Object.keys(data.team_ids ? data.team_ids : {});
				setUserData({
					name: data.name,
					email: data.email,
					userId: user.uid,
					timezone: user.timezone,
					workingHours: user.working_hours,
					teamIds,
				});
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
			<h1>{userData ? `Welcome ${userData.name}` : "Loading"}</h1>
			<h2>Select Your Team</h2>
			{selectedTeam && selectedTeam.name}
			{selectedTeam &&
				selectedTeam.users.map((user: UserType) => (
					<p>
						<br />
						{user.name} – {user.workingHours.start} until{" "}
						{user.workingHours.end} ({user.timezone})
					</p>
				))}
			{teams && teams.length > 0 && <TeamSelector teams={teams} />}
			<TimezoneCard />
			<div className="mt-8">
				<TeamForm />
				<AssignUserToTeamForm />
			</div>
		</>
	);
};
