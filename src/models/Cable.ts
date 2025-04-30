export interface Cable {
    id: number;
    name: string;
    capacity: number;
    boxes_connected: number[];
    path: { lat: number; lng: number }[];
  }
  