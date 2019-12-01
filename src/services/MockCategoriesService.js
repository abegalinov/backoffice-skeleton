export default class MockCategoriesService {
    timeout = 900;
    constructor() {
        if (!MockCategoriesService.categories) {
            MockCategoriesService.categories = [
                {id: 14, name: "Flowers", description: "roses", productsNumber: 0, position: 1, active: true},
                {id: 19, name: "Spring 2018", description: "not roses", productsNumber: 0, position: 6, active: false},
                {id: 18, name: "Test category 1", description: "ttest", productsNumber: 0, position: 7, active: true}                    
            ];
            MockCategoriesService.currentId = 20;
        }
    }
    getCategories() {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(MockCategoriesService.categories);
                }, this.timeout);
        });
    }
    addCategory(categoryData) {
        return new Promise(
            (resolve, reject) =>  {
                setTimeout(() => {
                    const newCategoryData = {
                        id: MockCategoriesService.currentId++,
                        position: MockCategoriesService.currentId,
                        productsNumber: 0,
                        active: categoryData.active,
                        ...categoryData
                    };
                    MockCategoriesService.categories.push(newCategoryData);
                    resolve(newCategoryData); 
                }, this.timeout);
            }
        );
    }
    updateCategory(newData) {
        return new Promise(
            (resolve, reject) =>  {
                setTimeout(() => {
                    MockCategoriesService.categories = MockCategoriesService.categories.map(
                        category => category.id === newData.id ? newData : category 
                        );
                    resolve(newData); 
                }, this.timeout);
            }
        );
    }
    deleteCategory(categoryId) {
        return new Promise(
            (resolve, reject) =>  {
                setTimeout(() => {
                    MockCategoriesService.categories = MockCategoriesService.categories.filter(category => category.id !== categoryId);
                    resolve(); 
                }, this.timeout);
            }
        );
    }
    moveCategoryUp(categoryId) {
        return new Promise(
            (resolve, reject) =>  {
                setTimeout(() => {
                    const targetCategoryKey = this._findCategoryKeyById(categoryId);
                    if (targetCategoryKey !== null && MockCategoriesService.categories[targetCategoryKey - 1]) {
                      const upperCategory = MockCategoriesService.categories[targetCategoryKey - 1];
                      MockCategoriesService.categories[targetCategoryKey - 1] = MockCategoriesService.categories[targetCategoryKey];
                      MockCategoriesService.categories[targetCategoryKey] = upperCategory;
                    }              
                    resolve(MockCategoriesService.categories); 
                }, this.timeout);
            }
        );
    }
    moveCategoryDown(categoryId) {
        return new Promise(
            (resolve, reject) =>  {
                setTimeout(() => {
                    const targetCategoryKey = this._findCategoryKeyById(categoryId);
                    if (targetCategoryKey != null && MockCategoriesService.categories[targetCategoryKey + 1]) {
                      const categoryBelow = MockCategoriesService.categories[targetCategoryKey + 1];
                      MockCategoriesService.categories[targetCategoryKey + 1] = MockCategoriesService.categories[targetCategoryKey];
                      MockCategoriesService.categories[targetCategoryKey] = categoryBelow;
                    }              
                    resolve(MockCategoriesService.categories); 
                }, this.timeout);
            }
        );
    }
    _findCategoryKeyById(categoryId) {
        for (const key of MockCategoriesService.categories.keys()) {
            if (MockCategoriesService.categories[key].id == categoryId) {
                return key;
            }
        }
        return null;
    }
}
