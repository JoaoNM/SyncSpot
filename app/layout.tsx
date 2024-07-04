import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { MyFirebaseProvider } from "@/components/firebase-providers";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

const font = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SyncSpot | Vercel Next.JS Firebase Shadcn/ui Tailwind Boilerplate",
	description:
		"SyncSpot is a Vercel Next.JS Firebase Shadcn/ui Tailwind Boilerplate project to help you get started with your next project.",
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
