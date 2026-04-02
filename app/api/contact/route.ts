import { NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { ContactInquiryModel } from "@/lib/models/ContactInquiry";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  orderId?: string;
  message?: string;
};

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request) {
  try {
    if (!isMongoConfigured) {
      return NextResponse.json(
        { error: "Backend database is not configured yet. Add MONGODB_URI in environment variables." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as ContactPayload;

    if (!body.name?.trim()) return badRequest("Name is required.");
    if (!body.email?.trim()) return badRequest("Email is required.");
    if (!body.message?.trim()) return badRequest("Message is required.");

    await connectToDatabase();
    const inquiry = await ContactInquiryModel.create({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || "",
      topic: body.topic?.trim() || "general",
      orderId: body.orderId?.trim() || "",
      message: body.message.trim(),
    });

    return NextResponse.json({
      success: true,
      inquiryId: inquiry._id.toString(),
      message: "Inquiry submitted successfully.",
    });
  } catch (_error) {
    return NextResponse.json({ error: "Failed to submit inquiry." }, { status: 500 });
  }
}
