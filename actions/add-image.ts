"use server";

import { db } from "@/lib/db";

export const addImage = async ({
	image,
	imageAlt,
}: {
	image: string;
	imageAlt: string;
}) => {
	if (!image || !imageAlt) {
		return { error: "Required field not found" };
	}

	try {
		const img = await db.image.create({
			data: {
				url: image,
				alt: imageAlt,
			},
		});
		return { success: "Image uploaded successfully!", image: img }
	} catch (err) {
		return { error: "Some error occured" };
	}
};
