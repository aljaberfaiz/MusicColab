--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: faizaljaber
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    sender_id integer,
    receiver_id integer,
    content text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.messages OWNER TO faizaljaber;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: faizaljaber
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO faizaljaber;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: faizaljaber
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: faizaljaber
--

CREATE TABLE public.profiles (
    id integer NOT NULL,
    user_id integer,
    bio text,
    expertise character varying(50),
    experience_level character varying(50),
    location character varying(255),
    genres character varying(255)
);


ALTER TABLE public.profiles OWNER TO faizaljaber;

--
-- Name: profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: faizaljaber
--

CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profiles_id_seq OWNER TO faizaljaber;

--
-- Name: profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: faizaljaber
--

ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: faizaljaber
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO faizaljaber;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: faizaljaber
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO faizaljaber;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: faizaljaber
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: faizaljaber
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: profiles id; Type: DEFAULT; Schema: public; Owner: faizaljaber
--

ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: faizaljaber
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: faizaljaber
--

COPY public.messages (id, sender_id, receiver_id, content, "timestamp") FROM stdin;
2	1	1	Hello, how are you?	2024-10-23 10:27:52.488506
3	3	1	hello	2024-10-23 15:38:31.685519
4	2	3	dog for sale	2024-10-23 15:49:25.257669
5	2	3	smell	2024-10-23 16:15:42.44199
6	2	3	hello	2024-10-23 16:20:51.362337
7	3	2	hey	2024-10-23 18:06:51.741869
8	2	3	hey	2024-10-23 22:33:06.199405
9	2	3	junk	2024-10-24 07:59:11.870133
10	2	3	eifh	2024-10-24 08:18:36.519104
11	2	3	uouo	2024-10-24 08:24:11.072498
12	2	3	mhbjhb	2024-10-24 08:25:50.189327
13	2	3	toma	2024-10-24 09:24:54.778514
14	3	2	dog	2024-10-24 09:39:10.102971
15	3	2	yes very	2024-10-24 09:50:33.253999
16	2	3	yes	2024-10-24 09:56:06.641003
17	2	3	new msg	2024-10-24 09:58:35.417496
18	2	3	h	2024-10-24 10:01:02.492834
19	2	3	hello	2024-10-24 10:06:55.458841
20	4	2	hello	2024-10-24 12:02:44.881895
21	4	3	hi	2024-10-24 12:04:42.125589
22	1	3	yes	2024-10-24 14:02:44.673937
23	2	4	ok	2024-10-24 15:27:42.815398
24	2	4	hello	2024-10-24 15:43:30.10314
25	2	4	hello	2024-10-24 15:45:05.632172
26	2	3	uhiuh	2024-10-24 15:45:53.942953
27	2	4	yes	2024-10-24 16:43:47.466916
28	2	3	dog	2024-10-24 17:06:15.101074
29	2	4	s	2024-10-24 17:36:03.867888
30	2	3	hello	2024-10-24 19:54:05.022066
31	2	4	good bye	2024-10-24 19:57:07.212625
32	2	3	goodbye	2024-10-24 19:57:52.700058
33	3	2	listen punk ass white boiiiii	2024-10-26 12:43:58.987929
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: faizaljaber
--

COPY public.profiles (id, user_id, bio, expertise, experience_level, location, genres) FROM stdin;
1	1	I am a professional composer with 10 years of experience.	Composer	Professional	New York, USA	Classical, Jazz
3	4	hello	oshawa	very	\N	\N
2	2	German male	hoihoi	extreme	uganda	yes
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: faizaljaber
--

COPY public.users (id, username, password) FROM stdin;
1	testUser	$2a$10$EU9x55jwiLCY03k9SfNsP.EEGQ2j8ez9Yh.k9ET.NLqN.K7brojxu
2	dogger	$2a$10$VeKhmpzFe8FKrZ8r5xHDdOo0bg9pm/cbx6y09msCcA3jL8oOlDua2
3	sharop	$2a$10$hFaZRJCXYe3KES1Ic74n7O27FZTn.9bqlJp79QpweyixqO3jZ8d5y
4	eashwar	$2a$10$l7hzZAhtm7kpVaJWQLWa5uGVTPDm2bVDMI/DYNvZTu8K87M/UGoaK
\.


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faizaljaber
--

SELECT pg_catalog.setval('public.messages_id_seq', 33, true);


--
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faizaljaber
--

SELECT pg_catalog.setval('public.profiles_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: faizaljaber
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: faizaljaber
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: faizaljaber
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: faizaljaber
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: faizaljaber
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: messages messages_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: faizaljaber
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: faizaljaber
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: faizaljaber
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: TABLE messages; Type: ACL; Schema: public; Owner: faizaljaber
--

GRANT ALL ON TABLE public.messages TO musiccolab_user;


--
-- Name: SEQUENCE messages_id_seq; Type: ACL; Schema: public; Owner: faizaljaber
--

GRANT SELECT,USAGE ON SEQUENCE public.messages_id_seq TO musiccolab_user;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: faizaljaber
--

GRANT ALL ON TABLE public.profiles TO musiccolab_user;


--
-- Name: SEQUENCE profiles_id_seq; Type: ACL; Schema: public; Owner: faizaljaber
--

GRANT ALL ON SEQUENCE public.profiles_id_seq TO musiccolab_user;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: faizaljaber
--

GRANT ALL ON TABLE public.users TO musiccolab_user;


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: faizaljaber
--

GRANT ALL ON SEQUENCE public.users_id_seq TO musiccolab_user;


--
-- PostgreSQL database dump complete
--

