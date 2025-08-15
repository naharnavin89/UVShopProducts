// // store/authStore.js
// import create from 'zustand';

// const useAuthStore = create((set) => ({
//   phone: '',
//   otp: '',
//   setPhone: (phone) => set({ phone }),
//   setOtp: (otp) => set({ otp }),
// }));

// export default useAuthStore;

import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      phone: '',
      otp: '',
      setPhoneNo: (phone) => set({ phone }),
      setUserOtp: (otp) => set({ otp }),
    })
  )
);

