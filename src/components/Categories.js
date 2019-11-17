import React from 'react';
import { connect } from 'react-redux';

import MaterialTable from 'material-table';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { loadCategories } from '../state/categoriesActions';
import { IconButton } from '@material-ui/core';

class Categories extends React.Component {
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
        options={
          {
            search: false,
            toolbar: false,
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
              return (
              <>
                <IconButton disabled={rowData.position === this.getFirstCategoryPosition()}><ArrowUpwardIcon/></IconButton>
                <IconButton disabled={rowData.position === this.getLastCategoryPosition()}><ArrowDownwardIcon/></IconButton>
              </>
              );
            }        
          },
          { title: 'Name', field: 'name' },
          { title: 'Description', field: 'description' },
          { title: 'Products', field: 'productsNumber', type: 'numeric' },
          { title: 'Active', field: 'active',  type: 'boolean' },
        ]}
        data={this.props.categories}     
        editable={{
          onRowAdd: newData => {
            
          },
          onRowUpdate: (newData, oldData) =>{
            return false;
          },
          onRowDelete: oldData => {
          
          }
        }}   
      />
    );
  }
}

export default connect(
    state => ({
      categories: state.categories.categories,
    }),
    { loadCategories }
  )(Categories);
