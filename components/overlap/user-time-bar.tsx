import React from "react";
import moment from "moment-timezone";
import ProfileIcon from "@/components/profile-icon";

interface UserTimeBarProps {
	name: string;
	timezone: string;
	currentSliderValue: number;
	workingHours: { start: string; end: string };
	startTime: moment.Moment;
}

interface TimeBarProps {
	startTime: moment.Moment;
	timezone: string;
	currentTime: moment.Moment;
	workingHoursStart: number;
	workingHoursEnd: number;
}

const TimeBar: React.FC<TimeBarProps> = ({
	startTime,
	timezone,
	currentTime,
	workingHoursStart,
	workingHoursEnd,
}) => {
	const startMoment = moment.tz(startTime, timezone);
	const hours = Array.from({ length: 25 }, (_, i) =>
		startMoment.clone().add(i, "hours")
	);

	return (
		<div className="w-full">
			<CurrentTimeDisplay
				currentTime={currentTime}
				timezone={timezone}
				startTime={startTime}
			/>
			<div className="flex w-full overflow-hidden rounded-lg bg-white border border-gray-300">
				{hours.map((hour, index) => {
					const currentHour = hour.hours();
					let isWorkingHour = false;
					if (workingHoursStart < workingHoursEnd) {
						isWorkingHour =
							currentHour >= workingHoursStart && currentHour < workingHoursEnd;
					} else {
						isWorkingHour =
							currentHour >= workingHoursStart || currentHour < workingHoursEnd;
					}
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
										"flex uppercase text-[0.7rem] flex-col font-mono items-center justify-center w-[2.5px] ml-[-0.5px] h-9 bg-[#1F2532] text-white"
									}
								></div>
							)}
						</>
					);
				})}
			</div>
		</div>
	);
};

const CurrentTimeDisplay: React.FC<{
	currentTime: moment.Moment;
	timezone: string;
	startTime: moment.Moment;
}> = ({ currentTime, timezone, startTime }) => {
	const timezoneMoment = moment.tz(timezone);
	const timezoneOffset =
		(startTime.utcOffset() - timezoneMoment.utcOffset()) / 60;

	return (
		<div className="text-sm text-primary">
			<div className="inline">
				{currentTime.format("h:mm A")}
				{" · "}
			</div>
			<div className="inline">{timezone}</div>
			<div className="inline opacity-50">{` (${timezoneOffset}H)`}</div>
		</div>
	);
};

const UserTimeBar: React.FC<UserTimeBarProps> = ({
	name,
	timezone,
	workingHours,
	currentSliderValue,
	startTime,
}) => {
	const convertTimeToNumber = (time: string): number => {
		const [hours, minutes] = time.split(":").map(Number);
		return hours + minutes / 60;
	};

	const totalMinutes = Math.round(currentSliderValue * (1500 / 1500));
	const time = moment(startTime).tz(timezone).add(totalMinutes, "minutes");

	return (
		<div className="flex flex-col gap-0 items-start w-full rounded-lg">
			<div className="flex items-end w-full gap-4">
				<ProfileIcon
					name={name}
					workingHours={workingHours}
					timezone={timezone}
					currentTime={time}
				/>
				<TimeBar
					currentTime={time}
					startTime={startTime}
					timezone={timezone}
					workingHoursStart={convertTimeToNumber(workingHours.start)}
					workingHoursEnd={convertTimeToNumber(workingHours.end)}
				/>
			</div>
		</div>
	);
};

export default UserTimeBar;
