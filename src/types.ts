export interface Submission {
  id: string;
  fullName: string;
  email: string;
  track: string;
  experience: string;
  linkedin: string;
  message: string;
  submittedAt: string;
  status: "Pending" | "Reviewed" | "Contacted";
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface TimelinePoint {
  date: string;
  count: number;
}

export interface AdminStats {
  total: number;
  tracks: ChartDataPoint[];
  experience: ChartDataPoint[];
  statuses: ChartDataPoint[];
  timeline: TimelinePoint[];
}

export type TrackType = "Software Engineering" | "Product Management" | "UI/UX Design" | "Data Science";
export type ExperienceType = "Student" | "Career Changer" | "Self-taught";
