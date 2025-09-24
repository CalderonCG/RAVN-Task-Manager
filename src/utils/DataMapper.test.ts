import { describe, it, expect } from "vitest";
import { colorMap, getDateStatus, mapDate, numberMap } from "./DataMapper";

describe("DataMapper", () => {
  describe("numberMap", () => {
    it("should map zero to 0", () => {
      expect(numberMap["ZERO"]).toBe(0);
    });

    it("should map FOUR to 4", () => {
      expect(numberMap["FOUR"]).toBe(4);
    });
  });
  describe("colorMap", () => {
    it("should map ANDROID to yellow", () => {
      expect(colorMap["ANDROID"]).toBe("yellow");
    });
  });
  describe("mapDate", () => {
    it("should map undefined to unknown", () => {
      expect(mapDate(undefined, true)).toBe("unknown");
    });
    it("should map default date to DD ShortMonth YYYY", () => {
      expect(mapDate("2026-09-25T15:10:05.431Z", true)).toBe("25 Sept 2026");
    });
    it("should map today's date to capitalized TODAY", () => {
      expect(mapDate(new Date().toISOString(), true)).toBe("TODAY");
    });
    it("should map today's date to uncapitalized Today", () => {
      expect(mapDate(new Date().toISOString(), false)).toBe("Today");
    });
    it("should map yesterday's date to capitalized YESTERDAY", () => {
      const yesterday = new Date();
      yesterday.setDate(new Date().getDate() - 1);
      expect(mapDate(yesterday.toISOString(), true)).toBe("YESTERDAY");
    });
  });
  describe("getDateStatus", () => {
    it("should map yellow date", () => {
      const TwoDaysDate = new Date();
      TwoDaysDate.setDate(new Date().getDate() + 2);
      expect(getDateStatus(TwoDaysDate.toISOString(), false)).toBe(
        "text-tertiary ",
      );
    });
    it("should map green date", () => {
      expect(getDateStatus(new Date().toISOString(), false)).toBe(
        "text-secondary ",
      );
    });
    it("should map red date", () => {
      const yesterday = new Date();
      yesterday.setDate(new Date().getDate() - 1);
      expect(getDateStatus(yesterday.toISOString(), false)).toBe(
        "text-primary ",
      );
    });
    it("should map red date with background", () => {
      const yesterday = new Date();
      yesterday.setDate(new Date().getDate() - 1);
      expect(getDateStatus(yesterday.toISOString(), true)).toBe(
        "text-primary bg-primary",
      );
    });
  });
});
