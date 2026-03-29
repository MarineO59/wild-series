import { useNavigate } from "react-router";

function ProgramNew() {
  const navigate = useNavigate();

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

    fetch("/api/programs", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(programData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/programs/${data.insertId}`);
      });
  };

  return (
    <div>
      <h1>Ajouter une série</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Titre" required />
        <textarea name="synopsis" placeholder="Synopsis" required />
        <input name="poster" placeholder="Poster URL" required />
        <input name="country" placeholder="Pays" required />
        <input name="year" type="number" placeholder="Année" required />
        <input
          name="category_id"
          type="number"
          placeholder="ID Catégorie"
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default ProgramNew;
