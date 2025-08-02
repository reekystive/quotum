CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT ('u-' || lower(hex(randomblob(16)))) NOT NULL,
	`name` text NOT NULL
);
