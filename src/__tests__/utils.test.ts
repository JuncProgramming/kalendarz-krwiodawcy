import { getDonationsWordForm, normalizeType } from '@/utils';
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
  describe('getDonationsWordForm', () => {
    it('should return "donacji" when the number passed in is 0', () => {
      expect(getDonationsWordForm(0)).toBe('donacji');
    });

    it('should return "donacja" when the number passed in is 1', () => {
      expect(getDonationsWordForm(1)).toBe('donacja');
    });

    it('should return "donacje" when the number passed in is 2, 3 or 4', () => {
      expect(getDonationsWordForm(2)).toBe('donacje');
      expect(getDonationsWordForm(3)).toBe('donacje');
      expect(getDonationsWordForm(4)).toBe('donacje');
    });

    it('should return "donacji" when the number passed in is between 5 and 21', () => {
      expect(getDonationsWordForm(5)).toBe('donacji');
      expect(getDonationsWordForm(12)).toBe('donacji');
      expect(getDonationsWordForm(21)).toBe('donacji');
    });

    it('should return "donacje" when the number passed in has the second digit as a 2, 3 or 4', () => {
      expect(getDonationsWordForm(22)).toBe('donacje');
      expect(getDonationsWordForm(23)).toBe('donacje');
      expect(getDonationsWordForm(24)).toBe('donacje');

      expect(getDonationsWordForm(32)).toBe('donacje');
      expect(getDonationsWordForm(43)).toBe('donacje');
      expect(getDonationsWordForm(54)).toBe('donacje');

      expect(getDonationsWordForm(62)).toBe('donacje');
      expect(getDonationsWordForm(73)).toBe('donacje');
      expect(getDonationsWordForm(84)).toBe('donacje');
    });
  });
});
