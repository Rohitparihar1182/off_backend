"use client";

import { addCategory } from "@/actions/add-category";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { CategorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function NewCategoryPage() {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const form = useForm<z.infer<typeof CategorySchema>>({
		resolver: zodResolver(CategorySchema)
	});

	const onSubmit = async(data: z.infer<typeof CategorySchema>) => {
		const {error, success} = await addCategory(data);
		if(error){
			setError(error)
		}else{
			setSuccess(success)
		}
	};


	return (
		<main className="mt-4 p-4">
			<div>
				<h4 className="font-semibold text-3xl dark:text-white">
					Add Category
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
									name="image"
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
													disabled={form.formState.isSubmitting}
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
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category Name</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="John Doe"
													disabled={form.formState.isSubmitting}
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
						<Button disabled={form.formState.isSubmitting}>
							Save
						</Button>
					</form>
				</Form>
			</div>
		</main>
	);
}
