import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import CustomDataTableResource from '@salesforce/resourceUrl/CustomDataTable';

export default class DatatableLookup extends LightningElement {
  @api objectApiName;
  @api fieldName;
  @api value;
  @api rowId;

  connectedCallback() {
    loadStyle(this, CustomDataTableResource);
  }

  handleLookupChange(event) {
    event.preventDefault();
    let detail = {
      rowId: this.rowId,
      record: { [this.fieldName]: event.target.value }
    };
    this.dispatchEvent(
      new CustomEvent('lookupchange', {
        detail,
        composed: true,
        bubbles: true
      })
    );
  }
}