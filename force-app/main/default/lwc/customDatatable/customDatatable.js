import LightningDatatable from 'lightning/datatable';
import lookupTemplate from './lookupTemplate.html';

export default class CustomDatatable extends LightningDatatable {
  static customTypes = {
    lookup: {
      template: lookupTemplate,
      typeAttributes: ['rowId', 'objectApiName', 'fieldName', 'value', 'fields']
    }
  };
}