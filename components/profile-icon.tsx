import React from "react";
import moment from "moment-timezone";

interface ProfileIconProps {
	name: string;
	workingHours: { start: string; end: string };
	timezone: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
	name,
	workingHours,
	timezone,
}) => {
	const getInitials = (name: string) => {
		const initials = name
			.split(" ")
			.map((word) => word.charAt(0))
			.join("");
		return initials.substring(0, 3).toUpperCase();
	};

	const isWithinWorkingHours = (
		workingHours: { start: string; end: string },
		timezone: string
	) => {
		const now = moment().tz(timezone);
		const start = moment.tz(workingHours.start, "HH:mm", timezone);
		const end = moment.tz(workingHours.end, "HH:mm", timezone);
		return now.isBetween(start, end);
	};

	const initials = getInitials(name);
	const available = isWithinWorkingHours(workingHours, timezone);

	return (
		<div className="relative flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full">
			<span className="text-blue-600 text-sm font-bold">{initials}</span>
			<div
				className={`absolute top-0 right-0 w-4 h-4 rounded-full ${
					available ? "bg-green-500" : "bg-red-500"
				}`}
			></div>
		</div>
	);
};

export default ProfileIcon;
