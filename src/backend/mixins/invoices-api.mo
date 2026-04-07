import Time "mo:core/Time";
import List "mo:core/List";
import Common "../types/common";
import InvoiceTypes "../types/invoices";
import InvoiceLib "../lib/invoices";

mixin (
  invoices : List.List<InvoiceTypes.Invoice>,
) {
  var nextInvoiceId : Nat = 0;

  public shared ({ caller }) func createInvoice(payload : InvoiceTypes.CreateInvoicePayload) : async InvoiceTypes.InvoicePublic {
    let now = Time.now();
    let result = InvoiceLib.createInvoice(invoices, nextInvoiceId, caller, payload, now);
    nextInvoiceId += 1;
    result;
  };

  public shared ({ caller }) func updateInvoiceStatus(payload : InvoiceTypes.UpdateInvoiceStatusPayload) : async InvoiceTypes.InvoicePublic {
    let now = Time.now();
    InvoiceLib.updateInvoiceStatus(invoices, payload, now);
  };

  public shared query ({ caller }) func getInvoice(invoiceId : Common.InvoiceId) : async ?InvoiceTypes.InvoicePublic {
    InvoiceLib.getInvoice(invoices, invoiceId);
  };

  public shared query ({ caller }) func listInvoices(
    projectId : ?Common.ProjectId,
    supplierId : ?Common.SupplierId,
    status : ?InvoiceTypes.InvoiceStatus,
  ) : async [InvoiceTypes.InvoicePublic] {
    InvoiceLib.listInvoices(invoices, projectId, supplierId, status);
  };

  public shared query ({ caller }) func getPendingInvoices(projectId : ?Common.ProjectId) : async [InvoiceTypes.InvoicePublic] {
    InvoiceLib.getPendingInvoices(invoices, projectId);
  };
};
