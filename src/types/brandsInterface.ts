export interface Brand {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface Data {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
