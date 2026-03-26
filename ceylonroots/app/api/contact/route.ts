import { NextRequest, NextResponse } from "next/server";
import { sendContactInquiryEmail } from "../../lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await sendContactInquiryEmail({
      name,
      email,
      phone: phone ?? "",
      subject,
      message,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    // Still return success so form feedback isn't affected by email failures
    return NextResponse.json({ success: true });
  }
}
