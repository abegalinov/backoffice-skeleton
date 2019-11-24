export default class MockCategoriesService {
    getCategories() {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    console.log('categories loaded');
                    resolve([
                        {"id":14,"name":"Flowers","description":"roses","productsNumber":0,"position":1, active: true},
                        {"id":19,"name":"Spring 2018","description":"not roses","productsNumber":0,"position":6, active: false},
                        {"id":18,"name":"Test category 1","description":"ttest","productsNumber":0,"position":7, active: true}                    
                    ]);
                }, 900);
        });
    }
    updateCategory(newData) {
        return new Promise(
            (resolve, reject) =>  {
                setTimeout(() => {
                    if(Math.random() > 0.5) { 
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
                        resolve(categoryData); 
                    } else {
                        reject('error');
                    }
                }, 900);
            }
        );
    }
}
