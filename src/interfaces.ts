export enum ImageTypes {
  ORIGINAL = "original",
  MODIFIED = "modified"
}

export interface ModifiedImage {
  imageData: ImageData;
  type: ImageTypes;
  changed: string;
}
