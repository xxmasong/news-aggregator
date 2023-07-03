import { ObjectType } from "interfaces/CommonInterface";

export function dataCleaner(data: ObjectType) {
  const temp = { ...data };
  for (let key in temp) {
    if (
      ["", 0, undefined, null].some((a) => a === temp[key]) ||
      (Array.isArray(temp[key]) && !temp[key].length)
    )
      delete temp[key];
  }

  return temp;
}
