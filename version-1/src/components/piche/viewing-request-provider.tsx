"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { EMPTY_VIEWING_DRAFT, type ViewingDraft } from "@/lib/viewing-request";

type ViewingRequestValue = {
  draft: ViewingDraft;
  update: (patch: Partial<ViewingDraft>) => void;
  reset: () => void;
};

const ViewingRequestContext = createContext<ViewingRequestValue | null>(null);

/**
 * Holds the one request the page is collecting, wherever the visitor happens
 * to be typing it. The floating bar hides itself as the contact section comes
 * into view, so without a shared draft the handover would silently throw away
 * whatever had been written into it — the two are the same form.
 *
 * `children` arrives as an already-built element tree, so re-rendering this
 * provider on every keystroke re-renders only the two components that read
 * the context, not the page below it.
 */
export function ViewingRequestProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [draft, setDraft] = useState<ViewingDraft>(EMPTY_VIEWING_DRAFT);

  const update = useCallback((patch: Partial<ViewingDraft>) => {
    setDraft((current) => ({ ...current, ...patch }));
  }, []);

  const reset = useCallback(() => setDraft(EMPTY_VIEWING_DRAFT), []);

  const value = useMemo(
    () => ({ draft, update, reset }),
    [draft, update, reset],
  );

  return (
    <ViewingRequestContext.Provider value={value}>
      {children}
    </ViewingRequestContext.Provider>
  );
}

export function useViewingRequest() {
  const value = useContext(ViewingRequestContext);
  if (!value) {
    throw new Error(
      "useViewingRequest must be used inside a ViewingRequestProvider",
    );
  }
  return value;
}
