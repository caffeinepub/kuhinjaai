import { c as createLucideIcon } from "./index-OIp2ZZ2R.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function variantKey(v) {
  if (typeof v === "object" && v !== null) return Object.keys(v)[0] ?? "";
  return String(v);
}
function getCategoryLabel(category) {
  const key = variantKey(category);
  if (key === "predjela") return "Predjela";
  if (key === "glavnaJela") return "Glavna jela";
  if (key === "deserti") return "Deserti";
  if (key === "pica") return "Pića";
  return "Ostalo";
}
function getCuisineLabel(cuisine) {
  const key = variantKey(cuisine);
  if (key === "hrvatska") return "Hrvatska";
  if (key === "talijanska") return "Talijanska";
  if (key === "francuska") return "Francuska";
  if (key === "azijska") return "Azijska";
  return "Ostalo";
}
function getDietaryTagLabel(tag) {
  const key = variantKey(tag);
  if (key === "vegetarijansko") return "Vegetarijansko";
  if (key === "veganski") return "Vegansko";
  if (key === "bezGlutena") return "Bez glutena";
  return "Ostalo";
}
function isFlagOpen(status) {
  return variantKey(status) === "otvoreno";
}
export {
  Clock as C,
  Users as U,
  getCuisineLabel as a,
  getDietaryTagLabel as b,
  getCategoryLabel as g,
  isFlagOpen as i
};
