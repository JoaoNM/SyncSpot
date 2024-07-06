// components/AssignUserToTeamForm.tsx
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

const AssignUserToTeamForm = () => {
	const [selectedTeam] = useAtom(selectedTeamAtom);
	const [email, setEmail] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { assignUserToTeamByEmail } = useFirebaseOperations();

	const handleSubmit = async () => {
		if (selectedTeam && selectedTeam.teamId) {
			setIsLoading(true);
			if (email.length > 0) {
				try {
					await assignUserToTeamByEmail(email, selectedTeam.teamId);
					toast({
						title: "Team Updated!",
						description: `We've added ${email} (if they have a SyncSpot account)`,
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
					description: "You need to enter an email",
					variant: "destructive",
				});
			}
		} else {
			toast({
				title: "Error",
				description: "No team selected",
				variant: "destructive",
			});
		}
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="xs">
					<span>Add Teammate</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[525px]">
				<DialogHeader>
					<DialogTitle>Add Teammate</DialogTitle>
					<DialogDescription>
						Add a teammate with their email to{" "}
						{selectedTeam && selectedTeam.name}
					</DialogDescription>
				</DialogHeader>
				{/* <form onSubmit={handleSubmit}>
					<div>
						<label>Email:</label>
						<Input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label>Team ID:</label>
						<Input
							type="text"
							value={teamId}
							onChange={(e) => setTeamId(e.target.value)}
						/>
					</div>
					<Button type="submit">Assign User to Team</Button>
				</form> */}
				<div className="flex flex-col gap-4 pt-3">
					<div>
						<Input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<DialogFooter>
						<Button
							className="mt-4"
							type="submit"
							disabled={isLoading}
							size="sm"
							onClick={handleSubmit}
						>
							Add User
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AssignUserToTeamForm;
