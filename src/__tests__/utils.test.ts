import {
  calculateTaxRelief,
  getDonationsWordForm,
  normalizeType
} from '@/utils';
import { describe, it, expect } from 'vitest';
import type { Donation } from '@/types';

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
  describe('calculateTaxRelief', () => {
    const fakeDonations = [
      { date: '2025-01-10', type: 'Krew pełna', amount: 450 },
      { date: '2025-05-12', type: 'Osocze', amount: 650 },
      { date: '2025-05-12', type: 'Płytki krwi', amount: 500 },
      { date: '2024-12-20', type: 'Krew pełna', amount: 450 },
      { date: '2023-07-02', type: 'Krew pełna', amount: 225 },
      { date: '2022-01-01', type: 'Krew pełna' } as unknown as Donation,
      { date: '2022-01-01', type: 'Osocze' } as unknown as Donation,
      { date: '2022-01-01', type: 'Płytki krwi' } as unknown as Donation
    ] as unknown as Donation[];

    it('should return 0 for both the count and taxRelief when there are no donations in a certain year', () => {
      expect(calculateTaxRelief(fakeDonations, 2020)).toEqual({
        amount: 0,
        donationCount: 0
      });
    });

    it('should return correct count and taxRelief only for the selected year', () => {
      expect(calculateTaxRelief(fakeDonations, 2025)).toEqual({
        amount: 208,
        donationCount: 3
      });
    });

    it('should return correct count and taxRelief when the amount is not the default amount', () => {
      expect(calculateTaxRelief(fakeDonations, 2023)).toEqual({
        amount: 29.25,
        donationCount: 1
      });
    });

    it('should return correct count and taxRelief when there is no amount provided (fallback to default values)', () => {
      expect(calculateTaxRelief(fakeDonations, 2022)).toEqual({
        amount: 175.5,
        donationCount: 3
      });
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
