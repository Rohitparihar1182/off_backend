import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DialogBox } from "./components/dialogbox";

export default function UploadImagePage(){
    return (
        <main className="p-4">
			<div className="mt-4 flex justify-between items-center">
				<div>
					<h4 className="font-bold text-2xl dark:text-white">
						Images
					</h4>
				</div>
				<div>
					<Button><Link href={"/images/new"}>Add Image</Link></Button>
				</div>
			</div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {
                    images.map((img, idx) => (
                        <DialogBox url={img.href} alt={img.alt} key={idx} />
                    ))
                }
            </div>
		</main>
    )
}

const images = [
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
    {
        href: "/1.jpg",
        alt: "This is an image",
    },
]