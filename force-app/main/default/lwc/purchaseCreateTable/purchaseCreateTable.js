import { LightningElement, api, wire } from 'lwc';
import getPurchaseRecords from '@salesforce/apex/PurchaseCreateTableController.getPurchaseRecords';
import { CurrentPageReference } from 'lightning/navigation';

const columns = [
  {
    label: '発注先',
    type: 'lookup',
    typeAttributes: {
      objectApiName: 'Account',
      value: 'Account'
    }
  },
  {
    label: '商品',
    type: 'lookup',
    typeAttributes: {
      objectApiName: 'Product',
      value: 'Product'
    }
  },
  {
    label: '数量',
    fieldName: 'Quantity__c'
  },
  {
    label: '単価',
    fieldName: 'UnitPrice__c'
  },
  {
    label: '金額',
    fieldName: 'Amount'
  }
];

export default class PurchaseCreateTable extends LightningElement {
  currentPageRef;
  @wire(CurrentPageReference)
  setRecordId(currentPageReference) {
    this.currentPageRef = currentPageReference;
    this.recordId = this.currentPageRef.state.c__recordId;
  }
  recordId;
  records;
  columns = columns;

  async connectedCallback() {
    await this.recordId;
    console.log(this.recordId);
    const results = await getPurchaseRecords({ parentId: this.recordId });
    for (let result of results) {
      console.log(result);
    }
  }
}