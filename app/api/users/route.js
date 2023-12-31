import { NextResponse } from "next/server";
import { getAllUsers, addUser } from "./controllers";

export async function GET() {
  try {
    const response = await getAllUsers();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
//El province ID
export async function POST(request) {
  const { name, password, lastName, email, image } = await request.json();

  try {
    const newUser = await addUser(name, password, lastName, email, image);
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
