import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
	return (
		<div className="container pt-6 md:pt-12 animate-in fade-in">{children}</div>
	);
}
