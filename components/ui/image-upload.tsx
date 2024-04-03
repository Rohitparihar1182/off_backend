"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	disabled,
	onChange,
	onRemove,
	value,
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onUpload = (result: any) => {
		onChange(result.info.secure_url);
	};

	if (!isMounted) {
		return null;
	}

	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{value.map((url) => (
					<div
						key={url}
						className="relative w-full h-[300px] rounded-md overflow-hidden border dark:border-gray-100 p-4"
					>
						<div className="z-10 absolute top-2 right-2">
							<Button
								type="button"
								onClick={() => onRemove(url)}
								variant="destructive"
								size="sm"
							>
								<Trash className="h-4 w-4" />
							</Button>
						</div>
						<div className="w-full h-full relative">
							<Image
								fill
								className="object-cover max-w-full !h-auto"
								alt="Image"
								src={url}
							/>
						</div>
					</div>
				))}
			</div>
			<CldUploadWidget
				onUpload={(result) => {
					onUpload(result);
				}}
				uploadPreset="xf7w5fnl"
			>
				{({ open }) => {
					const onClick = () => {
						open();
					};

					return (
						<Button
							type="button"
							disabled={disabled}
							variant="secondary"
							onClick={onClick}
						>
							<ImagePlus className="h-4 w-4 mr-2" />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
