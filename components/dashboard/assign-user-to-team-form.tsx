// components/AssignUserToTeamForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { userAtom } from "@/store/authAtom";
import { useAtom } from "jotai";

const AssignUserToTeamForm = () => {
	const [user] = useAtom(userAtom);
	const [email, setEmail] = useState("");
	const [teamId, setTeamId] = useState("");

	const { assignUserToTeamByEmail } = useFirebaseOperations();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		assignUserToTeamByEmail(email, teamId);
		setEmail("");
		setTeamId("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Email:</label>
				<Input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Team ID:</label>
				<Input
					type="text"
					value={teamId}
					onChange={(e) => setTeamId(e.target.value)}
				/>
			</div>
			<Button type="submit">Assign User to Team</Button>
		</form>
	);
};

export default AssignUserToTeamForm;
