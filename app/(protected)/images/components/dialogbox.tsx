"use client";

import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function DialogBox({ url, alt }: { url: string; alt: string }) {
	const {toast} = useToast();
	const copyUrl = () => {
		navigator.clipboard.writeText(url);
		toast({
			title: "Url copied to the clipboard",
			action: (
			  <ToastAction altText="Goto schedule to undo">Close</ToastAction>
			),
			
		  })
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="relative pb-8 cursor-pointer">
					<Image
						src={url}
						className="w-full h-full object-cover"
						alt={alt}
						width={100}
						height={100}
					/>
				</div>
				{/* <Button variant="outline">
					
				</Button> */}
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Copy Image</DialogTitle>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						<Input
							id="link"
							defaultValue="https://ui.shadcn.com/docs/installation"
							readOnly
						/>
					</div>
					<Button
						onClick={copyUrl}
						type="submit"
						size="sm"
						className="px-3"
					>
						<span className="sr-only">Copy</span>
						<CopyIcon className="h-4 w-4" />
					</Button>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
