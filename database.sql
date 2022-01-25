CREATE DATABASE ttpcapstone

CREATE TABLE users(
    userid SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    dob VARCHAR(255),
    phone VARCHAR(255),
    bloodtype VARCHAR(255),
    insurancename VARCHAR(255),
    emergencyphone VARCHAR(255),
)

CREATE TABLE IF NOT EXISTS visit
(
    visitid SERIAL PRIMARY KEY,
    reason character varying(255) COLLATE pg_catalog."default",
    clinicname character varying(255) COLLATE pg_catalog."default",
    lastvisit character varying(255) COLLATE pg_catalog."default"
    
)

CREATE TABLE IF NOT EXISTS user_visit
(
    -- uv_id integer NOT NULL DEFAULT nextval('user_visit_uv_id_seq'::regclass),
    user_id integer,
    visit_id integer,
    CONSTRAINT user_visit_pkey PRIMARY KEY (uv_id),
    CONSTRAINT userfk FOREIGN KEY (user_id)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT visitfk FOREIGN KEY (visit_id)
        REFERENCES public.visit (visitid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)