import { db } from "@/lib/db"

export const getCategories = async() => {
    const categories = await db.category.findMany();
    return categories;
}