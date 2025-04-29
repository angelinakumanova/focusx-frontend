import { create } from 'zustand'

type SectionStore = {
  activeSection: string | null;
  setActiveSection: (id: string) => void;
}

export const useSectionStore = create<SectionStore>((set) => ({
  activeSection: null,
  setActiveSection: (id) => set({ activeSection: id }),
}))
