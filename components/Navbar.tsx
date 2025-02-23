import React from "react";

export default function Navbar() {
	return (
		<nav className="bg-background p-4 md:px-24 flex justify-center md:justify-between inset-x-0 top-0 items-center">
			<a href="/" className="flex items-center">
				<img src="/logo.svg" alt="Logo" className="h-16 w-16" />
				<span className="text-xl font-semibold font-montserrat">
					FlavorForge
				</span>
			</a>
			<span className="font-open hidden md:block">
				Made at{" "}
				<a
					href="https://fossunited.org/fosshack/2025"
					className="underline underline-offset-2 decoration-2 decoration-accent"
				>
					FOSSHACK2025
				</a>{" "}
				by{" "}
				<span className="underline underline-offset-2 decoration-2 decoration-accent">
					Team Catalyst-1
				</span>
			</span>
		</nav>
	);
}
