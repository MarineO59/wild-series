import { useEffect, useState } from "react";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("/api/programs")
      .then((res) => res.json())
      .then((data) => setPrograms(data));
  }, []);

  return (
    <div>
      <h1>Séries</h1>
      {programs.map((program) => (
        <div key={program.id}>
          <h2>{program.title}</h2>
          <p>{program.synopsis}</p>
        </div>
      ))}
    </div>
  );
}
