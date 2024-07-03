import { expect, test, describe, it } from "vitest";

import { interpolation, replacePlaceholder } from "@/lib/utils";

describe("interpolation", () => {
  it("should interpolate placeholders in the string", () => {
    const str = "Hello {{name}}, welcome to {{place}}!";
    const values = { name: "Alice", place: "Wonderland" };
    const result = interpolation(str, values);
    expect(result).toEqual("Hello Alice, welcome to Wonderland!");
  });

  it("should handle multiple occurrences of placeholders", () => {
    const str = "{{name}} said {{name}} is {{attribute}}.";
    const values = { name: "Alice", attribute: "smart" };
    const result = interpolation(str, values);
    expect(result).toEqual("Alice said Alice is smart.");
  });

  it("should handle missing placeholders", () => {
    const str = "Hello {{name}}, welcome to {{place}}!";
    const values = { name: "Alice" };
    const result = interpolation(str, values);
    expect(result).toEqual("Hello Alice, welcome to {{place}}!");
  });

  it("should handle empty string input", () => {
    const str = "";
    const values = { name: "Alice", place: "Wonderland" };
    const result = interpolation(str, values);
    expect(result).toEqual("");
  });

  it("should handle empty values object", () => {
    const str = "Hello {{name}}, welcome to {{place}}!";
    const values = {};
    const result = interpolation(str, values);
    expect(result).toEqual("Hello {{name}}, welcome to {{place}}!");
  });

  it("should handle special characters in placeholders", () => {
    const str = "Hello {{name}}, welcome to {{place}}!";
    const values = { name: "Alicé", place: "Wôrld" };
    const result = interpolation(str, values);
    expect(result).toEqual("Hello Alicé, welcome to Wôrld!");
  });

  it("should handle placeholders with numbers", () => {
    const str = "{{name}} scored {{points}} points.";
    const values = { name: "Alice", points: "100" };
    const result = interpolation(str, values);
    expect(result).toEqual("Alice scored 100 points.");
  });

  it("should handle placeholders with special characters and spaces", () => {
    const str = "My favorite food is {{food}}!";
    const values = { food: "pizza with cheese & mushrooms" };
    const result = interpolation(str, values);
    expect(result).toEqual(
      "My favorite food is pizza with cheese & mushrooms!",
    );
  });
});

describe("replacePlaceholder", () => {
  it("should replace a single placeholder in the string", () => {
    const str = "Hello {{name}}, welcome to {{place}}!";
    const key = "name";
    const value = "Alice";
    const result = replacePlaceholder(str, key, value);
    expect(result).toEqual("Hello Alice, welcome to {{place}}!");
  });

  it("should replace multiple occurrences of a placeholder", () => {
    const str = "{{name}} said {{name}} is {{attribute}}.";
    const key = "name";
    const value = "Alice";
    const result = replacePlaceholder(str, key, value);
    expect(result).toEqual("Alice said Alice is {{attribute}}.");
  });

  it("should handle special characters in placeholders", () => {
    const str = "Hello {{name}}, welcome to {{place}}!";
    const key = "name";
    const value = "Alicé";
    const result = replacePlaceholder(str, key, value);
    expect(result).toEqual("Hello Alicé, welcome to {{place}}!");
  });

  it("should handle missing placeholders", () => {
    const str = "Hello {{name}}, welcome to {{place}}!";
    const key = "age";
    const value = "30";
    const result = replacePlaceholder(str, key, value);
    expect(result).toEqual("Hello {{name}}, welcome to {{place}}!");
  });

  it("should handle empty string input", () => {
    const str = "";
    const key = "name";
    const value = "Alice";
    const result = replacePlaceholder(str, key, value);
    expect(result).toEqual("");
  });

  it("should handle empty key and value", () => {
    const str = "Hello {{name}}, welcome to {{place}}!";
    const key = "";
    const value = "";
    const result = replacePlaceholder(str, key, value);
    expect(result).toEqual("Hello {{name}}, welcome to {{place}}!");
  });
});
