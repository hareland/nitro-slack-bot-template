import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { customType } from 'drizzle-orm/sqlite-core';
import { DateTime } from 'luxon';

export const luxonDate = customType<{ data: DateTime | null }>({
  dataType() {
    return 'text';
  },
  fromDriver(value: unknown): DateTime | null {
    if (typeof value === 'string')
      return DateTime.fromISO(value, { zone: 'utc' });
    return null;
  },
  toDriver(value: DateTime | null): string | null {
    return value ? value.toUTC().toString() : null;
  },
});

export const workspaces = sqliteTable('workspaces', {
  id: text('id').primaryKey(), // Slack workspace ID
  name: text('name').notNull(),
  enterpriseId: text('enterprise_id'),
  installedBy: text('installed_by'),
  createdAt: luxonDate('created_at').$defaultFn(() => DateTime.now()),
});
