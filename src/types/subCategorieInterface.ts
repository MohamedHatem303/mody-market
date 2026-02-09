export interface subCategorieData {
  results: number;
  metadata: subCategorieMetadata;
  data: subCategorieItem[];
}

export interface subCategorieMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface subCategorieItem {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
