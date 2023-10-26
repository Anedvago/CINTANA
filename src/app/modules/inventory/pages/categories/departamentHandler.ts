import { Category } from 'src/app/models/Category';
import { CategoryHandler } from 'src/app/models/CategoryHandler';
import { CategoryService } from 'src/app/services/category.service';

export class DepartamentHandler implements CategoryHandler {
    public articlesDptos: Category[] = [];
    public servicesDptos: Category[] = [];

    constructor(private categoryService: CategoryService) {
        this.getAllArticlesCategories();
        this.getAllServicesCategories();
    }


    getAllArticlesCategories() {
        this.categoryService.getAllArticlesDepartaments().then((data) => {
            this.articlesDptos = data!;
        });
    }

    getAllServicesCategories() {
        this.categoryService.getAllServicesDepartaments().then((data) => {
            this.servicesDptos = data!;
        });
    }

    insertCategory(category: Category): void {
        this.categoryService
            .insertDepartament(category.type, category.name.toUpperCase())
            .then(() => {
                this.getAllArticlesCategories();
                this.getAllServicesCategories();
            });
    }

    updateCategory(category: Category): void {
        this.categoryService
            .updateDepartament(category.id, category.type, category.name.toUpperCase())
            .then(() => {
                this.getAllArticlesCategories();
                this.getAllServicesCategories();
            });
    }
    getCategoryById(id: number, type: string): Category {
        if (type == 'A') {
            return this.articlesDptos.filter((elem) => {
                return elem.id == id;
            })[0];
        } else {
            return this.servicesDptos.filter((elem) => {
                return elem.id == id;
            })[0];
        }
    }

    deleteCategory(id: number): void {
       this.categoryService.deleteDepartament(id).then(() => {
        this.getAllArticlesCategories();
        this.getAllServicesCategories();
    });
    }
}
