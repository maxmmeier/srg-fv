import { z } from 'zod';

export const addAppointmentOptionsSchema = z.object({
  timestamp: z.string(),
  location: z.string(),
  name: z.string(),
});
