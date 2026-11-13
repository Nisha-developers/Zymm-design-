const FACTS = [
  ['Hours', 'Tue–Sun, 12:00–23:00'],
  ['Find us', '24 Harbour Street'],
  ['Reservations', 'Parties of 1–10'],
]

/** Desktop sidebar quick facts. */
export default function InfoList() {
  return (
    <dl className="space-y-4 px-2">
      {FACTS.map(([k, v]) => (
        <div key={k}>
          <dt className="text-xs text-muted">{k}</dt>
          <dd className="mt-0.5 text-sm">{v}</dd>
        </div>
      ))}
    </dl>
  )
}
