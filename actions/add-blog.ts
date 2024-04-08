"use server";
import { db } from "@/lib/db";

import { BlogSchema } from "@/schemas";
import { z } from "zod";
import { addImage } from "./add-image";

export const addBlog = async (data: z.infer<typeof BlogSchema>) => {
	const isCorrect = BlogSchema.safeParse(data);
	if (isCorrect) {
		try {
			const { image } = await addImage({
				image: data.featuredImage,
				imageAlt: data.title,
			});
			if (!image)
				return {
					error: "Error uploading image",
				};
			const blog = await db.blog.create({
				data: {
					title: data.title,
					content: data.content,
					featuredImageId: image.id,
					categoryId: data.categories,
				},
			});
			return {
				success: "Blog created successfully"
			}
		} catch (err) {
			console.error(err);
			return {
				error: "Some error occured"
			}
		}
	}
	return {
		error: "Fields are not correct",
	};
};
