import type { ReactNode } from 'react';

// For mobile-only prototypes: full screen on phones, a 390px device frame on wider screens.
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:flex md:items-center md:justify-center md:bg-neutral-200 md:p-8">
      <div className="min-h-screen bg-white md:h-[844px] md:min-h-0 md:w-[390px] md:overflow-y-auto md:rounded-[2.5rem] md:border-8 md:border-neutral-800">
        {children}
      </div>
    </div>
  );
}
