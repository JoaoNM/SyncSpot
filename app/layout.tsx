import type { Metadata } from "next";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { MyFirebaseProvider } from "@/components/firebase-providers";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";
import { Inter as FontSans } from "next/font/google";

const font = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "SyncSpot | Timezones for Teams",
	description:
		"SyncSpot is a tool for distributed teams to sync across timezones",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className={cn(font.className)}>
				<MyFirebaseProvider>
					{children}
					<Toaster />
				</MyFirebaseProvider>
			</body>
		</html>
	);
}
