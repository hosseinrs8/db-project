import { Migration } from '@mikro-orm/migrations';

export class Migration20220105080817 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "factory" ("id" serial primary key, "ceo" varchar(255) not null, "address" varchar(255) not null);',
    );

    this.addSql(
      'create table "factory_phones" ("key" varchar(255) not null, "factory_id" int4 not null, "number" varchar(255) not null);',
    );
    this.addSql(
      'alter table "factory_phones" add constraint "factory_phones_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "customers" ("id" serial primary key, "name" varchar(255) not null);',
    );

    this.addSql(
      'create table "customer_phones" ("key" varchar(255) not null, "customer_id" int4 not null, "number" varchar(255) not null);',
    );
    this.addSql(
      'alter table "customer_phones" add constraint "customer_phones_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "tickets" ("id" serial primary key, "message" varchar(255) not null, "subject" varchar(255) not null, "customer_id" int4 not null, "resolved_date" timestamptz(0) null);',
    );

    this.addSql(
      'create table "ticket-attachments" ("key" varchar(255) not null, "ticket_id" int4 not null, "attachment" varchar(255) not null, "file_name" varchar(255) not null);',
    );
    this.addSql(
      'alter table "ticket-attachments" add constraint "ticket-attachments_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "general_manager" ("key" varchar(255) not null, "id_number" varchar(255) not null, "hours_worked" int4 not null, "name" varchar(255) not null, "hourly_salary" int4 not null);',
    );
    this.addSql(
      'alter table "general_manager" add constraint "general_manager_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "general_manager_phones" ("key" varchar(255) not null, "general_manager_key" varchar(255) not null, "number" varchar(255) not null);',
    );
    this.addSql(
      'alter table "general_manager_phones" add constraint "general_manager_phones_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "central_office" ("id" serial primary key, "address" varchar(255) not null, "yearly_income" int4 not null, "factory_id" int4 not null, "general_manager_key" varchar(255) not null);',
    );
    this.addSql(
      'alter table "central_office" add constraint "central_office_factory_id_unique" unique ("factory_id");',
    );
    this.addSql(
      'alter table "central_office" add constraint "central_office_general_manager_key_unique" unique ("general_manager_key");',
    );

    this.addSql(
      'create table "central_office_phones" ("key" varchar(255) not null, "central_office_id" int4 not null, "number" varchar(255) not null);',
    );
    this.addSql(
      'alter table "central_office_phones" add constraint "central_office_phones_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "employees" ("id" serial primary key, "id_number" int4 not null, "responsibility" text check ("responsibility" in (\'supporter\', \'salesOffice\')) not null, "address" varchar(255) not null, "hourly_salary" int4 not null, "name" varchar(255) not null, "hours_worked" int4 not null, "is_supporter" bool null, "central_office_id" int4 not null);',
    );

    this.addSql(
      'create table "employee_phones" ("key" varchar(255) not null, "employee_id" int4 not null, "number" varchar(255) not null);',
    );
    this.addSql(
      'alter table "employee_phones" add constraint "employee_phones_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "supporters" ("id" serial primary key, "id_number" int4 not null, "responsibility" text check ("responsibility" in (\'supporter\', \'salesOffice\')) not null, "address" varchar(255) not null, "hourly_salary" int4 not null, "name" varchar(255) not null, "hours_worked" int4 not null, "speciality" text check ("speciality" in (\'sell\', \'install\', \'guarantee\')) not null, "employee_id" int4 not null, "ticket_id" int4 not null, "central_office_id" int4 not null);',
    );
    this.addSql(
      'alter table "supporters" add constraint "supporters_employee_id_unique" unique ("employee_id");',
    );
    this.addSql(
      'alter table "supporters" add constraint "supporters_ticket_id_unique" unique ("ticket_id");',
    );

    this.addSql(
      'create table "supporter-phones" ("key" varchar(255) not null, "supporter_id" int4 not null, "number" varchar(255) not null);',
    );
    this.addSql(
      'alter table "supporter-phones" add constraint "supporter-phones_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "branches" ("id" serial primary key, "manager" varchar(255) not null, "monthly_budget" int4 not null, "address" varchar(255) not null, "city" varchar(255) not null, "central_office_id" int4 not null);',
    );

    this.addSql(
      'create table "branch_phones" ("key" varchar(255) not null, "branch_id" int4 not null, "number" varchar(255) not null);',
    );
    this.addSql(
      'alter table "branch_phones" add constraint "branch_phones_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "invoices" ("id" serial primary key, "price" int4 not null, "customer_id" int4 not null, "payment_status" text check ("payment_status" in (\'pending\', \'paid\', \'returned\')) not null, "order_date" timestamptz(0) not null, "payment_date" timestamptz(0) null, "address" varchar(255) not null, "city" varchar(255) not null, "branch_id" int4 not null);',
    );

    this.addSql(
      'create table "branches_customers" ("branch_id" int4 not null, "customer_id" int4 not null);',
    );
    this.addSql(
      'alter table "branches_customers" add constraint "branches_customers_pkey" primary key ("branch_id", "customer_id");',
    );

    this.addSql(
      'create table "warehouses" ("id" serial primary key, "foreman" varchar(255) not null, "city" varchar(255) not null, "address" varchar(255) not null, "monthly_budget" int4 not null, "factory_id" int4 not null, "central_office_id" int4 not null);',
    );

    this.addSql(
      'create table "branch_warehouse_order_pivot" ("key" varchar(255) not null, "branch_id" int4 not null, "warehouse_id" int4 not null, "type_of_product" varchar(255) not null, "number_of_product" int4 not null, "delivery_date" timestamptz(0) null);',
    );
    this.addSql(
      'alter table "branch_warehouse_order_pivot" add constraint "branch_warehouse_order_pivot_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "products" ("id" serial primary key, "type" varchar(255) not null, "model" varchar(255) not null, "color" varchar(255) not null, "warranty" timestamptz(0) not null, "price" int4 not null, "date_manufactured" timestamptz(0) not null, "invoice_id" int4 not null, "warehouse_id" int4 not null, "central_office_id" int4 not null, "factory_id" int4 not null, "discr" text check ("discr" in (\'product\', \'microwave\', \'oven\', \'refrigerator\', \'tv\', \'vacuum_cleaner\', \'washing_machine\')) not null, "size_liter" int4 null, "size_ft" int4 null, "image_resolution" int4 null, "sound_resolution" int4 null, "os" varchar(255) null, "size_in" int4 null, "capacity" int4 null, "size_kg" int4 null, "energy_consumption" int4 null);',
    );
    this.addSql('create index "products_discr_index" on "products" ("discr");');

    this.addSql(
      'create table "warehouse_phones" ("key" varchar(255) not null, "warehouse_id" int4 not null, "number" varchar(255) not null);',
    );
    this.addSql(
      'alter table "warehouse_phones" add constraint "warehouse_phones_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "stock_products" ("key" varchar(255) not null, "product_name" varchar(255) not null, "available_product_count" int4 not null, "warehouse_id" int4 not null);',
    );
    this.addSql(
      'alter table "stock_products" add constraint "stock_products_pkey" primary key ("key");',
    );

    this.addSql(
      'create table "warehouse_branch_delivery_pivot" ("key" varchar(255) not null, "branch_id" int4 not null, "warehouse_id" int4 not null, "type_of_product" varchar(255) not null, "number_of_product" int4 not null, "delivery_date" timestamptz(0) null);',
    );
    this.addSql(
      'alter table "warehouse_branch_delivery_pivot" add constraint "warehouse_branch_delivery_pivot_pkey" primary key ("key");',
    );

    this.addSql(
      'alter table "factory_phones" add constraint "factory_phones_factory_id_foreign" foreign key ("factory_id") references "factory" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "customer_phones" add constraint "customer_phones_customer_id_foreign" foreign key ("customer_id") references "customers" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "tickets" add constraint "tickets_customer_id_foreign" foreign key ("customer_id") references "customers" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "ticket-attachments" add constraint "ticket-attachments_ticket_id_foreign" foreign key ("ticket_id") references "tickets" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "general_manager_phones" add constraint "general_manager_phones_general_manager_key_foreign" foreign key ("general_manager_key") references "general_manager" ("key") on update cascade;',
    );

    this.addSql(
      'alter table "central_office" add constraint "central_office_factory_id_foreign" foreign key ("factory_id") references "factory" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "central_office" add constraint "central_office_general_manager_key_foreign" foreign key ("general_manager_key") references "general_manager" ("key") on update cascade;',
    );

    this.addSql(
      'alter table "central_office_phones" add constraint "central_office_phones_central_office_id_foreign" foreign key ("central_office_id") references "central_office" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "employees" add constraint "employees_central_office_id_foreign" foreign key ("central_office_id") references "central_office" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "employee_phones" add constraint "employee_phones_employee_id_foreign" foreign key ("employee_id") references "employees" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "supporters" add constraint "supporters_employee_id_foreign" foreign key ("employee_id") references "employees" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "supporters" add constraint "supporters_ticket_id_foreign" foreign key ("ticket_id") references "tickets" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "supporters" add constraint "supporters_central_office_id_foreign" foreign key ("central_office_id") references "central_office" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "supporter-phones" add constraint "supporter-phones_supporter_id_foreign" foreign key ("supporter_id") references "supporters" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "branches" add constraint "branches_central_office_id_foreign" foreign key ("central_office_id") references "central_office" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "branch_phones" add constraint "branch_phones_branch_id_foreign" foreign key ("branch_id") references "branches" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "invoices" add constraint "invoices_customer_id_foreign" foreign key ("customer_id") references "customers" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "invoices" add constraint "invoices_branch_id_foreign" foreign key ("branch_id") references "branches" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "branches_customers" add constraint "branches_customers_branch_id_foreign" foreign key ("branch_id") references "branches" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "branches_customers" add constraint "branches_customers_customer_id_foreign" foreign key ("customer_id") references "customers" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "warehouses" add constraint "warehouses_factory_id_foreign" foreign key ("factory_id") references "factory" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "warehouses" add constraint "warehouses_central_office_id_foreign" foreign key ("central_office_id") references "central_office" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "branch_warehouse_order_pivot" add constraint "branch_warehouse_order_pivot_branch_id_foreign" foreign key ("branch_id") references "branches" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "branch_warehouse_order_pivot" add constraint "branch_warehouse_order_pivot_warehouse_id_foreign" foreign key ("warehouse_id") references "warehouses" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "products" add constraint "products_invoice_id_foreign" foreign key ("invoice_id") references "invoices" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "products" add constraint "products_warehouse_id_foreign" foreign key ("warehouse_id") references "warehouses" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "products" add constraint "products_central_office_id_foreign" foreign key ("central_office_id") references "central_office" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "products" add constraint "products_factory_id_foreign" foreign key ("factory_id") references "factory" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "warehouse_phones" add constraint "warehouse_phones_warehouse_id_foreign" foreign key ("warehouse_id") references "warehouses" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "stock_products" add constraint "stock_products_warehouse_id_foreign" foreign key ("warehouse_id") references "warehouses" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "warehouse_branch_delivery_pivot" add constraint "warehouse_branch_delivery_pivot_branch_id_foreign" foreign key ("branch_id") references "branches" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "warehouse_branch_delivery_pivot" add constraint "warehouse_branch_delivery_pivot_warehouse_id_foreign" foreign key ("warehouse_id") references "warehouses" ("id") on update cascade;',
    );
  }
}
