import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NewScheduleSlider from "@/components/dashboard/new-schedule-slider";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { selectedTeamAtom } from "@/store/selectedTeamAtom";
import { useAtom } from "jotai";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { toast } from "@/components/ui/use-toast";
import moment from "moment-timezone";

export const formatWorkingHours = (
	sliderValues: number[],
	invertWorkingHours: boolean
) => {
	const nearestHalfHourStart = Math.round(sliderValues[0] * 30);
	const nearestHalfHourEnd = Math.round(sliderValues[1] * 30);
	const timeStringStart = moment()
		.startOf("day")
		.minutes(nearestHalfHourStart)
		.format("HH:mm");
	const timeStringEnd = moment()
		.startOf("day")
		.minutes(nearestHalfHourEnd)
		.format("HH:mm");
	return {
		start: invertWorkingHours ? timeStringEnd : timeStringStart,
		end: invertWorkingHours ? timest : timeStringEnd,
	};
};

export const AddSchedule = () => {
	const [selectedTeam] = useAtom(selectedTeamAtom);
	const [scheduleName, setScheduleName] = useState<string>("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [invertStartEndHours, setInvertStartEndHours] =
		useState<boolean>(false);
	const [sliderValues, setSliderValues] = useState<number[]>([16, 36]);
	const [baseTimezone, setBaseTimezone] = useState<string>("GMT");

	const { addCustomSchedule } = useFirebaseOperations();

	const handleSubmit = async () => {
		if (
			selectedTeam &&
			selectedTeam.teamId &&
			sliderValues.length === 2 &&
			scheduleName.length > 0
		) {
			setIsLoading(true);
			try {
				const workingHours = formatWorkingHours(
					sliderValues,
					invertStartEndHours
				);
				await addCustomSchedule(
					selectedTeam.teamId,
					scheduleName,
					baseTimezone,
					workingHours
				);
				toast({
					title: "Team Updated!",
					description: "We've updated your team",
				});
				setIsDialogOpen(false);
			} catch {
				toast({
					title: "Error",
					description: "There was an issue creating the team.",
					variant: "destructive",
				});
			} finally {
				setIsLoading(false);
			}
		} else {
			setIsLoading(false);
			toast({
				title: "Error",
				description: "You're missing data",
				variant: "destructive",
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="xs" disabled={!selectedTeam}>
					<PlusCircledIcon className="mr-1.5 h-3 w-3 stroke-primary" />
					<span className="text-primary">Add Schedule</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[525px]">
				<DialogHeader>
					<DialogTitle>
						Add Schedule to {selectedTeam && <>{selectedTeam.name}</>}{" "}
					</DialogTitle>
					<DialogDescription>
						Share your agenda and optimize overlapping hours within your day.
						Let's start setting up your schedule!
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-6 pt-4 pb-1.5">
					<div className="items-center gap-4">
						<Input
							id="name"
							value={scheduleName}
							placeholder="Schedule Name"
							onChange={(e) => setScheduleName(e.target.value)}
						/>
					</div>
					<NewScheduleSlider
						invertStartEndHours={invertStartEndHours}
						setInvertStartEndHours={setInvertStartEndHours}
						sliderValues={sliderValues}
						setSliderValues={setSliderValues}
						baseTimezone={baseTimezone}
						setBaseTimezone={setBaseTimezone}
					/>
				</div>
				<DialogFooter>
					<Button onClick={handleSubmit} disabled={isLoading} type="submit">
						Add Schedule
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
