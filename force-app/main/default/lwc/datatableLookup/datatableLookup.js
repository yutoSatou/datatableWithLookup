import { LightningElement, api, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import CustomDataTableResource from '@salesforce/resourceUrl/CustomDataTable';
import { getRecord } from 'lightning/uiRecordApi';

export default class DatatableLookup extends LightningElement {
  @api objectApiName;
  @api fieldName;
  @api value;
  @api rowId;
  @api fields;
  showLookup = false;

  @wire(getRecord, { recordId: '$value', fields: '$fields' })
  record;

  connectedCallback() {
    loadStyle(this, CustomDataTableResource);
    console.log(this.fields);
    console.log(this.record);
  }

  getFieldName() {
    let fieldName = this.fields[0];
    fieldName = fieldName.substring(
      fieldName.lastIndexOf('.') + 1,
      fieldName.length
    );
    return fieldName;
  }

  get lookupName() {
    return this.record.data != null
      ? this.record.data.fields[this.getFieldName()].value
      : '';
  }
  get lookupValue() {
    return this.record.data != null &&
      this.record.data.fields[this.getFieldName()].value
      ? '/' + this.value
      : '';
  }

  handleLookupChange(event) {
    event.preventDefault();
    const value = event.target.value;
    this.showLookup = value ? true : false;
    let detail = {
      rowId: this.rowId,
      record: { [this.fieldName]: value }
    };
    this.dispatchEvent(
      new CustomEvent('lookupchange', {
        detail,
        composed: true,
        bubbles: true
      })
    );
  }

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.showLookup = true;
  }
}
