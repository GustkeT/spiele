CREATE TABLE public.autor (
    name character varying(64) NOT NULL
);

CREATE TABLE public.spielarten (
    preis character varying(32) NOT NULL,
    id smallint NOT NULL
);
COMMENT ON TABLE public.spielarten IS 'Liste der Preise';
CREATE SEQUENCE public.spielarten_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.spielarten_id_seq OWNED BY public.spielarten.id;

CREATE TABLE public.unserespiele (
    id bigint NOT NULL,
    titel character varying(64) NOT NULL,
    jahr smallint,
    minspieler smallint,
    dauer smallint,
    spieldesjahres smallint,
    autor character varying(64),
    maxspieler smallint DEFAULT 1 NOT NULL,
    bewerter text[],
    bewertung smallint[]
);
CREATE SEQUENCE public.unserespiele_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.unserespiele_id_seq OWNED BY public.unserespiele.id;
ALTER TABLE ONLY public.spielarten ALTER COLUMN id SET DEFAULT nextval('public.spielarten_id_seq'::regclass);
ALTER TABLE ONLY public.unserespiele ALTER COLUMN id SET DEFAULT nextval('public.unserespiele_id_seq'::regclass);
ALTER TABLE ONLY public.autor
    ADD CONSTRAINT autor_pkey PRIMARY KEY (name);
ALTER TABLE ONLY public.spielarten
    ADD CONSTRAINT spielarten_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.unserespiele
    ADD CONSTRAINT unserespiele_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.unserespiele
    ADD CONSTRAINT autor FOREIGN KEY (autor) REFERENCES public.autor(name);
ALTER TABLE ONLY public.unserespiele
    ADD CONSTRAINT spieldesjahres FOREIGN KEY (spieldesjahres) REFERENCES public.spielarten(id);
