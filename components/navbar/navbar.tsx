import { NavbarMobile } from "@/components/navbar/navbar-mobile";
import { NavbarUserLinks } from "@/components/navbar/navbar-user-links";
import { buttonVariants } from "@/components/ui/button";
import { syncspot } from "@/public/syncspot.svg";
import Link from "next/link";
import { FC } from "react";

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
									className={buttonVariants({ variant: "outline", size: "xs" })}
								>
									Timezones
								</Link>
								<Link
									href="#2"
									className={buttonVariants({ variant: "outline", size: "xs" })}
								>
									SyncSpot
								</Link>
								<Link
									href="#3"
									className={buttonVariants({ variant: "outline", size: "xs" })}
								>
									Item 3
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
