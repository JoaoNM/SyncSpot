"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useUser } from "reactfire";
import { userAtom } from "@/store/authAtom";
import { useAtom } from "jotai";
import UserForm from "../dashboard/user-form";

export function UserNav() {
	const { data } = useUser();
	const router = useRouter();
	const [, setUserData] = useAtom(userAtom);
	const doLogout = async () => {
		await signOut(getAuth());
		setUserData(undefined);
		toast({
			title: "Logged out",
			description: "You have been logged out.",
		});
		router.replace("/");
	};
	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						<Avatar className="h-10 w-10">
							<AvatarImage
								src={data?.photoURL || "/avatars/04.png"}
								alt="@shadcn"
							/>
							<AvatarFallback>
								{data?.displayName?.slice(0, 2) ||
									data?.email?.slice(0, 2) ||
									""}
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">
								{data?.displayName ||
									data?.email?.slice(0, data?.email?.indexOf("@")) ||
									"Anonymous"}
							</p>
							<p className="text-xs leading-none text-muted-foreground">
								{data?.email || "No email"}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DialogTrigger asChild>
							<DropdownMenuItem>My Schedule</DropdownMenuItem>
						</DialogTrigger>
						<DropdownMenuItem>New Team</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={doLogout}>Log out</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent className="sm:max-w-[525px]">
				<DialogHeader>
					<DialogTitle>Set up your schedule</DialogTitle>
					<DialogDescription>
						Share your agenda and optimize overlapping hours within your day.
						Let's start setting up your schedule!
					</DialogDescription>
				</DialogHeader>
				<UserForm />
			</DialogContent>
		</Dialog>
	);
}
