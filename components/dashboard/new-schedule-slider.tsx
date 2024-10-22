import React, { useState } from "react";
import moment from "moment-timezone";
import { Slider } from "@/components/ui/slider";
import { TimeRuler } from "@/components/overview/timezone-card";
import { Toggle } from "@/components/ui/toggle";
import { SymbolIcon } from "@radix-ui/react-icons";
import { TimezoneSelect } from "@/components/timezone-select";

const FormattedTimeFromNumber: React.FC<{ value: number }> = ({ value }) => {
	const nearestHalfHour = Math.round(value * 30);
	const timeString = moment().startOf("day").minutes(nearestHalfHour);
	const [time, period] = timeString.format("hh:mm A").split(" ");
	return (
		<span className="font-space-grotesk text-lg">
			{time} <span className="font-space-mono">{period} </span>
		</span>
	);
};

interface NewScheduleSliderProps {
	invertStartEndHours: boolean;
	setInvertStartEndHours: (value: boolean) => void;
	sliderValues: number[];
	setSliderValues: (values: number[]) => void;
	baseTimezone: string;
	setBaseTimezone: (value: string) => void;
}

const NewScheduleSlider: React.FC<NewScheduleSliderProps> = ({
	invertStartEndHours,
	setInvertStartEndHours,
	sliderValues,
	setSliderValues,
	baseTimezone,
	setBaseTimezone,
}) => {
	const handleSliderChange = (values: number[]) => {
		setSliderValues(values);
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2 md:flex-row justify-between">
				<TimezoneSelect value={baseTimezone} onChange={setBaseTimezone} />
				<Toggle
					variant="outline"
					size="sm"
					pressed={invertStartEndHours}
					onPressedChange={() => setInvertStartEndHours(!invertStartEndHours)}
					aria-label="Toggle italic"
				>
					<SymbolIcon
						className={`mr-1 h-3 w-3 ${
							invertStartEndHours && "rotate-180"
						} transition-all duration-500 ease-in-out`}
					/>
					Invert Start/End Hours
				</Toggle>
			</div>
			<div className="md:max-w-[35vw]">
				<div
					className={`flex justify-between ${
						invertStartEndHours && "flex-row-reverse"
					}`}
				>
					<FormattedTimeFromNumber value={sliderValues[0]} />
					<FormattedTimeFromNumber value={sliderValues[1]} />
				</div>
				<div className="relative flex flex-col gap-4 pt-2 pb-2">
					<TimeRuler primaryColor />
					<div className="absolute h-full w-full">
						<div
							className={`absolute h-full top-[-20px] w-[2px] bg-gradient-to-t opacity-40 from-[#5248e8] to-[#ffffff]`}
							style={{ left: `${(sliderValues[0] / 48) * 100}%` }}
						></div>
						<div
							className={`absolute h-full top-[-20px] w-[2px] bg-gradient-to-t opacity-40 from-[#5248e8] to-[#ffffff]`}
							style={{ left: `calc(${(sliderValues[1] / 48) * 100}% - 2px)` }}
						></div>
					</div>
					<Slider
						className="pb-7"
						defaultValue={sliderValues}
						minStepsBetweenThumbs={4}
						max={48}
						step={1}
						showSecondThumb
						onValueChange={handleSliderChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default NewScheduleSlider;
