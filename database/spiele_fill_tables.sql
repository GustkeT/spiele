--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 13.1

-- Started on 2021-03-12 13:13:31

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

--
-- TOC entry 2817 (class 0 OID 17036)
-- Dependencies: 200
-- Data for Name: autor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.autor VALUES ('Reiner Knizia');
INSERT INTO public.autor VALUES ('Rudi Hoffmann');
INSERT INTO public.autor VALUES ('Klaus Teuber');
INSERT INTO public.autor VALUES ('Michael Michaels');
INSERT INTO public.autor VALUES ('Steffen Bogen');
INSERT INTO public.autor VALUES ('Michael Lalet und Laurent Levi');
INSERT INTO public.autor VALUES ('Vlaada Chvátil');
INSERT INTO public.autor VALUES ('Alex Randolph');
INSERT INTO public.autor VALUES ('Andreas Seyfarth');
INSERT INTO public.autor VALUES ('Masao Suganuma');
INSERT INTO public.autor VALUES ('Alain Rivollet');
INSERT INTO public.autor VALUES ('Susan McKinley Ross');
INSERT INTO public.autor VALUES ('Lauge Luchau');
INSERT INTO public.autor VALUES ('Jean-Louis Roubira');
INSERT INTO public.autor VALUES ('Roberto Fraga');
INSERT INTO public.autor VALUES ('Brian Hersch');
INSERT INTO public.autor VALUES ('Grzegorz Rejchtman');
INSERT INTO public.autor VALUES ('Alan R. Moon');
INSERT INTO public.autor VALUES ('Nicola Schäfer');
INSERT INTO public.autor VALUES ('Kris Burm');
INSERT INTO public.autor VALUES ('Dirk Baumann');
INSERT INTO public.autor VALUES ('N/A');
INSERT INTO public.autor VALUES ('Richard Borg');
INSERT INTO public.autor VALUES ('Dieter Nüßle');
INSERT INTO public.autor VALUES ('Klaus-Jürgen Wrede');
INSERT INTO public.autor VALUES ('Ulrike und Paul Catty');
INSERT INTO public.autor VALUES ('Inka und Markus Brand');
INSERT INTO public.autor VALUES ('Denis Görz');
INSERT INTO public.autor VALUES ('Winning Moves');
INSERT INTO public.autor VALUES ('Uwe Rosenberg');
INSERT INTO public.autor VALUES ('Klaus Palesch');
INSERT INTO public.autor VALUES ('Jacques Zeimet');
INSERT INTO public.autor VALUES ('Christian Beierer');
INSERT INTO public.autor VALUES ('Rüdiger Koltze');
INSERT INTO public.autor VALUES ('Philippe des Pallières');
INSERT INTO public.autor VALUES ('Werner Schöppner');
INSERT INTO public.autor VALUES ('Wolfgang Kramer');
INSERT INTO public.autor VALUES ('Merle Robbins');
INSERT INTO public.autor VALUES ('Kenneth Johnson');
INSERT INTO public.autor VALUES ('Steffen Benndorf');
INSERT INTO public.autor VALUES ('Kylskapspoesis');
INSERT INTO public.autor VALUES ('Denkriesen');
INSERT INTO public.autor VALUES ('Uwe Rapp und Bernhard Lach');
INSERT INTO public.autor VALUES ('Hutter Trade GmbH');


--
-- TOC entry 2814 (class 0 OID 16977)
-- Dependencies: 197
-- Data for Name: spielarten; Type: TABLE DATA; Schema: public; Owner: spieler
--

INSERT INTO public.spielarten VALUES ('Spiel des Jahres', 1);
INSERT INTO public.spielarten VALUES ('Kinderspiel des Jahres', 2);
INSERT INTO public.spielarten VALUES ('Kennerspiel des Jahres', 3);


--
-- TOC entry 2816 (class 0 OID 17018)
-- Dependencies: 199
-- Data for Name: unserespiele; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.unserespiele VALUES (4, 'Café International', 1989, 4, 45, 1, 'Rudi Hoffmann', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (5, 'Abalone', NULL, 2, 45, NULL, 'Michael Lalet und Laurent Levi', 2, NULL, NULL);
INSERT INTO public.unserespiele VALUES (6, 'Adel verpflichtet', 1990, 5, 60, 1, 'Klaus Teuber', 5, NULL, NULL);
INSERT INTO public.unserespiele VALUES (267, 'Schnappt Hubi', NULL, 2, 20, NULL, 'Steffen Bogen', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (306, '6 nimmt', NULL, 2, 45, NULL, 'Wolfgang Kramer', 10, NULL, NULL);
INSERT INTO public.unserespiele VALUES (307, 'Phase 10 Master', NULL, 2, 75, NULL, 'Kenneth Johnson', 6, NULL, NULL);
INSERT INTO public.unserespiele VALUES (308, 'Qwixx', NULL, 2, 15, NULL, 'Steffen Benndorf', 5, NULL, NULL);
INSERT INTO public.unserespiele VALUES (309, 'Klugscheisser', NULL, 2, 30, NULL, 'Kylskapspoesis', 10, NULL, NULL);
INSERT INTO public.unserespiele VALUES (310, 'Stadt Land Vollpfosten - Picasso Edition', NULL, 2, 30, NULL, 'Denkriesen', 50, NULL, NULL);
INSERT INTO public.unserespiele VALUES (285, 'Stadt Land Vollpfosten - Blue Edition', NULL, 2, 30, NULL, 'Denis Görz', 50, NULL, NULL);
INSERT INTO public.unserespiele VALUES (311, 'Qwinto', NULL, 2, 15, NULL, 'Uwe Rapp und Bernhard Lach', 10, NULL, NULL);
INSERT INTO public.unserespiele VALUES (314, 'What do You Meme?', NULL, 3, 20, NULL, 'Hutter Trade GmbH', 8, NULL, NULL);
INSERT INTO public.unserespiele VALUES (2, 'Ligretto', NULL, 4, 30, NULL, 'Michael Michaels', 4, '{Thomas,Eleni}', '{2,4}');
INSERT INTO public.unserespiele VALUES (257, 'Codenames', NULL, 2, 15, NULL, 'Vlaada Chvátil', 8, NULL, NULL);
INSERT INTO public.unserespiele VALUES (258, 'Camel Up', NULL, 2, 30, NULL, 'Steffen Bogen', 8, NULL, NULL);
INSERT INTO public.unserespiele VALUES (259, 'Wer war''s', NULL, 2, 30, NULL, 'Reiner Knizia', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (260, 'Ogallala', NULL, 2, 30, NULL, 'Rudi Hoffmann', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (262, 'Incognito', NULL, 4, 60, NULL, 'Alex Randolph', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (263, 'Manhattan', NULL, 2, 40, NULL, 'Andreas Seyfarth', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (264, 'Machi Koro', NULL, 2, 30, NULL, 'Masao Suganuma', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (266, 'Concept', NULL, 4, 40, NULL, 'Alain Rivollet', 12, NULL, NULL);
INSERT INTO public.unserespiele VALUES (268, 'Qwirkle', NULL, 2, 30, NULL, 'Susan McKinley Ross', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (269, 'Uluru', NULL, 1, 30, NULL, 'Lauge Luchau', 5, NULL, NULL);
INSERT INTO public.unserespiele VALUES (270, 'Dixit', NULL, 3, 30, NULL, 'Jean-Louis Roubira', 6, NULL, NULL);
INSERT INTO public.unserespiele VALUES (271, 'Wo war''s', NULL, 1, 40, NULL, 'Roberto Fraga', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (272, 'Tabu', NULL, 4, 40, NULL, 'Brian Hersch', 12, NULL, NULL);
INSERT INTO public.unserespiele VALUES (273, 'Ubongo', NULL, 1, 25, NULL, 'Grzegorz Rejchtman', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (274, 'Elfenland', NULL, 2, 60, NULL, 'Alan R. Moon', 6, NULL, NULL);
INSERT INTO public.unserespiele VALUES (275, 'Shopping Queen', NULL, 3, 60, NULL, 'Nicola Schäfer', 5, NULL, NULL);
INSERT INTO public.unserespiele VALUES (276, 'Invers', NULL, 2, 20, NULL, 'Kris Burm', 2, NULL, NULL);
INSERT INTO public.unserespiele VALUES (277, 'Das Magische Labyrinth', NULL, 2, 30, NULL, 'Dirk Baumann', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (278, 'Trivial Pursuit (TV-Ausgabe)', NULL, 2, 90, NULL, 'N/A', 36, NULL, NULL);
INSERT INTO public.unserespiele VALUES (279, 'Bluff', NULL, 2, 30, NULL, 'Richard Borg', 6, NULL, NULL);
INSERT INTO public.unserespiele VALUES (280, 'Der Grosse Wurf', NULL, 2, 10, NULL, 'Dieter Nüßle', 5, NULL, NULL);
INSERT INTO public.unserespiele VALUES (281, 'Carcassonne', NULL, 2, 30, NULL, 'Klaus-Jürgen Wrede', 5, NULL, NULL);
INSERT INTO public.unserespiele VALUES (282, 'Activity', NULL, 3, 60, NULL, 'Ulrike und Paul Catty', 16, NULL, NULL);
INSERT INTO public.unserespiele VALUES (284, 'Exit - Der versunkene Schatz', NULL, 1, 45, NULL, 'Inka und Markus Brand', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (283, 'Mörderische Dinnerparty - Der Fluch der Grünen Dame', NULL, 6, 180, NULL, 'N/A', 8, NULL, NULL);
INSERT INTO public.unserespiele VALUES (286, 'Monopoly (Hamburg)', NULL, 2, 120, NULL, 'Winning Moves', 8, NULL, NULL);
INSERT INTO public.unserespiele VALUES (287, 'Zug um Zug', NULL, 2, 60, NULL, 'Alan R. Moon', 5, NULL, NULL);
INSERT INTO public.unserespiele VALUES (288, 'Monopoly (Disney)', NULL, 2, 120, NULL, 'N/A', 6, NULL, NULL);
INSERT INTO public.unserespiele VALUES (289, 'Monopoly (Marvel)', NULL, 2, 120, NULL, 'N/A', 6, NULL, NULL);
INSERT INTO public.unserespiele VALUES (290, 'Bohnanza', NULL, 3, 40, NULL, 'Uwe Rosenberg', 7, NULL, NULL);
INSERT INTO public.unserespiele VALUES (291, 'Bohnanza - La Isla Bohnita', NULL, 2, 40, NULL, 'Uwe Rosenberg', 7, NULL, NULL);
INSERT INTO public.unserespiele VALUES (292, 'Sticheln', NULL, 3, 30, NULL, 'Klaus Palesch', 8, NULL, NULL);
INSERT INTO public.unserespiele VALUES (293, 'Kakerlakensalat', NULL, 2, 10, NULL, 'Jacques Zeimet', 6, NULL, NULL);
INSERT INTO public.unserespiele VALUES (294, 'Kakerlakensuppe', NULL, 2, 10, NULL, 'Jacques Zeimet', 6, NULL, NULL);
INSERT INTO public.unserespiele VALUES (295, 'REIBACH & CO', NULL, 2, 45, NULL, 'Alan R. Moon', 5, NULL, NULL);
INSERT INTO public.unserespiele VALUES (296, 'Confusion', NULL, 2, 15, NULL, 'Christian Beierer', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (297, 'Kuhhandel', NULL, 3, 45, NULL, 'Rüdiger Koltze', 5, NULL, NULL);
INSERT INTO public.unserespiele VALUES (298, 'Keltis - Mitbringspiel', NULL, 2, 15, NULL, 'Reiner Knizia', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (299, 'Die Werwölfe von Düsterwald', NULL, 8, 20, NULL, 'Philippe des Pallières', 18, NULL, NULL);
INSERT INTO public.unserespiele VALUES (300, 'Mancala', NULL, 2, 15, NULL, 'N/A', 2, NULL, NULL);
INSERT INTO public.unserespiele VALUES (301, 'Barbarossa', NULL, 3, 50, NULL, 'Klaus Teuber', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (302, 'Malefiz', NULL, 2, 40, NULL, 'Werner Schöppner', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (303, 'Torres', NULL, 2, 60, NULL, 'Wolfgang Kramer', 4, NULL, NULL);
INSERT INTO public.unserespiele VALUES (265, 'Die Siedler von Catan', NULL, 3, 75, NULL, 'Klaus Teuber', 6, NULL, NULL);
INSERT INTO public.unserespiele VALUES (304, 'Skip-Bo Deluxe', NULL, 2, 30, NULL, 'N/A', 6, NULL, NULL);
INSERT INTO public.unserespiele VALUES (305, 'UNO', NULL, 2, 30, NULL, 'Merle Robbins', 10, NULL, NULL);


--
-- TOC entry 2823 (class 0 OID 0)
-- Dependencies: 196
-- Name: spielarten_id_seq; Type: SEQUENCE SET; Schema: public; Owner: spieler
--

SELECT pg_catalog.setval('public.spielarten_id_seq', 1, false);


--
-- TOC entry 2824 (class 0 OID 0)
-- Dependencies: 198
-- Name: unserespiele_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.unserespiele_id_seq', 314, true);


-- Completed on 2021-03-12 13:13:31

--
-- PostgreSQL database dump complete
--
