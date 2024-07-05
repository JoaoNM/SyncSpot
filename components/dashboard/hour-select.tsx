import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface HourSelectProps {
	value: number | undefined;
	onChange: (value: number) => void;
}

export function HourSelect({ value, onChange }: HourSelectProps) {
	return (
		<Select onValueChange={(val) => onChange(Number(val))}>
			<SelectTrigger className="w-[180px] py-1 rounded-md px-2 text-xs">
				<SelectValue placeholder="Select an hour">
					{value !== undefined ? `${value}:00` : "Select an hour"}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{Array.from({ length: 24 }, (_, i) => (
						<SelectItem key={i} value={i.toString()}>
							{`${i}:00`}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
