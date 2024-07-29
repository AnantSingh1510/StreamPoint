import { create } from 'zustand';

const useStore = create((set) => ({
    currentVideo: null,
    setCurrentVideo: (videoKey) => set({
        currentVideo: `http://172.16.100.81:8080/api/videos/stream/${videoKey}`
    }),
    currentTitle: '',
    setCurrentTitle: (title) => set({
        currentTitle: title
    }),
    currentDesc: '',
    setCurrentDesc: (desc) => set({
        currentDesc: desc
    })
}));

export default useStore;