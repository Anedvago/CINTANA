import { Category } from 'src/app/models/Category';
import { CategoryHandler } from 'src/app/models/CategoryHandler';
import { CategoryService } from 'src/app/services/category.service';

export class SectionHandler implements CategoryHandler {
  public articlesSections: Category[][] = [];
  public servicesSections: Category[][] = [];

  constructor(private categoryService: CategoryService) {
    this.getAllArticlesCategories();
    this.getAllServicesCategories();
  }

  getAllArticlesCategories() {
    this.categoryService.getAllArticlesSections().then((data: any) => {
      this.articlesSections = Object.values(
        data.reduce((acc: any, objeto: any) => {
          const departament = objeto.departament;
          if (!acc[departament]) {
            acc[departament] = [];
          }
          acc[departament].push(objeto);
          return acc;
        }, {})
      );
    });
  }

  getAllServicesCategories() {
    this.categoryService.getAllServicesSections().then((data: any) => {
      this.servicesSections = Object.values(
        data.reduce((acc: any, objeto: any) => {
          const departament = objeto.departament;
          if (!acc[departament]) {
            acc[departament] = [];
          }
          acc[departament].push(objeto);
          return acc;
        }, {})
      );
    });
  }

  insertCategory(category: Category): void {
    this.categoryService
      .insertSection(category.type, category.departament!, category.name.toUpperCase())
      .then(() => {
        this.getAllArticlesCategories();
        this.getAllServicesCategories();
      });
  }

  updateCategory(category: Category): void {
    this.categoryService
      .updateSection(
        category.id,
        category.type,
        category.departament!,
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
      for (let i = 0; i < this.articlesSections.length; i++) {
        const gSection = this.articlesSections[i];
        for (let j = 0; j < gSection.length; j++) {
          const scc = this.articlesSections[i][j];
          if (scc.id == id) {
            section = scc;
          }
        }
      }
    } else {
      for (let i = 0; i < this.servicesSections.length; i++) {
        const gSection = this.servicesSections[i];
        for (let j = 0; j < gSection.length; j++) {
          const scc = this.servicesSections[i][j];
          if (scc.id == id) {
            section = scc;
          }
        }
      }
    }
    return section!;
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteSection(id).then(() => {
      this.getAllArticlesCategories();
      this.getAllServicesCategories();
    });
 }
}
