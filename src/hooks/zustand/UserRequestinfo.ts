// src/store/useAssignStore.ts
import { create } from "zustand";

interface UserRequest {
  _id: string;
  userId: {
    username: string;
    email: string;
  };
  description: string;
  photos: { url: string }[];
  status: string;
}

interface AssignStore {
  selectedRequest: UserRequest | null;
  setSelectedRequest: (request: UserRequest) => void;
  clearRequest: () => void;
}

export const useAssignStore = create<AssignStore>((set) => ({
  selectedRequest: null,
  setSelectedRequest: (request) => set({ selectedRequest: request }),
  clearRequest: () => set({ selectedRequest: null }),
}));
