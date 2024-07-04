"use client";

import { useState } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import TimezoneSelect from "./timezone-select";

const UserForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [timezone, setTimezone] = useState("UTC");
	const [workingHoursStart, setWorkingHoursStart] = useState("08:00");
	const [workingHoursEnd, setWorkingHoursEnd] = useState("16:00");

	const { createUser } = useFirebaseOperations();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createUser(username, email, password, timezone, {
			start: workingHoursStart,
			end: workingHoursEnd,
		});
		setUsername("");
		setEmail("");
		setPassword("");
		setTimezone("UTC");
		setWorkingHoursStart("08:00");
		setWorkingHoursEnd("16:00");
	};

	return (
		<form onSubmit={handleSubmit}>
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
				<label>Timezone:</label>
				<TimezoneSelect
					value={timezone}
					onChange={(e) => setTimezone(e.target.value)}
				/>
			</div>
			<div>
				<label>Working Hours Start:</label>
				<input
					type="time"
					value={workingHoursStart}
					onChange={(e) => setWorkingHoursStart(e.target.value)}
				/>
			</div>
			<div>
				<label>Working Hours End:</label>
				<input
					type="time"
					value={workingHoursEnd}
					onChange={(e) => setWorkingHoursEnd(e.target.value)}
				/>
			</div>
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default UserForm;
