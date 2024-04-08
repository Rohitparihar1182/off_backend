"use client";

import React, { useEffect } from "react";

export default function SidebarWrapper({
	childrens,
}: {
	childrens: React.ReactNode;
}) {
	return (
		<div className="flex bg-slate-100 dark:bg-slate-900 h-screen">
			<div
				id="sidebar"
				className="sidebar h-screen right-0 transition duration-300 w-[260px] outline bg-purple-500 text-white p-6"
			>
				This is sidebar
			</div>
			<div
				onScroll={(e) => {
					if (e.currentTarget.scrollTop > 20) {
						document.getElementById('topbar')?.classList.add("backdrop-blur-md")
					}else{
						document.getElementById('topbar')?.classList.remove("backdrop-blur-md")
					}
				}}
				id="main-content"
				className="main-content transition flex-1  overflow-y-auto"
			>
				{childrens}
			</div>
		</div>
	);
}
