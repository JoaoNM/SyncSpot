import { NavbarMobile } from "@/components/navbar/navbar-mobile";
import { NavbarUserLinks } from "@/components/navbar/navbar-user-links";
import { buttonVariants } from "@/components/ui/button";
import { syncspot } from "@/public/syncspot.svg";
import Link from "next/link";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { PlusCircledIcon, LayersIcon, ClockIcon } from "@radix-ui/react-icons";

export const NavBar: FC = () => {
	return (
		<>
			<div className="animate-in bg-white shadow-sm fade-in w-full">
				<nav className="w-full px-2 md:px-[8rem] py-5">
					<div className="flex items-center">
						<Link
							href="/"
							className="hover:opacity-80 transition-opacity absolute left-5"
						>
							<div className="flex items-center">
								<img
									src="/syncspot.svg"
									className="w-8 h-8 mr-2 inline"
									alt="SyncSpot"
								/>
							</div>
						</Link>
						<div className="hidden md:flex items-center justify-between grow">
							<div className="flex gap-2 h-fit ">
								<Link
									href="#1"
									className={cn(
										buttonVariants({ variant: "outline", size: "xs" }),
										"text-primary"
									)}
								>
									<ClockIcon className="h-3 w-3 mr-1.5 stroke-primary" />
									Timezones
								</Link>
								<Link
									href="#2"
									className={cn(
										buttonVariants({ variant: "outline", size: "xs" }),
										"text-primary"
									)}
								>
									<LayersIcon className="h-3 w-3 mr-1.5 stroke-primary" />
									Overlap
								</Link>
								<Link
									href="#3"
									className={cn(
										buttonVariants({ variant: "outline", size: "xs" }),
										"text-primary "
									)}
								>
									<PlusCircledIcon className="h-3 w-3 stroke-1 mr-1.5 stroke-primary" />
									Create Team
								</Link>
							</div>
							<div className="flex items-center space-x-4">
								<NavbarUserLinks />
							</div>
						</div>
						<div className="grow md:hidden flex justify-end">
							<NavbarMobile />
						</div>
					</div>
				</nav>
			</div>
		</>
	);
};
