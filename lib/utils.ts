import type { TimeSlot } from '@/types';

// ─── Booking ID generator ─────────────────────────────────────────────────────

/**
 * Generates a booking ID in the format BBN-YYYYMMDD-XXXX
 * e.g. BBN-20260601-A3F2
 */
export function generateBookingId(): string {
  const date = new Date();
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BBN-${datePart}-${randomPart}`;
}

// ─── Time slots generator ────────────────────────────────────────────────────

const MORNING_START = 9;  // 9:00 AM
const MORNING_END = 13;   // 1:00 PM
const EVENING_START = 16; // 4:00 PM
const EVENING_END = 19;   // 7:00 PM
const SLOT_INTERVAL = 30; // minutes

export function generateAllSlots(): string[] {
  const slots: string[] = [];

  function addSlots(startHour: number, endHour: number) {
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += SLOT_INTERVAL) {
        slots.push(
          `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
        );
      }
    }
  }

  addSlots(MORNING_START, MORNING_END);
  addSlots(EVENING_START, EVENING_END);

  return slots;
}

export function formatTimeLabel(time: string): string {
  const [hourStr, minStr] = time.split(':');
  const hour = parseInt(hourStr, 10);
  const min = minStr;
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${min} ${period}`;
}

export function buildTimeSlots(bookedTimes: string[]): TimeSlot[] {
  const allSlots = generateAllSlots();
  return allSlots.map((time) => ({
    time,
    label: formatTimeLabel(time),
    available: !bookedTimes.includes(time),
  }));
}

// ─── Date utilities ───────────────────────────────────────────────────────────

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function isSunday(dateStr: string): boolean {
  const date = new Date(dateStr + 'T00:00:00');
  return date.getDay() === 0;
}

export function getMinDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function getMaxDate(): string {
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  return maxDate.toISOString().split('T')[0];
}

// ─── API response helpers ────────────────────────────────────────────────────

export function successResponse<T>(data: T, message?: string, status = 200) {
  return Response.json(
    { success: true, data, message },
    { status }
  );
}

export function errorResponse(error: string, status = 400) {
  return Response.json(
    { success: false, error },
    { status }
  );
}

// ─── Sanitize string input ───────────────────────────────────────────────────

export function sanitizeString(str: string): string {
  return str.trim().replace(/[<>]/g, '');
}

// ─── Format currency (for future use) ────────────────────────────────────────

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}
