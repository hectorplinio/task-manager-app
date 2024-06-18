export type JSONValue =
  | string
  | number
  | boolean
  | JSONObject
  | null
  | Array<JSONValue>;

export interface JSONObject {
  [key: string]: JSONValue;
}
