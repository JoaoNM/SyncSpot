"use client";

import { useState, useEffect } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { userAtom } from "@/store/authAtom";
import { selectedTeamAtom } from "@/store/selectedTeamAtom";
import { useAtom } from "jotai";
import { toast } from "@/components/ui/use-toast";

const UpdateTeamForm = () => {
	const [selectedTeam] = useAtom(selectedTeamAtom);
	const [, setTeamId] = useState("");
	const [teamName, setTeamName] = useState("");
	const [description, setDescription] = useState("");

	const { updateTeam } = useFirebaseOperations();

	const handleSubmit = (e: React.FormEvent) => {
		if (selectedTeam && selectedTeam.teamId) {
			e.preventDefault();
			updateTeam(selectedTeam.teamId, teamName, description);
			setTeamId("");
			setTeamName("");
			setDescription("");
			toast({
				title: "Team Updated!",
				description: "We've updated your team",
			});
		}
	};

	useEffect(() => {
		if (selectedTeam && selectedTeam.teamId) {
			setTeamName(selectedTeam.name);
			setDescription(selectedTeam.description);
		}
	}, [selectedTeam]);

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

export default UpdateTeamForm;
