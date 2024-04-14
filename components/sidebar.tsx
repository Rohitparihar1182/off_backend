import Image from "next/image";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { HomeIcon, ImageIcon } from "lucide-react";
import { ReaderIcon } from "@radix-ui/react-icons";
import SidebarLinks from "./sidebar-sub-links";
import { createId } from '@paralleldrive/cuid2';

const Sidebar = () => {
	return (
		<div className="h-screen">
			<div className="border-b border-neutral-100/20 px-6 py-2">
				<Image
					src={"/logo.webp"}
					alt="logo"
					width={200}
					height={100}
					className="w-1/2"
				/>
			</div>
			<div className="p-4">
				<ul>
					<li className="uppercase text-[11px]  text-primary-500 dark:text-primary-400 mt-0 leading-4 mb-2 group-data-[sidebar=dark]:text-primary-400 group-data-[sidebar=brand]:text-primary-300">
						<span className="text-[9px] text-slate-400 dark:text-slate-500 group-data-[sidebar=dark]:text-slate-500 group-data-[sidebar=brand]:text-slate-400">
							DashboardS &amp; Apps
						</span>
					</li>
					<li className="">
						<Accordion type="single" collapsible className="w-full">
							{links.map(link => {
								const Icon = link.icon
								return (
								<AccordionItem
									key={createId()}
									value={link.label}
									className="border-none"
								>
									<AccordionTrigger className="group text-slate-300 hover:text-slate-200 p-4 uppercase">
										<div className="flex items-center justify-start gap-2 ">
											<Icon className="w-4 h-4 transition-none" />
											<span>{link.label}</span>
										</div>
									</AccordionTrigger>
									<AccordionContent className="p-2">
										<SidebarLinks links={link.sublinks} />
									</AccordionContent>
								</AccordionItem>
							)})}
						</Accordion>
					</li>
				</ul>
			</div>
		</div>
	);
};

const links = [
	{
		label: "Admin",
		icon: HomeIcon,
		sublinks: [
			{
				label: "Dashboard",
				href: "/",
			},
			{
				label: "Add user",
				href: "/admin/add-user",
			},
			{
				label: "Something",
				href: "/admin/something",
			},
		],
	},
	{
		label: "Blog",
		icon: ReaderIcon,
		sublinks: [
			{
				label: "Blogs",
				href: "/blog",
			},
			{
				label: "Add blog",
				href: "/blog/new",
			},
		],
	},
	{
		label: "Images",
		icon: ImageIcon,
		sublinks: [
			{
				label: "Images",
				href: "/images",
			},
			{
				label: "Add Image",
				href: "/images/new",
			},
		],
	},
];

export default Sidebar;
