import { atomWithWebStorage } from "@/lib/jotai-helper";

export type TextDirection = "ltr" | "rtl";

export const directionAtom = atomWithWebStorage<TextDirection>("direction", "ltr");
