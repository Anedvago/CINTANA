import { Category } from './Category';

export interface CategoryHandler {
  getAllArticlesCategories(): any;
  getAllServicesCategories(): any;
  insertCategory(category: Category): void;
  updateCategory(category: Category): void;
  getCategoryById(id: number, type: string): Category;
  deleteCategory(id: number): void;
}
