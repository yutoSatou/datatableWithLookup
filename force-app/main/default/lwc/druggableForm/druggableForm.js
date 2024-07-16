import { LightningElement } from 'lwc';
import getRecords from '@salesforce/apex/OpporutnityHandler.getRecords';

export default class DruggableForm extends LightningElement {
  records = [];
  async connectedCallback() {
    this.records = await getRecords();
    let i = 0;
    for (const record of this.records) {
      i++;
      record.rowNum = i;
      this.records = [...this.records, ...record];
    }
    console.log(this.records);
  }
  onDragStart(event) {
    console.log('dragstart');
    let eventRowDataId = event.currentTarget.dataset.dragId;
  }

  onDragOver(event) {
    event.preventDefault();
  }
}