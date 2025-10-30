export type MentorRequest = {
  id: string;
  name?: string;
  email?: string;
  mobile?: string;
  mentorshipArea?: string;
  date?: string;
  time?: string;
  message?: string;
  status?: string;
  meetingLink?: string;
  assignedTo?: string;
  assignedToEmail?: string;
  [key: string]: unknown;
};

export type Mentor = {
  uid: string;
  name?: string;
  email?: string;
  stream?: string;
  createdAt?: string;
  assignedRequests?: Record<string, boolean> | null;
  schedule?: Record<string, MentorRequest | Record<string, unknown>> | null;
  [key: string]: unknown;
};

export type ScheduleItem = MentorRequest & {
  scheduledAt?: string;
};

export type AppUser = {
  id: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
};

export type Contact = {
  id: string;
  name?: string;
  email?: string;
  message?: string;
  [key: string]: unknown;
};
