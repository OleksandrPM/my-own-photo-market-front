import { Tag } from "../tag/tag.types";

export enum Orientation {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
  SQUARE = "square",
}

export interface ImageData {
  name: string;
  description: string | null;
  type: string; //TODO: think if i need it
  orientation: Orientation;
  width: number;
  height: number;
  tags: Tag["name"][];
  creationDate: Date;
  price: number;
}

export interface CreateImageData {
  name: string;
  type: string;
  description?: string | null;
  orientation?: Orientation | null;
  width?: number | null;
  height?: number | null;
  creationDate?: Date | null;
}

export interface ImageDataResponse extends ImageData {
  id: string;
  url: string;
}
