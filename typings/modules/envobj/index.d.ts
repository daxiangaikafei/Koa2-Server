// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-envobj/90baa65b223bf795b49a45095efaf80a6d396930/index.d.ts
declare module 'envobj' {
function envobj <T> (config: envobj.Config): T;

namespace envobj {
  export interface Config {
    [key: string]: string | number | boolean | typeof Number | typeof String | typeof Boolean;
  }
}

export = envobj;
}