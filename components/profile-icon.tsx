import React from "react";
import moment from "moment-timezone";

interface ProfileIconProps {
	name: string;
	workingHours: { start: string; end: string };
	timezone: string;
	currentTime?: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
	name,
	workingHours,
	timezone,
	currentTime,
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
		const time = currentTime
			? moment(currentTime).tz(timezone)
			: moment().tz(timezone);
		const start = moment.tz(workingHours.start, "HH:mm", timezone);
		const end = moment.tz(workingHours.end, "HH:mm", timezone);
		return time.isBetween(start, end);
	};

	const initials = getInitials(name);
	const available = isWithinWorkingHours(workingHours, timezone);

	return (
		<div className="relative flex items-center justify-center w-10 h-10 border-[0.4px] border-[#E0E7FF] shadow-sm border-primary rounded-full">
			<span className="text-primary text-[0.7rem] font-medium">{initials}</span>
			<div
				className={`absolute top-0.5 right-0 w-2 h-2 rounded-full ${
					available ? "bg-green-500" : "bg-red-500"
				}`}
			></div>
		</div>
	);
};

export default ProfileIcon;
