export default class MockCategoriesService {
    getCategories() {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve([
                        {"id":14,"name":"Flowers","description":"roses","productsNumber":0,"position":1, active: true},
                        {"id":19,"name":"Spring 2018","description":"not roses","productsNumber":0,"position":6, active: false},
                        {"id":18,"name":"Test category 1","description":"ttest","productsNumber":0,"position":7, active: true}                    
                    ]);
                }, 900);
        });
    }
}
