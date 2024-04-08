import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DialogBox } from "./components/dialogbox";
import { db } from "@/lib/db";

export default async function UploadImagePage(){
    const images = await db.image.findMany()

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
                    images.map(img => (
                        <DialogBox url={img.url} alt={img.alt} key={img.id} />
                    ))
                }
            </div>
		</main>
    )
}
