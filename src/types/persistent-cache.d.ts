declare module 'persistent-cache' {
  interface CacheOptions {
    base?: string;
    name?: string;
    memory?: boolean;
    persist?: boolean;
  }

  interface Cache {
    getSync(key: string): any;
    putSync(key: string, value: any): void;
    seleteSync(key: string): void;
    
  }

  function cache(options?: CacheOptions): Cache;

  export = cache;
} 