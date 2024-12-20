-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2024 at 12:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `anikoudb`
--

-- --------------------------------------------------------

--
-- Table structure for table `animes`
--

CREATE TABLE `animes` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `tmdbId` int(11) NOT NULL,
  `adult` tinyint(1) DEFAULT NULL,
  `backdrop_path` varchar(255) DEFAULT NULL,
  `episode_run_time` int(11) DEFAULT NULL,
  `first_air_date` varchar(255) DEFAULT NULL,
  `genres` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`genres`)),
  `homepage` varchar(255) DEFAULT NULL,
  `origin_country` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`origin_country`)),
  `original_language` varchar(10) DEFAULT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `overview` text DEFAULT NULL,
  `popularity` decimal(10,2) DEFAULT NULL,
  `poster_path` varchar(255) DEFAULT NULL,
  `production_companies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`production_companies`)),
  `seasons` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`seasons`)),
  `status` varchar(50) DEFAULT NULL,
  `vote_average` decimal(4,2) DEFAULT NULL,
  `vote_count` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `animes`
--

INSERT INTO `animes` (`id`, `userId`, `tmdbId`, `adult`, `backdrop_path`, `episode_run_time`, `first_air_date`, `genres`, `homepage`, `origin_country`, `original_language`, `original_name`, `name`, `overview`, `popularity`, `poster_path`, `production_companies`, `seasons`, `status`, `vote_average`, `vote_count`, `created_at`, `updated_at`) VALUES
(46, 4, 91801, 0, 'https://image.tmdb.org/t/p/original/b4rhGFajTzeYIonGrxZIaoBiM7x.jpg', 25, '2019-10-05', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":35,\\\"name\\\":\\\"Comedy\\\"},{\\\"id\\\":10765,\\\"name\\\":\\\"Sci-Fi & Fantasy\\\"},{\\\"id\\\":10759,\\\"name\\\":\\\"Action & Adventure\\\"}]\"', 'https://www.nhk-character.com/chara/iruma/', '\"[\\\"JP\\\"]\"', 'ja', '魔入りました！入間くん', 'Welcome to Demon School! Iruma-kun', 'Fourteen-year-old Iruma Suzuki has just been abandoned and sold to a demon by his irresponsible parents! Surprisingly, the next thing he knows he\'s living with the demon who has adopted him as his new grandson and has been transferred into a school in the Netherworld where his new demon grandfather works as the principal. Thus begins the cowardly Iruma-kun\'s extraordinary school life among the otherworldly as he faces his true self, takes on challenges, and rises to become someone great.', 71.95, 'https://image.tmdb.org/t/p/original/x2NU6cyUiN5qlypOpSZPRRlsoTj.jpg', '\"[{\\\"id\\\":74440,\\\"logo_path\\\":\\\"\\/mf1nS1bfySc1XM5EmPZp4qsAOoy.png\\\",\\\"name\\\":\\\"Bandai Namco Pictures\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":11376,\\\"logo_path\\\":\\\"\\/lrglrxyGOMRl9KCsmcjmzjjpT2H.png\\\",\\\"name\\\":\\\"NHK Enterprises\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":15505,\\\"logo_path\\\":\\\"\\/3MuBcEqLa5QRkZTpXBLzyk9zOmO.png\\\",\\\"name\\\":\\\"NHK\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":54028,\\\"logo_path\\\":\\\"\\/Ac2Y74vX6vDwjO4j7jtuE98BMql.png\\\",\\\"name\\\":\\\"Akita Shoten\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2019-10-05\\\",\\\"episode_count\\\":23,\\\"id\\\":128788,\\\"name\\\":\\\"Season 1\\\",\\\"overview\\\":\\\"Fourteen-year-old Iruma Suzuki has been unfortunate all his life, having to work to earn money for his irresponsible parents despite being underage. One day, he finds out that his parents sold him to the demon Sullivan. However, Iruma\'s worries about what will become of him are soon relieved, for Sullivan merely wants a grandchild, pampering him and making him attend the demon school Babyls.\\\\n\\\\nAt first, Iruma tries to keep a low profile in fear of his peers discovering that he is human. Unfortunately, this ends up being more difficult than he expected. It turns out that Sullivan himself is the chairman of the school, and everyone expects him to become the next Demon King!\\\\n\\\\nIruma immediately finds himself in an outrageous situation when he has to chant a forbidden spell in front of the entire school. With this, Iruma instantly earns a reputation he does not want. Even so, he is bound to be roped into more bizarre circumstances.\\\",\\\"poster_path\\\":\\\"\\/2aequitXFWtGWhiTOOvjbrCoPzT.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":5.1},{\\\"air_date\\\":\\\"2021-04-17\\\",\\\"episode_count\\\":21,\\\"id\\\":174008,\\\"name\\\":\\\"Season 2\\\",\\\"overview\\\":\\\"After many trials and tribulations, Iruma Suzuki is finally happily living among demons despite having to hide his true identity as a human. Even more so, he has now found his ambition in life: keep ranking up in this world!\\\\n\\\\nHowever, that plan is halted when Iruma\'s club is temporarily dismissed, and he is forced to be part of the student council, known for its strictness toward rowdy students. Its cold-hearted president is Amelie Azazel, Iruma\'s friend. Although Iruma is not used to following their rigid schedule and many rules, he still wants to prove himself and help Amelie alongside all of the other members of the council.\\\\n\\\\nBut trouble arises when Amelie\'s personality completely changes due to strange circumstances, putting the student council\'s reputation in jeopardy. Will Iruma be able to save them and avoid having the whole school turn into pure chaos?\\\",\\\"poster_path\\\":\\\"\\/phpbEBYF2axfF4QF8LovZXnQq9M.jpg\\\",\\\"season_number\\\":2,\\\"vote_average\\\":10},{\\\"air_date\\\":\\\"2022-10-08\\\",\\\"episode_count\\\":21,\\\"id\\\":306624,\\\"name\\\":\\\"Season 3\\\",\\\"overview\\\":\\\"Following their heroic efforts at Walter Park, the students of the Misfit Class return to Babyls Demon School after their summer vacation. What awaits them is not only adoration and admiration but also the shocking revelation that, in order to stay in the luxurious Royal One classroom, the entire class must be promoted to Dalet rank before entering the second year.\\\\n\\\\nAs the Harvest and Music Festivals are right around the corner, there seem to be ample opportunities to rank up. Doing so will not be simple, however, as no class thus far has managed to accomplish such a feat. Hoping to give the misfit class a chance to achieve the improbable, the school appoints special tutors to aid in confronting the challenges that lie ahead.\\\\n\\\\nWith his sights set beyond Dalet, Iruma Suzuki decides to take strides toward the goal of ranking up, starting with gaining acknowledgment from his special tutor: the short-tempered and selfish Bachiko Barbatos.\\\",\\\"poster_path\\\":\\\"\\/lO6fZddb7qySMn73wsm7uS54Xrh.jpg\\\",\\\"season_number\\\":3,\\\"vote_average\\\":6.8},{\\\"air_date\\\":null,\\\"episode_count\\\":1,\\\"id\\\":428963,\\\"name\\\":\\\"Season 4\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/8TCA7dOBNtqBXloFtx5d1XYoG6d.jpg\\\",\\\"season_number\\\":4,\\\"vote_average\\\":0}]\"', 'Returning Series', 8.36, 253, '2024-12-07 06:30:02', '2024-12-07 06:30:02'),
(47, 4, 75214, 0, 'https://image.tmdb.org/t/p/original/riyMNEH3Tqqnp8eA0uNcDKQVAfI.jpg', 25, '2018-01-11', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":18,\\\"name\\\":\\\"Drama\\\"}]\"', 'http://tv.violet-evergarden.jp', '\"[\\\"JP\\\"]\"', 'ja', 'ヴァイオレット・エヴァーガーデン', 'Violet Evergarden', 'The war is over, and Violet Evergarden needs a job. Scarred and emotionless, she takes a job as a letter writer to understand herself and her past.', 58.94, 'https://image.tmdb.org/t/p/original/ImvHbM4GsJJykarnOzhtpG6ax6.jpg', '\"[{\\\"id\\\":5438,\\\"logo_path\\\":\\\"\\/leZ8GPCL0GneHHayPVnXtB3p0We.png\\\",\\\"name\\\":\\\"Kyoto Animation\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":9148,\\\"logo_path\\\":\\\"\\/rtW3NadfF4kR5mTW00ahiFxw6k7.png\\\",\\\"name\\\":\\\"Pony Canyon\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":86839,\\\"logo_path\\\":\\\"\\/cnOJAkVVmKZLIzmgw4fRRZ2dctT.png\\\",\\\"name\\\":\\\"ABC Animation\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":6683,\\\"logo_path\\\":\\\"\\/reCkuk3GEomdx5gQpsm15Zl1sgX.png\\\",\\\"name\\\":\\\"Lantis\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":155307,\\\"logo_path\\\":null,\\\"name\\\":\\\"Miracle Bus\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2018-07-04\\\",\\\"episode_count\\\":1,\\\"id\\\":105906,\\\"name\\\":\\\"Specials\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/nyKPHrXznNPPiyfYrIe1mKLePNz.jpg\\\",\\\"season_number\\\":0,\\\"vote_average\\\":0},{\\\"air_date\\\":\\\"2018-01-11\\\",\\\"episode_count\\\":13,\\\"id\\\":95592,\\\"name\\\":\\\"Season 1\\\",\\\"overview\\\":\\\"The war is over, and Violet Evergarden needs a job. Scarred and emotionless, she takes a job as a letter writer to understand herself and her past.\\\",\\\"poster_path\\\":\\\"\\/g7BpD4B5jN4D0AAuI5v0hdfaZIN.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":7.9}]\"', 'Ended', 8.50, 787, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(48, 4, 85937, 0, 'https://image.tmdb.org/t/p/original/7e9maFsRJanwrR7YFgn6rEmudiX.jpg', 0, '2019-04-06', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":10759,\\\"name\\\":\\\"Action & Adventure\\\"},{\\\"id\\\":10765,\\\"name\\\":\\\"Sci-Fi & Fantasy\\\"}]\"', 'https://kimetsu.com/anime', '\"[\\\"JP\\\"]\"', 'ja', '鬼滅の刃', 'Demon Slayer: Kimetsu no Yaiba', 'It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon. To make matters worse, his younger sister Nezuko, the sole survivor, has been transformed into a demon herself. Though devastated by this grim reality, Tanjiro resolves to become a “demon slayer” so that he can turn his sister back into a human, and kill the demon that massacred his family.', 89.39, 'https://image.tmdb.org/t/p/original/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg', '\"[{\\\"id\\\":5887,\\\"logo_path\\\":\\\"\\/m6FEqz8rQECnmfjEwjNhNAlmhCJ.png\\\",\\\"name\\\":\\\"ufotable\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":2883,\\\"logo_path\\\":\\\"\\/rDYExnBV61jGQnkhVVrPN4Yl7O1.png\\\",\\\"name\\\":\\\"Aniplex\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":2918,\\\"logo_path\\\":\\\"\\/gyEWUBWwqrm3H5T2hkERD9LxpOq.png\\\",\\\"name\\\":\\\"Shueisha\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2020-08-26\\\",\\\"episode_count\\\":18,\\\"id\\\":131803,\\\"name\\\":\\\"Specials\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/6kj9XRLTGe6B6mPjHpqjFkSA4ay.jpg\\\",\\\"season_number\\\":0,\\\"vote_average\\\":0},{\\\"air_date\\\":\\\"2019-04-03\\\",\\\"episode_count\\\":26,\\\"id\\\":116882,\\\"name\\\":\\\"Tanjiro Kamado, Unwavering Resolve\\\",\\\"overview\\\":\\\"Ever since the death of his father, the burden of supporting the family has fallen upon Tanjiro Kamado\'s shoulders. One day, Tanjiro decides to go down to the local village to make a little money selling charcoal. On his way back, night falls, forcing Tanjiro to take shelter in the house of a strange man, who warns him of the existence of flesh-eating demons that lurk in the woods at night.\\\\n\\\\nWhen he finally arrives back home the next day, he is met with a horrifying sight - his whole family has been slaughtered. Worse still, the sole survivor is his sister Nezuko, who has been turned into a bloodthirsty demon. Consumed by rage and hatred, Tanjiro swears to avenge his family and stay by his only remaining sibling. Alongside the mysterious group calling themselves the Demon Slayer Corps, Tanjiro will do whatever it takes to slay the demons and protect the remnants of his beloved sister\'s humanity.\\\",\\\"poster_path\\\":\\\"\\/bV0ZCL0IqrTQKClu6EtXlZaJevD.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":8.1},{\\\"air_date\\\":\\\"2021-10-09\\\",\\\"episode_count\\\":7,\\\"id\\\":181846,\\\"name\\\":\\\"Mugen Train\\\",\\\"overview\\\":\\\"A mysterious string of disappearances on a certain train has caught the attention of the Demon Slayer Corps, and they have sent one of their best to exterminate what can only be a demon responsible. However, the plan to board the Mugen Train is delayed by a lesser demon who is terrorizing the mechanics and targeting a kind, elderly woman and her granddaughter. Kyoujurou Rengoku, the Flame Hashira, must eliminate the threat before boarding the train.\\\\n\\\\nSent to assist the Hashira, Tanjiro Kamado, Inosuke Hashira, and Zenitsu Agatsuma enter the train prepared to fight. But their monstrous target already has a devious plan in store for them and the two hundred passengers: by delving deep into their consciousness, the demon intends to obliterate everyone in a stunning display of the power held by the Twelve Kizuki.\\\",\\\"poster_path\\\":\\\"\\/pLGjaDyg2LeA2d9KZxBZCiiqC2B.jpg\\\",\\\"season_number\\\":2,\\\"vote_average\\\":8},{\\\"air_date\\\":\\\"2021-12-05\\\",\\\"episode_count\\\":11,\\\"id\\\":215073,\\\"name\\\":\\\"Entertainment District\\\",\\\"overview\\\":\\\"The devastation of the Mugen Train incident still weighs heavily on the members of the Demon Slayer Corps. Despite being given time to recover, life must go on, as the wicked never sleep: a vicious demon is terrorizing the alluring women of the Yoshiwara Entertainment District. The Sound Hashira, Tengen Uzui, and his three wives are on the case. However, when he soon loses contact with his spouses, Tengen fears the worst and enlists the help of Tanjiro Kamado, Zenitsu Agatsuma, and Inosuke Hashibira to infiltrate the district\'s most prominent houses and locate the depraved Upper Rank Demon.\\\",\\\"poster_path\\\":\\\"\\/gbmhcOtre5SeBgwR9gvTpUra5kZ.jpg\\\",\\\"season_number\\\":3,\\\"vote_average\\\":7.8},{\\\"air_date\\\":\\\"2023-04-08\\\",\\\"episode_count\\\":11,\\\"id\\\":243774,\\\"name\\\":\\\"Swordsmith Village\\\",\\\"overview\\\":\\\"For centuries, the Demon Slayer Corps has sacredly kept the location of Swordsmith Village a secret. As the village of the greatest forgers, it provides Demon Slayers with the finest weapons, which allow them to fight night-crawling fiends and ensure the safety of humans. After his sword was chipped and deemed useless, Tanjiro Kamado, along with his precious little sister Nezuko, is escorted to the village to receive a new one.\\\\n\\\\nMeanwhile, the death of an Upper Rank Demon disturbs the idle order in the demon world. As Tanjiro becomes acquainted with Mist Hashira Muichirou Tokitou and Love Hashira Mitsuri Kanroji, ferocious powers creep from the shadows and threaten to shatter the Demon Slayers\' greatest line of defense.\\\",\\\"poster_path\\\":\\\"\\/7drgLU7dnjZvM6zv81YURN6hkeN.jpg\\\",\\\"season_number\\\":4,\\\"vote_average\\\":6.1},{\\\"air_date\\\":\\\"2024-05-07\\\",\\\"episode_count\\\":8,\\\"id\\\":345811,\\\"name\\\":\\\"Hashira Training\\\",\\\"overview\\\":\\\"After a series of mighty clashes with Upper Rank Demons, the Ubuyashiki clan prepares for one last battle with the hellish forces of Muzan Kibutsuji. In order to finally defeat the Demon leader once and for all, the clan devises a training camp for the Demon Slayer Corps, one led by the remaining Hashira - the most elite warriors in the organization. Each Hashira forms a specialized exercise that will hone both their own abilities and the skills of the ordinary soldiers.\\\\n\\\\nTanjiro Kamado, a boy at the heart of the brewing conflict, recovers from wounds received in a recent fight. While his half-Demon sister Nezuko is studied by researchers like Shinobu Kochou, Tanjiro embarks to train with the Hashira, seeking mastery in each of their assigned areas of expertise to be best prepared for the coming war - skills vital to Tanjiro, as he has vowed to be the very warrior who will eliminate Muzan for good.\\\",\\\"poster_path\\\":\\\"\\/axI3BUZgTYz36IYtUtRhivtspUo.jpg\\\",\\\"season_number\\\":5,\\\"vote_average\\\":8}]\"', 'Ended', 8.70, 6484, '2024-12-07 06:33:35', '2024-12-07 06:33:35'),
(49, 4, 62745, 0, 'https://image.tmdb.org/t/p/original/vEFtcQbdLdQ9AsxXrSGEx6oyqiQ.jpg', 23, '2015-04-04', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":35,\\\"name\\\":\\\"Comedy\\\"},{\\\"id\\\":10765,\\\"name\\\":\\\"Sci-Fi & Fantasy\\\"},{\\\"id\\\":10759,\\\"name\\\":\\\"Action & Adventure\\\"}]\"', 'https://danmachi.com', '\"[\\\"JP\\\"]\"', 'ja', 'ダンジョンに出会いを求めるのは間違っているだろうか', 'Is It Wrong to Try to Pick Up Girls in a Dungeon?', 'In Orario, fearless adventurers band together in search of fame and fortune within the underground labyrinth known as the Dungeon. But Bell Cranel, novice adventurer, has bigger plans than riches and glory; he fights monsters in the hope of having a fateful encounter with a girl. When this happens, it doesn\'t go exactly as he planned. Thus begins the story of an unlikely pair, a boy and a goddess, both trying to prove themselves, both eager to reach their goals.', 28.76, 'https://image.tmdb.org/t/p/original/sufpUb4iKFszoFUQxYjtxWLk6lY.jpg', '\"[{\\\"id\\\":11884,\\\"logo_path\\\":\\\"\\/tHzHPSKdmLT5zCdqFbcmHzZvRIc.png\\\",\\\"name\\\":\\\"J.C.STAFF\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":151191,\\\"logo_path\\\":\\\"\\/wBA1v3dFtpRARIE7sYxc657x7rQ.png\\\",\\\"name\\\":\\\"GREE\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":162011,\\\"logo_path\\\":\\\"\\/bg6yrVhnmv6eNE8cMWehyE9wAeb.png\\\",\\\"name\\\":\\\"GREE Entertainment\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2016-12-07\\\",\\\"episode_count\\\":5,\\\"id\\\":83833,\\\"name\\\":\\\"Specials\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/mhohmyDPrANf28VzJcwYMZMvQPp.jpg\\\",\\\"season_number\\\":0,\\\"vote_average\\\":0},{\\\"air_date\\\":\\\"2015-04-04\\\",\\\"episode_count\\\":13,\\\"id\\\":66993,\\\"name\\\":\\\"Is It Wrong to Try to Pick Up Girls in a Dungeon?\\\",\\\"overview\\\":\\\"Life in the bustling city of Orario is never dull, especially for Bell Cranel, a na\\u00efve young man who hopes to become the greatest adventurer in the land. After a chance encounter with the lonely goddess, Hestia, his dreams become a little closer to reality. With her support, Bell embarks on a fantastic quest as he ventures deep within the city\'s monster-filled catacombs, known only as the \\\\\\\"Dungeon.\\\\\\\" Death lurks around every corner in the cavernous depths of this terrifying labyrinth, and a mysterious power moves amidst the shadows.\\\\n\\\\nEven on the surface, survival is a hard-earned privilege. Indeed, nothing is ever certain in a world where gods and humans live and work together, especially when they often struggle to get along. One thing is for sure, though: a myriad of blunders, triumphs and friendships awaits the dauntlessly optimistic protagonist of this herculean tale.\\\",\\\"poster_path\\\":\\\"\\/xxsM56ZvLSIR5kqI8v2N741v591.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":7.7},{\\\"air_date\\\":\\\"2019-07-13\\\",\\\"episode_count\\\":12,\\\"id\\\":126032,\\\"name\\\":\\\"Is It Wrong to Try to Pick Up Girls in a Dungeon? II\\\",\\\"overview\\\":\\\"It is business as usual in the massive city of Orario, where legions of adventurers gather to explore the monster-infested \\\\\\\"Dungeon.\\\\\\\" Among them is the easily flustered yet brave Bell Cranel, the sole member of the Hestia Familia. With the help of his demi-human supporter Liliruca Arde and competent blacksmith Welf Crozzo, Bell has earned the title of Little Rookie by becoming Orario\'s fastest-growing adventurer thanks to his endeavors within the deeper levels of the Dungeon.\\\\n\\\\nThis season continues Bell\'s adventures as he tries to bring glory to his goddess and protect those he cares about. However, various familias and gods across the city begin to take notice of his achievements and attempt to add him to their ranks.\\\",\\\"poster_path\\\":\\\"\\/nCY0zcmq2soLcOJ6SULelNq4o67.jpg\\\",\\\"season_number\\\":2,\\\"vote_average\\\":7.3},{\\\"air_date\\\":\\\"2020-10-03\\\",\\\"episode_count\\\":12,\\\"id\\\":138862,\\\"name\\\":\\\"Is It Wrong to Try to Pick Up Girls in a Dungeon? III\\\",\\\"overview\\\":\\\"Hestia Familia faces an unparalleled crisis when Bell encounters an injured vouivre (dragon-type monster girl) in the Dungeon. . . one who can talk. His decision to protect the girl, who will come to be called Weine, upends everything he and his familia thought they understood about monsters and threatens to put them at odds with Orario as a whole. But Weine is just part of greater schemes concerning talking monsters, schemes which Hestia Familia will soon find themselves at the heart of.\\\",\\\"poster_path\\\":\\\"\\/7iOoE5BSXWjzhCiI8R1R4SgLOlQ.jpg\\\",\\\"season_number\\\":3,\\\"vote_average\\\":7.2},{\\\"air_date\\\":\\\"2022-07-23\\\",\\\"episode_count\\\":22,\\\"id\\\":193725,\\\"name\\\":\\\"Is It Wrong to Try to Pick Up Girls in a Dungeon? IV\\\",\\\"overview\\\":\\\"Intrepid adventurer Bell Cranel has leveled up, but he can\\u2019t rest on his dungeoneering laurels just yet. The Hestia Familia still has a long way to go before it can stand toe-to-toe with the other Familias of Orario \\u2014 but before Bell can set out on his next mission, reports of a brutal murder rock the adventuring community! One of Bell\\u2019s trusted allies stands accused of the horrible crime, and it\\u2019s up to Bell and his friends to clear their name and uncover a nefarious plot brewing in the dungeon\\u2019s dark depths.\\\",\\\"poster_path\\\":\\\"\\/3IOPOs27t7z6uWOdkDfkuzqxbIm.jpg\\\",\\\"season_number\\\":4,\\\"vote_average\\\":7.1},{\\\"air_date\\\":\\\"2024-10-05\\\",\\\"episode_count\\\":15,\\\"id\\\":364272,\\\"name\\\":\\\"Is It Wrong to Try to Pick Up Girls in a Dungeon? V\\\",\\\"overview\\\":\\\"As the labyrinth city of Orario prepares for the Goddess Festival, Bell Cranel looks forward to the festivities after his and Ryu\'s harrowing escape from the Dungeon\'s darkened depths. However, in a small tavern tucked away on a street corner, the single decision of a young woman causes a chain of events that throws Bell\'s life and the entire city into chaos.\\\",\\\"poster_path\\\":\\\"\\/jUQgk2KTsV9pDkpc61FOii4aHNh.jpg\\\",\\\"season_number\\\":5,\\\"vote_average\\\":7.4}]\"', 'Returning Series', 7.30, 236, '2024-12-07 06:35:21', '2024-12-07 06:35:21'),
(50, 4, 72636, 0, 'https://image.tmdb.org/t/p/original/vHjuw61vrlA1P2EeYoYjMi5pNdQ.jpg', 24, '2017-07-07', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":18,\\\"name\\\":\\\"Drama\\\"},{\\\"id\\\":10759,\\\"name\\\":\\\"Action & Adventure\\\"},{\\\"id\\\":10765,\\\"name\\\":\\\"Sci-Fi & Fantasy\\\"}]\"', 'http://miabyss.com', '\"[\\\"JP\\\"]\"', 'ja', 'メイドインアビス', 'Made in Abyss', 'Located in the center of a remote island, the Abyss is the last unexplored region, a huge and treacherous fathomless hole inhabited by strange creatures where only the bravest adventurers descend in search of ancient relics. In the upper levels of the Abyss, Riko, a girl who dreams of becoming an explorer, stumbles upon a mysterious little boy.', 67.53, 'https://image.tmdb.org/t/p/original/n30CBH4BoN5Z34tCpOWIPGJYOaS.jpg', '\"[{\\\"id\\\":16738,\\\"logo_path\\\":\\\"\\/Lf0udeB7OwHoFJ0XIxVwfyGOqE.png\\\",\\\"name\\\":\\\"Kinema Citrus\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2020-01-17\\\",\\\"episode_count\\\":5,\\\"id\\\":207048,\\\"name\\\":\\\"Specials\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/pnfSqIMpBz94NAav4u6cNMrWMft.jpg\\\",\\\"season_number\\\":0,\\\"vote_average\\\":0},{\\\"air_date\\\":\\\"2017-07-07\\\",\\\"episode_count\\\":13,\\\"id\\\":90036,\\\"name\\\":\\\"Season 1\\\",\\\"overview\\\":\\\"Within the depths of the Abyss, a girl named Riko stumbles upon a robot who looks like a young boy. Riko and her new friend descend into uncharted territory to unlock its mysteries, but what lies in wait for them in the darkness?\\\",\\\"poster_path\\\":\\\"\\/uVK3H8CgtrVgySFpdImvNXkN7RK.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":6.9},{\\\"air_date\\\":\\\"2022-07-06\\\",\\\"episode_count\\\":12,\\\"id\\\":204984,\\\"name\\\":\\\"The Golden City of the Scorching Sun\\\",\\\"overview\\\":\\\"Set directly after the events of Made in Abyss: Dawn of the Deep Soul, the fifth installment of Made in Abyss covers the adventure of Reg, Riko and Nanachi in the Sixth Layer, The Capital of the Unreturned.\\\",\\\"poster_path\\\":\\\"\\/clC2erfUqIezhET67Gz9fcKD1L2.jpg\\\",\\\"season_number\\\":2,\\\"vote_average\\\":6.1}]\"', 'Ended', 8.40, 498, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(51, 4, 78204, 0, 'https://image.tmdb.org/t/p/original/9tLYmGYirk08PZAkipVAiGJUL3i.jpg', 24, '2018-04-08', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":10759,\\\"name\\\":\\\"Action & Adventure\\\"},{\\\"id\\\":10765,\\\"name\\\":\\\"Sci-Fi & Fantasy\\\"}]\"', 'http://www.gungale-online.net', '\"[\\\"JP\\\"]\"', 'ja', 'ソードアート・オンライン オルタナティブ ガンゲイル・オンライン', 'Sword Art Online Alternative: Gun Gale Online', 'A shy university student in Tokyo, Karen Kohiruimaki stands in stark contrast to her in-game avatar—in fact, she happens to stand above everyone else too, much to her dismay. Towering above all the people around her, Karen\'s insecurities over her height reach the point where she turns to the virtual world for an escape. Starting game after game in hopes of manifesting as a cute, short character, she finally obtains her ideal self in the world of Gun Gale Online. Overjoyed by her new persona, she pours her time into the game as LLENN, garnering her reputation as the legendary player killer. However, when one of LLENN\'s targets gets the best of her, she ends up meeting Pitohui, a skilled yet eccentric woman. Pitohui insists that LLENN participates in Squad Jam, a battle royale. Thrust into the heated competition, LLENN must fight with all her wit and will if she hopes to shoot her way to the top.', 145.22, 'https://image.tmdb.org/t/p/original/s1DDZDvECSjBHlelw9qbvGpAgOo.jpg', '\"[{\\\"id\\\":77832,\\\"logo_path\\\":\\\"\\/4qKMYPaifBLGWQq7mQYQBw40W1.png\\\",\\\"name\\\":\\\"Studio 3Hz\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":95809,\\\"logo_path\\\":\\\"\\/5ac8LhghlxYKbPSwbXJkgrNfjGF.png\\\",\\\"name\\\":\\\"EGG FIRM\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":13113,\\\"logo_path\\\":\\\"\\/xV5tPYKZhP2Ko9dOh5A3FahuKsx.png\\\",\\\"name\\\":\\\"A-1 Pictures\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":2883,\\\"logo_path\\\":\\\"\\/rDYExnBV61jGQnkhVVrPN4Yl7O1.png\\\",\\\"name\\\":\\\"Aniplex\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":2073,\\\"logo_path\\\":\\\"\\/tWxRSaKmRJNTcmtlXsmn5R4KOSU.png\\\",\\\"name\\\":\\\"KADOKAWA\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":32957,\\\"logo_path\\\":\\\"\\/fsKExPZ443yF5oMRmbK96AjcZBT.png\\\",\\\"name\\\":\\\"ASCII Media Works\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":12502,\\\"logo_path\\\":\\\"\\/tlBbCuZditAuvzDdIDjjnGLJUpc.png\\\",\\\"name\\\":\\\"Bandai Namco Entertainment\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":5751,\\\"logo_path\\\":\\\"\\/ex1dPOOB27kWLhhhh9gsngxBRLI.png\\\",\\\"name\\\":\\\"GENCO\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":162614,\\\"logo_path\\\":\\\"\\/xmP3OMWSfARsUB15rlZyv6yjhsE.png\\\",\\\"name\\\":\\\"Straight Edge\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2018-05-13\\\",\\\"episode_count\\\":2,\\\"id\\\":103696,\\\"name\\\":\\\"Specials\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/1EBk96E3cVVOEVlx2z744oEuFQk.jpg\\\",\\\"season_number\\\":0,\\\"vote_average\\\":0},{\\\"air_date\\\":\\\"2018-04-08\\\",\\\"episode_count\\\":12,\\\"id\\\":101127,\\\"name\\\":\\\"Gun Gale Online\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/qpFmNzqYXIpBxKCvfPNIocOQgPh.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":8.1},{\\\"air_date\\\":\\\"2024-10-05\\\",\\\"episode_count\\\":12,\\\"id\\\":350207,\\\"name\\\":\\\"Gun Gale Online II\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/jfCmk1YBBXR4M1WzN3GHnNSekff.jpg\\\",\\\"season_number\\\":2,\\\"vote_average\\\":0}]\"', 'Returning Series', 7.80, 255, '2024-12-07 06:40:17', '2024-12-07 06:40:17'),
(52, 4, 240411, 0, 'https://image.tmdb.org/t/p/original/7VQGc2NEAmmvUEDEkRqi7c9E3vu.jpg', 24, '2024-10-04', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":10759,\\\"name\\\":\\\"Action & Adventure\\\"},{\\\"id\\\":35,\\\"name\\\":\\\"Comedy\\\"},{\\\"id\\\":10765,\\\"name\\\":\\\"Sci-Fi & Fantasy\\\"}]\"', 'https://anime-dandadan.com', '\"[\\\"JP\\\"]\"', 'ja', 'ダンダダン', 'Dan Da Dan', 'In a bet to prove whether ghosts or aliens exist, two high schoolers face terrifying paranormal threats, gain superpowers and maybe even fall in love?!', 989.67, 'https://image.tmdb.org/t/p/original/tiF5I6wF6tEUy39gmNtw3G1GYyz.jpg', '\"[{\\\"id\\\":99494,\\\"logo_path\\\":\\\"\\/fpUFQKvrWPWTA8lbLWtWX65miPS.png\\\",\\\"name\\\":\\\"Science SARU\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":2918,\\\"logo_path\\\":\\\"\\/gyEWUBWwqrm3H5T2hkERD9LxpOq.png\\\",\\\"name\\\":\\\"Shueisha\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":3363,\\\"logo_path\\\":\\\"\\/sj3vD7n63bTCih7bcf6GnWvRf1Q.png\\\",\\\"name\\\":\\\"MBS\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":1778,\\\"logo_path\\\":\\\"\\/b5rT6VbYza3LyfltCmz1OcqzWJM.png\\\",\\\"name\\\":\\\"dentsu\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":2883,\\\"logo_path\\\":\\\"\\/rDYExnBV61jGQnkhVVrPN4Yl7O1.png\\\",\\\"name\\\":\\\"Aniplex\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":12655,\\\"logo_path\\\":\\\"\\/dfGqf2NoMVPrDywDL90D5HAhBlW.png\\\",\\\"name\\\":\\\"Shogakukan-Shueisha Productions\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2024-10-04\\\",\\\"episode_count\\\":12,\\\"id\\\":367498,\\\"name\\\":\\\"Season 1\\\",\\\"overview\\\":\\\"When high schooler Momo, from a family of spirit mediums, first meets her classmate Okarun, an occult geek, they argue\\u2014Momo believes in ghosts but denies aliens, and Okarun believes in aliens but denies ghosts. When it turns out both phenomena are real, Momo awakens a hidden power and Okarun gains the power of a curse. Together, they must challenge the paranormal forces threatening their world.\\\",\\\"poster_path\\\":\\\"\\/6qfZAOEUFIrbUH3JvePclx1nXzz.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":9}]\"', 'Returning Series', 8.80, 189, '2024-12-07 06:42:02', '2024-12-07 06:42:02'),
(53, 4, 65942, 0, 'https://image.tmdb.org/t/p/original/x6y59dJBE1o0r4YRsWVQXE2nnlB.jpg', 25, '2016-04-04', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":35,\\\"name\\\":\\\"Comedy\\\"},{\\\"id\\\":10759,\\\"name\\\":\\\"Action & Adventure\\\"},{\\\"id\\\":10765,\\\"name\\\":\\\"Sci-Fi & Fantasy\\\"}]\"', 'http://re-zero-anime.jp/', '\"[\\\"JP\\\"]\"', 'ja', 'Re:ゼロから始める異世界生活', 'Re:ZERO -Starting Life in Another World-', 'Natsuki Subaru, an ordinary high school  student, is on his way home from the convenience store when he finds  himself transported to another world. As he\'s lost and confused in a new  world where he doesn\'t even know left from right, the only person to  reach out to him was a beautiful girl with silver hair. Determined to  repay her somehow for saving him from his own despair, Subaru agrees to  help the girl find something she\'s looking for.', 233.84, 'https://image.tmdb.org/t/p/original/5MrRCj7z92YLWMXHeWKp19eJPYv.jpg', '\"[{\\\"id\\\":12569,\\\"logo_path\\\":\\\"\\/pROt6mT15AC5aTadf7NRBRiTVo3.png\\\",\\\"name\\\":\\\"White Fox\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":2073,\\\"logo_path\\\":\\\"\\/tWxRSaKmRJNTcmtlXsmn5R4KOSU.png\\\",\\\"name\\\":\\\"KADOKAWA\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":142186,\\\"logo_path\\\":\\\"\\/bdXTOuU7PdsDtQngyM7vb47zePs.png\\\",\\\"name\\\":\\\"Hakuhodo DY Music & Pictures\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":157002,\\\"logo_path\\\":\\\"\\/hSdroyVthq3CynxTIIY7lnS8w1.png\\\",\\\"name\\\":\\\"Tokyo MX\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":17981,\\\"logo_path\\\":\\\"\\/8UABNMysukRi4udTHYxcNUMbPR1.png\\\",\\\"name\\\":\\\"AT-X\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":12540,\\\"logo_path\\\":null,\\\"name\\\":\\\"Memory-Tech\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2016-04-05\\\",\\\"episode_count\\\":61,\\\"id\\\":76465,\\\"name\\\":\\\"Specials\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/DZtIJ4MbMgvrdZ6aqcCRfWjH03.jpg\\\",\\\"season_number\\\":0,\\\"vote_average\\\":0},{\\\"air_date\\\":\\\"2016-04-04\\\",\\\"episode_count\\\":66,\\\"id\\\":75470,\\\"name\\\":\\\"Season 1\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/5MrRCj7z92YLWMXHeWKp19eJPYv.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":8.7}]\"', 'Returning Series', 7.80, 458, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(54, 4, 83121, 0, 'https://image.tmdb.org/t/p/original/acFjVL56t9tlTx2hgllemsGqgEU.jpg', 24, '2019-01-12', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":35,\\\"name\\\":\\\"Comedy\\\"}]\"', 'https://kaguya.love/', '\"[\\\"JP\\\"]\"', 'ja', 'かぐや様は告らせたい～天才たちの恋愛頭脳戦～', 'Kaguya-sama: Love Is War', 'Considered a genius due to having the highest grades in the country, Miyuki Shirogane leads the prestigious Shuchiin Academy\'s student council as its president, working alongside the beautiful and wealthy vice president Kaguya Shinomiya. The two are often regarded as the perfect couple by students despite them not being in any sort of romantic relationship.', 105.74, 'https://image.tmdb.org/t/p/original/5khbC6AuNgnvnoDbjIMKCOhEtIc.jpg', '\"[{\\\"id\\\":13113,\\\"logo_path\\\":\\\"\\/xV5tPYKZhP2Ko9dOh5A3FahuKsx.png\\\",\\\"name\\\":\\\"A-1 Pictures\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2021-05-19\\\",\\\"episode_count\\\":4,\\\"id\\\":196030,\\\"name\\\":\\\"Specials\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/6x0mPukLfCENknL78aqcaBLLycm.jpg\\\",\\\"season_number\\\":0,\\\"vote_average\\\":0},{\\\"air_date\\\":\\\"2019-01-12\\\",\\\"episode_count\\\":12,\\\"id\\\":110896,\\\"name\\\":\\\"Kaguya-sama: Love Is War\\\",\\\"overview\\\":\\\"At the renowned Shuchiin Academy, Miyuki Shirogane and Kaguya Shinomiya are the student body\\u2019s top representatives. Ranked the top student in the nation and respected by peers and mentors alike, Miyuki serves as the student council president. Alongside him, the vice president Kaguya\\u2014eldest daughter of the wealthy Shinomiya family\\u2014excels in every field imaginable. They are the envy of the entire student body, regarded as the perfect couple.\\\",\\\"poster_path\\\":\\\"\\/kdaHx20oZ0vRfVjON53qNMLKkSc.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":8.3},{\\\"air_date\\\":\\\"2020-04-11\\\",\\\"episode_count\\\":12,\\\"id\\\":134483,\\\"name\\\":\\\"Kaguya-sama: Love Is War?\\\",\\\"overview\\\":\\\"After a slow but eventful summer vacation, Shuchiin Academy\\u2019s second term is now starting in full force. As August transitions into September, Miyuki Shirogane\\u2019s birthday looms ever closer, leaving Kaguya Shinomiya in a serious predicament as to how to celebrate it. Furthermore, the tenure of the school\\u2019s 67th student council is coming to an end. Due to the council members being in different classes, the only time Kaguya and Miyuki have to be together will soon disappear, putting all of their cunning plans at risk.\\\",\\\"poster_path\\\":\\\"\\/d8jw8L8pAKVLRUU5hMUEVxIZmIe.jpg\\\",\\\"season_number\\\":2,\\\"vote_average\\\":8.1},{\\\"air_date\\\":\\\"2022-04-09\\\",\\\"episode_count\\\":13,\\\"id\\\":216535,\\\"name\\\":\\\"Kaguya-sama: Love Is War -Ultra Romantic-\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/eO9HZHNhncJbMGxAEZlWdGLNeFC.jpg\\\",\\\"season_number\\\":3,\\\"vote_average\\\":7.9}]\"', 'Returning Series', 8.60, 729, '2024-12-07 06:44:52', '2024-12-07 06:44:52'),
(55, 4, 220542, 0, 'https://image.tmdb.org/t/p/original/u62B2HccCfQ5lgSHVFM9cJpwsGn.jpg', 23, '2023-10-22', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":18,\\\"name\\\":\\\"Drama\\\"},{\\\"id\\\":9648,\\\"name\\\":\\\"Mystery\\\"}]\"', 'https://kusuriyanohitorigoto.jp', '\"[\\\"JP\\\"]\"', 'ja', '薬屋のひとりごと', 'The Apothecary Diaries', 'Maomao lived a peaceful life with her apothecary father. Until one day, she\'s sold as a lowly servant to the emperor\'s palace. But she wasn\'t meant for a compliant life among royalty. So when imperial heirs fall ill, she decides to step in and find a cure! This catches the eye of Jinshi, a handsome palace official who promotes her. Now, she\'s making a name for herself solving medical mysteries!', 168.73, 'https://image.tmdb.org/t/p/original/e3ojpANrFnmJCyeBNTinYwyBCIN.jpg', '\"[{\\\"id\\\":5372,\\\"logo_path\\\":\\\"\\/tPtJc2rCOTHEzJQPStT6m3dI0eK.png\\\",\\\"name\\\":\\\"OLM\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":193504,\\\"logo_path\\\":\\\"\\/lDBGXkGe4ZqWnyMfDWHx03KcWlx.png\\\",\\\"name\\\":\\\"TOHO animation STUDIO\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":882,\\\"logo_path\\\":\\\"\\/fRSWWjquvzcHjACbtF53utZFIll.png\\\",\\\"name\\\":\\\"TOHO\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":6755,\\\"logo_path\\\":\\\"\\/c0ENH8QeZLvCACpzCpwvYMy2SDr.png\\\",\\\"name\\\":\\\"Nippon Television Network Corporation\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":211680,\\\"logo_path\\\":\\\"\\/ydN85bcGpnR2ksgqJQw91683d24.png\\\",\\\"name\\\":\\\"Imagica Infos\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":1778,\\\"logo_path\\\":\\\"\\/b5rT6VbYza3LyfltCmz1OcqzWJM.png\\\",\\\"name\\\":\\\"dentsu\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":9149,\\\"logo_path\\\":\\\"\\/isLUpud9N56ifftJZ4XvzwBBpoG.png\\\",\\\"name\\\":\\\"Shogakukan\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":10038,\\\"logo_path\\\":\\\"\\/nCueXKwYIEXrZ5ofqSJBO1YcmRr.png\\\",\\\"name\\\":\\\"Square Enix\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2023-10-23\\\",\\\"episode_count\\\":24,\\\"id\\\":363363,\\\"name\\\":\\\"Specials\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/gvSNSniZ5kr8T2ztLONOEJSYrQs.jpg\\\",\\\"season_number\\\":0,\\\"vote_average\\\":0},{\\\"air_date\\\":\\\"2023-10-22\\\",\\\"episode_count\\\":24,\\\"id\\\":329141,\\\"name\\\":\\\"Season 1\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/qGObcxuXKcKhP43BqTeIC7KgRcM.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":7.7},{\\\"air_date\\\":\\\"2025-01-10\\\",\\\"episode_count\\\":24,\\\"id\\\":385159,\\\"name\\\":\\\"Season 2\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/tbHmFDoJpyzSBF6DDlnfoy8nbcB.jpg\\\",\\\"season_number\\\":2,\\\"vote_average\\\":0}]\"', 'Returning Series', 8.80, 188, '2024-12-07 06:45:45', '2024-12-07 06:45:45'),
(56, 4, 119100, 0, 'https://image.tmdb.org/t/p/original/8LXsQb5THhA0vfuB1FkgJjPBOCz.jpg', 24, '2022-10-09', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":35,\\\"name\\\":\\\"Comedy\\\"}]\"', 'https://bocchi.rocks', '\"[\\\"JP\\\"]\"', 'ja', 'ぼっち・ざ・ろっく！', 'BOCCHI THE ROCK!', 'Hitori Gotoh, a shy, awkward, and lonely high school student dreams of being in a band despite her doubts and worries, but when she is recruited to be the guitarist of a group looking to make it big, she realises her dream may be able to be fulfilled and come true.', 58.06, 'https://image.tmdb.org/t/p/original/se9xLGHlSqQwVgEzLw326CJjaRm.jpg', '\"[{\\\"id\\\":121589,\\\"logo_path\\\":\\\"\\/kZvTniBgpTzAThHCa0OZ1FJtRjy.png\\\",\\\"name\\\":\\\"CloverWorks\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":2883,\\\"logo_path\\\":\\\"\\/rDYExnBV61jGQnkhVVrPN4Yl7O1.png\\\",\\\"name\\\":\\\"Aniplex\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":22597,\\\"logo_path\\\":\\\"\\/neo38FzewK5I1ilLOQyPOKseRWS.png\\\",\\\"name\\\":\\\"Houbunsha\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2022-12-24\\\",\\\"episode_count\\\":1,\\\"id\\\":324957,\\\"name\\\":\\\"Specials\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/wkCPKXRYAJUFS2E6bywv5IW1nlj.jpg\\\",\\\"season_number\\\":0,\\\"vote_average\\\":0},{\\\"air_date\\\":\\\"2022-10-09\\\",\\\"episode_count\\\":12,\\\"id\\\":182218,\\\"name\\\":\\\"Season 1\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/oWp9LhbfXV579OqA33SziSQQEuX.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":7.8}]\"', 'Ended', 8.40, 139, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(57, 4, 204832, 0, 'https://image.tmdb.org/t/p/original/2qV2urtZxXa9gJDpuqblOTUwe7L.jpg', 24, '2023-04-08', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":35,\\\"name\\\":\\\"Comedy\\\"},{\\\"id\\\":10759,\\\"name\\\":\\\"Action & Adventure\\\"},{\\\"id\\\":10765,\\\"name\\\":\\\"Sci-Fi & Fantasy\\\"}]\"', 'https://mashle.pw', '\"[\\\"JP\\\"]\"', 'ja', 'マッシュル-MASHLE-', 'MASHLE: MAGIC AND MUSCLES', 'In the magic realm, magic is everything—everyone can use it, and one’s social status is determined by their skill level. Deep in the forest, oblivious to the ways of the world, lives Mash. Thanks to his daily training, he’s become a fitness god, but he harbors a secret that could turn his life upside down—he can’t use magic! When he’s found out, rather than his life being over, he’s unexpectedly enrolled in magic school, where he must beat the competition!', 191.46, 'https://image.tmdb.org/t/p/original/48dNOsGBOxQwZp04kcLdebFdPBU.jpg', '\"[{\\\"id\\\":13113,\\\"logo_path\\\":\\\"\\/xV5tPYKZhP2Ko9dOh5A3FahuKsx.png\\\",\\\"name\\\":\\\"A-1 Pictures\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":2883,\\\"logo_path\\\":\\\"\\/rDYExnBV61jGQnkhVVrPN4Yl7O1.png\\\",\\\"name\\\":\\\"Aniplex\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":189968,\\\"logo_path\\\":\\\"\\/lDGcesNvJp4s3ReoKVDTjtFCkIg.png\\\",\\\"name\\\":\\\"INSPION EDGE\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":2918,\\\"logo_path\\\":\\\"\\/gyEWUBWwqrm3H5T2hkERD9LxpOq.png\\\",\\\"name\\\":\\\"Shueisha\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":162019,\\\"logo_path\\\":\\\"\\/inMGZK76HIbFhTnCGzVx39BMGzr.png\\\",\\\"name\\\":\\\"ADK Marketing Solutions\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2023-05-20\\\",\\\"episode_count\\\":14,\\\"id\\\":341499,\\\"name\\\":\\\"Specials\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/5wMbPo36Mvwcn9QXoUD5enck9gA.jpg\\\",\\\"season_number\\\":0,\\\"vote_average\\\":0},{\\\"air_date\\\":\\\"2023-04-08\\\",\\\"episode_count\\\":24,\\\"id\\\":298699,\\\"name\\\":\\\"Season 1\\\",\\\"overview\\\":\\\"\\\",\\\"poster_path\\\":\\\"\\/lviOZZvorHLsgQSd2Hl2VjkukHn.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":7.8}]\"', 'Returning Series', 8.30, 442, '2024-12-07 06:57:09', '2024-12-07 06:57:09'),
(58, 4, 60654, 0, 'https://image.tmdb.org/t/p/original/6uqVsWenBMuaBgDjxEHVNYspw9V.jpg', 24, '2012-10-07', '\"[{\\\"id\\\":16,\\\"name\\\":\\\"Animation\\\"},{\\\"id\\\":10759,\\\"name\\\":\\\"Action & Adventure\\\"},{\\\"id\\\":10765,\\\"name\\\":\\\"Sci-Fi & Fantasy\\\"}]\"', 'http://www.project-magi.com/', '\"[\\\"JP\\\"]\"', 'ja', 'マギ', 'Magi', 'This story is about the flow of fate and the battle to keep the world on the right path. Aladdin is a boy who has set out to explore the world after being trapped in a room for most of his life. His best friend is a flute with a djinn in it named Ugo. Soon enough, Aladdin discovers he is a Magi, a magician who chooses kings, and he was born to choose kings who will follow the righteous path, battling against those who want to destroy fate. Follow his adventures as he meets others from 1001 Arabian Nights, like Ali Baba and Sinbad, and fights to keep the balance of world in check!', 41.74, 'https://image.tmdb.org/t/p/original/1VVAZ5vIKzwOcseg0gQPf3ZihiT.jpg', '\"[{\\\"id\\\":2883,\\\"logo_path\\\":\\\"\\/rDYExnBV61jGQnkhVVrPN4Yl7O1.png\\\",\\\"name\\\":\\\"Aniplex\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":13113,\\\"logo_path\\\":\\\"\\/xV5tPYKZhP2Ko9dOh5A3FahuKsx.png\\\",\\\"name\\\":\\\"A-1 Pictures\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":3363,\\\"logo_path\\\":\\\"\\/sj3vD7n63bTCih7bcf6GnWvRf1Q.png\\\",\\\"name\\\":\\\"MBS\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":1778,\\\"logo_path\\\":\\\"\\/b5rT6VbYza3LyfltCmz1OcqzWJM.png\\\",\\\"name\\\":\\\"dentsu\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":9149,\\\"logo_path\\\":\\\"\\/isLUpud9N56ifftJZ4XvzwBBpoG.png\\\",\\\"name\\\":\\\"Shogakukan\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":41861,\\\"logo_path\\\":\\\"\\/iQ9Av0fDGKDUInp4I5czxhz5fVj.png\\\",\\\"name\\\":\\\"GYAO\\\",\\\"origin_country\\\":\\\"JP\\\"},{\\\"id\\\":81208,\\\"logo_path\\\":null,\\\"name\\\":\\\"AnimatiC\\\",\\\"origin_country\\\":\\\"JP\\\"}]\"', '\"[{\\\"air_date\\\":\\\"2012-10-06\\\",\\\"episode_count\\\":25,\\\"id\\\":60191,\\\"name\\\":\\\"Magi: The Labyrinth of Magic\\\",\\\"overview\\\":\\\"Aladdin is a boy who has set out to explore the world after being trapped in a room for most of his life. His best friend is a flute with a djinn in it named Ugo. Soon enough, Aladdin discovers he is a Magi, a magician who chooses kings, and he was born to choose kings who will follow the righteous path, battling against those who want to destroy fate.\\\",\\\"poster_path\\\":\\\"\\/htcydwrp69GeWmNFUf9Ja6wSzew.jpg\\\",\\\"season_number\\\":1,\\\"vote_average\\\":8.7},{\\\"air_date\\\":\\\"2013-10-06\\\",\\\"episode_count\\\":25,\\\"id\\\":80498,\\\"name\\\":\\\"Magi: The Kingdom of Magic\\\",\\\"overview\\\":\\\"After celebrating their victory against Al-Thamen, Aladdin and his friends depart the land of Sindria. With the end of the battle, however, comes the time for each of them to go their separate ways. Hakuryuu and Kougyoku are ordered to go back to their home country, the Kou Empire. Meanwhile Aladdin announces he needs to head for Magnostadt\\u2014a mysterious country ruled by magicians\\u2014to investigate the mysterious events occurring in this new kingdom and become more proficient in magic. For their part, encouraged by Aladdin\'s words, Alibaba and Morgiana also set off in pursuit of their own goals: training and going to her homeland, respectively.\\\",\\\"poster_path\\\":\\\"\\/5NxyJwSjpggv8HWTQ6JNAXtX5hJ.jpg\\\",\\\"season_number\\\":2,\\\"vote_average\\\":6.5}]\"', 'Ended', 8.50, 178, '2024-12-07 06:58:49', '2024-12-07 06:58:49');

-- --------------------------------------------------------

--
-- Table structure for table `casts`
--

CREATE TABLE `casts` (
  `id` int(11) NOT NULL,
  `characterName` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `profile_path` varchar(255) DEFAULT NULL,
  `animeId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casts`
--

INSERT INTO `casts` (`id`, `characterName`, `name`, `profile_path`, `animeId`, `created_at`, `updated_at`) VALUES
(418, 'Iruma Suzuki (voice)', 'Ayumu Murase', 'https://image.tmdb.org/t/p/original/3aGM6KpcCIEKOXP9510tzaKc8uw.jpg', 46, '2024-12-07 06:30:02', '2024-12-07 06:30:02'),
(419, 'Ameri Azazel (voice)', 'Saori Hayami', 'https://image.tmdb.org/t/p/original/gLv9lO7dlUbIsmyJUvgegqAAXki.jpg', 46, '2024-12-07 06:30:02', '2024-12-07 06:30:02'),
(420, 'Valac Clara (voice)', 'Ayaka Asai', 'https://image.tmdb.org/t/p/original/tQCblqK0CJfddLPkYKcI94R2Pgh.jpg', 46, '2024-12-07 06:30:02', '2024-12-07 06:30:02'),
(421, 'Naberius Callego (voice)', 'Daisuke Ono', 'https://image.tmdb.org/t/p/original/rCo5Q3xMnOFMavs6YJAbP2ZRsqt.jpg', 46, '2024-12-07 06:30:02', '2024-12-07 06:30:02'),
(422, 'Asmodeus Alice (voice)', 'Ryohei Kimura', 'https://image.tmdb.org/t/p/original/m4GktFKhjrVTewsZtqTusInHZqT.jpg', 46, '2024-12-07 06:30:02', '2024-12-07 06:30:02'),
(423, 'Sabro Sabnock (voice)', 'Takuya Sato', 'https://image.tmdb.org/t/p/original/na0mf83dkhNc28ygsjM1TRkceQs.jpg', 46, '2024-12-07 06:30:02', '2024-12-07 06:30:02'),
(424, 'Sullivan (voice)', 'Takaya Kuroda', 'https://image.tmdb.org/t/p/original/7UH1DDjoF7x4b9pOT4bLF9ew8Uq.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(425, 'Keroli Crocell / Evidol Kuromu (voice)', 'Nao Toyama', 'https://image.tmdb.org/t/p/original/6WJDd1z946yFfZBgpC7dWi0FyQw.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(426, 'Lied Shax (voice)', 'Yoshitaka Yamaya', 'https://image.tmdb.org/t/p/original/jptl2nYlIMSs6oJViWyIWYvyXPj.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(427, 'Jazz M. Andro (voice)', 'Tetsuya Kakihara', 'https://image.tmdb.org/t/p/original/80DeAD6DYh030wsyUygFqDpNkSj.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(428, 'Opera (voice)', 'Mitsuki Saiga', 'https://image.tmdb.org/t/p/original/qjRHodCBpKY8nEa4p8dZriDoil4.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(429, 'Elizabetta Ix (voice)', 'Kaede Hondo', 'https://image.tmdb.org/t/p/original/11BcHnuJYrOZhIftgUiQqfm7TK6.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(430, 'Picero Agares (voice)', 'Takuto Yoshinaga', 'https://image.tmdb.org/t/p/original/wiTj3WdkZdaqFKEztgPo685oGm4.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(431, 'Schneider Allocer (voice)', 'Shunichi Toki', 'https://image.tmdb.org/t/p/original/3hauO9r1NEzgXxk8d2ed1p5dnxM.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(432, 'Kamui Caim (voice)', 'Gakuto Kajiwara', 'https://image.tmdb.org/t/p/original/kUer38jXf7vTD2TGGxJMZVYL5Te.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(433, 'Goemon Garp (voice)', 'Genki Okawa', 'https://image.tmdb.org/t/p/original/mHot93MlKhHFS2Nx7961uRABN3p.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(434, 'Bachiko Barbatos (voice)', 'Junko Takeuchi', 'https://image.tmdb.org/t/p/original/zNjrblq3xS1idpCsmSl5P5eTon7.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(435, 'Ali (voice)', 'Shin-ichiro Miki', 'https://image.tmdb.org/t/p/original/yL9Tx2HZgK7t5AssYl6oGE9bjdj.jpg', 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(436, 'Violet Evergarden (voice)', 'Yui Ishikawa', 'https://image.tmdb.org/t/p/original/zptGIN1iklKJL1xrfHKOpxR2qJ9.jpg', 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(437, 'Iris Cannary (voice)', 'Haruka Tomatsu', 'https://image.tmdb.org/t/p/original/geVvuA2zMGE5xzfc20aDelJSelu.jpg', 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(438, 'Gilbert Bougainvillea (voice)', 'Daisuke Namikawa', 'https://image.tmdb.org/t/p/original/iw0X8oDutxaBAri3Ifga8nhdUJK.jpg', 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(439, 'Cattleya Baudelaire (voice)', 'Aya Endo', 'https://image.tmdb.org/t/p/original/s59Lip4dPC7rI3cz1pHs9vSmuvf.jpg', 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(440, 'Claudia Hodgins (voice)', 'Takehito Koyasu', 'https://image.tmdb.org/t/p/original/8uBkNDKPNmp9JWgMUI02NVyfhi1.jpg', 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(441, 'Benedict Blue (voice)', 'Koki Uchiyama', 'https://image.tmdb.org/t/p/original/sllSm3iZZWVLTBrDZQRtWrZUfEj.jpg', 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(442, 'Erica Brown (voice)', 'Minori Chihara', 'https://image.tmdb.org/t/p/original/qSqXpdLUq4prPtL7mkp0go6SbrF.jpg', 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(443, 'Liliruca Arde (Voice)', 'Maaya Uchida', 'https://image.tmdb.org/t/p/original/rq4glg2SZwGyt3TIxR3ElalKmhH.jpg', 49, '2024-12-07 06:35:21', '2024-12-07 06:35:21'),
(444, 'Bell Cranel (Voice)', 'Yoshitsugu Matsuoka', 'https://image.tmdb.org/t/p/original/ugDwdWEXnmv43jcbnfAi4XwiQ8C.jpg', 49, '2024-12-07 06:35:21', '2024-12-07 06:35:21'),
(445, 'Hestia (Voice)', 'Inori Minase', 'https://image.tmdb.org/t/p/original/gDyp6UrxZB3tppK3m16NFAggpuf.jpg', 49, '2024-12-07 06:35:21', '2024-12-07 06:35:21'),
(446, 'Ais Wallenstein (Voice)', 'Saori Onishi', 'https://image.tmdb.org/t/p/original/cziKB19QMFJ6DQDtxTn07uRY2hq.jpg', 49, '2024-12-07 06:35:21', '2024-12-07 06:35:21'),
(447, 'Welf Crozzo (Voice)', 'Yoshimasa Hosoya', 'https://image.tmdb.org/t/p/original/lUR5oN1LrqGgp25IOcI1qOH1Ud5.jpg', 49, '2024-12-07 06:35:21', '2024-12-07 06:35:21'),
(448, 'Mikoto Yamato (Voice)', 'Chinatsu Akasaki', 'https://image.tmdb.org/t/p/original/nYYs30FgGrgr3uOiQ4ASmRpFca2.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(449, 'Freya (Voice)', 'Yoko Hikasa', 'https://image.tmdb.org/t/p/original/e6I7r45YZXgvlEVSGR3L14tSl87.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(450, 'Ryuu Lion (Voice)', 'Saori Hayami', 'https://image.tmdb.org/t/p/original/gLv9lO7dlUbIsmyJUvgegqAAXki.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(451, 'Loki (Voice)', 'Yurika Kubo', 'https://image.tmdb.org/t/p/original/ujXrmpArnC1ARxfe71181WVXp3F.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(452, 'Haruhime Sanjouno (Voice)', 'Haruka Chisuga', 'https://image.tmdb.org/t/p/original/AtnSB4UrQubvajAxNmj55tVWxZO.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(453, 'Syr Flova (Voice)', 'Shizuka Ishigami', 'https://image.tmdb.org/t/p/original/kXTYBI7skkVSjQ4eg49iEGblt3f.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(454, 'Ouka	Kashima (Voice)', 'Kazuyuki Okitsu', 'https://image.tmdb.org/t/p/original/vgyaK5dAxhvzAi6LJM3ZyaJd4mJ.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(455, 'Ray (Voice)', 'Yuuki Takada', 'https://image.tmdb.org/t/p/original/sbe8XOF0JHg6KB96fuqHuXGUQtK.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(456, 'Daphne Rauros (Voice)', 'Wakana Kowaka', 'https://image.tmdb.org/t/p/original/jmj7QTeDlMvLFL4azofn1VTLwks.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(457, 'Chigusa Hitachi (Voice)', 'Yuka Iguchi', 'https://image.tmdb.org/t/p/original/wutIs24BvVy0KYGPhnS1sK2IEWn.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(458, 'Wiene (Voice)', 'Rina Hidaka', 'https://image.tmdb.org/t/p/original/7JupZGvqcq4dRxiTKpPxzg8NUS4.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(459, 'Lyd (Voice)', 'Masaaki Mizunaka', 'https://image.tmdb.org/t/p/original/cHb2pr4juxk8A3VTuDxgPWHM6WF.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(460, 'Cassandra Ilion (Voice)', 'Ayumi Mano', 'https://image.tmdb.org/t/p/original/umEB1uxpyGCy6866NzE5V2PvaAu.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(461, 'Aisha Belka (Voice)', 'Akeno Watanabe', 'https://image.tmdb.org/t/p/original/4E05IJxvTGNHb2GSaiyxbCZ5nd8.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(462, 'Gros (Voice)', 'Tetsu Inada', 'https://image.tmdb.org/t/p/original/e8qQL1NKTHP8eOsZmV5LCkdHS9T.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(463, 'Chloe Lolo (Voice)', 'Aya Suzaki', 'https://image.tmdb.org/t/p/original/5WseHNh19237dDQqzsoqzTjmdQz.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(464, 'Anya Flomer (Voice)', 'Asuka Nishi', 'https://image.tmdb.org/t/p/original/lmwim3ioUuvGCH93kJFth5BXxbi.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(465, 'Fear (Voice)', 'Manaka Iwami', 'https://image.tmdb.org/t/p/original/leKMaCBswXG8u4mfQNQ7J3y6Xow.jpg', 49, '2024-12-07 06:35:22', '2024-12-07 06:35:22'),
(466, 'Let (Voice)', 'Kaito Takeda', 'https://image.tmdb.org/t/p/original/rqX15oNUlF94dEXbyjGKEp5L946.jpg', 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(467, 'Apollo (Voice)', 'Ryota Osaka', 'https://image.tmdb.org/t/p/original/d2TGy8Qkxe90tGDr9MCXFGkhbPl.jpg', 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(468, 'Eina Tulle (Voice)', 'Haruka Tomatsu', 'https://image.tmdb.org/t/p/original/geVvuA2zMGE5xzfc20aDelJSelu.jpg', 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(469, 'Lena Tall (Voice)', 'Mao Ichimichi', 'https://image.tmdb.org/t/p/original/2srDQKoMUmBnzVKDARkGIlYRZQy.jpg', 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(470, 'Hyakinthos Clio (Voice)', 'KENN', 'https://image.tmdb.org/t/p/original/y7Gtn1PchXJ1MxmUxU9jtt138EO.jpg', 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(471, 'Riko (voice)', 'Miyu Tomita', 'https://image.tmdb.org/t/p/original/rSR17l4HdchLkhpRuAZbGbXNmUS.jpg', 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(472, 'Reg (voice)', 'Mariya Ise', 'https://image.tmdb.org/t/p/original/tQWlgrlQ70biWdg7x9E75CtwsuD.jpg', 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(473, 'Llenn / Kohiruimaki Karen (voice)', 'Tomori Kusunoki', 'https://image.tmdb.org/t/p/original/t5aBzyYiJZDE6DWeTcGMrcQpiI5.jpg', 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(474, 'Pitohui / Elsa Kanzaki / Rei Sato (voice)', 'Yoko Hikasa', 'https://image.tmdb.org/t/p/original/e6I7r45YZXgvlEVSGR3L14tSl87.jpg', 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(475, 'M / Asougi Goushi (voice)', 'Kazuyuki Okitsu', 'https://image.tmdb.org/t/p/original/vgyaK5dAxhvzAi6LJM3ZyaJd4mJ.jpg', 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(476, 'Fukaziroh / Shinohara Miyu (voice)', 'Chinatsu Akasaki', 'https://image.tmdb.org/t/p/original/nYYs30FgGrgr3uOiQ4ASmRpFca2.jpg', 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(477, 'Turbo Granny (voice)', 'Mayumi Tanaka', 'https://image.tmdb.org/t/p/original/by4t1tYtEXsfbFj9TvOjozBmQla.jpg', 52, '2024-12-07 06:42:02', '2024-12-07 06:42:02'),
(478, 'Ken \'Okarun\' Takakura (voice)', 'Natsuki Hanae', 'https://image.tmdb.org/t/p/original/A1lGrpBEdAUxZA7RoAw4Zr4ved3.jpg', 52, '2024-12-07 06:42:02', '2024-12-07 06:42:02'),
(479, 'Momo Ayase (voice)', 'Shion Wakayama', 'https://image.tmdb.org/t/p/original/b697ggFreuliEfl4TjLgxhJCQXr.jpg', 52, '2024-12-07 06:42:02', '2024-12-07 06:42:02'),
(480, 'Seiko (Dodoria Santa) (voice)', 'Nana Mizuki', 'https://image.tmdb.org/t/p/original/1h4C1kz8mziHmiB91MliTDHwgoh.jpg', 52, '2024-12-07 06:42:02', '2024-12-07 06:42:02'),
(481, 'Subaru Natsuki (voice)', 'Yusuke Kobayashi', 'https://image.tmdb.org/t/p/original/y4ukKDSobZJNuB4H3k89hkrKCDC.jpg', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(482, 'Emilia (voice)', 'Rie Takahashi', 'https://image.tmdb.org/t/p/original/aeB7z0cBTASdjKOjQriBAO6hYq4.jpg', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(483, 'Puck (voice)', 'Yumi Uchiyama', 'https://image.tmdb.org/t/p/original/JvavoF3YOLCf4LHfl4XvYobANE.jpg', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(484, 'Reinhard Van Astrea (voice)', 'Yuichi Nakamura', 'https://image.tmdb.org/t/p/original/wb8behVKjBHX9XXrEydvNINCYwH.jpg', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(485, 'Felt (voice)', 'Chinatsu Akasaki', 'https://image.tmdb.org/t/p/original/nYYs30FgGrgr3uOiQ4ASmRpFca2.jpg', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(486, 'Rem (voice)', 'Inori Minase', 'https://image.tmdb.org/t/p/original/gDyp6UrxZB3tppK3m16NFAggpuf.jpg', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(487, 'Ram (voice)', 'Rie Murakawa', 'https://image.tmdb.org/t/p/original/pawIx7uhV1a2fAHjvTnrCP0KcHX.jpg', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(488, 'Otto Suwen (voice)', 'Kohei Amasaki', 'https://image.tmdb.org/t/p/original/tnN5jLiLjcDa7qn88uLb1iAfivL.jpg', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(489, 'Roswaal L. Mathers (voice)', 'Takehito Koyasu', 'https://image.tmdb.org/t/p/original/8uBkNDKPNmp9JWgMUI02NVyfhi1.jpg', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(490, 'Garfiel Tinsel (voice)', 'Nobuhiko Okamoto', 'https://image.tmdb.org/t/p/original/41BGKnwmE2573X2ve9rGXeLw3oW.jpg', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(491, 'Beatrice (voice)', 'Satomi Arai', 'https://image.tmdb.org/t/p/original/v95wU1gpSLAOJS5yKFTxyheXAW2.jpg', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(492, 'Frederica Baumann (voice)', 'Kaori Nazuka', 'https://image.tmdb.org/t/p/original/cIMS99s6jpgGBbMnih8gx9hLPFi.jpg', 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(493, 'Lewes Meyer (voice)', 'Aimi Tanaka', 'https://image.tmdb.org/t/p/original/7eeRCbeq7kzqzpOwhK9kgS30O4P.jpg', 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(494, 'Echidna (voice)', 'Maaya Sakamoto', 'https://image.tmdb.org/t/p/original/hPz2oEQui8a4q9aXdBugQf93ONq.jpg', 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(495, 'Petra Leyte (voice)', 'Marika Kouno', 'https://image.tmdb.org/t/p/original/homr3SmEs4JrlSmCsCSj9BPeWb.jpg', 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(496, 'Chika Fujiwara (voice)', 'Konomi Kohara', 'https://image.tmdb.org/t/p/original/3SA4eE579Fqex1qpMPcF4bTRFyT.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(497, 'Kaguya Shinomiya (voice)', 'Aoi Koga', 'https://image.tmdb.org/t/p/original/uVpwheVV4aPROyY1toYv3v5HSPD.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(498, 'Yuu Ishigami (voice)', 'Ryota Suzuki', 'https://image.tmdb.org/t/p/original/4Xq18mQttuW2yfRCflnWoU7UqQ5.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(499, 'Miyuki Shirogane (voice)', 'Makoto Furukawa', 'https://image.tmdb.org/t/p/original/inLmBZhrqXeE9wlViyK28ocKJSw.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(500, 'Miko Iino (voice)', 'Miyu Tomita', 'https://image.tmdb.org/t/p/original/rSR17l4HdchLkhpRuAZbGbXNmUS.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(501, 'Ai Hayasaka (voice)', 'Yumiri Hanamori', 'https://image.tmdb.org/t/p/original/zXVwGxsxwEvL1f6wxzTYtxytjDn.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(502, 'Kobachi Osaragi (voice)', 'Rina Hidaka', 'https://image.tmdb.org/t/p/original/7JupZGvqcq4dRxiTKpPxzg8NUS4.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(503, 'Nagisa Kashiwagi (voice)', 'Momo Asakura', 'https://image.tmdb.org/t/p/original/aAIedtsMhjdaUUOP6qi5sqMMS4X.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(504, 'Maki Shijou (voice)', 'Kana Ichinose', 'https://image.tmdb.org/t/p/original/3MmHWf5pa1i4s64T2mI6npc26TY.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(505, 'Tsubasa Tanuma (voice)', 'Taku Yashiro', 'https://image.tmdb.org/t/p/original/eVdB6myaNJ4h38UU9hHHlsaCWHn.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(506, 'Tsubame Koyasu (voice)', 'Haruka Fukuhara', 'https://image.tmdb.org/t/p/original/vTosH8FMDuQK9u6CWavOPnNdmH1.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(507, 'Narration (voice)', 'Yutaka Aoyama', 'https://image.tmdb.org/t/p/original/uURpUJDPpDDABdXG0x9TYPxQknX.jpg', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(508, 'Maomao (voice)', 'Aoi Yuki', 'https://image.tmdb.org/t/p/original/4kHNZSUIux52UU2BD3H6b5c5ymZ.jpg', 55, '2024-12-07 06:45:46', '2024-12-07 06:45:46'),
(509, 'Gaoshun (voice)', 'Katsuyuki Konishi', 'https://image.tmdb.org/t/p/original/nYM5cH6U7cp4x9dIzW0enmEKmeV.jpg', 55, '2024-12-07 06:45:46', '2024-12-07 06:45:46'),
(510, 'Jinshi (voice)', 'Takeo Otsuka', 'https://image.tmdb.org/t/p/original/5QpByTJr8q9Qg21nTTJE4kyQMn8.jpg', 55, '2024-12-07 06:45:46', '2024-12-07 06:45:46'),
(511, 'Hitori \'Bocchi\' Gotoh (voice)', 'Yoshino Aoyama', 'https://image.tmdb.org/t/p/original/yPOprcT7tPKR3p79RMYtogTEXGr.jpg', 56, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(512, 'Nijika Ijichi (voice)', 'Sayumi Suzushiro', 'https://image.tmdb.org/t/p/original/fRd6VbE4yosDFMxbLgh985xyHOG.jpg', 56, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(513, 'Ryo Yamada (voice)', 'Saku Mizuno', 'https://image.tmdb.org/t/p/original/u3OUaxIk8SHjEoudLA2UpKjwDX5.jpg', 56, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(514, 'Ikuyo Kita (voice)', 'Ikumi Hasegawa', 'https://image.tmdb.org/t/p/original/aHLid4WeTafrtfqDRAZSw5K7dTj.jpg', 56, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(515, 'Mash Burnedead (voice)', 'Chiaki Kobayashi', 'https://image.tmdb.org/t/p/original/o0XZFXc50z28ICUpvfZ1QcTL2Yt.jpg', 57, '2024-12-07 06:57:09', '2024-12-07 06:57:09'),
(516, 'Lemon Irvine (voice)', 'Reina Ueda', 'https://image.tmdb.org/t/p/original/hlzrvBzeSYejeaTSZDvEWE44Qjj.jpg', 57, '2024-12-07 06:57:09', '2024-12-07 06:57:09'),
(517, 'Dot Barrett (voice)', 'Takuya Eguchi', 'https://image.tmdb.org/t/p/original/hPPhUp0mM65Lc87Q8WXUEmGQAXx.jpg', 57, '2024-12-07 06:57:09', '2024-12-07 06:57:09'),
(518, 'Finn Ames (voice)', 'Reiji Kawashima', 'https://image.tmdb.org/t/p/original/tJriYA3tctzKP3ZnAwsxkey9iyU.jpg', 57, '2024-12-07 06:57:09', '2024-12-07 06:57:09'),
(519, 'Lance Crown (voice)', 'Kaito Ishikawa', 'https://image.tmdb.org/t/p/original/fzjIkotjUHHs3wgftM9tqdsG8ph.jpg', 57, '2024-12-07 06:57:09', '2024-12-07 06:57:09'),
(520, 'Narration (voice)', 'Hiroaki Hirata', 'https://image.tmdb.org/t/p/original/mMWEdlssJm3TVuXW4Wb7pQeX20Z.jpg', 57, '2024-12-07 06:57:10', '2024-12-07 06:57:10'),
(521, 'Aladdin', 'Kaori Ishihara', 'https://image.tmdb.org/t/p/original/KUA9aA6Y0oOdM0ufZnnwe3ppxG.jpg', 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50'),
(522, 'Sinbad / Judal (voices)', 'Ryohei Kimura', 'https://image.tmdb.org/t/p/original/m4GktFKhjrVTewsZtqTusInHZqT.jpg', 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50'),
(523, 'Alibaba Saluja', 'Yuki Kaji', 'https://image.tmdb.org/t/p/original/8wKdPV11IwowfwoqGqMMNt9hmp6.jpg', 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50'),
(524, 'Ugo', 'Toshiyuki Morikawa', 'https://image.tmdb.org/t/p/original/u1N6H7V0dehFD4fcO7ZkHvIMUrG.jpg', 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50'),
(525, 'Morgiana', 'Haruka Tomatsu', 'https://image.tmdb.org/t/p/original/geVvuA2zMGE5xzfc20aDelJSelu.jpg', 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50'),
(526, 'Amon', 'Hidekatsu Shibata', 'https://image.tmdb.org/t/p/original/hnKQe1GpuLAZY8pDnJc6eXIQzfv.jpg', 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50'),
(527, 'Sinbad', 'Daisuke Ono', 'https://image.tmdb.org/t/p/original/rCo5Q3xMnOFMavs6YJAbP2ZRsqt.jpg', 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `vote_average` decimal(3,2) DEFAULT NULL,
  `animeId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `file_path`, `vote_average`, `animeId`, `created_at`, `updated_at`) VALUES
(37, 'https://image.tmdb.org/t/p/original/hJpdlEZaNXVDNtE955QwENK2PY2.jpg', 0.00, 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(38, 'https://image.tmdb.org/t/p/original/aN4vGF9VnY7Ouxm4RUr18C6ET4m.jpg', 0.00, 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(39, 'https://image.tmdb.org/t/p/original/1FWhVDPBjlvwfwA0PdD0MU6Fc9B.jpg', 0.00, 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(40, 'https://image.tmdb.org/t/p/original/9C1Wh0SFK7L5AEQCh4cBGIBtSzg.jpg', 0.00, 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(41, 'https://image.tmdb.org/t/p/original/aed6I1EMR4Lbk8bdikWrndbn5Og.jpg', 0.00, 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(42, 'https://image.tmdb.org/t/p/original/gyEIj5KXT6OGG6kUaEOl85CJWlf.jpg', 0.00, 46, '2024-12-07 06:30:03', '2024-12-07 06:30:03'),
(43, 'https://image.tmdb.org/t/p/original/edWsluO6IBhWp0f7B136hZKIHTr.jpg', 0.00, 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(44, 'https://image.tmdb.org/t/p/original/uKtyR5VqjefVgYQ64Hy1ch2BVFo.jpg', 0.00, 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(45, 'https://image.tmdb.org/t/p/original/9ZdsHywMjTosJogdixIkbeZCEbO.jpg', 0.00, 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(46, 'https://image.tmdb.org/t/p/original/8yspHHQrIYrtBjPvATSUimY45na.jpg', 0.00, 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(47, 'https://image.tmdb.org/t/p/original/jGaGlwJbg1MqUjswCe3zxTHbo8G.jpg', 0.00, 47, '2024-12-07 06:32:12', '2024-12-07 06:32:12'),
(48, 'https://image.tmdb.org/t/p/original/u91NTaAMu2Nl2yshPI7RT65BeYd.jpg', 0.00, 47, '2024-12-07 06:32:12', '2024-12-07 06:32:12'),
(49, 'https://image.tmdb.org/t/p/original/64mDAnw6JSS6jm6YdrLWEUfVbTh.jpg', 0.00, 47, '2024-12-07 06:32:12', '2024-12-07 06:32:12'),
(50, 'https://image.tmdb.org/t/p/original/2e2AEk7Jmn8CztM62hoUyEEWw0B.jpg', 0.00, 47, '2024-12-07 06:32:12', '2024-12-07 06:32:12'),
(51, 'https://image.tmdb.org/t/p/original/ekiUMb3FIt0jnoVcFviq56h6S9T.jpg', 0.00, 47, '2024-12-07 06:32:12', '2024-12-07 06:32:12'),
(52, 'https://image.tmdb.org/t/p/original/stfuBUoCukNQZ6oL0yFp7Ol22xw.jpg', 0.00, 47, '2024-12-07 06:32:12', '2024-12-07 06:32:12'),
(53, 'https://image.tmdb.org/t/p/original/sZO3YaaGjc6NOmwqXCSf3jMeX2j.jpg', 0.00, 47, '2024-12-07 06:32:12', '2024-12-07 06:32:12'),
(54, 'https://image.tmdb.org/t/p/original/xCmdeEvJNxptR30bEVXXWLrt4iI.jpg', 0.00, 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(55, 'https://image.tmdb.org/t/p/original/zQPYuhY3G8NxsKFwYtFPzC8VBCJ.jpg', 0.00, 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(56, 'https://image.tmdb.org/t/p/original/ubnRfKVsQQukx8gk0ZCC4MlUxJA.jpg', 0.00, 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(57, 'https://image.tmdb.org/t/p/original/nvU0cGH1DfEelkUSVfeND08FJ9u.jpg', 0.00, 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(58, 'https://image.tmdb.org/t/p/original/tSyhopOgWzXOUFgZ6X2LRXgRzIJ.jpg', 0.00, 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(59, 'https://image.tmdb.org/t/p/original/n3xkGAJc6lgWlk84rIor7nVE2zO.jpg', 0.00, 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(60, 'https://image.tmdb.org/t/p/original/wiQQ7fqCL0po4hQd4JF1NO2TTmd.jpg', 0.00, 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(61, 'https://image.tmdb.org/t/p/original/bM0qUaJPis7ropSMK630ZYrNb0W.jpg', 0.00, 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(62, 'https://image.tmdb.org/t/p/original/seRbysWbz3er54IilswTIzKa6cS.jpg', 0.00, 49, '2024-12-07 06:35:23', '2024-12-07 06:35:23'),
(63, 'https://image.tmdb.org/t/p/original/3mcuhxMVQdDJifXwnQklR3Db68Y.jpg', 0.00, 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(64, 'https://image.tmdb.org/t/p/original/uzp513qTcHsAavlCJ58x5d73bzy.jpg', 0.00, 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(65, 'https://image.tmdb.org/t/p/original/kk0rn34V4Iw9ayZZ3KQXKFRR5uY.jpg', 0.00, 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(66, 'https://image.tmdb.org/t/p/original/en83hjWRJzzolLiXh92VTj8juIY.jpg', 0.00, 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(67, 'https://image.tmdb.org/t/p/original/gXT5lrlZY4YzLDBDjff5xGCjGTM.jpg', 0.00, 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(68, 'https://image.tmdb.org/t/p/original/8f2nRALvCeSZRdgVnCN316GoYr6.jpg', 0.00, 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(69, 'https://image.tmdb.org/t/p/original/9SN3xKMY0xcdnSLaN1s1EweEiLC.jpg', 0.00, 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(70, 'https://image.tmdb.org/t/p/original/6z2rrDHzcufs9NNWsDkYjnTA5gU.jpg', 0.00, 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(71, 'https://image.tmdb.org/t/p/original/12oa5q8r82qv8bmWxJZzqrDko5G.jpg', 0.00, 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(72, 'https://image.tmdb.org/t/p/original/x4vT8OReuWIjHr6rmHiLKpUF7sa.jpg', 0.00, 50, '2024-12-07 06:37:53', '2024-12-07 06:37:53'),
(73, 'https://image.tmdb.org/t/p/original/ePDMr7CkENm38zOInyMSrqqYx8x.jpg', 0.00, 50, '2024-12-07 06:37:53', '2024-12-07 06:37:53'),
(74, 'https://image.tmdb.org/t/p/original/zH0GDHIEp4XXrbW0LwQZev8kpS6.jpg', 0.00, 50, '2024-12-07 06:37:53', '2024-12-07 06:37:53'),
(75, 'https://image.tmdb.org/t/p/original/ysVP9tMW5TiRJ00nNTunl9VCdEd.jpg', 0.00, 50, '2024-12-07 06:37:53', '2024-12-07 06:37:53'),
(76, 'https://image.tmdb.org/t/p/original/7rQbcKnRsPXX3lAgq4N31CfrLGs.jpg', 0.00, 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(77, 'https://image.tmdb.org/t/p/original/7Dr3u3kOCh3DyptYSxSy4O2WUkg.jpg', 0.00, 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(78, 'https://image.tmdb.org/t/p/original/9tLYmGYirk08PZAkipVAiGJUL3i.jpg', 0.00, 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(79, 'https://image.tmdb.org/t/p/original/1fNzw9fGRV0owkfvGxiEOZlPvFR.jpg', 0.00, 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(80, 'https://image.tmdb.org/t/p/original/au45OetpK68GIIIVV36jI5PjIiL.jpg', 0.00, 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(81, 'https://image.tmdb.org/t/p/original/4tGwgTYO7CtnYWsNs0TC9SyBI3X.jpg', 0.00, 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(82, 'https://image.tmdb.org/t/p/original/rJ3WMubG6K6I3j8xjatGgefBWsc.jpg', 0.00, 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(83, 'https://image.tmdb.org/t/p/original/itNnXiIIUtOOGfNaGSdjsP634ar.jpg', 0.00, 52, '2024-12-07 06:42:02', '2024-12-07 06:42:02'),
(84, 'https://image.tmdb.org/t/p/original/zEEJNFTTD2Z9AQVcMUWy4Hjp05k.jpg', 0.00, 52, '2024-12-07 06:42:02', '2024-12-07 06:42:02'),
(85, 'https://image.tmdb.org/t/p/original/aAqBfOli8MEnC4G0Nf0ykot5YtJ.jpg', 0.00, 52, '2024-12-07 06:42:03', '2024-12-07 06:42:03'),
(86, 'https://image.tmdb.org/t/p/original/22TlJgiQbQAApxeLeo9wQDhRysM.jpg', 0.00, 52, '2024-12-07 06:42:03', '2024-12-07 06:42:03'),
(87, 'https://image.tmdb.org/t/p/original/aXWqrD4sTT0RZ3ete18AfCSeTgS.jpg', 0.00, 52, '2024-12-07 06:42:03', '2024-12-07 06:42:03'),
(88, 'https://image.tmdb.org/t/p/original/8gccb4Y4Xt9yURqMjXMfhmDzpQa.jpg', 0.00, 52, '2024-12-07 06:42:03', '2024-12-07 06:42:03'),
(89, 'https://image.tmdb.org/t/p/original/adRffEA4qJvKvy34yffGmYIut4F.jpg', 0.00, 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(90, 'https://image.tmdb.org/t/p/original/x6y59dJBE1o0r4YRsWVQXE2nnlB.jpg', 0.00, 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(91, 'https://image.tmdb.org/t/p/original/e0770pcg8ZLR7sWnpiaOz4wlOco.jpg', 0.00, 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(92, 'https://image.tmdb.org/t/p/original/roRic4vOLpX7lsTT2I1lGwBkym8.jpg', 0.00, 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(93, 'https://image.tmdb.org/t/p/original/2j9tpwz8gZuZxlanvUmnzkNH6Np.jpg', 0.00, 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(94, 'https://image.tmdb.org/t/p/original/k1WX1cy5v9fdKxCMqnujz8SnXHY.jpg', 0.00, 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(95, 'https://image.tmdb.org/t/p/original/7AIjQ42Hcqas9EaFpWQCGwZ0L7U.jpg', 0.00, 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(96, 'https://image.tmdb.org/t/p/original/ibLs5G5ukUfEHVhozIBdXIUo2qj.jpg', 0.00, 53, '2024-12-07 06:43:50', '2024-12-07 06:43:50'),
(97, 'https://image.tmdb.org/t/p/original/odAr7WWOYkEsnM4zm2uDgKSFY8.jpg', 0.00, 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(98, 'https://image.tmdb.org/t/p/original/dqsfgq5OOW6t85fv8VOFGMszjOr.jpg', 0.00, 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(99, 'https://image.tmdb.org/t/p/original/bQFTbvlXHTdtmVlZwGgdTWOY34u.jpg', 0.00, 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(100, 'https://image.tmdb.org/t/p/original/bGNMGXCbILXV0E1NhG7jcjREbUU.jpg', 0.00, 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(101, 'https://image.tmdb.org/t/p/original/26yESLm78tnCxoooRrYc0w4A3FN.jpg', 0.00, 55, '2024-12-07 06:45:46', '2024-12-07 06:45:46'),
(102, 'https://image.tmdb.org/t/p/original/dfQtPf0lw9C1MWYFMJseM5RZI6P.jpg', 0.00, 55, '2024-12-07 06:45:46', '2024-12-07 06:45:46'),
(103, 'https://image.tmdb.org/t/p/original/wWequvPS7UKhwKVsYiVDGcn3sqb.jpg', 0.00, 55, '2024-12-07 06:45:46', '2024-12-07 06:45:46'),
(104, 'https://image.tmdb.org/t/p/original/dgu9KPcgm3cGkB1UNrjrjDHFO6t.jpg', 0.00, 55, '2024-12-07 06:45:46', '2024-12-07 06:45:46'),
(105, 'https://image.tmdb.org/t/p/original/4peFkmiN54ipCwDhXUraFBoJYTf.jpg', 0.00, 55, '2024-12-07 06:45:46', '2024-12-07 06:45:46'),
(106, 'https://image.tmdb.org/t/p/original/gWXOBY0qF5LON44GtpyaDPFsCF0.jpg', 0.00, 55, '2024-12-07 06:45:46', '2024-12-07 06:45:46'),
(107, 'https://image.tmdb.org/t/p/original/yUEEqQrbHioO4ziBkr54Nrr0OtJ.jpg', 0.00, 55, '2024-12-07 06:45:46', '2024-12-07 06:45:46'),
(108, 'https://image.tmdb.org/t/p/original/jpCGMORISbL9FQyiCgg4owb1gdm.jpg', 0.00, 55, '2024-12-07 06:45:46', '2024-12-07 06:45:46'),
(109, 'https://image.tmdb.org/t/p/original/mQ74kyaGVHzbyiguJ1VRZI6ejF.jpg', 0.00, 56, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(110, 'https://image.tmdb.org/t/p/original/b9g6C9ytiAuhC6Y5erUoHV8OJxu.jpg', 0.00, 56, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(111, 'https://image.tmdb.org/t/p/original/sDZVhcY0ewpMOZOr4VDWccEChys.jpg', 0.00, 56, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(112, 'https://image.tmdb.org/t/p/original/62vnxWbRLDnkMOQDofyZK73yAh2.jpg', 0.00, 56, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(113, 'https://image.tmdb.org/t/p/original/ebonfpqpETIAeBehf1zfPRfIGwJ.jpg', 0.00, 56, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(114, 'https://image.tmdb.org/t/p/original/nIWbhBZPImctcwwgTdhzoyK9cAL.jpg', 0.00, 56, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(115, 'https://image.tmdb.org/t/p/original/ohG9zhFofHgkMeIKYpIUyzNQA2C.jpg', 0.00, 57, '2024-12-07 06:57:10', '2024-12-07 06:57:10'),
(116, 'https://image.tmdb.org/t/p/original/2euqNu050KOjtn2MkSMIpPoolIJ.jpg', 0.00, 57, '2024-12-07 06:57:10', '2024-12-07 06:57:10'),
(117, 'https://image.tmdb.org/t/p/original/i3EJxdwrxx4A0kOAqlomcuW6xkM.jpg', 0.00, 57, '2024-12-07 06:57:10', '2024-12-07 06:57:10'),
(118, 'https://image.tmdb.org/t/p/original/fQx7rAQRZPWkO0h4rxHFchIeEtt.jpg', 0.00, 57, '2024-12-07 06:57:10', '2024-12-07 06:57:10'),
(119, 'https://image.tmdb.org/t/p/original/aFI4g3JXzPPyxm6tA6jK20mChKq.jpg', 0.00, 57, '2024-12-07 06:57:10', '2024-12-07 06:57:10'),
(120, 'https://image.tmdb.org/t/p/original/kTZueHe2J968j6qK55ysUklNMhV.jpg', 0.00, 57, '2024-12-07 06:57:10', '2024-12-07 06:57:10'),
(121, 'https://image.tmdb.org/t/p/original/kTQCuF6l26aJb7TnOy88FQQnOid.jpg', 0.00, 57, '2024-12-07 06:57:10', '2024-12-07 06:57:10'),
(122, 'https://image.tmdb.org/t/p/original/wHp5eBqWXzEfsm4T8z5WDCy3BLH.jpg', 0.00, 57, '2024-12-07 06:57:10', '2024-12-07 06:57:10'),
(123, 'https://image.tmdb.org/t/p/original/kCCN3BMW5J1GEESMVREhz7v2fUe.jpg', 0.00, 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50'),
(124, 'https://image.tmdb.org/t/p/original/tMkU4cD6wLtk1F12nsgqIUoHuin.jpg', 0.00, 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50'),
(125, 'https://image.tmdb.org/t/p/original/dAQU6hqyJSlozMaKQJ1jxGtcfV9.jpg', 0.00, 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50'),
(126, 'https://image.tmdb.org/t/p/original/AcKnrZgsf8ea8NJWdGWlqSYTQBG.jpg', 0.00, 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50'),
(127, 'https://image.tmdb.org/t/p/original/fmLOxnEEq1kDztWG7IKF71zW4uO.jpg', 0.00, 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50'),
(128, 'https://image.tmdb.org/t/p/original/htcydwrp69GeWmNFUf9Ja6wSzew.jpg', 0.00, 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `middleName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `contactNo` varchar(20) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `middleName`, `lastName`, `contactNo`, `role`) VALUES
(4, 'test@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'string', 'string', 'string', 'string', 'admin'),
(5, 'jecho@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Jecho', 'Parairo', 'Torrefranca', '09281328396', 'admin'),
(7, 'user@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'fdsf', 'fdsf', 'fsdfs', 'fdsfs', 'user'),
(8, 'jek@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'string', 'string', 'string', 'string', 'user'),
(9, 're@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'string', 'string', 'string', 'string', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `key` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `site` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `animeId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `key`, `name`, `site`, `type`, `animeId`, `created_at`, `updated_at`) VALUES
(16, 'uV4gPxcr95w', 'Iruma Kun Trailer', 'Youtube', 'Custom Video', 46, '2024-12-07 06:30:02', '2024-12-07 06:30:02'),
(17, '0CJeDetA45Q', 'Violet Evergarden Trailer', 'Youtube', 'Custom Video', 47, '2024-12-07 06:32:11', '2024-12-07 06:32:11'),
(18, 'Nk23ix2xgTg', 'Official Trailer', 'YouTube', 'Trailer', 49, '2024-12-07 06:35:21', '2024-12-07 06:35:21'),
(19, 'kFjP5b5dmYw', 'Made in Abyss HIDIVE Action Trailer', 'YouTube', 'Trailer', 50, '2024-12-07 06:37:52', '2024-12-07 06:37:52'),
(20, 'ZoEtBn_6KOI', 'Sword Art Online Alternative: Gun Gale Online Trailer 2', 'YouTube', 'Trailer', 51, '2024-12-07 06:40:18', '2024-12-07 06:40:18'),
(21, 'V3xNYDFsnN8', 'Official Trailer 3 [Subtitled]', 'YouTube', 'Trailer', 52, '2024-12-07 06:42:02', '2024-12-07 06:42:02'),
(22, 'Slz_rahWp6Y', 'Re Zero Trailer', 'Youtube', 'Custom Video', 53, '2024-12-07 06:43:49', '2024-12-07 06:43:49'),
(23, 'rZ95aZmQu_8', 'Trailer [Subtitled]', 'YouTube', 'Trailer', 54, '2024-12-07 06:44:53', '2024-12-07 06:44:53'),
(24, '3lfb_KeqdEM', 'Official Netflix Trailer [Subtitled]', 'YouTube', 'Trailer', 55, '2024-12-07 06:45:45', '2024-12-07 06:45:45'),
(25, 'XwNbOjFCuEU', 'Teaser PV [Subtitled]', 'YouTube', 'Teaser', 56, '2024-12-07 06:55:26', '2024-12-07 06:55:26'),
(26, '_ce5_P1Hj5A', 'Main Trailer [Subtitled]', 'YouTube', 'Trailer', 57, '2024-12-07 06:57:09', '2024-12-07 06:57:09'),
(27, 'njTGolz248o', 'Magi: The Labyrinth of Magic - Official Trailer', 'YouTube', 'Trailer', 58, '2024-12-07 06:58:50', '2024-12-07 06:58:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animes`
--
ALTER TABLE `animes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `casts`
--
ALTER TABLE `casts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `casts_ibfk_1` (`animeId`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `images_ibfk_1` (`animeId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `animeId` (`animeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animes`
--
ALTER TABLE `animes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `casts`
--
ALTER TABLE `casts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=528;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `casts`
--
ALTER TABLE `casts`
  ADD CONSTRAINT `casts_ibfk_1` FOREIGN KEY (`animeId`) REFERENCES `animes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`animeId`) REFERENCES `animes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`animeId`) REFERENCES `animes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
