export enum Orientation {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
  SQUARE = "square",
}

export interface ImageData {
  name: string;
  description: string | null;
  creationDate: Date | null;
  type: string; //TODO: think if i need it
  orientation: Orientation | null;
  width: number | null;
  height: number | null;
  tags: string[] | null;
}
