import React from 'react';
import { connect } from 'react-redux';

import MaterialTable from 'material-table';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { IconButton } from '@material-ui/core';

import { 
  loadCategories, 
  editCategory, 
  addCategory, 
  deleteCategory,
  moveCategoryUp,
  moveCategoryDown
} from '../state/categoriesActions';

export class Categories extends React.Component {
  componentDidMount() {
    this.props.loadCategories();
  }
  getLastCategoryPosition() {
    return this.props.categories[this.props.categories.length - 1].position;
  }
  getFirstCategoryPosition() {
    return this.props.categories[0].position;
  }
  render() {
    return (
      <MaterialTable
      title=""
      options={
          {
            addRowPosition: 'first',
            isLoading: true,
            search: false,
            toolbar: true,
            sorting: false,
            paging: false,
            draggable: false,
            actionsColumnIndex: 10
          }
        }
        columns={[
          {
            cellStyle: {width: 130},
            render: rowData => {
              if (!rowData || rowData.tableData.editing) {
                return (<></>);
              }
              return (
              <>
                <IconButton onClick={() => { this.props.moveCategoryUp(rowData.id) }} disabled={rowData.position === this.getFirstCategoryPosition()}><ArrowUpwardIcon/></IconButton>
                <IconButton onClick={() => { this.props.moveCategoryDown(rowData.id) }} disabled={rowData.position === this.getLastCategoryPosition()}><ArrowDownwardIcon/></IconButton>
              </>
              );
            }        
          },
          { title: 'Products', field: 'productsNumber', type: 'numeric', editable: 'never' },
          { title: 'Name', field: 'name' },
          { title: 'Description', field: 'description' },
          { title: 'Active', field: 'active',  type: 'boolean' },
        ]}
        data={this.props.categories}     
        editable={{
          onRowAdd: newData => this.props.addCategory(newData),
          onRowUpdate: (newData, oldData) => this.props.editCategory(newData),
          onRowDelete: oldData => this.props.deleteCategory(oldData.id)
        }}   
      />
    );
  }
}

export default connect(
    state => ({
      categories: state.categories.categories,
    }),
    dispatch => ({
        loadCategories: () => dispatch(loadCategories()),
        editCategory: newData => dispatch(editCategory(newData)),
        addCategory: newData => dispatch(addCategory(newData)),
        deleteCategory: categoryId => dispatch(deleteCategory(categoryId)),
        moveCategoryUp: categoryId => dispatch(moveCategoryUp(categoryId)),
        moveCategoryDown: categoryId => dispatch(moveCategoryDown(categoryId))
    })
)(Categories);
