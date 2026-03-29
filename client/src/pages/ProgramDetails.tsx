import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

function ProgramDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    fetch(`/api/programs/${id}`)
      .then((res) => res.json())
      .then((data) => setProgram(data));
  }, [id]);

  const handleDelete = () => {
    fetch(`/api/programs/${id}`, { method: "delete" }).then((response) => {
      if (response.status === 204) {
        navigate("/programs");
      }
    });
  };

  return program ? (
    <div>
      <h1>{program.title}</h1>
      <img src={program.poster} alt={program.title} width={200} />
      <p>{program.synopsis}</p>
      <p>
        {program.country} - {program.year}
      </p>
      <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
      <button type="button" onClick={handleDelete}>
        Supprimer
      </button>
    </div>
  ) : null;
}

export default ProgramDetails;
