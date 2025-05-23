export type UserRole = "owner" | "tenant" | "manager" | "business"
export type PropertyStatus = "active" | "inactive" | "under_maintenance"
export type AccessLevel = "view" | "edit" | "admin"
export type MaintenanceType =
  | "electrical"
  | "plumbing"
  | "painting"
  | "cleaning"
  | "other"
export type MaintenanceStatus = "pending" | "in_progress" | "done" | "cancelled"
export type ServiceType = "electrician" | "plumber" | "cleaning" | "general"
export type DocumentType = "invoice" | "photo" | "other"
export type NotificationStatus = "unread" | "read"
