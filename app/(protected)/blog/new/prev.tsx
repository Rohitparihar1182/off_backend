"use client";

import Editor from "@/components/editor/editor";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BlogSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const categories = [
	{ id: "abc1", name: "category1" },
	{ id: "abc2", name: "category2" },
	{ id: "abc3", name: "category3" },
];

export default function NewBlogPage() {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof BlogSchema>>({
		resolver: zodResolver(BlogSchema),
		defaultValues: {
			title: "",
			content: "",
			featuredImage: "",
			slug: "",
			categories: "",
		},
	});

	const onSubmit = (values: z.infer<typeof BlogSchema>) => {
		console.log(values);
	};

	return (
		<main className="mt-4 p-4">
			<div>
				<h4 className="font-semibold text-3xl dark:text-white">
					Add Blog
				</h4>
			</div>
			<div>
				<Form {...form}>
					<form
						className="space-y-6"
						onSubmit={() => form.handleSubmit(onSubmit)}
					>
						<div className="grid grid-cols-12 gap-8 justify-between">
							<div className="col-span-3 p-3">
								{/* featured Image */}
								<FormField
									control={form.control}
									name="featuredImage"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Featued Image</FormLabel>
											<FormControl>
												<ImageUpload
													value={
														field.value
															? [field.value]
															: []
													}
													disabled={isPending}
													onChange={(url) =>
														field.onChange(url)
													}
													onRemove={() =>
														field.onChange("")
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="col-span-8 p-3 space-y-4">
								{/* title input field */}
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="John Doe"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* category input field */}
								<FormField
									control={form.control}
									name="categories"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Categories</FormLabel>
											<Select
												disabled={isPending}
												onValueChange={field.onChange}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select Categories" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{categories.map(
														(category) => (
															<SelectItem
																key={
																	category.id
																}
																value={
																	category.id
																}
															>
																{category.name}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* content */}
								<FormField
									control={form.control}
									name="content"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Content</FormLabel>
											<FormControl>
												<Editor onChange={(content) =>
														field.onChange(content)
													} value={field.value} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="slug"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Slug</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="John Doe"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button disabled={isPending}>
							Save
						</Button>
					</form>
				</Form>
			</div>
		</main>
	);
}
