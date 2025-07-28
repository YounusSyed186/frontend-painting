import { create } from "zustand"

interface VendorMinimal {
  vendorId: string
  imageUrl: string
}

interface VendorStore {
  selectedVendor: VendorMinimal | null
  setVendor: (vendor: VendorMinimal) => void
  clearVendor: () => void
}

export const useVendorStore = create<VendorStore>((set) => ({
  selectedVendor: null,
  setVendor: (vendor) => set({ selectedVendor: vendor }),
  clearVendor: () => set({ selectedVendor: null }),
}))
