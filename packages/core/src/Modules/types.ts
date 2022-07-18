import { ApiModule } from './ApiModule';
import { Module } from './Module';
import { NetworkModule } from './NetworkModule';

export type AnyBaseClass = Module | NetworkModule | ApiModule;
