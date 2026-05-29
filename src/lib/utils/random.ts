export function seededRandom(seed: number) {
  let state = Math.abs(Math.floor(seed)) || 1;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

export function pickSeeded<T>(items: T[], seed: number): T {
  const random = seededRandom(seed);
  return items[Math.floor(random() * items.length)] ?? items[0];
}

export function nextSeed() {
  return Math.floor(Date.now() + Math.random() * 100000);
}
