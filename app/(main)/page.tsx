import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Home() {
	return (
		<>
			<div className="grow flex flex-col items-center justify-evenly">
				<section className="space-y-6">
					<div className="container flex flex-col items-center gap-8 text-center">
						<Badge className="space-x-4 font-normal text-sm mt-8">
							100% Free & Vegan!
						</Badge>
						<h1 className="max-w-4xl font-heading font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
							Timezones for Teams
						</h1>
						<p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
							A modern solution for distributed teams to easily check on who's
							online & when everyone is available.
						</p>
						<div className="gap-4 flex flex-col">
							<Link href="/login">
								<Button size="lg">Get Started!</Button>
							</Link>
							<Link
								target="_blank"
								href="https://github.com/https://github.com/JoaoNM/SyncSpot/syncspot"
							>
								<Button size="lg" variant="link">
									View Project on GitHub &rarr;
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
