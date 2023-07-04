import { NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();


export async function POST(request){
    const { name,description} =  await request.json();
    const newCategory = await prisma.Category.create({
        data:{name,description}
    })
    return NextResponse.json(newCategory)
}