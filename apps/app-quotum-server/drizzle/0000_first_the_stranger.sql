CREATE TABLE `quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
