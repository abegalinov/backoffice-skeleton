import MockCategoriesService from '../services/MockCategoriesService';

describe('MockCategoriesService', () => {
    const service = new MockCategoriesService();
    service.timeout = 1;
    
    it('getCategories', () => {
        service.getCategories()
            .then((categories) => {
                expect(categories).toBeArray();
                expect(categories[0]).toBeObject();
            });
    });

    it('addCategory', () => {
        service.addCategory({ name: 'test123', description: 'test12345'})
            .then((newCategory) => {
                expect(newCategory).toBeObject();
                expect(newCategory.name).toBe('test123');
                expect(newCategory.description).toBe('test12345');

                const lastCategory = getLastCategory();
                expect(lastCategory.name).toBe('test123');
                expect(lastCategory.description).toBe('test12345');
                expect(lastCategory.id).toBeDefined();        
            });
    });

    it('updateCategory', () => {
        const lastCategory = getLastCategory();
        lastCategory.name = 'test777';
        lastCategory.description = 'test888';
        service.updateCategory(lastCategory)
            .then((updatedCategory) => {
                expect(updatedCategory).toBeObject();
                expect(updatedCategory.name).toBe('test777');
                expect(updatedCategory.description).toBe('test888');

                const lastCategoryUpdated = getLastCategory();
                expect(lastCategoryUpdated.name).toBe('test777');
                expect(lastCategoryUpdated.description).toBe('test888');        
            });
    });

    it('deleteCategory', () => {
        const lastCategory = getLastCategory();
        service.deleteCategory(lastCategory.id)
            .then(() => {
                const lastCategoryUpdated = getLastCategory();
                expect(lastCategoryUpdated.id).notToBe(lastCategory.id);
            });
    });

    it('moveCategoryUp', () => {
        const lastCategory = getLastCategory();
        service.moveCategoryUp(lastCategory.id)
            .then((newCategoriesList) => {
                expect(newCategoriesList[newCategoriesList.length - 1]).notToBe(lastCategory.id);
                expect(newCategoriesList[newCategoriesList.length - 2]).toBe(lastCategory.id);
            });
    });

    it('moveCategoryDown', () => {
        const firstCategory = getFirstCategory();
        service.moveCategoryDown(firstCategory.id)
            .then((newCategoriesList) => {
                expect(newCategoriesList[0]).notToBe(firstCategory.id);
                expect(newCategoriesList[1]).toBe(firstCategory.id);
            });
    });
});

const getLastCategory = () => {
    return MockCategoriesService.categories[MockCategoriesService.categories.length - 1];
}

const getFirstCategory = () => {
    return MockCategoriesService.categories[0];
}
