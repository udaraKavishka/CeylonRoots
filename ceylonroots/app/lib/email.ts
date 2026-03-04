import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM_EMAIL ?? 'CeylonRoots <noreply@ceylonroots.com>';
const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@ceylonroots.com';

// Only initialise Resend if the key is configured
const resend = apiKey && apiKey !== 're_your_api_key_here' ? new Resend(apiKey) : null;

// ── Contact form inquiry ──────────────────────────────────────────────────────

export async function sendContactInquiryEmail(data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}) {
    if (!resend) return;

    await resend.emails.send({
        from,
        to: adminEmail,
        replyTo: data.email,
        subject: `New Contact Inquiry: ${data.subject}`,
        html: `
            <h2>New Contact Inquiry from ${data.name}</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <hr />
            <p>${data.message.replace(/\n/g, '<br />')}</p>
        `,
    });
}

// ── Booking confirmation ──────────────────────────────────────────────────────

export async function sendBookingConfirmationEmail(data: {
    bookingId: string;
    firstName: string;
    lastName: string;
    email: string;
    packageTitle: string;
    travelerCount: number;
    totalAmount: number;
    paymentMethod: string | null;
}) {
    if (!resend) return;

    const { bookingId, firstName, lastName, email, packageTitle, travelerCount, totalAmount, paymentMethod } = data;

    // Email to customer
    await resend.emails.send({
        from,
        to: email,
        subject: `Booking Confirmed – ${packageTitle} | CeylonRoots`,
        html: `
            <h2>Your booking is confirmed!</h2>
            <p>Dear ${firstName},</p>
            <p>Thank you for booking with CeylonRoots. We&apos;ve received your booking and will be in touch within 24 hours to finalise your trip details.</p>
            <hr />
            <h3>Booking Summary</h3>
            <p><strong>Booking ID:</strong> #${bookingId.slice(-8).toUpperCase()}</p>
            <p><strong>Package:</strong> ${packageTitle}</p>
            <p><strong>Travelers:</strong> ${travelerCount}</p>
            <p><strong>Total:</strong> $${totalAmount.toLocaleString()}</p>
            ${paymentMethod ? `<p><strong>Payment Method:</strong> ${paymentMethod}</p>` : ''}
            <hr />
            <p>If you have any questions, reply to this email or WhatsApp us at +94 11 234 5678.</p>
            <p>Warm regards,<br /><strong>The CeylonRoots Team</strong></p>
        `,
    });

    // Notification to admin
    await resend.emails.send({
        from,
        to: adminEmail,
        subject: `New Booking: ${packageTitle} — ${firstName} ${lastName}`,
        html: `
            <h2>New Booking Received</h2>
            <p><strong>Booking ID:</strong> #${bookingId.slice(-8).toUpperCase()}</p>
            <p><strong>Customer:</strong> ${firstName} ${lastName} (${email})</p>
            <p><strong>Package:</strong> ${packageTitle}</p>
            <p><strong>Travelers:</strong> ${travelerCount}</p>
            <p><strong>Total:</strong> $${totalAmount.toLocaleString()}</p>
        `,
    });
}

// ── Welcome email ─────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(data: { name: string; email: string }) {
    if (!resend) return;

    await resend.emails.send({
        from,
        to: data.email,
        subject: 'Welcome to CeylonRoots!',
        html: `
            <h2>Welcome to CeylonRoots, ${data.name}!</h2>
            <p>We&apos;re thrilled to have you join our community of Sri Lanka explorers.</p>
            <p>Here&apos;s what you can do next:</p>
            <ul>
                <li><a href="${process.env.NEXT_PUBLIC_SITE_URL}/packages">Browse our curated travel packages</a></li>
                <li><a href="${process.env.NEXT_PUBLIC_SITE_URL}/guides">Meet our local guides</a></li>
                <li><a href="${process.env.NEXT_PUBLIC_SITE_URL}/destination">Explore Sri Lanka&apos;s top destinations</a></li>
            </ul>
            <p>Happy travels,<br /><strong>The CeylonRoots Team</strong></p>
        `,
    });
}
