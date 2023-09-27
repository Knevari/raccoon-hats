import { useState, useRef } from "react";

export function useHijackScroll() {
  const refs = useRef<HTMLElement[]>([]);
  const respectiveOverflows = useRef<string[]>([]);

  const hijackScroll = () => {
    refs.current.forEach((element) => {
      element.scrollTo({
        top: window.scrollY + element.getBoundingClientRect().top,
      });
      element.style.overflow = "hidden";
    });
  };

  const releaseScroll = () => {
    refs.current.forEach((element, index) => {
      element.style.overflow = respectiveOverflows.current[index];
    });
  };

  const registerForHijacking = (element: HTMLElement | null) => {
    if (element) {
      refs.current.push(element);
      respectiveOverflows.current = [
        ...respectiveOverflows.current,
        element.style.overflow,
      ];
    }
  };

  return { hijackScroll, releaseScroll, registerForHijacking };
}
