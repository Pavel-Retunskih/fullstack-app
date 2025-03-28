CREATE DATABASE postgres;

CREATE TABLE IF NOT EXISTS users
                (
                    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
                    first_name character varying(100) NOT NULL,
					last_name character varying(100) NOT NULL,
                    photo bytea,
					CONSTRAINT users_pkey PRIMARY KEY (id)
                )