"use client";

import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useState, useTransition } from "react";
import axios from "axios";

export default function AddNewImagePage() {
	const [image, setImage] = useState<string[]>([]);
	const [imageAlt, setImageAlt] = useState<string | undefined>();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const onChange = (url: string) => {
		setImage((prev) => [...prev, url]);
	};

	const onRemove = () => {
		setImage([]);
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		console.log("submitting")
		e.preventDefault();
		if (image.length === 0) {
			setError("Upload an image!!!");
			return;
		}
		if (!imageAlt || imageAlt.length < 4) {
			setError("Alternate text is missing or too small");
			return;
		}
		startTransition(() => {
			axios
				.post("/api/images/new", {
					image: image[0],
					imageAlt,
				}, {
					withCredentials: true
				})
				.then((res) => {
					console.log(res);
					if (res.status === 200) {
						setSuccess("Image uploaded successfully");
					} else {
						setError(res.data.message);
					}
				})
				.catch(() => setError("Something went wrong!"));
		});
	};

	useEffect(() => {
		setSuccess("");
		setError("");
	}, [image, imageAlt])

	return (
		<main className="p-4">
			<div className="mt-4 flex flex-col gap-4">
				<div>
					<h4 className="font-bold text-2xl dark:text-white">
						Add new Image
					</h4>
				</div>
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="max-w-96">
						<div className="mb-4">
							<label
								className="text-sm font-medium leading-none mb-2 inline-block"
								htmlFor="image-alt"
							>
								Image title{" "}
								<span className="text-pink-600">*</span>
							</label>
							<Input
								placeholder="Image title"
								id="image-alt"
								type="text"
								required
								value={imageAlt}
								disabled={isPending}
								onChange={(e) => setImageAlt(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<ImageUpload
								onChange={onChange}
								onRemove={onRemove}
								value={image}
								disabled={isPending}
							/>
						</div>
						{error && <div className="bg-destructive/15 p-3 my-2 rounded-md flex items-center gap-x-2 text-sm text-destructive">
							<p>{error}</p>
						</div>}
						{success && <div className="bg-emerald-500/15 my-2 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
							<p>{success}</p>
						</div>}
					</div>

					{image.length > 0 && (
						<div>
							<Button type="submit">Upload Image</Button>
						</div>
					)}
				</form>
			</div>
		</main>
	);
}
