CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "avatar_url" text,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "age" text NOT NULL,
  "phone" int NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "image" text NOT NULL,
  "name" text NOT NULL,
  "adress_id" int UNIQUE NOT NULL,
  "email" text NOT NULL,
  "phone" int NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "city" text NOT NULL,
  "neighborhood" text NOT NULL,
  "street" text NOT NULL,
  "number" int NOT NULL,
  "reference_point" text
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "model_id" int,
  "name" text NOT NULL,
  "year" int NOT NULL,
  "color" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "origin" text,
  "name" text NOT NULL,
  "ports" int NOT NULL,
  "exchange" text NOT NULL,
  "release_year" int DEFAULT (now())
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" int UNIQUE,
  "hour" int NOT NULL,
  "date" date NOT NULL,
  "agency_id" int
);

CREATE TABLE "order_cars" (
  "id" SERIAL PRIMARY KEY,
  "order_id" int NOT NULL,
  "car_id" int NOT NULL
);

ALTER TABLE "addresses" ADD FOREIGN KEY ("id") REFERENCES "agencies" ("adress_id");

ALTER TABLE "cars" ADD FOREIGN KEY ("model_id") REFERENCES "models" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("agency_id") REFERENCES "agencies" ("id");

ALTER TABLE "order_cars" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "order_cars" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id");
