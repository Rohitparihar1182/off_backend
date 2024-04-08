import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try{

        const { image, imageAlt }: {image: string, imageAlt: string} = await request.json()
        
        if (!image || !imageAlt) {
            return new NextResponse("image and alternate text are required", {status: 400});
        }
        
        const newImage = await db.image.create({
            data: {
                url: image,
                alt: imageAlt,
            },
        });
        
        return NextResponse.json(newImage);
    }catch(err){
        console.log("error");
        return new NextResponse("Database error", {status: 500})
    }

};
