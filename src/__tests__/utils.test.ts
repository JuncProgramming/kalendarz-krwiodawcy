import { normalizeType } from '@/utils';
import { describe, it, expect } from 'vitest';

describe('utils', () => {
  describe('normalizeType', () => {
    it('should return "krew_pelna" when "Krew pełna" or "krew_pelna" is passed in', () => {
      const result1 = normalizeType('Krew pełna');
      const result2 = normalizeType('krew_pelna');

      expect(result1).toBe('krew_pelna');
      expect(result2).toBe('krew_pelna');
    });

    it('should return "osocze" when "Osocze" or "osocze" is passed in', () => {
      const result1 = normalizeType('Osocze');
      const result2 = normalizeType('osocze');

      expect(result1).toBe('osocze');
      expect(result2).toBe('osocze');
    });

    it('should return "plytki_krwi" when "Płytki krwi" or "plytki_krwi" is passed in', () => {
      const result1 = normalizeType('Płytki krwi');
      const result2 = normalizeType('plytki_krwi');

      expect(result1).toBe('plytki_krwi');
      expect(result2).toBe('plytki_krwi');
    });

    it('should return "krew_pelna" when an empty string is passed in', () => {
      expect(normalizeType('')).toBe('krew_pelna');
    });

    it('should return "krew_pelna" when string other than the set strings is passed in', () => {
      const result1 = normalizeType('random');
      const result2 = normalizeType('abc');
      const result3 = normalizeType('123');

      expect(result1).toBe('krew_pelna');
      expect(result2).toBe('krew_pelna');
      expect(result3).toBe('krew_pelna');
    });
  });
});
