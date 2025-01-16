export interface Screening {
  id: string;
  startDate: Date;
  endDate: Date;
  weekDays: string[];
  startTime: string;
  city: string;
  address: string;
}

export interface Movie {
  id: string;
  title: string;
  duration: number;
  language: string;
  subtitles?: string;
  director: string;
  actors: string[];
  minAge?: number;
  poster?: string;
  screenings: Screening[];
}
