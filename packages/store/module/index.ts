import {
  Provider,
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
} from "react-redux";

import * as Iterable from "immutable";

import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from "@reduxjs/toolkit";

import common, { setData } from "./reducers/common";
import user, { setMenu, setUserToken } from "./reducers/user";

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value: any) =>
  Iterable.isImmutable(value) || isPlain(value);

const getEntries = (value: any) =>
  Iterable.isImmutable(value) ? value.entries() : Object.entries(value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
});

const store = configureStore({
  reducer: {
    user,
    common,
  },
  middleware: [serializableMiddleware],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

export { store, Provider, useSelector, useDispatch };

export { setUserToken, setMenu, setData };

export type { RootState, AppDispatch, TypedUseSelectorHook };
