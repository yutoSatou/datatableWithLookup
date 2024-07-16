public with sharing class OpporutnityHandler {
  public OpporutnityHandler() {
  }

  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getRecords() {
    List<Opportunity> records = [
      SELECT Id, Name, Account.Name, CloseDate, StageName, Amount
      FROM Opportunity
    ];
    return records;
  }
}