const TEAM = [
  { i: 'A', c: 'from-[#6b5a4a] to-[#2a2118]' },
  { i: 'M', c: 'from-[#d9b48c] to-[#8c6a4a]' },
  { i: 'J', c: 'from-[#7a6a5d] to-[#3a2f27]' },
  { i: 'S', c: 'from-[#7fa5c9] to-[#c9a58a]' },
]

export default function TeamAvatars() {
  return (
    <div className="flex">
      {TEAM.map(({ i, c }) => (
        <div key={i} className={`-mr-2 grid h-10 w-10 place-items-center rounded-full border-2 border-[#555] bg-gradient-to-br text-sm font-semibold text-white ${c}`}>
          {i}
        </div>
      ))}
    </div>
  )
}
