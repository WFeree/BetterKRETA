import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

// --- Típusdefiníciók ---
interface Student {
  id: number;
  nev: string;
  telepules: string;
  kollegista: boolean;
  szak: string;
  beiratkozasIdeje: string;
}

interface StudentsTableProps {
  students: Student[];
  onDelete: (id: number) => void;
}

export default function StudentsTable({ students, onDelete }: StudentsTableProps) {
  return (
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Név</th>
          <th className="border p-2">Település</th>
          <th className="border p-2">Kollégista</th>
          <th className="border p-2">Szak</th>
          <th className="border p-2">Beiratkozás ideje</th>
          <th className="border p-2 text-center">Művelet</th>
        </tr>
      </thead>
      <tbody>
        {students.map((t: Student) => (
          <tr key={t.id}>
            <td className="border p-2">{t.nev}</td>
            <td className="border p-2">{t.telepules}</td>
            <td className="border p-2">{t.kollegista ? "Igen" : "Nem"}</td>
            <td className="border p-2">{t.szak}</td>
            <td className="border p-2">{t.beiratkozasIdeje}</td>
            <td className="border p-2 text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Törlés
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <p>Biztosan törölni szeretnéd <b>{t.nev}</b> adatait?</p>
                  <div className="flex justify-end gap-2 mt-4">
                    <AlertDialogCancel>Mégse</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(t.id)}>
                      Törlés
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
