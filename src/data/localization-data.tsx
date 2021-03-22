export const languages = ['en-US', 'vi-VN'] as const;

export type Language = typeof languages[number];
