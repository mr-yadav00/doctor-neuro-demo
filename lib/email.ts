import { Resend } from 'resend';
import type { Appointment } from '@/types';
import { formatDate, formatTimeLabel } from './utils';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@sitelabindia.in';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sitelabindia.in';
const CLINIC_NAME = 'Dr. Bharat Bhushan Neuro & Healthcare Clinic';
const CLINIC_PHONE = '+91 8696352862';
const CLINIC_WHATSAPP = 'https://wa.me/918696352862';

// ─── Patient Confirmation Email ───────────────────────────────────────────────

export async function sendPatientConfirmationEmail(
  appointment: Appointment
): Promise<void> {
  if (!resend) {
    console.warn('[Email] RESEND_API_KEY not set — skipping patient confirmation email');
    return;
  }

  const dateLabel = formatDate(appointment.appointment_date);
  const timeLabel = formatTimeLabel(appointment.appointment_time);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e3a6e 0%, #2563eb 100%); padding: 32px 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">🏥 ${CLINIC_NAME}</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Appointment Confirmation</p>
    </div>

    <!-- Body -->
    <div style="padding: 32px 24px;">
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="color: #166534; font-weight: 700; margin: 0; font-size: 16px;">✅ Your appointment is confirmed!</p>
        <p style="color: #166534; margin: 4px 0 0; font-size: 14px;">Booking ID: <strong>${appointment.booking_id}</strong></p>
      </div>

      <p style="color: #374151; font-size: 16px;">Dear <strong>${appointment.patient_name}</strong>,</p>
      <p style="color: #6b7280; line-height: 1.6;">Your appointment has been successfully booked. Please find your appointment details below:</p>

      <!-- Appointment details -->
      <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 40%;">👨‍⚕️ Doctor</td><td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 14px;">Dr. Bharat Bhushan</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">🏥 Department</td><td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 14px;">${appointment.department}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">📅 Date</td><td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 14px;">${dateLabel}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">⏰ Time</td><td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 14px;">${timeLabel}</td></tr>
          ${appointment.symptoms ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">🩺 Symptoms</td><td style="padding: 8px 0; color: #111827; font-size: 14px;">${appointment.symptoms}</td></tr>` : ''}
        </table>
      </div>

      <p style="color: #6b7280; font-size: 14px; line-height: 1.6;"><strong>Please bring:</strong> Previous medical reports, prescriptions, and arrive 10 minutes early.</p>

      <!-- Contact CTA -->
      <div style="text-align: center; margin: 24px 0;">
        <a href="tel:${CLINIC_PHONE.replace(/\s/g, '')}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 0 8px 8px;">📞 Call Clinic</a>
        <a href="${CLINIC_WHATSAPP}" style="display: inline-block; background: #16a34a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 0 8px 8px;">💬 WhatsApp</a>
      </div>

      <p style="color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.6;">
        To reschedule or cancel, please contact us at ${CLINIC_PHONE} or via WhatsApp.<br>
        This is an automated email. Please do not reply.
      </p>
    </div>

    <!-- Footer -->
    <div style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 16px 24px; text-align: center;">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">${CLINIC_NAME} | Rajasthan, India</p>
      <p style="color: #9ca3af; font-size: 11px; margin: 4px 0 0;">Powered by <a href="https://sitelabindia.in" style="color: #7c3aed; text-decoration: none;">SiteLab India</a></p>
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    await resend.emails.send({
      from: `${CLINIC_NAME} <${FROM_EMAIL}>`,
      to: appointment.patient_email,
      subject: `✅ Appointment Confirmed — ${appointment.booking_id} | ${CLINIC_NAME}`,
      html,
    });
    console.log(`[Email] Patient confirmation sent to ${appointment.patient_email}`);
  } catch (err) {
    console.error('[Email] Failed to send patient confirmation:', err);
    // Don't throw — email failure should not block appointment creation
  }
}

// ─── Admin Notification Email ─────────────────────────────────────────────────

export async function sendAdminNotificationEmail(
  appointment: Appointment
): Promise<void> {
  if (!resend) {
    console.warn('[Email] RESEND_API_KEY not set — skipping admin notification email');
    return;
  }

  const dateLabel = formatDate(appointment.appointment_date);
  const timeLabel = formatTimeLabel(appointment.appointment_time);

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    <div style="background: #1e3a6e; padding: 20px 24px;">
      <h2 style="color: white; margin: 0; font-size: 18px;">🔔 New Appointment Booking</h2>
      <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">Booking ID: ${appointment.booking_id}</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="background: #f9fafb;"><td style="padding: 10px; color: #6b7280; border: 1px solid #e5e7eb;">Patient Name</td><td style="padding: 10px; font-weight: 600; border: 1px solid #e5e7eb;">${appointment.patient_name}</td></tr>
        <tr><td style="padding: 10px; color: #6b7280; border: 1px solid #e5e7eb;">Mobile</td><td style="padding: 10px; font-weight: 600; border: 1px solid #e5e7eb;"><a href="tel:+91${appointment.patient_mobile}" style="color: #2563eb;">${appointment.patient_mobile}</a></td></tr>
        <tr style="background: #f9fafb;"><td style="padding: 10px; color: #6b7280; border: 1px solid #e5e7eb;">Email</td><td style="padding: 10px; border: 1px solid #e5e7eb;">${appointment.patient_email}</td></tr>
        <tr><td style="padding: 10px; color: #6b7280; border: 1px solid #e5e7eb;">Age / Gender</td><td style="padding: 10px; border: 1px solid #e5e7eb;">${appointment.patient_age || '—'} / ${appointment.patient_gender || '—'}</td></tr>
        <tr style="background: #f9fafb;"><td style="padding: 10px; color: #6b7280; border: 1px solid #e5e7eb;">Department</td><td style="padding: 10px; font-weight: 600; border: 1px solid #e5e7eb;">${appointment.department}</td></tr>
        <tr><td style="padding: 10px; color: #6b7280; border: 1px solid #e5e7eb;">Date</td><td style="padding: 10px; font-weight: 600; color: #2563eb; border: 1px solid #e5e7eb;">${dateLabel}</td></tr>
        <tr style="background: #f9fafb;"><td style="padding: 10px; color: #6b7280; border: 1px solid #e5e7eb;">Time</td><td style="padding: 10px; font-weight: 600; color: #2563eb; border: 1px solid #e5e7eb;">${timeLabel}</td></tr>
        ${appointment.symptoms ? `<tr><td style="padding: 10px; color: #6b7280; border: 1px solid #e5e7eb;">Symptoms</td><td style="padding: 10px; border: 1px solid #e5e7eb;">${appointment.symptoms}</td></tr>` : ''}
        ${appointment.notes ? `<tr style="background: #f9fafb;"><td style="padding: 10px; color: #6b7280; border: 1px solid #e5e7eb;">Notes</td><td style="padding: 10px; border: 1px solid #e5e7eb;">${appointment.notes}</td></tr>` : ''}
      </table>
      <div style="margin-top: 20px; padding: 12px; background: #fef3c7; border-radius: 8px; border: 1px solid #fcd34d;">
        <p style="margin: 0; color: #92400e; font-size: 13px;">⚠️ Status is currently <strong>PENDING</strong>. Please confirm or update in the admin dashboard.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    await resend.emails.send({
      from: `Clinic Booking System <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `🔔 New Booking: ${appointment.patient_name} — ${dateLabel} ${timeLabel}`,
      html,
    });
    console.log(`[Email] Admin notification sent to ${ADMIN_EMAIL}`);
  } catch (err) {
    console.error('[Email] Failed to send admin notification:', err);
  }
}
