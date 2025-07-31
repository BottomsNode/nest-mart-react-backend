--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE TYPE public.customer_entity_role_enum AS ENUM (
    'admin',
    'user'
);



CREATE TYPE public.product_status_enum AS ENUM (
    '1',
    '0'
);



SET default_tablespace = '';

SET default_table_access_method = heap;



CREATE TABLE public.address_entity (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    street character varying NOT NULL,
    city character varying NOT NULL,
    pincode character varying NOT NULL
);



CREATE SEQUENCE public.address_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




ALTER SEQUENCE public.address_entity_id_seq OWNED BY public.address_entity.id;


CREATE TABLE public.customer_entity (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    name character varying NOT NULL,
    phone character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "roleId" integer,
    "addressId" integer
);


CREATE SEQUENCE public.customer_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.customer_entity_id_seq OWNED BY public.customer_entity.id;



CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);



CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;



CREATE TABLE public.permission (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    name character varying NOT NULL
);


CREATE SEQUENCE public.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;


CREATE TABLE public.product_entity (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    name character varying NOT NULL,
    price numeric(10,2) NOT NULL,
    stock integer DEFAULT 15 NOT NULL,
    status public.product_status_enum DEFAULT '1'::public.product_status_enum NOT NULL
);


CREATE SEQUENCE public.product_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.product_entity_id_seq OWNED BY public.product_entity.id;

CREATE TABLE public.roles (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    name character varying NOT NULL
);



CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


CREATE TABLE public.roles_permissions_permission (
    "rolesId" integer NOT NULL,
    "permissionId" integer NOT NULL
);


CREATE TABLE public.sale_entity (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    "saleDate" timestamp without time zone DEFAULT now() NOT NULL,
    "totalAmount" numeric(10,2) NOT NULL,
    "customerId" integer
);


CREATE SEQUENCE public.sale_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



ALTER SEQUENCE public.sale_entity_id_seq OWNED BY public.sale_entity.id;

CREATE TABLE public.sale_item_entity (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    quantity integer NOT NULL,
    "priceAtPurchase" numeric(10,2) NOT NULL,
    "saleId" integer,
    "productId" integer
);


CREATE SEQUENCE public.sale_item_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



ALTER SEQUENCE public.sale_item_entity_id_seq OWNED BY public.sale_item_entity.id;



ALTER TABLE ONLY public.address_entity ALTER COLUMN id SET DEFAULT nextval('public.address_entity_id_seq'::regclass);



ALTER TABLE ONLY public.customer_entity ALTER COLUMN id SET DEFAULT nextval('public.customer_entity_id_seq'::regclass);


ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);



ALTER TABLE ONLY public.product_entity ALTER COLUMN id SET DEFAULT nextval('public.product_entity_id_seq'::regclass);



ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);

ALTER TABLE ONLY public.sale_entity ALTER COLUMN id SET DEFAULT nextval('public.sale_entity_id_seq'::regclass);



ALTER TABLE ONLY public.sale_item_entity ALTER COLUMN id SET DEFAULT nextval('public.sale_item_entity_id_seq'::regclass);



SELECT pg_catalog.setval('public.address_entity_id_seq', 5, true);



SELECT pg_catalog.setval('public.customer_entity_id_seq', 5, true);



SELECT pg_catalog.setval('public.migrations_id_seq', 9, true);




SELECT pg_catalog.setval('public.permission_id_seq', 12, true);




SELECT pg_catalog.setval('public.product_entity_id_seq', 103, true);



SELECT pg_catalog.setval('public.roles_id_seq', 3, true);




SELECT pg_catalog.setval('public.sale_entity_id_seq', 5, true);


SELECT pg_catalog.setval('public.sale_item_entity_id_seq', 18, true);


ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id);


ALTER TABLE ONLY public.product_entity
    ADD CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY (id);




ALTER TABLE ONLY public.roles_permissions_permission
    ADD CONSTRAINT "PK_79cc18fb5daa354400686fb6680" PRIMARY KEY ("rolesId", "permissionId");



ALTER TABLE ONLY public.sale_entity
    ADD CONSTRAINT "PK_7ae2505a1ce8e5b5342d4d4d99c" PRIMARY KEY (id);


ALTER TABLE ONLY public.customer_entity
    ADD CONSTRAINT "PK_8898b6830f057f3f5c239796fa7" PRIMARY KEY (id);

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);



ALTER TABLE ONLY public.address_entity
    ADD CONSTRAINT "PK_9caf3f954ed5bc66e3fa35eb7e9" PRIMARY KEY (id);


ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


ALTER TABLE ONLY public.sale_item_entity
    ADD CONSTRAINT "PK_de4b3129461f8bc27b6110e5c7b" PRIMARY KEY (id);


ALTER TABLE ONLY public.customer_entity
    ADD CONSTRAINT "REL_ffa82dbf045e7bee5af6a3dfb3" UNIQUE ("addressId");



ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE (name);


ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE (name);

ALTER TABLE ONLY public.customer_entity
    ADD CONSTRAINT "UQ_984b2b39df96ed36ab62e7834a3" UNIQUE (email);


CREATE INDEX "IDX_a740421f76d0df27723db697ae" ON public.roles_permissions_permission USING btree ("rolesId");



CREATE INDEX "IDX_ea2b57117f371a484bc086819a" ON public.roles_permissions_permission USING btree ("permissionId");


ALTER TABLE ONLY public.sale_entity
    ADD CONSTRAINT "FK_2753eeb4efae5f96d5d169d6f55" FOREIGN KEY ("customerId") REFERENCES public.customer_entity(id) ON DELETE SET NULL;



ALTER TABLE ONLY public.customer_entity
    ADD CONSTRAINT "FK_714b5aee2f0b27ffd1211f03568" FOREIGN KEY ("roleId") REFERENCES public.roles(id);


ALTER TABLE ONLY public.sale_item_entity
    ADD CONSTRAINT "FK_9f2c0b271eb428ddd9e1f2656b5" FOREIGN KEY ("productId") REFERENCES public.product_entity(id);



ALTER TABLE ONLY public.roles_permissions_permission
    ADD CONSTRAINT "FK_a740421f76d0df27723db697ae9" FOREIGN KEY ("rolesId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;




ALTER TABLE ONLY public.sale_item_entity
    ADD CONSTRAINT "FK_bbcf71d9e99c8f6845bf7c445df" FOREIGN KEY ("saleId") REFERENCES public.sale_entity(id);



ALTER TABLE ONLY public.roles_permissions_permission
    ADD CONSTRAINT "FK_ea2b57117f371a484bc086819a8" FOREIGN KEY ("permissionId") REFERENCES public.permission(id) ON UPDATE CASCADE ON DELETE CASCADE;


ALTER TABLE ONLY public.customer_entity
    ADD CONSTRAINT "FK_ffa82dbf045e7bee5af6a3dfb38" FOREIGN KEY ("addressId") REFERENCES public.address_entity(id);

--
-- PostgreSQL database dump complete
--