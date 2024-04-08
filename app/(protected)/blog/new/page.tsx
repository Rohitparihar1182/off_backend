import { getCategories } from "@/actions/get-categories"
import BlogForm from "@/components/ui/blog-form";

const NewBlogPage = async() => {
	const categories = await getCategories()
	return (
		<BlogForm categories={categories} />
	)
}


export default NewBlogPage;