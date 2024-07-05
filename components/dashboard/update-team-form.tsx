"use client";

import { useState, useEffect } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
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

const UpdateTeamForm = () => {
	const [selectedTeam] = useAtom(selectedTeamAtom);
	const [teamName, setTeamName] = useState("");
	const [description, setDescription] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { updateTeam } = useFirebaseOperations();

	const handleSubmit = async (e: React.FormEvent) => {
		if (selectedTeam && selectedTeam.teamId) {
			e.preventDefault();
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
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
					<div>
						<Input
							type="text"
							value={teamName}
							placeholder="New Team Name"
							onChange={(e) => setTeamName(e.target.value)}
						/>
					</div>
					<div>
						<Input
							type="text"
							placeholder="New Team Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<DialogFooter>
						<Button className="mt-4" type="submit" disabled={isLoading}>
							Submit
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateTeamForm;
