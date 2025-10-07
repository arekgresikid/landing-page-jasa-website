export default function Skills() {
  const skills = [
    { name: "React", val: 92 },
    { name: "CSS", val: 85 },
    { name: "NextJS", val: 92 },
    { name: "Node.js", val: 87 },
    { name: "JavaScript", val: 93 },
    { name: "React Native", val: 92 },
  ]

  return (
    <section id="skills" className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-semibold">Skills</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex items-center justify-between text-sm">
                <span>{s.name}</span>
                <span className="text-muted-foreground">{s.val}%</span>
              </div>
              <div className="h-2 bg-muted rounded mt-2">
                <div
                  className="h-2 rounded bg-primary"
                  style={{ width: `${s.val}%` }}
                  aria-valuenow={s.val}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="progressbar"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
