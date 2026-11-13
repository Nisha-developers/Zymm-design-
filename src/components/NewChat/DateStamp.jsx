import { formatTime } from '../utils/time'

export default function DateStamp({ date }) {
  return <div className="mb-3.5 mt-[22px] md:mb-5 md:mt-0 text-center text-[12.5px] font-medium">Today, {formatTime(date)}</div>
}
