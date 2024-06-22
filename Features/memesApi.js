import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchMemes = createAsyncThunk(
  'memes/fetchMemes',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to fetch memes');
      }
      return data.data.memes; // Assuming the API returns { data: { memes: [] } }
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const memesSlice = createSlice({
  name: 'memes',
  initialState: {
    memes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMemes.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMemes.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.memes = payload;
      })
      .addCase(fetchMemes.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const memes = memesSlice.actions;
export default memesSlice.reducer;
