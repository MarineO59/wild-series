import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

function ProgramEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    fetch(`/api/programs/${id}`)
      .then((res) => res.json())
      .then((data) => setProgram(data));
  }, [id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const programData = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      synopsis: (form.elements.namedItem("synopsis") as HTMLTextAreaElement)
        .value,
      poster: (form.elements.namedItem("poster") as HTMLInputElement).value,
      country: (form.elements.namedItem("country") as HTMLInputElement).value,
      year: Number.parseInt(
        (form.elements.namedItem("year") as HTMLInputElement).value,
      ),
      category_id: Number.parseInt(
        (form.elements.namedItem("category_id") as HTMLInputElement).value,
      ),
    };

    fetch(`/api/programs/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(programData),
    }).then((response) => {
      if (response.status === 204) {
        navigate(`/programs/${id}`);
      }
    });
  };

  return program ? (
    <div>
      <h1>Modifier la série</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" defaultValue={program.title} required />
        <textarea name="synopsis" defaultValue={program.synopsis} required />
        <input name="poster" defaultValue={program.poster} required />
        <input name="country" defaultValue={program.country} required />
        <input name="year" type="number" defaultValue={program.year} required />
        <input
          name="category_id"
          type="number"
          defaultValue={program.category_id}
          required
        />
        <button type="submit">Modifier</button>
      </form>
    </div>
  ) : null;
}

export default ProgramEdit;
