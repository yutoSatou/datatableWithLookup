public with sharing class PurchaseDetailCreateTableController {
  @AuraEnabled(cacheable=true)
  public static List<PurchaseDetail__c> getPurchaseDetails(Id parentId) {
    System.debug(parentId);
    List<PurchaseDetail__c> records = [
      SELECT
        Id,
        UnitPrice__c,
        Product__c,
        Product__r.Name,
        Quantity__c,
        Purchase__c,
        Account__c,
        Account__r.Name,
        Amount__c,
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