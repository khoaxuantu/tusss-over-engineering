import { RefObject, useEffect, useRef } from "react";

interface UseInfinityScrollProps {
  ref: RefObject<HTMLElement | null>;
  canFetchMore: boolean;
  fetchMore: () => void | Promise<void>;

  /**
   * The offset margin of ref element which help observer decide whether the screen reaches the coordinate
   * to trigger fetchMore callback.
   *
   * @example "400px"
   * @example "20rem"
   *
   * @default "400px"
   */
  offsetMargin?: string;
}

export function useInfinityScroll({
  ref,
  canFetchMore,
  fetchMore,
  offsetMargin,
}: UseInfinityScrollProps) {
  useEffect(() => {
    let active = true;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!active || !entries[0].isIntersecting || !canFetchMore) return;
        fetchMore();
      },
      {
        rootMargin: offsetMargin ?? "400px",
        threshold: 1,
      },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      active = false;
    };
  }, [fetchMore]);
}

export function useInfinityScrollNewObserveRef() {
  return useRef<HTMLElement>(null);
}
