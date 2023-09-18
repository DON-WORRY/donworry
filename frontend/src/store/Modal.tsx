import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mypageModal: false,
};

const Modal = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    setMypageModal: (state, action) => {
      state.mypageModal = action.payload;
    },
  },
});

export const { setMypageModal } = Modal.actions;
export default Modal.reducer;
