import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Location, useLocation } from "react-router-dom";

import type { AppDispatch, RootState } from "@/store";

const useLocationListen = (listener: (location: Location) => void) => {
  const location = useLocation();
  useEffect(() => {
    listener(location);
  }, [location]);
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector, useLocationListen };
