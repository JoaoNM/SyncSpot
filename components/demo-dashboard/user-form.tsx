"use client";

import { useState, useEffect } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import TimezoneSelect from "./timezone-select";
import { userAtom } from "@/store/authAtom";
import { useAtom } from "jotai";
import { toast } from "@/components/ui/use-toast";

const UserForm = () => {
	const [userData, setUserData] = useAtom(userAtom);
	const [username, setUsername] = useState("");
	const [timezone, setTimezone] = useState("UTC");
	const [workingHoursStart, setWorkingHoursStart] = useState("08:00");
	const [workingHoursEnd, setWorkingHoursEnd] = useState("16:00");

	useEffect(() => {
		if (userData) {
			setUsername(userData.name);
			setTimezone(userData.timezone || "UTC");
			setWorkingHoursStart(userData.working_hours?.start || "08:00");
			setWorkingHoursEnd(userData.working_hours?.end || "16:00");
		}
	}, [userData]);

	const { writeUser } = useFirebaseOperations();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (userData) {
			writeUser(userData.userId, username, userData.email, timezone, {
				start: workingHoursStart,
				end: workingHoursEnd,
			});
			toast({
				title: "Profile Updated!",
				description: "We've saved your information",
			});
		} else {
			toast({
				title: "Error",
				description: "Your user data wasn't found. Weird.",
			});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-3">
			<div>
				<Input
					className="!cursor-default"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
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
				<label>Working Hours Start: </label>
				<input
					type="time"
					value={workingHoursStart}
					onChange={(e) => setWorkingHoursStart(e.target.value)}
				/>
			</div>
			<div>
				<label>Working Hours End: </label>
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
