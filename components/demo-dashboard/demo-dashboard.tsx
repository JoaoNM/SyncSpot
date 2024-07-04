"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { MainNav } from "@/components/demo-dashboard/main-nav";
import { RecentSales } from "@/components/demo-dashboard/recent-sales";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserForm from "./user-form";
import TeamForm from "./team-form";
import AssignUserToTeamForm from "./assign-user-to-team-form";
import { useUser } from "reactfire";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { userAtom } from "@/store/authAtom";
import { teamsAtom } from "@/store/teamsAtom";
import { useAtom } from "jotai";
import TeamSelector from "@/components/TeamSelector";

export const DemoDashboard: FC = () => {
	const { data: user } = useUser();
	const { fetchUserData, fetchTeamData } = useFirebaseOperations();
	const [userData, setUserData] = useAtom(userAtom);
	const [teams, setTeams] = useAtom(teamsAtom);

	useEffect(() => {
		const fetchData = async () => {
			if (user) {
				const data = await fetchUserData(user.uid);
				console.log(data);
				const teamIds = Object.keys(data.team_ids ? data.team_ids : {});
				setUserData({
					name: data.username,
					email: data.email,
					userId: user.uid,
					timezone: user.timezone,
					workingHours: user.working_hours,
					teamIds,
				});
				if (teamIds.length > 0) {
					for (let i = 0; i < teamIds.length; i++) {
						const currentTeamId = teamIds[i];
						const data = await fetchTeamData(currentTeamId);
						console.log("teams: ", teams);
						console.log("data: ", data);
						setTeams([
							...(teams || []),
							{
								name: data.teamName,
								description: data.description,
								userIds: Object.keys(data.user_ids ? data.user_ids : {}),
							},
						]);
					}
				}
			}
		};

		fetchData();
	}, [user]);

	return (
		<>
			<h1>{userData ? `Welcome ${userData.name}` : "Loading"}</h1>
			<h2>Select Your Team</h2>
			{JSON.stringify(teams)}
			{teams && teams.length > 0 && <TeamSelector teams={teams} />}
			Teams: {JSON.stringify(teams)}
			<UserForm />
			<TeamForm />
			<AssignUserToTeamForm />
		</>
	);
};
