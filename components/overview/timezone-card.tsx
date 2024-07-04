import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

type TimeRulerProps = React.ComponentProps<typeof Slider>;

const TimeRuler: React.FC = () => {
	const dashes = Array.from({ length: 97 });
	const labels = ["00", "06", "12", "18", "00"];
	return (
		<div className="relative w-full h-8 mb-4 mt-1 text-white">
			<div className="absolute top-0 w-full h-full flex justify-between ">
				{dashes.map((_, index) => (
					<div key={index} className={`flex flex-col items-center w-[1.03%]`}>
						<div
							className={`${
								index % 4 === 0 ? "opacity-80" : "opacity-30"
							} w-[1.5px] h-3 bg-gray-500`}
						></div>
					</div>
				))}
			</div>
			<div className="absolute bottom-0 w-full flex justify-between text-gray-400 text-sm">
				{labels.map((label, index) => (
					<span key={index} className="">
						{label}
					</span>
				))}
			</div>
		</div>
	);
};

const TimeProgressBar: React.FC = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const calculateProgress = () => {
			const now = new Date();
			const hours = now.getHours();
			const minutes = now.getMinutes();
			const seconds = now.getSeconds();
			const totalSeconds = hours * 3600 + minutes * 60 + seconds;
			const percentage = (totalSeconds / 86400) * 100;
			setProgress(percentage);
		};

		calculateProgress();
		const interval = setInterval(calculateProgress, 1000);

		return () => clearInterval(interval);
	}, []);

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
		<div className="flex justify-between items-center text-white">
			<div>
				<h1 className="text-base font-semibold">Mersin, Türkiye</h1>
				<p className="text-xs opacity-50">{`GMT-3 • Tue, Jul 2`}</p>
			</div>
			<div className="flex space-x-2">
				{/* <button className="p-1 hover:bg-gray-600 rounded">✏️</button>
				<button className="p-1 hover:bg-gray-600 rounded">❌</button> */}
			</div>
		</div>
	);
};

const MiddleSection: React.FC<{ time: string; offset: string }> = ({
	time,
	offset,
}) => {
	return (
		<div className=" flex justify-between items-center pt-8 text-white">
			<div className="flex">
				<span className="text-2xl font-space-mono">
					<span>12:04</span>
					<span className="inline opacity-50 font-space-grotesk"> PM</span>
				</span>
				<Badge>s</Badge>
				<span className="text-lg">{offset}</span>
			</div>
			<div className="text-green-400 text-lg">{offset}</div>
		</div>
	);
};

const BottomSection: React.FC<{ username: string; onRemove: () => void }> = ({
	username,
	onRemove,
}) => {
	return (
		<div className="flex justify-between items-center p-2 bg-white text-white z-10 relative rounded-lg">
			<button className="p-1 hover:bg-gray-600 rounded" onClick={onRemove}>
				➖
			</button>
			<span>{username}</span>
		</div>
	);
};

interface TimezoneCardProps {
	location: string;
	offset: string;
	date: string;
	time: string;
	username: string;
	onEdit: () => void;
	onRemove: () => void;
}

const TimezoneCard: React.FC<TimezoneCardProps> = ({
	location,
	offset,
	date,
	time,
	username,
	onEdit,
	onRemove,
}) => {
	return (
		<div className="bg-[#181818] p-5 rounded-lg shadow-lg sm:max-w-[50vw]">
			<div className="relative">
				<TopSection location={location} offset={offset} date={date} />
				<MiddleSection time={time} offset={offset} />
				<TimeRuler />
				<TimeProgressBar />
				<BottomSection username={username} onRemove={onRemove} />
			</div>
		</div>
	);
};

export default TimezoneCard;
