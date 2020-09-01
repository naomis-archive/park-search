export interface ParksInt {
  data: Array<DataInt>;
}

interface DataInt {
  weatherInfo: string;
  directionsInfo: string;
  url: string;
  fullName: string;
  images: Array<ImageInt>;
  description: string;
}

interface ImageInt {
  altText: string;
  url: string;
}
