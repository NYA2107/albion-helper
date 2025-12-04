import moment from "moment";
import { useSyncExternalStore } from "react";

let now = 0;
const listeners: Set<() => void> = new Set();
let intervalId: number | null = null;

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapShot = () => {
  return now;
};

const emit = () => {
  listeners.forEach((listener) => listener());
};

export const startClock = () => {
  if (intervalId) return;
  now = moment().valueOf();
  emit();
  intervalId = setInterval(() => {
    now = moment().valueOf();
    emit();
  }, 1000);
};

export const stopClock = () => {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
};

const useClock = () => {
  return useSyncExternalStore(subscribe, getSnapShot);
};

export default useClock;
