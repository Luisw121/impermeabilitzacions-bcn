/**
 * lib/schema.ts
 * Esquema Drizzle ORM para NeonDB
 * Tablas: users, accounts, sessions, budgets, project_photos
 */

import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

// ── Enum de estado de presupuesto ────────────────────────────────────────────
export const budgetStatusEnum = pgEnum("budget_status", [
  "pending",
  "sent",
  "accepted",
  "rejected",
  "invoiced",
]);

// ── Tabla de usuarios (NextAuth compatible) ───────────────────────────────────
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  phone: varchar("phone", { length: 20 }),
  nif: varchar("nif", { length: 20 }),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Tabla accounts (OAuth — NextAuth) ─────────────────────────────────────────
export const accounts = pgTable("accounts", {
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

// ── Tabla sessions (NextAuth) ─────────────────────────────────────────────────
export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// ── Tabla verificationTokens (NextAuth magic links) ───────────────────────────
export const verificationTokens = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// ── Tabla de presupuestos ─────────────────────────────────────────────────────
export const budgets = pgTable("budgets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  reference: varchar("reference", { length: 20 }).notNull().unique(),
  serviceType: varchar("service_type", { length: 100 }).notNull(),
  description: text("description"),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  amount: integer("amount"), // en céntimos de euro
  status: budgetStatusEnum("status").default("pending").notNull(),
  pdfUrl: text("pdf_url"),
  notes: text("notes"),
  visitDate: timestamp("visit_date"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Tabla de fotos de obra ────────────────────────────────────────────────────
export const projectPhotos = pgTable("project_photos", {
  id: uuid("id").defaultRandom().primaryKey(),
  budgetId: uuid("budget_id")
    .notNull()
    .references(() => budgets.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  caption: text("caption"),
  phase: varchar("phase", { length: 50 }), // 'before' | 'during' | 'after'
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

// ── Tabla de facturas ─────────────────────────────────────────────────────────
export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  budgetId: uuid("budget_id").references(() => budgets.id),
  userId: uuid("user_id").references(() => users.id),
  reference: varchar("reference", { length: 20 }).notNull().unique(),
  amount: integer("amount").notNull(), // en céntimos
  pdfUrl: text("pdf_url"),
  paid: boolean("paid").default(false).notNull(),
  paidAt: timestamp("paid_at"),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Tabla de mensajes de contacto ────────────────────────────────────────────
export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  zone: varchar("zone", { length: 100 }),
  serviceType: varchar("service_type", { length: 100 }),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
