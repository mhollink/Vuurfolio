import { describe, expect, it } from 'vitest';
import { formatMinutes } from '../src/lib/time';
import { categories, getCategory } from '../src/data/categories';

describe('recipe helpers', () => {
  it('renders short and long cooking times in Dutch', () => {
    expect(formatMinutes(45)).toBe('45 min');
    expect(formatMinutes(60)).toBe('1 uur');
    expect(formatMinutes(135)).toBe('2 uur 15 min');
  });

  it('uses unique URL slugs for all categories', () => {
    expect(new Set(categories.map((category) => category.slug)).size).toBe(categories.length);
    expect(getCategory('varken').title).toBe('Varken');
  });
});
