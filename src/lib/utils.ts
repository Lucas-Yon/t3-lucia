import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Obj = Record<string, unknown>;

export function structureIsEqual<T extends Obj, U extends Obj>(
  obj1: T,
  obj2: U,
): boolean {
  const tree1 = getKeys(obj1).sort();
  const tree2 = getKeys(obj2).sort();

  if (tree1.length !== tree2.length) return false;

  const mismatch = tree1.find((x, idx) => tree2[idx] !== x);
  return !mismatch;
}

export function interpolation(
  str: string,
  values: Record<string, string>,
): string {
  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (value === undefined) return;
    str = replacePlaceholder(str, key, value);
  });
  return str;
}

export function replacePlaceholder(
  str: string,
  key: string,
  value: string,
): string {
  return str.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
}

export function getKeys<T extends Obj>(obj: T): string[] {
  return recursiveKeys(obj, [], [], "");
}

export function recursiveKeys(
  obj: Obj,
  result: string[],
  todo: { obj: Obj; root: string }[],
  root: string,
): string[] {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      result.push(root + key);
      todo.push({ obj: obj[key] as Obj, root: root + key + "." });
    } else {
      result.push(root + key);
    }
  });

  if (todo.length > 0) {
    const todoItem = todo.pop()!;
    return recursiveKeys(todoItem.obj, result, todo, todoItem.root);
  } else {
    return result;
  }
}
