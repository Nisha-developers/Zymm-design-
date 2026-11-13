import { ArrowLeft, Camera } from './Icons.jsx'

const Pill = ({ children }) => (
  <div className="grid h-9 w-12 place-items-center rounded-xl bg-[#383838] text-neutral-500">{children}</div>
)

export default function NavBar() {
  return (
    <div aria-hidden className="flex items-center justify-between bg-top px-3.5 pb-3.5 pt-3.5 md:hidden">
      <Pill><ArrowLeft className="h-[22px] w-[22px] blur-[.6px]" /></Pill>
      <Pill><Camera className="h-[22px] w-[22px] blur-[.6px]" /></Pill>
    </div>
  )
}
