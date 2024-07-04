import { ref, set, push, get, child, remove } from "firebase/database";
import { useDatabase } from "reactfire";

export const useFirebaseOperations = () => {
	const database = useDatabase();

	const createUser = (username: string, email: string, timezone: string) => {
		const userRef = ref(database, "users");
		const newUserRef = push(userRef); // Generates a new unique key
		const userId = newUserRef.key; // Retrieve the generated key
		return set(newUserRef, {
			userId,
			username,
			email,
			timezone,
		});
	};

	// Create or Update User
	const writeUserData = (
		userId: string,
		username: string,
		email: string,
		password: string
	) => {
		set(ref(database, "users/" + userId), {
			username,
			email,
			password,
		});
	};

	// Create or Update Team
	const writeTeamData = (
		teamId: string,
		teamName: string,
		description: string
	) => {
		set(ref(database, "teams/" + teamId), {
			team_name: teamName,
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

	return {
		createUser,
		writeUserData,
		writeTeamData,
		assignUserToTeam,
		readUserTeams,
		removeUserFromTeam,
	};
};
