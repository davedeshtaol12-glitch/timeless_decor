/**
 * The service groups, in display order. Titles and bullet lists live in
 * messages/*.json under services.groups.<id>; the numbers shown in the
 * hover summary are computed from those lists, so they never drift.
 */
export const serviceGroupIds = ["wedding", "birthday", "graduation", "babyShower", "engagement", "corporate", "other"] as const;

export type ServiceGroupId = (typeof serviceGroupIds)[number];
