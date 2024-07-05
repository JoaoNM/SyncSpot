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
import { Button } from "../ui/button";
import NewScheduleSlider from "@/components/dashboard/new-schedule-slider";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { selectedTeamAtom } from "@/store/selectedTeamAtom";
import { useAtom } from "jotai";

export const AddSchedule = () => {
	const [selectedTeam] = useAtom(selectedTeamAtom);

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
				<div className="flex flex-col gap-4 py-4">
					<div className="items-center gap-4">
						<Input
							id="name"
							value=""
							placeholder="Schedule Name"
							className="col-span-3"
						/>
					</div>
					<NewScheduleSlider />
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
