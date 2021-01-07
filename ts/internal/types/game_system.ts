import { Module } from '../opal';
import { BaseClass } from './base';

export type GameSystemModule = Module & {
  [className: string]: BaseClass;
}
