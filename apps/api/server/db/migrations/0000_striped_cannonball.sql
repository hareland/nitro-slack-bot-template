CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `u_sidx` ON `users` (`id`);--> statement-breakpoint
CREATE TABLE `users_to_workspaces` (
	`userId` text NOT NULL,
	`workspaceId` text NOT NULL,
	`roles` text DEFAULT '[]',
	`created_at` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`workspaceId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uwuidx` ON `users_to_workspaces` (`userId`,`workspaceId`);--> statement-breakpoint
CREATE TABLE `workspaces` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`enterprise_id` text,
	`installed_by` text,
	`restricted` integer DEFAULT false,
	`created_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `w_sidx` ON `workspaces` (`id`);