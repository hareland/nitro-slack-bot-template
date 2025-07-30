import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { customType } from 'drizzle-orm/sqlite-core';
import { DateTime } from 'luxon';
import { relations } from 'drizzle-orm';

export const luxonDate = customType<{ data: DateTime | null }>({
  dataType() {
    return 'text';
  },
  fromDriver(value: unknown): DateTime | null {
    if (typeof value === 'string') {
      return DateTime.fromISO(value, { zone: 'utc' });
    }
    return null;
  },
  toDriver(value: DateTime | null): string | null {
    return value ? value.toUTC().toString() : null;
  },
});

export const workspaces = sqliteTable(
  'workspaces',
  {
    id: text('id').primaryKey(), // Slack workspace ID
    name: text('name').notNull(),
    enterpriseId: text('enterprise_id'),
    installedBy: text('installed_by'),
    restricted: integer('restricted', { mode: 'boolean' }).default(false),
    createdAt: luxonDate('created_at').$defaultFn(() => DateTime.now()),
  },
  (t) => ({
    slackId: uniqueIndex('w_sidx').on(t.id),
    //todo: might become useful at some point otherwise remove.
    // enterpriseIdIdx: index('w_eidx').on(t.enterpriseId),
    // installedByIdx: index('w_ibidx').on(t.installedBy),
  }),
);

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  usersInWorkspace: many(usersToWorkspaces),
  //finish up the relations correctly
}));

export const users = sqliteTable(
  'users',
  {
    id: text('id').primaryKey(),
    createdAt: luxonDate('created_at').$defaultFn(() => DateTime.now()),
  },
  (t) => ({
    slackId: uniqueIndex('u_sidx').on(t.id),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  workspacesToUsers: many(usersToWorkspaces),
}));

export const usersToWorkspaces = sqliteTable(
  'users_to_workspaces',
  {
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    workspaceId: text()
      .notNull()
      .references(() => workspaces.id, {
        onDelete: 'cascade',
      }),
    roles: text({ mode: 'json' }).default([]),
    createdAt: luxonDate('created_at').$defaultFn(() => DateTime.now()),
  },
  (t) => ({
    userWorkspaceUnique: uniqueIndex('uwuidx').on(t.userId, t.workspaceId),
    //todo: this might become useful at some point, but we do not want to create indexes yet.
    // userIndex: index('utw_uidx').on(t.userId),
    // workspaceIndex: index('utw_widx').on(t.workspaceId),
    // roleIndex: index('utw_ridx').on(t.roles),
  }),
);

export const usersToWorkspacesRelations = relations(
  usersToWorkspaces,
  ({ one }) => ({
    user: one(users, {
      fields: [usersToWorkspaces.userId],
      references: [users.id],
    }),
    workspace: one(workspaces, {
      fields: [usersToWorkspaces.workspaceId],
      references: [workspaces.id],
    }),
  }),
);
