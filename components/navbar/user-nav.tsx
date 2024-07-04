"use client";

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
			<DialogTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-10 w-10">
						<AvatarImage
							src={data?.photoURL || "/avatars/04.png"}
							alt="@shadcn"
						/>
						<AvatarFallback>
							{data?.displayName?.slice(0, 2) || data?.email?.slice(0, 2) || ""}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Set up your schedule</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							defaultValue="Pedro Duarte"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Username
						</Label>
						<Input
							id="username"
							defaultValue="@peduarte"
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>

		// <DropdownMenu>
		// 	<DropdownMenuTrigger asChild>
		// 		<Button variant="ghost" className="relative h-8 w-8 rounded-full">
		// 			<Avatar className="h-10 w-10">
		// 				<AvatarImage
		// 					src={data?.photoURL || "/avatars/04.png"}
		// 					alt="@shadcn"
		// 				/>
		// 				<AvatarFallback>
		// 					{data?.displayName?.slice(0, 2) || data?.email?.slice(0, 2) || ""}
		// 				</AvatarFallback>
		// 			</Avatar>
		// 		</Button>
		// 	</DropdownMenuTrigger>
		// 	<DropdownMenuContent className="w-56" align="end" forceMount>
		// 		<DropdownMenuLabel className="font-normal">
		// 			<div className="flex flex-col space-y-1">
		// 				<p className="text-sm font-medium leading-none">
		// 					{data?.displayName ||
		// 						data?.email?.slice(0, data?.email?.indexOf("@")) ||
		// 						"Anonymous"}
		// 				</p>
		// 				<p className="text-xs leading-none text-muted-foreground">
		// 					{data?.email || "No email"}
		// 				</p>
		// 			</div>
		// 		</DropdownMenuLabel>
		// 		<DropdownMenuSeparator />
		// 		<DropdownMenuGroup>
		// 			<DropdownMenuItem>Profile</DropdownMenuItem>
		// 			<DropdownMenuItem>Billing</DropdownMenuItem>
		// 			<DropdownMenuItem>Settings</DropdownMenuItem>
		// 			<DropdownMenuItem>New Team</DropdownMenuItem>
		// 		</DropdownMenuGroup>
		// 		<DropdownMenuSeparator />
		// 		<DropdownMenuItem onClick={doLogout}>Log out</DropdownMenuItem>
		// 	</DropdownMenuContent>
		// </DropdownMenu>
	);
}
