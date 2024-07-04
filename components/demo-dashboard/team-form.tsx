"use client";

import { useState } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const TeamForm = () => {
	const [teamId, setTeamId] = useState("");
	const [teamName, setTeamName] = useState("");
	const [description, setDescription] = useState("");

	const { createTeam } = useFirebaseOperations();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createTeam(teamName, description);
		setTeamId("");
		setTeamName("");
		setDescription("");
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
