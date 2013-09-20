-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Ven 20 Septembre 2013 à 10:19
-- Version du serveur: 5.5.8
-- Version de PHP: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `movies`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `name` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`name`, `id`, `createdAt`, `updatedAt`) VALUES
('action', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('aventure', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('fantastique', 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('guerre', 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('science-fiction', 5, '2013-09-18 11:17:23', '2013-09-18 11:17:25'),
('thriller', 6, '2013-09-18 11:17:38', '2013-09-18 11:17:40'),
('comics', 7, '2013-09-18 11:18:13', '2013-09-18 11:18:14');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `content` text,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `movieId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `comments`
--

INSERT INTO `comments` (`content`, `id`, `createdAt`, `updatedAt`, `movieId`, `userId`) VALUES
('test', 1, '2013-09-19 09:14:50', '2013-09-19 09:14:50', 21, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `movies`
--

CREATE TABLE IF NOT EXISTS `movies` (
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `trailerUrl` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Contenu de la table `movies`
--

INSERT INTO `movies` (`title`, `description`, `image`, `trailerUrl`, `id`, `createdAt`, `updatedAt`, `categoryId`) VALUES
('Spider-Man', 'Spider-Man (L’Homme araignée) est un personnage de fiction, super-héros appartenant à l''univers de Marvel Comics. Créé par le scénariste Stan Lee et le dessinateur Steve Ditko, il apparaît pour la première fois dans le comic book Amazing Fantasy #15 en 1962. Le succès de ce numéro permet à Spider-Man d''avoir dès 1963 sa propre série The Amazing Spider-Man. Spider-Man est l''un des personnages les plus populaires de l''univers des comics.', 'http://supernananailart.files.wordpress.com/2013/06/3052094-9639906776-12686.jpg', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=19460194', 1, '2013-09-16 16:10:27', '2013-09-18 12:16:58', 7),
('The Dark Knight Rises', 'Batman est un personnage de fiction créé par Bob Kane et Bill Finger dans Detective Comics #27 en mai 1939. C''est un héros, à l''origine nommé "Bat-Man", qui a la particularité d’être sans pouvoirs. L''homme qui se cache sous ce costume est connu sous le nom de Bruce Wayne, bien que le costume et le nom aient été quelquefois utilisés par d''autres. Des surnoms lui sont parfois accolés : The caped crusader, The Dark Knight, The world greatest Detectiven 1. Batman opère dans la ville fictive américaine de Gotham City, aidé par des personnages tels que Robin, son maître d''hôtel Alfred Pennyworth ou encore le commissaire de police Jim Gordon.', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQNkURy_6q8fd6hoYSjZ0fGsx8_unpvTIjjbla94ud6op2Yn66MTw', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=19340318', 2, '2013-09-18 11:17:36', '2013-09-18 12:16:22', 7),
('Star Wars : Un nouvel espoir', 'Star Wars (à l''origine nommée sous son titre français, La Guerre des étoiles) est une épopée cinématographique de science-fiction créée par George Lucas en 1977. D''abord conçue comme une trilogie sortie entre 1977 et 1983, la saga s''est ensuite élargie de trois films sortis entre 1999 et 2005 racontant des événements antérieurs aux premiers. Tous ont connu un grand succès commercial et les premiers ont reçu un accueil critique très positif, lequel s''est néanmoins érodé au fur et à mesure de la sortie des épisodes.', 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/220px-Star_Wars_Logo.svg.png', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=18732389', 3, '0000-00-00 00:00:00', '2013-09-18 12:15:24', 5),
('Indiana Jones et le Temple maudit', 'Indiana Jones est un personnage de fiction créé par George Lucas. Aventurier et professeur d''archéologie, il apparut pour la première fois dans le film Les Aventuriers de l''arche perdue réalisé par Steven Spielberg en 1981, où il est interprété par Harrison Ford.', 'http://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/Indiana_Jones_logo.png/275px-Indiana_Jones_logo.png', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=18812707', 5, '2013-09-17 12:14:40', '2013-09-18 12:14:23', 2),
('Le Seigneur des anneaux', 'Le Seigneur des anneaux (The Lord of the Rings) est un roman en trois volumes de J. R. R. Tolkien paru entre 1954 et 1955.\nL''histoire reprend certains des personnages présentés dans Le Hobbit, premier roman de l''auteur paru en 1937, mais l''œuvre est plus complexe et plus sombre. Tolkien entreprend sa rédaction à la demande de son éditeur, Allen & Unwin, suite au succès critique et commercial du Hobbit1.', 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Unico_Anello.jpg/220px-Unico_Anello.jpg', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=18356598', 6, '2013-09-17 12:02:56', '2013-09-18 12:13:37', 3),
('Snatch', 'Snatch is a 2000 comedy-crime film written and directed by British filmmaker Guy Ritchie, featuring an ensemble cast. Set in the London criminal underworld, the film contains two intertwined plots: one dealing with the search for a stolen diamond, the other with a small-time boxing promoter named Turkish (Jason Statham) who finds himself under the thumb of a ruthless gangster known as Brick Top (Alan Ford).', 'http://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Snatch_ver4.jpg/220px-Snatch_ver4.jpg', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=18652043', 7, '2013-09-17 12:04:52', '2013-09-18 12:13:03', 1),
('300', '300 est un péplum américano-britannique coécrit et réalisé par Zack Snyder, sorti en 2006. Tiré du roman graphique 300 de Frank Miller et Lynn Varley, le film donne une vision fantastique de la Bataille des Thermopyles en -480 et a été tourné en grande partie à l''aide de la technique d''incrustation afin de restituer l''imagerie de la bande dessinée de Frank Miller.', 'http://upload.wikimedia.org/wikipedia/fr/8/8d/300_-_Logo.png', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=18704950', 8, '2013-09-17 12:06:11', '2013-09-18 12:12:34', 4),
('Le Hobbit', 'Le Hobbit (The Hobbit) est une série de trois films américano-britannico-néo-zélandais de fantasy dont le premier est sorti en 2012 et les suivants sont respectivement prévus pour 2013 et 2014. Ce triptyque réalisé, produit et coécrit par Peter Jackson est l’adaptation du roman éponyme de J. R. R. Tolkien paru en 1937 ainsi que des événements qui se déroulent en parallèle de ce récit et publiés dans les appendices du Seigneur des anneaux. Ce projet s’inscrit dans la continuité de l’adaptation du Seigneur des anneaux en trois films (2001-2003), également réalisée par Jackson.', 'http://upload.wikimedia.org/wikipedia/fr/thumb/0/04/Le_hobbit_1_%28logo%29.svg/220px-Le_hobbit_1_%28logo%29.svg.png', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=19404061', 13, '2013-09-18 08:03:07', '2013-09-18 12:12:03', 3),
('V pour Vendetta', 'V pour Vendetta (V for Vendetta) est un film américano-germano-britannique, réalisé par James McTeigue, sorti en 2006, et adapté par les Wachowski du comic V pour Vendetta d''Alan Moore et David Lloyd.\nL''action se situe à Londres dans une société dystopique, où un combattant de la liberté se faisant appeler « V » cherche à mettre en place un changement politique et social en menant une violente vendetta personnelle contre le gouvernement fasciste en place. La distribution se compose notamment de l''acteur australien Hugo Weaving dans le rôle de V, de l''actrice américaine Natalie Portman dans le rôle d''Evey Hammond et des acteurs britanniques John Hurt, Stephen Rea et Stephen Fry.', 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/V_for_vendetta.svg/220px-V_for_vendetta.svg.png', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=18397304', 14, '2013-09-18 08:04:07', '2013-09-18 12:11:32', 6),
('Retour vers le futur', 'Retour vers le futur (Back to the Future) est un film de science-fiction américain réalisé par Robert Zemeckis, sorti en 1985.\nL''intrigue relate le voyage dans le passé d''un adolescent, Marty McFly, à bord d''une machine à voyager dans le temps fabriquée par le Docteur Emmett Brown à partir d''une voiture de modèle DeLorean DMC-12. Parti de l''année 1985 et propulsé en 1955, Marty, aidé du « Doc » de 1955, doit résoudre les paradoxes temporels provoqués par ses interventions dans le passé et trouver le moyen de faire fonctionner la machine pour retourner à son époque d''origine.', 'http://upload.wikimedia.org/wikipedia/fr/thumb/f/f0/Back_to_the_Future.svg/330px-Back_to_the_Future.svg.png', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=18672997', 15, '2013-09-18 08:05:04', '2013-09-18 12:10:53', 5),
('Alien', 'Alien is a 1979 science fiction horror film directed by Ridley Scott and starring Tom Skerritt, Sigourney Weaver, Veronica Cartwright, Harry Dean Stanton, John Hurt, Ian Holm and Yaphet Kotto. The film''s title refers to its primary antagonist: a highly aggressive extraterrestrial creature that stalks and kills the crew of a spaceship. Dan O''Bannon wrote the screenplay from a story he wrote with Ronald Shusett, drawing influence from previous works of science fiction and horror. The film was produced through Brandywine Productions and distributed by 20th Century Fox, with producers David Giler and Walter Hill making significant revisions and additions to the script. The titular Alien and its accompanying elements were designed by Swiss surrealist artist H. R. Giger, while concept artists Ron Cobb and Chris Foss designed the human aspects of the film.', 'http://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Alien_movie_poster.jpg/220px-Alien_movie_poster.jpg', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=19535240', 16, '2013-09-18 08:07:05', '2013-09-18 12:10:12', 5),
('Le Cinquième Élément', 'Le Cinquième Élément est un film français de science-fiction réalisé par Luc Besson, sorti en 1997 en France et présenté au Festival de Cannes. Il a fait 7 699 038 entrées en France et 14 467 905 entrées aux États-Unis selon uniFrance2 ou 13 904 200 selon Box Office Mojo3 ou encore 13 607 714 selon la base Lumière4. Au 22 septembre 2012, c''est le second plus grand succès d''un long métrage français à l''étranger, toutes langues de tournage prises en compte, depuis qu''uniFrance collecte les données (19945) avec 43,4 millions d''entrées dans le monde, dont 7,7 millions d''entrées en France et 35,7 millions à l''international6,7, derrière le long métrage Intouchables et ses 44,2 millions d''entrées.', 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/71/The_Fifth_Element.jpg/220px-The_Fifth_Element.jpg', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=19352285', 17, '2013-09-18 08:08:06', '2013-09-18 12:05:14', 5),
('Space Cowboys', 'Space Cowboys is a 2000 space drama film directed and produced by Clint Eastwood. Eastwood also stars in the film alongside Tommy Lee Jones, Donald Sutherland, and James Garner as four older "ex-test pilots" who are sent into space to repair an old Soviet satellite, unaware that it is armed with nuclear missiles. The original music score was composed by Eastwood and Lennie Niehaus.', 'http://upload.wikimedia.org/wikipedia/en/thumb/9/93/Space_cowboys_ver3.jpg/220px-Space_cowboys_ver3.jpg', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=19409628', 20, '2013-09-18 08:10:16', '2013-09-18 12:07:24', NULL),
('Il était une fois dans l''Ouest', 'Il était une fois dans l''Ouest (C''era una volta il West) est un film de Sergio Leone sorti en 1968. Ce film est considéré comme l''un des chefs-d''œuvre du genre western spaghetti. Il a permis un renouveau du western. En 2009, le film est entré dans le National Film Registry pour conservation à la Bibliothèque du Congrès aux États-Unis. La musique du film créée par Ennio Morricone reste aujourd''hui célèbre.', 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Monument_valley.jpg/220px-Monument_valley.jpg', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=19377972', 21, '2013-09-18 08:11:12', '2013-09-18 12:06:39', 2),
('Django Unchained', 'Django Unchained ou Django déchaîné au Québec et au Nouveau-Brunswick est un western spaghetti1 américain écrit et réalisé par Quentin Tarantino, sorti en 2012.\nNommé pour cinq Oscars dont celui du meilleur film en 2013, le film est récompensé à deux reprises ; meilleur acteur dans un second rôle pour Christoph Waltz et meilleur scénario original pour Quentin Tarantino.', 'http://upload.wikimedia.org/wikipedia/fr/thumb/2/20/Django_Unchained_logo.JPG/220px-Django_Unchained_logo.JPG', 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=19353314', 22, '2013-09-18 08:12:26', '2013-09-18 12:06:03', 2);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`username`, `email`, `password`, `id`, `createdAt`, `updatedAt`, `userId`) VALUES
('bhtz', 'heintz.benjamin@gmail.com', '$2a$10$wM9vlQVOrOV4A.F.KGK5Huh5z/Rit2v7VLuqjc.Ovl089xOeeQOby', 1, '2013-09-17 09:14:23', '2013-09-17 09:14:23', NULL);
