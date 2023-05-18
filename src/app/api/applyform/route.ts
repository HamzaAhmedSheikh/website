import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { eq, or } from "drizzle-orm";

import { UsersTable, NewUser } from "@/lib/schema/users";
import { ExperiencesTable, NewExperience } from "@/lib/schema/experiences";

import type { IApplyForm } from "@/types";

export async function POST(request: NextRequest) {
  const {
    fullName,
    fatherName,
    cnic,
    phoneNumber,
    city,
    email,
    gender,
    dateOfBirth,
    highestQualification,
    experiences,
  }: IApplyForm = await request.json();

  if (
    !fullName ||
    !email ||
    !phoneNumber ||
    !cnic ||
    !city ||
    !gender ||
    !highestQualification ||
    !dateOfBirth
  ) {
    return NextResponse.json(
      { message: "Add All Credentials" },
      {
        status: 404,
      }
    );
  }

  const appliedUser: NewUser = {
    fullName,
    fatherName,
    cnic,
    phoneNumber,
    city,
    email,
    gender,
    dateOfBirth,
    highestQualification,
  };

  try {
    const users = await db.insert(UsersTable).values(appliedUser).returning();

    experiences?.map(async (experience) => {
      const users = await db
        .select({ id: UsersTable.id })
        .from(UsersTable)
        .where(eq(UsersTable.email, email));
      const user_id = users[0].id;
      const appliedExperience: NewExperience = {
        userId: user_id,
        title: experience.title,
        industry: experience.industry,
        companyName: experience.companyName,
        yearsOfExperience: experience.yearsOfExperience,
      };
      const experiencesData = await db
        .insert(ExperiencesTable)
        .values(appliedExperience)
        .returning();
      return experiencesData;
    });
    return NextResponse.json({ message: "Applied Succesfully", users });
  } catch (error) {
    return NextResponse.json({
      message: "User Already Exist",
    });
  }
}
