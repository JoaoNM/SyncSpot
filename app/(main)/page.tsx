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
							Boilerplate &amp; template for React projects using Next.js,
							shadcn/ui, Tailwind and Firebase...and TypeScript, of course!
						</p>
						<div className="space-x-4">
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
				<section className="container mt-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
						<div>
							<Card className=" shadow-teal-200 shadow-md border-teal-400">
								<CardHeader>
									<CardTitle>Need advanced data parsing?</CardTitle>
									<CardDescription>
										Check out BestParse/AI for all your parsing needs.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Link
										href="https://bestparse.com?utm_source=syncspot"
										target="_blank"
										className="underline text-slate-800 font-medium"
									>
										BestParse/AI
									</Link>{" "}
									can parse any text to JSON. It's free to use and and gives you
									great results when extracting and parsing scraped data, logs,
									or any other raw text.
									<p className="mt-4 font-semibold">
										20% off the pro plan with code "VENEFISH"
									</p>
									<Link
										className={cn(
											buttonVariants({ size: "xl", variant: "teal" }),
											"mt-4 w-full"
										)}
										href="https://bestparse.com?utm_source=syncspot"
									>
										Try BestParse/AI &rarr;
									</Link>
								</CardContent>
							</Card>
						</div>
						<div>
							<Card className=" shadow-slate-200 shadow-md border-slate-400">
								<CardHeader>
									<CardTitle>Looking for a job?</CardTitle>
									<CardDescription>
										Use JobLogr for free to track your job applications.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Link
										href="https://joblogr.com?utm_source=syncspot"
										target="_blank"
										className="underline text-slate-800 font-medium"
									>
										JobLogr.com
									</Link>{" "}
									is a free tool to track your job applications. It's simple to
									use and helps you keep track of all your job applications. No
									downloads required. Completely free and mobile friendly.
									<Link
										className={cn(
											buttonVariants({ size: "xl" }),
											"mt-4 w-full"
										)}
										href="https://bestparse.com?utm_source=syncspot"
									>
										Use JobLogr for Free
									</Link>
								</CardContent>
							</Card>
						</div>
						<div>
							<Card className=" shadow-orange-200 shadow-md border-orange-400">
								<CardHeader>
									<CardTitle>Need web development?</CardTitle>
									<CardDescription>
										Check out Enesien Software for all your web development
										needs.
									</CardDescription>
								</CardHeader>
								<CardContent></CardContent>
							</Card>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
