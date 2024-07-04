"use client";

import { useState } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { userAtom } from "@/store/authAtom";
import { useAtom } from "jotai";
import { toast } from "@/components/ui/use-toast";

const TeamForm = () => {
	const [user] = useAtom(userAtom);
	const [teamId, setTeamId] = useState("");
	const [teamName, setTeamName] = useState("");
	const [description, setDescription] = useState("");

	const { createTeam, assignUserToTeamByEmail } = useFirebaseOperations();

	const handleSubmit = (e: React.FormEvent) => {
		if (user) {
			e.preventDefault();
			createTeam(teamName, description, user.userId);
			setTeamId("");
			setTeamName("");
			setDescription("");
			toast({
				title: "Team Created!",
				description: "We've created your new team",
			});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Team Name:</label>
				<Input
					type="text"
					value={teamName}
					onChange={(e) => setTeamName(e.target.value)}
				/>
			</div>
			<div>
				<label>Description:</label>
				<Input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default TeamForm;
