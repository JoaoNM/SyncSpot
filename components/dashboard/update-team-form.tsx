"use client";

import { useState, useEffect } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { selectedTeamAtom } from "@/store/selectedTeamAtom";
import { useAtom } from "jotai";
import { toast } from "@/components/ui/use-toast";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { userAtom } from "@/store/authAtom";

const UpdateTeamForm = () => {
	const [selectedTeam] = useAtom(selectedTeamAtom);
	const [currentUser] = useAtom(userAtom);
	const [teamName, setTeamName] = useState("");
	const [description, setDescription] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { updateTeam, removeUserFromTeam, deleteCustomSchedule } =
		useFirebaseOperations();

	const handleSubmit = async () => {
		if (selectedTeam && selectedTeam.teamId) {
			setIsLoading(true);
			if (teamName.length > 0) {
				try {
					await updateTeam(selectedTeam.teamId, teamName, description);
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
					description: "You need to add a team name",
					variant: "destructive",
				});
			}
		}
	};

	const handleRemoveUser = async (userId: string) => {
		if (selectedTeam && selectedTeam.teamId) {
			setIsLoading(true);
			try {
				await removeUserFromTeam(selectedTeam.teamId, userId);
				toast({
					title: "User Removed!",
					description: "We've removed the user from your team",
				});
				if (userId === currentUser.userId) setIsDialogOpen(false);
			} catch {
				toast({
					title: "Error",
					description: "There was an issue removing the user.",
					variant: "destructive",
				});
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handleRemoveSchedule = async (scheduleId: string) => {
		if (selectedTeam && selectedTeam.teamId) {
			setIsLoading(true);
			try {
				await deleteCustomSchedule(selectedTeam.teamId, scheduleId);
				toast({
					title: "Schedule Removed!",
					description: "We've removed the schedule from your team",
				});
			} catch {
				toast({
					title: "Error",
					description: "There was an issue removing the schedule.",
					variant: "destructive",
				});
			} finally {
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		if (selectedTeam && selectedTeam.teamId) {
			setTeamName(selectedTeam.name);
			setDescription(selectedTeam.description);
		}
	}, [selectedTeam]);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="secondary" size="xs">
					<span>Edit Team</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[525px]">
				<DialogHeader>
					<DialogTitle>Edit Team</DialogTitle>
					<DialogDescription>
						Edit your team, update your description & remove users from the
						team!
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4 pt-3">
					<div>
						<Input
							type="text"
							value={teamName}
							placeholder="Team Name"
							onChange={(e) => setTeamName(e.target.value)}
						/>
					</div>
					<div>
						<Input
							type="text"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sm font-semibold">Users</span>
						{selectedTeam.users.map((user) => (
							<>
								<div className="flex justify-between">
									<div className="flex items-center">
										<span className="text-muted-foreground text-sm">
											{user.name}
										</span>
									</div>
									<Button
										variant="ghost"
										size="xs"
										onClick={() => handleRemoveUser(user.userId)}
									>
										{user.userId === currentUser.userId
											? "Leave Team"
											: "Remove"}
									</Button>
								</div>
							</>
						))}
					</div>
					{selectedTeam.schedules.length > 0 && (
						<div className="flex flex-col gap-2">
							<span className="text-sm font-semibold">Schedules</span>
							{selectedTeam.schedules.map((schedule) => (
								<>
									<div className="flex justify-between">
										<div className="flex items-center">
											<span className="text-muted-foreground text-sm">
												{schedule.name}
											</span>
										</div>
										<Button
											variant="ghost"
											size="xs"
											onClick={() => handleRemoveSchedule(schedule.id)}
										>
											Remove
										</Button>
									</div>
								</>
							))}
						</div>
					)}
					<DialogFooter>
						{/* TODO: Add a `deleteTeam` method to firebase-operations, we don't have that yet, and you can leave the team, so it didn't make the cut for high priority */}
						{/* <Button
								className="mt-4"
								variant="destructive"
								disabled={isLoading}
								size="sm"
							>
								Delete Team
							</Button> */}
						<Button
							className="mt-4"
							type="submit"
							disabled={isLoading}
							size="sm"
							onClick={handleSubmit}
						>
							Save
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateTeamForm;
