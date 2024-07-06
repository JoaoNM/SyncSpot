"use client";

import * as React from "react";
import moment from "moment-timezone";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

// Get the list of all timezones from moment-timezone
const timezones = moment.tz.names().map((tz) => ({
	value: tz,
	label: `${tz} (${moment.tz(tz).format("Z")})`,
}));

interface HourSelectProps {
	value: string | undefined;
	onChange: (value: number) => void;
}

export function TimezoneSelect({ value, onChange }: HourSelectProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="xs"
					role="combobox"
					aria-expanded={open}
					className="min-w-[250px] justify-between"
				>
					{value
						? timezones.find((timezone) => timezone.value === value)?.label
						: "Select timezone..."}
					<ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-[250px] p-0">
				<Command>
					<CommandInput placeholder="Search timezone..." />
					<CommandEmpty>No timezone found.</CommandEmpty>
					<CommandList>
						<CommandGroup>
							{timezones.map((timezone) => (
								<CommandItem
									key={timezone.value}
									value={timezone.value}
									onSelect={(currentValue) => {
										onChange(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === timezone.value ? "opacity-100" : "opacity-0"
										)}
									/>
									{timezone.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
