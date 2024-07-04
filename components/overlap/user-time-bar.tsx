import React from "react";
import moment from "moment-timezone";
import ProfileIcon from "@/components/profile-icon.tsx";

interface UserTimeBarProps {}

interface TimeBarProps {
	startTime: string;
	timezone: string;
	workingHoursStart: number;
	workingHoursEnd: number;
}

const TimeBar: React.FC<TimeBarProps> = ({
	startTime,
	timezone,
	workingHoursStart,
	workingHoursEnd,
}) => {
	const currentTime = moment().tz(timezone);
	const startMoment = moment.tz(startTime, timezone);
	const hours = Array.from({ length: 25 }, (_, i) =>
		startMoment.clone().add(i, "hours")
	);

	return (
		<div className="w-full">
			<div className="flex w-full overflow-hidden rounded-lg bg-white border border-gray-300">
				{hours.map((hour, index) => {
					const isWorkingHour =
						hour.hours() >= workingHoursStart && hour.hours() < workingHoursEnd;
					const isLowOpacity = hour.hours() < 6;
					const isDaySlot = hour.hours() === 23;

					return (
						<>
							<div
								key={index}
								className={`flex font-space-mono text-[0.7rem] flex-col items-center justify-center w-[4%] px-0.5 border-gray-950 border-opacity-20 border-r-[0.5px] h-9 ${
									isWorkingHour
										? "bg-primary text-white"
										: isLowOpacity
										? "opacity-50"
										: ""
								}`}
							>
								<span>{hour.format("h A")}</span>
							</div>
							{isDaySlot && (
								<div
									key={hour.format("D")}
									className={
										"flex uppercase text-[0.7rem] flex-col font-mono items-center justify-center w-[4%] h-9 bg-[#1F2532] text-white"
									}
								>
									<span>{hour.format("MMM D")}</span>
								</div>
							)}
						</>
					);
				})}
			</div>
		</div>
	);
};

const CurrentTimeDisplay: React.FC<{ timezone: string }> = ({ timezone }) => {
	const currentTime = moment().tz(timezone);

	return (
		<div className="ml-4">
			<div className="inline text-lg font-semibold">
				{currentTime.format("h:mm A")}{" "}
			</div>
			<div className="inline text-sm">
				{`GM${currentTime.format("Z")} · ${currentTime.format("ddd, MMM D")}`}{" "}
			</div>
			<div className="inline text-sm">{timezone}</div>
		</div>
	);
};

const UserTimeBar: React.FC<UserTimeBarProps> = ({}) => {
	const timezone = "Singapore";
	const currentTime = moment().tz(timezone);
	const currentHour = currentTime.hours();
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const formattedDate = currentTime.format("MMM D");

	return (
		<div className="flex flex-col gap-5 items-start w-full rounded-lg">
			<CurrentTimeDisplay timezone={timezone} />
			<div className="flex w-full gap-5">
				<ProfileIcon
					name="Joao Nina Matos"
					workingHours={{ start: "09:00", end: "17:00" }}
					timezone="Europe/Istanbul"
				/>
				<TimeBar
					startTime="2024-07-04T06:00:00"
					timezone="Europe/Istanbul"
					workingHoursStart={9}
					workingHoursEnd={18}
				/>
			</div>
		</div>
	);
};

export default UserTimeBar;
