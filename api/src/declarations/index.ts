declare module 'wink-eng-lite-model';

declare module 'wink-distance' {
  export let string: {
    hammingNormalized: (a: string, b: string) => number;
    levenshtein: (a: string, b: string) => number;
    jaro: (a: string, b: string) => number;
  };
}
