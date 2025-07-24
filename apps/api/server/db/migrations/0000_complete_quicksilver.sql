CREATE TABLE `workspaces` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`enterprise_id` text,
	`installed_by` text,
	`created_at` text
);
