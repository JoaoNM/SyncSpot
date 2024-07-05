"use client";

import React, { useState } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { userAtom } from "@/store/authAtom";
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
import { PlusCircledIcon } from "@radix-ui/react-icons";

const TeamForm = () => {
	const [user] = useAtom(userAtom);
	const [teamName, setTeamName] = useState("");
	const [description, setDescription] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { createTeam } = useFirebaseOperations();

	const handleSubmit = async (e: React.FormEvent) => {
		if (user) {
			e.preventDefault();
			setIsLoading(true);
			if (teamName.length > 0) {
				try {
					await createTeam(teamName, description, user.userId);
					setTeamName("");
					setDescription("");
					toast({
						title: "Team Created!",
						description: "We've created your new team",
					});
					setIsDialogOpen(false);
				} catch (error) {
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

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="xs">
					<PlusCircledIcon className="h-3 w-3 stroke-1 mr-1.5 stroke-primary" />
					<span className="text-primary">Create Team</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[525px]">
				<DialogHeader>
					<DialogTitle>Create a Team</DialogTitle>
					<DialogDescription>
						Create your own team, add your schedules & your team members can add
						their own!
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
					<div>
						<Input
							type="text"
							placeholder="Dream Team"
							value={teamName}
							onChange={(e) => setTeamName(e.target.value)}
						/>
					</div>
					<div>
						<Input
							type="text"
							placeholder="Add a small description if you like"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<DialogFooter>
						<Button className="mt-4" type="submit" disabled={isLoading}>
							Create Team
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default TeamForm;
