"use server";
import { db } from "@/lib/db";

import { CategorySchema } from "@/schemas";
import { z } from "zod";
import { addImage } from "./add-image";

export const addCategory = async (data: z.infer<typeof CategorySchema>) => {
	const isCorrect = CategorySchema.safeParse(data);
	if (isCorrect) {
		try {
			const { image } = await addImage({
				image: data.image,
				imageAlt: data.name+" category image",
			});
			if (!image)
				return {
					error: "Error uploading image",
				};
			const category = await db.category.create({
				data: {
					name: data.name,
					categoryImage: image.id,
				},
			});
			return {
				success: "Category created successfully"
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
