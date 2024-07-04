"use client";

import { useState } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const UserForm = () => {
	const [userId, setUserId] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { createUser } = useFirebaseOperations();

	const handleSubmit = (e: React.FormEvent) => {
		console.log("submitting");
		e.preventDefault();
		createUser(userId, username, email, password);
		console.log("wrote user data");
		setUserId("");
		setUsername("");
		setEmail("");
		setPassword("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>User ID:</label>
				<Input
					type="text"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				/>
			</div>
			<div>
				<label>Username:</label>
				<Input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label>Email:</label>
				<Input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Password:</label>
				<Input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default UserForm;
