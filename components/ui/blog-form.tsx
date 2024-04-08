"use client";

import { addBlog } from "@/actions/add-blog";
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
import { BlogSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function BlogForm({categories} : {categories: Category[]}) {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const form = useForm<z.infer<typeof BlogSchema>>({
		resolver: zodResolver(BlogSchema),
		defaultValues: {
			title: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof BlogSchema>) => {
		const { error, success } = await addBlog(data);
		if (error) {
			setError(error);
		} else {
			setSuccess(success);
		}
	};

	const title = form.watch("title");

	const getSlug = (title: string): string => {
		return title.replaceAll(" ", "-");
	};

	useEffect(() => {
		form.setValue("slug", getSlug(title));
	}, [title]);

	return (
		<main className="mt-4 mb-5 p-4">
			<div>
				<h4 className="font-semibold text-3xl dark:text-white">
					Add Blog
				</h4>
			</div>
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
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
													disabled={
														form.formState
															.isSubmitting
													}
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
													disabled={
														form.formState
															.isSubmitting
													}
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
												disabled={
													form.formState.isSubmitting
												}
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
												<Editor
													onChange={(content) =>
														field.onChange(content)
													}
													value={field.value}
												/>
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
													disabled={
														form.formState
															.isSubmitting
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormError message={error} />
								<FormSuccess message={success} />
								<Button disabled={form.formState.isSubmitting}>
									Upload
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</div>
		</main>
	);
}
