import { ReactNode } from 'react'

export function QuizFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-8 py-10 lg:px-16">
      <section className="mx-auto w-full max-w-[760px]">
        <div className="min-h-[520px] rounded-xl bg-white px-8 pb-12 pt-8 shadow-[0_14px_35px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
          {children}
        </div>
      </section>
    </div>
  )
}
