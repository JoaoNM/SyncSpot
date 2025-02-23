import { ref, set, update, push, get, child, remove } from "firebase/database";
import { useDatabase } from "reactfire";
import { ScheduleType, SelectedTeamType } from "@/store/selectedTeamAtom";
import { TeamType } from "@/store/teamsAtom";

export const useFirebaseOperations = () => {
	const database = useDatabase();

	// create or update users with the same method
	const writeUser = async (
		userId: string,
		username: string,
		email: string,
		timezone: string = "UTC",
		workingHours: { start: string; end: string } = {
			start: "08:00",
			end: "16:00",
		}
	) => {
		const userRef = ref(database, `users/${userId}`);
		try {
			const snapshot = await get(userRef);
			if (snapshot.exists()) {
				return update(userRef, {
					username,
					email,
					timezone,
					working_hours: workingHours,
				});
			} else {
				return set(userRef, {
					userId,
					username,
					email,
					timezone,
					working_hours: workingHours,
					team_ids: {},
				});
			}
		} catch (error) {
			console.error("Error writing user data:", error);
		}
	};

	const createTeam = async (
		teamName: string,
		description: string,
		userId: string
	) => {
		try {
			const teamRef = ref(database, "teams");
			const newTeamRef = push(teamRef);
			const teamId = newTeamRef.key;

			await set(newTeamRef, {
				teamName,
				description,
				user_ids: { [userId]: true },
			});

			// Add the team ID to the user's team_ids
			const userTeamRef = ref(database, `users/${userId}/team_ids/${teamId}`);
			await set(userTeamRef, true);
		} catch (error) {
			console.error("Error creating team:", error);
		}
	};

	const updateTeam = (
		teamId: string,
		teamName: string,
		description: string
	) => {
		update(ref(database, "teams/" + teamId), {
			teamName,
			description,
		});
	};

	const addCustomSchedule = (
		teamId: string,
		name: string,
		timezone: string,
		workingHours: { start: string; end: string }
	) => {
		const newScheduleRef = push(ref(database, `teams/${teamId}/schedules`));
		const scheduleId = newScheduleRef.key;
		return update(ref(database, `teams/${teamId}/schedules/${scheduleId}`), {
			name,
			timezone,
			workingHours,
		});
	};

	const deleteCustomSchedule = (teamId: string, scheduleId: string) => {
		const scheduleRef = ref(
			database,
			`teams/${teamId}/schedules/${scheduleId}`
		);
		return remove(scheduleRef);
	};

	const removeUserFromTeam = async (teamId: string, userId: string) => {
		try {
			const userTeamRef = ref(database, `users/${userId}/team_ids/${teamId}`);
			const teamUserRef = ref(database, `teams/${teamId}/user_ids/${userId}`);
			await remove(userTeamRef);
			await remove(teamUserRef);
		} catch (error) {
			console.error("Error removing user from team:", error);
		}
	};

	const fetchUserIdByEmail = async (email: string) => {
		const dbRef = ref(database);
		const snapshot = await get(child(dbRef, `users`));
		if (snapshot.exists()) {
			const users = snapshot.val();
			for (const userId in users) {
				if (users[userId].email === email) {
					return userId;
				}
			}
		}
		return null;
	};

	const assignUserToTeamByEmail = async (email: string, teamId: string) => {
		try {
			const userId = await fetchUserIdByEmail(email);
			if (!userId) {
				throw new Error("User not found");
			}

			const userRef = ref(database, `users/${userId}/team_ids/${teamId}`);
			const teamRef = ref(database, `teams/${teamId}/user_ids/${userId}`);
			await set(userRef, true);
			await set(teamRef, true);
		} catch (error) {
			console.error("Error assigning user to team:", error);
		}
	};

	// Read User's Teams
	const readUserTeams = async (userId: string) => {
		const dbRef = ref(database);
		const snapshot = await get(child(dbRef, `users/${userId}/team_ids`));
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			return null;
		}
	};

	const fetchUserData = async (uid: string) => {
		const dbRef = ref(database);
		const snapshot = await get(child(dbRef, `users/${uid}`));
		if (snapshot.exists()) {
			const userData = snapshot.val();
			return {
				name: userData.username,
				email: userData.email,
				userId: userData.userId,
				timezone: userData.timezone,
				team_ids: userData.team_ids,
				workingHours: userData.working_hours,
			};
		} else {
			return null;
		}
	};

	const fetchTeamData = async (uid: string) => {
		const dbRef = ref(database);
		const snapshot = await get(child(dbRef, `teams/${uid}`));
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			return null;
		}
	};

	const readUserInfoFromTeam = async (
		teamData: TeamType
	): Promise<SelectedTeamType | null> => {
		try {
			const userPromises = teamData.userIds.map((userId) =>
				fetchUserData(userId)
			);
			const users = await Promise.all(userPromises);

			const filteredUsers = users.filter((user) => user !== null);

			const schedulesRef = ref(database, `teams/${teamData.teamId}/schedules`);
			const schedulesSnapshot = await get(schedulesRef);
			const schedulesData: { [key: string]: Omit<ScheduleType, 'id'> } = schedulesSnapshot.val();

			const schedules = schedulesData
				? Object.entries(schedulesData).map(([id, schedule]) => ({
						id,
						...schedule,
				  }))
				: [];

			const selectedTeam: SelectedTeamType = {
				...teamData,
				users: filteredUsers,
				schedules,
			};
			return selectedTeam;
		} catch (error) {
			console.error("Error reading user info from team:", error);
			return null;
		}
	};

	return {
		fetchTeamData,
		fetchUserData,
		writeUser,
		createTeam,
		updateTeam,
		addCustomSchedule,
		assignUserToTeamByEmail,
		readUserTeams,
		readUserInfoFromTeam,
		removeUserFromTeam,
		deleteCustomSchedule,
	};
};
