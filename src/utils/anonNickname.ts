const ADJECTIVES = [
  '빠른', '조용한', '용감한', '현명한', '빛나는', '차분한', '열정적인', '명랑한', '단단한', '깊은',
];
const NOUNS = [
  '여우', '호랑이', '독수리', '고래', '사자', '펭귄', '늑대', '치타', '부엉이', '돌고래',
];

function simpleHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateAnonymousNickname(seed?: string): string {
  const base = seed ?? `${Date.now()}-${Math.random()}`;
  const hashed = simpleHash(base);
  const adj = ADJECTIVES[hashed % ADJECTIVES.length];
  const noun = NOUNS[(hashed >> 3) % NOUNS.length];
  const num = (hashed % 9000) + 1000; // 1000~9999
  return `${adj} ${noun} ${num}`;
}

export function deterministicAnon(seed: string): string {
  return generateAnonymousNickname(seed);
}
