"use client";

import { NavbarMobile } from "@/components/navbar/navbar-mobile";
import { NavbarUserLinks } from "@/components/navbar/navbar-user-links";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { LayersIcon, ClockIcon } from "@radix-ui/react-icons";
import TeamForm from "@/components/dashboard/team-form";
import { useAtom } from "jotai";
import { viewAtom } from "@/store/viewAtom";

export const NavBar: FC = () => {
	const [view, setView] = useAtom(viewAtom);

	return (
		<>
			<div className="animate-in bg-white shadow-sm fade-in w-full">
				<nav className="w-full px-[10vw] py-5">
					<div className="flex items-center">
						<Link
							href="/"
							className="hover:opacity-80 transition-opacity md:absolute left-5"
						>
							<div className="flex items-center">
								<img
									src="/syncspot.svg"
									className="w-8 h-8 mr-3 inline"
									alt="SyncSpot"
								/>
							</div>
						</Link>
						<div className="flex items-center justify-between grow">
							<div className="flex gap-2 h-fit items-center">
								<Button
									size="xs"
									variant="outline"
									className={cn(
										view === "overview"
											? "text-white bg-primary border-none hover:bg-primary"
											: "text-primary",
										"hidden md:flex"
									)}
									onClick={() => setView("overview")}
								>
									<ClockIcon
										className={cn(
											"h-3 w-3 mr-1.5",
											view === "overview" ? "stroke-white" : "stroke-primary"
										)}
									/>
									Overview
								</Button>
								<Button
									size="xs"
									variant="outline"
									className={cn(
										view === "overlap"
											? "text-white bg-primary border-none hover:bg-primary"
											: "text-primary",
										"hidden md:flex"
									)}
									onClick={() => setView("overlap")}
								>
									<LayersIcon
										className={cn(
											"h-3 w-3 mr-1.5",
											view === "overlap" ? "stroke-white" : "stroke-primary"
										)}
									/>
									Overlap
								</Button>
								<TeamForm />
							</div>
							<div className="flex items-center space-x-4">
								<NavbarUserLinks />
							</div>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
};
