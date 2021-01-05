import { BaseClass } from "./base";
import { Module } from "../opal";

export type GameSystemModule = Module & {
  [className: string]: BaseClass;
}
