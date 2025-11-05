import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface Student {
  id: number;
  nev: string;
  telepules: string;
  kollegista: boolean;
  szak: string;
  beiratkozasIdeje: string;
}

interface SzakStat {
  szak: string;
  letszam: number;
}

interface Stats {
  kollegistak: number;
  debreceniek: number;
  bejarosok: number;
  evenkent: Record<string, number>;
  szakonkent: SzakStat[];
}

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const API_BASE = "http://127.0.0.1:8000";
  const STUDENTS_PER_PAGE = 10;

  const loadData = async () => {
    const resStudents = await fetch(`${API_BASE}/api/students/`);
    const dataStudents = await resStudents.json();
    setStudents(dataStudents);
    setFilteredStudents(dataStudents);

    const resStats = await fetch(`${API_BASE}/api/students/statistics/`);
    const dataStats = await resStats.json();
    setStats(dataStats);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = students.filter((s) =>
      `${s.nev} ${s.szak} ${s.telepules}`.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filtered);
    setCurrentPage(1); // visszalépünk az első oldalra
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_BASE}/api/students/delete/${id}/`, { method: "DELETE" });
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  // Lapozás logika
  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * STUDENTS_PER_PAGE;
  const currentStudents = filteredStudents.slice(startIndex, startIndex + STUDENTS_PER_PAGE);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tanulók kezelése</h1>

      {/* --- STATISZTIKA KÁRTYÁK --- */}
      {stats && (
        <>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader><CardTitle>Kollégisták</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold">{stats.kollegistak}</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Debreceniek</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold">{stats.debreceniek}</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Bejárósok</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold">{stats.bejarosok}</p></CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardHeader><CardTitle>Évenkénti kimutatás</CardTitle></CardHeader>
              <CardContent>
                <table className="w-full border text-sm">
                  <thead><tr><th className="border p-2">Év</th><th className="border p-2">Felvettek</th></tr></thead>
                  <tbody>
                    {Object.entries(stats.evenkent).map(([year, count]) => (
                      <tr key={year}>
                        <td className="border p-2">{year}</td>
                        <td className="border p-2">{count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Szakonkénti kimutatás</CardTitle></CardHeader>
              <CardContent>
                <table className="w-full border text-sm">
                  <thead><tr><th className="border p-2">Szak</th><th className="border p-2">Tanulók</th></tr></thead>
                  <tbody>
                    {stats.szakonkent.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">{row.szak}</td>
                        <td className="border p-2">{row.letszam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* --- KERESŐ --- */}
      <div className="flex justify-between mb-4">
        <Input
          type="text"
          placeholder="Keresés név, szak vagy település alapján..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* --- TÁBLÁZAT --- */}
      <Card>
        <CardHeader><CardTitle>Tanulók listája</CardTitle></CardHeader>
        <CardContent>
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
              {currentStudents.map((s) => (
                <tr key={s.id}>
                  <td className="border p-2">{s.nev}</td>
                  <td className="border p-2">{s.telepules}</td>
                  <td className="border p-2">{s.kollegista ? "Igen" : "Nem"}</td>
                  <td className="border p-2">{s.szak}</td>
                  <td className="border p-2">{s.beiratkozasIdeje}</td>
                  <td className="border p-2 text-center">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Törlés</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <p>Biztosan törölni szeretnéd <b>{s.nev}</b> adatait?</p>
                        <div className="flex justify-end gap-2 mt-4">
                          <AlertDialogCancel>Mégse</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(s.id)}>Törlés</AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- PAGINATION --- */}
          {filteredStudents.length > STUDENTS_PER_PAGE && (
            <div className="flex justify-center items-center mt-4 gap-4">
              <Button onClick={prevPage} disabled={currentPage === 1}>Előző</Button>
              <span>Oldal {currentPage} / {totalPages}</span>
              <Button onClick={nextPage} disabled={currentPage === totalPages}>Következő</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
