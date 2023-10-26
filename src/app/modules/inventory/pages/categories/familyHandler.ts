import { Category } from 'src/app/models/Category';
import { CategoryHandler } from 'src/app/models/CategoryHandler';
import { CategoryService } from 'src/app/services/category.service';

export class FamilyHandler implements CategoryHandler {
  public articlesFamilies: Category[][] = [];
  public servicesFamilies: Category[][] = [];

  constructor(private categoryService: CategoryService) {
    this.getAllArticlesCategories();
    this.getAllServicesCategories();
  }

  getAllArticlesCategories() {
    this.categoryService.getAllArticlesFamilies().then((data: any) => {
      this.articlesFamilies = Object.values(
        data.reduce((acc: any, objeto: any) => {
          const section = objeto.section;
          if (!acc[section]) {
            acc[section] = [];
          }
          acc[section].push(objeto);
          return acc;
        }, {})
      );
    });
  }

  getAllServicesCategories() {
    this.categoryService.getAllServicesFamilies().then((data: any) => {
      this.servicesFamilies = Object.values(
        data.reduce((acc: any, objeto: any) => {
          const section = objeto.section;
          if (!acc[section]) {
            acc[section] = [];
          }
          acc[section].push(objeto);
          return acc;
        }, {})
      );
    });
  }

  insertCategory(category: Category): void {
    this.categoryService
      .insertFamily(
        category.type,
        category.departament!,
        category.section!,
        category.name.toUpperCase()
      )
      .then(() => {
        this.getAllArticlesCategories();
        this.getAllServicesCategories();
      });
  }

  updateCategory(category: Category): void {
    this.categoryService
      .updateFamily(
        category.id,
        category.type,
        category.departament!,
        category.section!,
        category.name.toUpperCase()
      )
      .then(() => {
        this.getAllArticlesCategories();
        this.getAllServicesCategories();
      });
  }

  getCategoryById(id: number, type: string): Category {
    let section;
    if (type == 'A') {
      for (let i = 0; i < this.articlesFamilies.length; i++) {
        const gSection = this.articlesFamilies[i];
        for (let j = 0; j < gSection.length; j++) {
          const scc = this.articlesFamilies[i][j];
          if (scc.id == id) {
            section = scc;
          }
        }
      }
    } else {
      for (let i = 0; i < this.servicesFamilies.length; i++) {
        const gSection = this.servicesFamilies[i];
        for (let j = 0; j < gSection.length; j++) {
          const scc = this.servicesFamilies[i][j];
          if (scc.id == id) {
            section = scc;
          }
        }
      }
    }
    return section!;
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteFamily(id).then(() => {
      this.getAllArticlesCategories();
      this.getAllServicesCategories();
    });
 }
}
