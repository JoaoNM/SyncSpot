"use client";

import { useState, useEffect } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TimezoneSelect } from "@/components/timezone-select";
import { userAtom } from "@/store/authAtom";
import { useAtom } from "jotai";
import { toast } from "@/components/ui/use-toast";
import NewScheduleSlider from "@/components/dashboard/new-schedule-slider";
import { formatWorkingHours } from "@/components/dashboard/add-schedule";

const UserForm = () => {
	const [userData] = useAtom(userAtom);
	const [username, setUsername] = useState("");
	const [invertStartEndHours, setInvertStartEndHours] =
		useState<boolean>(false);
	const [sliderValues, setSliderValues] = useState<number[]>([16, 36]);
	const [baseTimezone, setBaseTimezone] = useState<string>("GMT");

	useEffect(() => {
		if (userData) {
			setUsername(userData.name);
			setBaseTimezone(userData.timezone || "GMT");
			console.log(
				"slider values attempt: ",
				userData.workingHours.start,
				[userData.workingHours.start, userData.workingHours.end].map(
					(time) =>
						parseInt(time.split(":")[0]) * 2 + parseInt(time.split(":")[1]) / 30
				)
			);
			setSliderValues(
				[userData.workingHours.start, userData.workingHours.end].map(
					(time) =>
						parseInt(time.split(":")[0]) * 2 + parseInt(time.split(":")[1]) / 30
				)
			);
			// setSliderValues(userData.working_hours.start || "08:00");
			// setWorkingHoursEnd(userData.working_hours?.end || "16:00");
		}
	}, [userData]);

	const { writeUser } = useFirebaseOperations();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (userData) {
			const workingHours = formatWorkingHours(
				sliderValues,
				invertStartEndHours
			);
			writeUser(
				userData.userId,
				username,
				userData.email,
				baseTimezone,
				workingHours
			);
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
			<div className="flex flex-col gap-6 pt-4 pb-1.5">
				<Input
					className="!cursor-default"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<NewScheduleSlider
					invertStartEndHours={invertStartEndHours}
					setInvertStartEndHours={setInvertStartEndHours}
					sliderValues={sliderValues}
					setSliderValues={setSliderValues}
					baseTimezone={baseTimezone}
					setBaseTimezone={setBaseTimezone}
				/>
			</div>
			{/* <div>
				<label>Timezone:</label>
				<TimezoneSelect value={timezone} onChange={setTimezone} />
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
			</div> */}
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default UserForm;
