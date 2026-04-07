import List "mo:core/List";

import AuthTypes "types/auth";
import ProjectTypes "types/projects";
import InventoryTypes "types/inventory";
import SupplierTypes "types/suppliers";
import FinanceTypes "types/finance";
import InvoiceTypes "types/invoices";
import AlertTypes "types/alerts";

import AuthApi "mixins/auth-api";
import ProjectsApi "mixins/projects-api";
import InventoryApi "mixins/inventory-api";
import SuppliersApi "mixins/suppliers-api";
import FinanceApi "mixins/finance-api";
import InvoicesApi "mixins/invoices-api";
import AlertsApi "mixins/alerts-api";

actor {
  // --- Auth state ---
  let users = List.empty<AuthTypes.User>();

  // --- Projects state ---
  let projects = List.empty<ProjectTypes.Project>();
  let phases = List.empty<ProjectTypes.Phase>();

  // --- Inventory state ---
  let materials = List.empty<InventoryTypes.Material>();
  let transactions = List.empty<InventoryTypes.InventoryTransaction>();

  // --- Suppliers state ---
  let suppliers = List.empty<SupplierTypes.Supplier>();
  let deliveries = List.empty<SupplierTypes.Delivery>();

  // --- Finance state ---
  let budgets = List.empty<FinanceTypes.Budget>();

  // --- Invoices state ---
  let invoices = List.empty<InvoiceTypes.Invoice>();

  // --- Alerts state ---
  let alerts = List.empty<AlertTypes.Alert>();

  // --- Mixins ---
  include AuthApi(users);
  include ProjectsApi(projects, phases);
  include InventoryApi(materials, transactions);
  include SuppliersApi(suppliers, deliveries);
  include FinanceApi(budgets, transactions, projects, phases, materials);
  include InvoicesApi(invoices);
  include AlertsApi(alerts, materials, budgets);
};
