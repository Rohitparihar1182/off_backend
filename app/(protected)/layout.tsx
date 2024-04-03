import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<div className="flex bg-slate-100 dark:bg-slate-900 h-screen">
					<div
						id="sidebar"
						className="sidebar h-screen right-0 transition duration-300 w-[260px] outline bg-purple-500 text-white p-6"
					>
						This is sidebar
					</div>
					<div
						id="main-content"
						className="main-content transition flex-1  overflow-y-auto"
					>
						<Navbar />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}