import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import moment from "moment-timezone";
import { ScheduleType } from "@/store/selectedTeamAtom";
import { UserType } from "@/store/authAtom";
import ProfileIcon from "@/components/profile-icon";
import {
	DoubleArrowUpIcon,
	MinusCircledIcon,
	Cross1Icon,
} from "@radix-ui/react-icons";

export const TimeRuler: React.FC<{ primaryColor: boolean }> = ({
	primaryColor,
}) => {
	const dashes = Array.from({ length: 97 });
	const labels = ["00", "06", "12", "18", "00"];
	return (
		<div className="relative w-full h-8 mb-4 mt-1 ">
			<div className="absolute top-0 w-full h-full flex justify-between ">
				{dashes.map((_, index) => (
					<div key={index} className={`flex flex-col  items-center`}>
						<div
							className={`${
								index % 4 === 0 ? "opacity-80" : "opacity-30"
							} w-[1.5px] h-3 ${primaryColor ? "bg-primary" : "bg-gray-500"}`}
						></div>
					</div>
				))}
			</div>
			<div
				className={`absolute bottom-0 w-full flex justify-between text-sm ${
					primaryColor ? "text-primary opacity-80" : "text-gray-400"
				}`}
			>
				{labels.map((label, index) => (
					<span key={index} className="">
						{label}
					</span>
				))}
			</div>
		</div>
	);
};

const TimeProgressBar: React.FC<{
	timezone: string;
}> = ({ timezone }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const calculateProgress = () => {
			const now = moment().tz(timezone);
			const hours = now.hours();
			const minutes = now.minutes();
			const seconds = now.seconds();
			const totalSeconds = hours * 3600 + minutes * 60 + seconds;
			const percentage = (totalSeconds / 86400) * 100;
			setProgress(percentage);
		};

		calculateProgress();
		const interval = setInterval(calculateProgress, 1000);

		return () => clearInterval(interval);
	}, [timezone]);

	return (
		<div className="top-0 left-0 w-full h-full overflow-hidden absolute">
			<div
				className="relative h-full transition-all duration-1000 -z-0"
				style={{ width: `${progress}%` }}
			>
				<div className="absolute bg-gradient-to-t from-gray-400 to-[#181818] right-0 h-full w-0.5"></div>
			</div>
		</div>
	);
};

const TopSection: React.FC<{
	location: string;
	offset: string;
	date: string;
}> = ({ location, offset, date }) => {
	return (
		<div className="flex relative z-10 justify-between items-center text-white">
			<div>
				<h1 className="text-base font-semibold">{location}</h1>
				<p className="text-xs opacity-50">{`GMT${offset} • ${date}`}</p>
			</div>
			<div className="flex space-x-2"></div>
		</div>
	);
};

const MiddleSection: React.FC<{ time: string; offset: string }> = ({
	timeString,
	offset,
}) => {
	const [time, period] = timeString.split(" ");

	return (
		<div className="relative z-10 flex justify-between items-center pt-8 text-white">
			<div className="flex items-center ">
				<span className="text-2xl font-space-mono">
					<span>{time}</span>
					<span className="inline opacity-50 font-space-grotesk">
						{" "}
						{period}
					</span>
				</span>
				<div>
					<Badge
						variant={
							JSON.stringify(offset).indexOf("-") > -1 ? "negative" : "positive"
						}
						className="ml-1.5 text-md !rounded-[8px] !py-0 my-0 !px-1.5"
					>
						{offset}H
					</Badge>
				</div>
			</div>
		</div>
	);
};

const BottomSection: React.FC<{
	users: UserType[];
	schedules: ScheduleType[];
}> = ({ users, schedules }) => {
	const checkAvailability = (
		start: string,
		end: string,
		timezone: string
	): boolean => {
		const now = moment().tz(timezone);
		const startTime = moment.tz(start, "HH:mm", timezone);
		const endTime = moment.tz(end, "HH:mm", timezone);

		return now.isBetween(startTime, endTime);
	};

	const userAvailability = users.map((user) =>
		checkAvailability(
			user.workingHours.start,
			user.workingHours.end,
			user.timezone
		)
	);

	const scheduleAvailability = schedules.map((schedule) =>
		checkAvailability(
			schedule.workingHours.start,
			schedule.workingHours.end,
			schedule.timezone
		)
	);

	const allAvailable = [...userAvailability, ...scheduleAvailability].every(
		(available) => available
	);
	const someAvailable = [...userAvailability, ...scheduleAvailability].some(
		(available) => available
	);

	return (
		<div className="flex justify-between bg-white items-center p-2 text-primary z-10 relative rounded-lg">
			<div
				className={`rounded-full p-2 ${
					allAvailable
						? "bg-green-100"
						: someAvailable
						? "bg-amber-100"
						: "bg-red-100"
				}`}
			>
				{allAvailable ? (
					<DoubleArrowUpIcon className="stroke-green-500 h-4 w-4" />
				) : someAvailable ? (
					<MinusCircledIcon className="stroke-amber-400 h-4 w-4" />
				) : (
					<Cross1Icon className="stroke-red-600 h-3.5 w-3.5" />
				)}
			</div>
			<div className="flex mr-1.5">
				{users &&
					users.map((user: UserType) => (
						<div className="-mr-1.5">
							<ProfileIcon
								name={user.name}
								timezone={user.timezone}
								workingHours={user.workingHours}
							/>
						</div>
					))}
				{schedules &&
					schedules.map((schedule: UserType) => (
						<div className="-mr-1.5">
							<ProfileIcon
								name={schedule.name}
								timezone={schedule.timezone}
								workingHours={schedule.workingHours}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

interface TimezoneCardProps {
	timezone: string;
	users: UserType[];
	schedules: ScheduleType[];
}

const TimezoneCard: React.FC<TimezoneCardProps> = ({
	timezone,
	users,
	schedules,
}) => {
	const [currentTime, setCurrentTime] = useState(moment().tz(timezone));
	const [localTime, setLocalTime] = useState(moment());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(moment().tz(timezone));
			setLocalTime(moment());
		}, 1000);

		return () => clearInterval(intervalId);
	}, [timezone]);

	const gmtOffset = currentTime.format("Z"); // Difference from GMT
	const timezoneOffset = (currentTime.utcOffset() - localTime.utcOffset()) / 60;

	return (
		<div className="bg-[#181818] p-5 rounded-lg shadow-lg flex-grow sm:min-w-[30%]">
			<div className="relative">
				<TopSection
					location={timezone}
					offset={gmtOffset}
					date={currentTime.format("ddd, MMM D")}
				/>
				<MiddleSection
					timeString={currentTime.format("hh:mm:ss A")}
					offset={timezoneOffset > 0 ? `+${timezoneOffset}` : timezoneOffset}
				/>
				<TimeRuler />
				<TimeProgressBar timezone={timezone} />
				<BottomSection users={users} schedules={schedules} />
			</div>
		</div>
	);
};

export default TimezoneCard;
