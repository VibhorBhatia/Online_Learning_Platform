import { db } from "@/config/db";                    // Your Drizzle DB instance
import { usersTable } from "@/config/schema";        // Your table schema
import { eq } from "drizzle-orm";                    // Comparison function
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, name } = await req.json();

    // ✅ Check if user already exists
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    // ✅ If not, insert new user
    if (users.length === 0) {
      const result = await db
        .insert(usersTable)
        .values({ name, email })
        .returning(); // returns inserted rows
      return NextResponse.json(result[0]);
    }

    // ✅ Return existing user
    return NextResponse.json(users[0]);

  } catch (error) {
    console.error("POST /api/user error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
