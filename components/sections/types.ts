import type { SectionId } from "@/data/sections";

export interface Nav { go: (section: SectionId, project?: string | null) => void }
