import { NextResponse} from "next/server";
import prisma from "../db/client";

export async function GET(){
    const res = await prisma.Review.findMany()
    return NextResponse.json(res)
}

export async function POST(request){
    const { comment,rating,productId } =  await request.json();
    const newReview = await prisma.Review.create({
        data:{
            comment,
            rating,
            product:{
                connect:{id:productId}
            }
        }
    })
    return NextResponse.json(newReview)
}