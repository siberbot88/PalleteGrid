import type { MoodId } from "@/lib/color/types";

export type FontPairing = {
  id: string;
  name: string;
  moodIds: MoodId[];
  heading: {
    family: string;
    fallback: string;
    weight: number[];
  };
  body: {
    family: string;
    fallback: string;
    weight: number[];
  };
  accent?: {
    family: string;
    fallback: string;
    weight: number[];
  };
  personality: string;
  bestFor: string[];
  sampleHeadline: string;
  sampleBody: string;
};
