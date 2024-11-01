CREATE TABLE `collections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(100) NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `collectionsIdIdx` ON `collections` (`id`);--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` text(100) NOT NULL,
	`description` text(100) NOT NULL,
	`date` text(100) NOT NULL,
	`category` text(100) NOT NULL,
	`collectionId` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `expensesIdIdx` ON `expenses` (`id`);