import React from 'react';

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import MaterialTable from 'material-table';
import { IconButton } from '@material-ui/core';

import { Categories } from '../components/Categories';

describe('<Categories />', () => {
    const categoriesData = () => [
        {id: 14, name: "Test", description: "test category", productsNumber: 1, position: 1, active: true},
        {id: 15, name: "Test1", description: "test category1", productsNumber: 2, position: 2, active: false},
        {id: 16, name: "Test2", description: "test category2", productsNumber: 3, position: 3, active: true}
    ];

    it('can mount', () => {
        const categories = categoriesData();
        mount(<Categories loadCategories={() => {}} categories={categories} />);
    });

    it('rendering properly and positioning functionality works', () => {
        const categories = categoriesData();
        const moveCategoryUp = sinon.spy();
        const moveCategoryDown = sinon.spy();

        const wrapper = mount(
        <Categories 
            categories={categories}
            loadCategories={() => {}}
            moveCategoryUp={moveCategoryUp}
            moveCategoryDown={moveCategoryDown}
        />
        );

        // first row up and down buttons
        expect(wrapper.find(IconButton).at(1).props().disabled).toBe(true);
        expect(wrapper.find(IconButton).at(2).props().disabled).toBe(false);

        // second row up and down buttons
        expect(wrapper.find(IconButton).at(5).props().disabled).toBe(false);
        expect(wrapper.find(IconButton).at(6).props().disabled).toBe(false);

        // third row up and down buttons
        expect(wrapper.find(IconButton).at(9).props().disabled).toBe(false);
        expect(wrapper.find(IconButton).at(10).props().disabled).toBe(true);

        // up button
        wrapper.find(IconButton).at(5).simulate('click');
        expect(moveCategoryUp.calledOnce).toBe(true);
        expect(moveCategoryUp.getCall(0).args[0]).toBe(15);

        // down button
        wrapper.find(IconButton).at(6).simulate('click');
        expect(moveCategoryDown.calledOnce).toBe(true);
        expect(moveCategoryDown.getCall(0).args[0]).toBe(15); 
    });

    it('up and down buttons are not rendered for new rows', () => {
        const categories = categoriesData();
        const wrapper = mount(
        <Categories 
            categories={categories}
            loadCategories={() => {}}
        />
        );

        expect(wrapper.find(IconButton).length).toBe(13);

        // add button clicked
        wrapper.find(IconButton).at(0).simulate('click');
        // three buttons more rendered
        expect(wrapper.find(IconButton).length).toBe(16);
    });

    it('up and down buttons are not rendered for editing rows', () => {
        const categories = categoriesData();
        const wrapper = mount(
        <Categories 
            categories={categories}
            loadCategories={() => {}}
        />
        );

        expect(wrapper.find(IconButton).length).toBe(13);

        // edit button clicked
        wrapper.find(IconButton).at(3).simulate('click');
        // one button less rendered
        expect(wrapper.find(IconButton).length).toBe(12);
    });

    it('load categories called when mounted', () => {
        const categories = categoriesData();
        const loadCategories = sinon.spy();
        const wrapper = mount(
        <Categories 
            categories={categories}
            loadCategories={loadCategories} 
        />
        );

        expect(wrapper.find(MaterialTable).length).toBe(1);
        expect(wrapper.find(MaterialTable).props().data).toBe(categories);
        expect(loadCategories.calledOnce).toBe(true);
    });

    it('add category called when adding new category', () => {
        const categories = categoriesData();
        const addCategory = sinon.stub().resolves();
        
        const wrapper = mount(
        <Categories 
            categories={categories}
            loadCategories={() => {}} 
            addCategory={addCategory}
        />
        );

        // add category
        wrapper.find(IconButton).at(0).simulate('click');      
        // change name and description
        wrapper.find('input').first().simulate('change', {target: {value: 'test777'}});
        wrapper.find('input').at(1).simulate('change', {target: {value: 'test777'}});
        // active category
        wrapper.find(IconButton).at(1).find('input').simulate('change', {target: {checked: true}});           
        // save
        wrapper.find(IconButton).at(2).simulate('click');        

        expect(addCategory.calledOnce).toBe(true);
        expect(addCategory.getCall(0).args[0].name).toBe('test777'); 
        expect(addCategory.getCall(0).args[0].description).toBe('test777'); 
        expect(addCategory.getCall(0).args[0].active).toBe(true); 
    });

    it('edit category called when editing category', () => {
        const categories = categoriesData();
        const editCategory = sinon.stub().resolves();

        const wrapper = mount(
        <Categories 
            categories={categories}
            loadCategories={() => {}} 
            moveCategoryUp={() => {}}
            moveCategoryDown={() => {}}
            editCategory={editCategory}
        />
        );

        // edit row
        wrapper.find(IconButton).at(3).simulate('click');      
        // change name and description
        wrapper.find('input').first().simulate('change', {target: {value: 'test777'}});
        wrapper.find('input').at(1).simulate('change', {target: {value: 'test777'}});
        // active category
        wrapper.find(IconButton).at(1).find('input').simulate('change', {target: {checked: false}});           
        // confirm
        wrapper.find(IconButton).at(2).simulate('click');        

        expect(editCategory.calledOnce).toBe(true);
        expect(editCategory.getCall(0).args[0].name).toBe('test777'); 
        expect(editCategory.getCall(0).args[0].description).toBe('test777'); 
        expect(editCategory.getCall(0).args[0].active).toBe(false); 
    });

    it('delete category called when deleting category', () => {
        const categories = categoriesData();
        const deleteCategory = sinon.stub().resolves();

        const wrapper = mount(
        <Categories 
            categories={categories}
            loadCategories={() => {}} 
            moveCategoryUp={() => {}}
            moveCategoryDown={() => {}}
            deleteCategory={deleteCategory}
        />
        );

        // delete and confirm
        wrapper.find(IconButton).at(4).simulate('click');      
        wrapper.find(IconButton).at(1).simulate('click');   

        expect(deleteCategory.calledOnce).toBe(true);
        expect(deleteCategory.getCall(0).args[0]).toBe(categories[0].id); 
    });         
});
