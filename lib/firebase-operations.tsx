import { ref, set, push, get, child, remove } from "firebase/database";
import { useDatabase } from "reactfire";

export const useFirebaseOperations = () => {
	const database = useDatabase();

	// create or update users with the same method
	const writeUser = (
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
		return set(userRef, {
			userId,
			username,
			email,
			timezone,
			working_hours: workingHours,
		});
	};

	const createTeam = (teamName: string, description: string) => {
		const teamRef = ref(database, "teams");
		const newTeamRef = push(teamRef);
		const teamId = newTeamRef.key;
		return set(newTeamRef, {
			teamName,
			description,
		});
	};

	const updateTeam = (
		teamId: string,
		teamName: string,
		description: string
	) => {
		set(ref(database, "teams/" + teamId), {
			teamName,
			description,
		});
	};

	// Assign User to Team
	const assignUserToTeam = (userId: string, teamId: string) => {
		const userRef = ref(database, `users/${userId}/team_ids/${teamId}`);
		const teamRef = ref(database, `teams/${teamId}/user_ids/${userId}`);
		set(userRef, true);
		set(teamRef, true);
	};

	// Read User's Teams
	const readUserTeams = async (userId: string) => {
		const dbRef = ref(database);
		const snapshot = await get(child(dbRef, `users/${userId}/team_ids`));
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			console.log("No data available");
			return null;
		}
	};

	// Remove User from Team
	const removeUserFromTeam = (userId: string, teamId: string) => {
		const userRef = ref(database, `users/${userId}/team_ids/${teamId}`);
		const teamRef = ref(database, `teams/${teamId}/user_ids/${userId}`);
		remove(userRef);
		remove(teamRef);
	};

	const fetchUserData = async (uid: string) => {
		const dbRef = ref(database);
		const snapshot = await get(child(dbRef, `users/${uid}`));
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			console.log("No data available");
			return null;
		}
	};

	const fetchTeamData = async (uid: string) => {
		const dbRef = ref(database);
		const snapshot = await get(child(dbRef, `teams/${uid}`));
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			console.log("No data available");
			return null;
		}
	};

	return {
		fetchUserData,
		fetchTeamData,
		writeUser,
		createTeam,
		updateTeam,
		assignUserToTeam,
		readUserTeams,
		removeUserFromTeam,
	};
};
