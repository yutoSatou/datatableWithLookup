import { LightningElement, api, track } from 'lwc';
import getPurchaseDetails from '@salesforce/apex/PurchaseDetailCreateTableController.getPurchaseDetails';
import save from '@salesforce/apex/PurchaseDetailCreateTableController.save';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
  {
    label: '発注先',
    type: 'lookup',
    editable: true,
    typeAttributes: {
      objectApiName: 'PurchaseDetail__c',
      fieldName: 'Account__c',
      value: { fieldName: 'Account__c' },
      rowId: { fieldName: 'Id' }
    }
  },
  {
    label: '商品',
    type: 'lookup',
    editable: true,
    typeAttributes: {
      objectApiName: 'PurchaseDetail__c',
      fieldName: 'Product__c',
      value: { fieldName: 'Product__c' },
      rowId: { fieldName: 'Id' }
    }
  },
  {
    label: '数量',
    type: 'number',
    fieldName: 'Quantity__c',
    editable: true
  },
  {
    label: '単価',
    type: 'currency',
    fieldName: 'UnitPrice__c',
    editable: true
  },
  {
    label: '金額',
    type: 'currency',
    fieldName: 'AmountDisplay__c'
  }
];

export default class CreatePurchaseDetailTable extends NavigationMixin(
  LightningElement
) {
  @api recordId;
  @track records = [];
  columns = columns;
  isChanged = false;

  async connectedCallback() {
    this.records = await getPurchaseDetails({ parentId: this.recordId });
  }

  async handleSave() {
    this.isChanged = false;
    try {
      await save({ records: this.records });
      this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
          recordId: this.recordId,
          actionName: 'view'
        }
      });
      this.showToast();
    } catch (error) {
      console.log(error);
    }
  }

  showToast() {
    const event = new ShowToastEvent({
      title: 'Success',
      variant: 'success',
      message: '保存が完了しました。'
    });
    this.dispatchEvent(event);
  }

  handleCellChange(event) {
    this.isChanged = true;
    let draftValues = event.detail.draftValues;
    const own = Object.prototype.hasOwnProperty;
    let records = [...this.records];
    draftValues.forEach((item) => {
      const hasQuantity = own.call(item, 'Quantity__c');
      const hasUnitPrice = own.call(item, 'UnitPrice__c');
      if (hasQuantity || hasUnitPrice) {
        let record = {};
        let index;
        for (const [key, value] of Object.entries(records)) {
          if (value.Id !== item.Id) continue;
          record = { ...records[key] };
          index = key;
        }
        if (hasQuantity) {
          record.Quantity__c = item.Quantity__c;
          record.AmountDisplay__c = item.Quantity__c * record.UnitPrice__c;
        }
        if (hasUnitPrice) {
          record.UnitPrice__c = item.UnitPrice__c;
          record.AmountDisplay__c = item.UnitPrice__c * record.Quantity__c;
        }

        records[index] = { ...records[index], ...record };
      }
    });

    this.records = records;
  }

  handleLookupChange(event) {
    this.isChanged = true;
    let records = [...this.records];
    for (const [key, value] of Object.entries(records)) {
      if (value.Id === event.detail.rowId) {
        records[key] = { ...records[key], ...event.detail.record };
      }
    }
    this.records = records;
  }
}