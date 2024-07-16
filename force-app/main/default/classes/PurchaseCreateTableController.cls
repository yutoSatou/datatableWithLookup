public with sharing class PurchaseCreateTableController {
  @AuraEnabled(cacheable=true)
  public static List<PurchaseDetail__c> getPurchaseRecords(Id parentId) {
    System.debug(parentId);
    List<PurchaseDetail__c> records = [
      SELECT
        Id,
        UnitPrice__c,
        Product__c,
        Quantity__c,
        Purchase__c,
        Account__c,
        AmountDisplay__c
      FROM PurchaseDetail__c
      WHERE Purchase__c = :parentId
    ];
    return records;
  }

  @AuraEnabled
  public static void save(List<PurchaseDetail__c> records) {
    System.debug(records);
    update records;
  }
}