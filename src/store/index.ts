import { configureStore } from "@reduxjs/toolkit";
import user from "@/store/reducers/user";
import common from "@/store/reducers/common";

const store = configureStore({
  reducer: {
    user,
    common,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
