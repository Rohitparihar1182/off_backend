"use client";

import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "./navbar";
import { motion } from 'framer-motion';

export default function SidebarWrapper({
	childrens,
}: {
	childrens: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(true);

	const handleOpen = () => {
		if(isOpen){
			setIsOpen(false);
		}else{
			setIsOpen(true)
		}
	}

	return (
		<div className="flex bg-slate-100 dark:bg-slate-900 h-screen">
			<motion.div
				id="sidebar"
				aria-expanded={"true"}
				animate={{
					x: isOpen ? 0 : "-100%",
					transition: { ease: "linear", duration: 0.2, type: "keyframes", delay: isOpen ? 0.2 : 0 }
					
				  }}
				className="sidebar fixed h-screen transition-all ease-linear w-[260px] outline bg-gradient-to-t from-[#6f3dc3] from-10% via-[#603dc3] via-40% to-[#5c3dc3] to-100% dark:bg-[#603dc3] text-white "
			>
				<Sidebar />
			</motion.div>
			<motion.div
				onScroll={(e) => {
					if (e.currentTarget.scrollTop > 20) {
						document.getElementById('topbar')?.classList.add("backdrop-blur-md")
					}else{
						document.getElementById('topbar')?.classList.remove("backdrop-blur-md")
					}
				}}
				animate={{
					marginLeft: isOpen ? '260px' : '0px',
					transition: { ease: "linear", duration: 0.2, type: "keyframes" }
				  }}
				id="main-content"
				className="main-content flex-1 overflow-y-auto transition-all ml-[260px] ease-linear"
			>
				
				<Navbar handleOpen={handleOpen} />
				{childrens}
			</motion.div>
		</div>
	);
}
