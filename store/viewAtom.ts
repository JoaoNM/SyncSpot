import { atom } from "jotai";

export const viewAtom = atom<"overlap" | "overview">("overview");
