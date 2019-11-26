export default class MockCategoriesService {
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
                }, 900);
        });
    }
    updateCategory(newData) {
        return new Promise(
            (resolve, reject) =>  {
                setTimeout(() => {
                    if(Math.random() > 0.5) { 
                        MockCategoriesService.categories = MockCategoriesService.categories.map(
                            category => category.id === newData.id ? newData : category 
                            );
                        resolve(newData); 
                    } else {
                        reject('error');
                    }
                }, 900);
            }
        );
    }
    deleteCategory(categoryId) {
        return new Promise(
            (resolve, reject) =>  {
                setTimeout(() => {
                    if(Math.random() > 0.5) { 
                        MockCategoriesService.categories = MockCategoriesService.categories.filter(category => category.id !== categoryId);
                        resolve(); 
                    } else {
                        reject('error');
                    }
                }, 900);
            }
        );
    }
    addCategory(categoryData) {
        return new Promise(
            (resolve, reject) =>  {
                setTimeout(() => {
                    if(Math.random() > 0.5) { 
                        MockCategoriesService.categories.push({
                            id: MockCategoriesService.currentId++,
                            name: categoryData.name,
                            description: categoryData.description,
                            position: MockCategoriesService.currentId,
                            productsNumber: 0,
                            active: categoryData.active
                        });
                        resolve(categoryData); 
                    } else {
                        reject('error');
                    }
                }, 900);
            }
        );
    }
}
