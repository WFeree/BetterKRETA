import React, { useState, useEffect } from "react";

// Targy Tipusa
type SubjectType = "Közismereti" | "Szakmai";

interface Subject {
  id: number;
  name: string;
  grade: number;
  type: SubjectType;
  weeklyHours: number;
  annualHours: number;
}

interface Assignments {
  [student: string]: number[];
}

// Main
const App: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem("subjects");
    return saved ? JSON.parse(saved) : [];
  });

  const [students] = useState<string[]>(["Rideg Csaba", "Ban Milan", "Wagner Ferenc"]);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [assignments, setAssignments] = useState<Assignments>(() => {
    const saved = localStorage.getItem("assignments");
    return saved ? JSON.parse(saved) : {};
  });

  const [newSubject, setNewSubject] = useState<Omit<Subject, "id" | "annualHours">>({
    name: "",
    grade: 12,
    type: "Közismereti",
    weeklyHours: 2,
  });

  const [view, setView] = useState<"main" | "students" | "admin">("main");

  // Localstorage mentes
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [subjects, assignments]);

  // Éves óraszám
  const calculateAnnualHours = (grade: number, type: SubjectType, weeklyHours: number): number => {
    if (grade >= 9 && grade <= 11) return weeklyHours * 36;
    if (grade === 12 && type === "Közismereti") return weeklyHours * 31;
    if (grade === 12 && type === "Szakmai") return weeklyHours * 36;
    if (grade === 13) return weeklyHours * 31;
    return weeklyHours * 36;
  };

  // Tantárgy hozzáadása
  const addSubject = (): void => {
    if (!newSubject.name.trim()) {
      alert("Adj meg egy tantárgynevet!");
      return;
    }

    const annualHours = calculateAnnualHours(
      newSubject.grade,
      newSubject.type,
      newSubject.weeklyHours
    );

    const subject: Subject = {
      ...newSubject,
      id: Date.now(),
      annualHours,
    };

    setSubjects([...subjects, subject]);
    setNewSubject({ name: "", grade: 12, type: "Közismereti", weeklyHours: 2 });
  };

  // Tantárgy törlése
  const deleteSubject = (id: number): void => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  // Tantárgy hozzárendelése tanulóhoz
  const assignSubject = (student: string, subjectId: number): void => {
    const updated: Assignments = { ...assignments };
    if (!updated[student]) updated[student] = [];
    if (!updated[student].includes(subjectId)) updated[student].push(subjectId);
    setAssignments(updated);
  };

  // Admin
  interface StatsEntry {
    Közismereti: { count: number; hours: number };
    Szakmai: { count: number; hours: number };
  }

  const getStatistics = (): Record<number, StatsEntry> => {
    const stats: Record<number, StatsEntry> = {};
    subjects.forEach((s) => {
      if (!stats[s.grade])
        stats[s.grade] = {
          Közismereti: { count: 0, hours: 0 },
          Szakmai: { count: 0, hours: 0 },
        };
      stats[s.grade][s.type].count++;
      stats[s.grade][s.type].hours += s.annualHours;
    });
    return stats;
  };

  const stats = getStatistics();

  //  UI 
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">Tantárgykezelő</h1>

      {/* NavBar */}
      <div className="flex justify-center mb-4 gap-4">
        <button onClick={() => setView("main")} className="bg-blue text-white px-4 py-2 rounded">
          Tantárgyak
        </button>
        <button onClick={() => setView("students")} className="bg-green text-white px-4 py-2 rounded">
          Tanulók
        </button>
        <button onClick={() => setView("admin")} className="bg-gray text-white px-4 py-2 rounded">
          Admin
        </button>
      </div>

      {/* Tantárgykezelés */}
      {view === "main" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Új tantárgy felvitele</h2>

            <input
              placeholder="Tantárgy neve"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="border p-2 w-full mb-2"
            />

            <label>Évfolyam:</label>
            <select
              value={newSubject.grade}
              onChange={(e) => setNewSubject({ ...newSubject, grade: parseInt(e.target.value) })}
              className="border p-2 w-full mb-2"
            >
              {[9, 10, 11, 12, 13].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>

            <label>Típus:</label>
            <select
              value={newSubject.type}
              onChange={(e) => setNewSubject({ ...newSubject, type: e.target.value as SubjectType })}
              className="border p-2 w-full mb-2"
            >
              <option value="Közismereti">Közismereti</option>
              <option value="Szakmai">Szakmai</option>
            </select>

            <label>Heti óraszám:</label>
            <input
              type="number"
              min={1}
              value={newSubject.weeklyHours}
              onChange={(e) => setNewSubject({ ...newSubject, weeklyHours: parseInt(e.target.value) })}
              className="border p-2 w-full mb-2"
            />

            <button onClick={addSubject} className="bg-blue text-white px-4 py-2 rounded">
              Mentés
            </button>
          </div>

          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Tantárgyak listája</h2>
            {subjects.length === 0 ? (
              <p>Nincs felvitt tantárgy.</p>
            ) : (
              <ul className="divide-y">
                {subjects.map((s) => (
                  <li key={s.id} className="flex justify-between py-2">
                    <div>
                      <b>{s.name}</b> ({s.grade}. évf.) - {s.type}, heti {s.weeklyHours} óra →{" "}
                      <b>{s.annualHours}</b> / év
                    </div>
                    <button onClick={() => deleteSubject(s.id)} className="bg-red text-white px-2 rounded">
                      Törlés
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* - Tanulók és hozzárendelés - */}
      {view === "students" && (
        <div className="bg-white shadow p-4 rounded max-w-xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">Tantárgyak hozzárendelése tanulókhoz</h2>

          <select
            className="border p-2 w-full mb-2"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Válassz tanulót...</option>
            {students.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          {selectedStudent && (
            <>
              <h3 className="font-medium mt-3">Tantárgyak:</h3>
              <ul className="divide-y">
                {subjects.map((subj) => (
                  <li key={subj.id} className="flex justify-between py-2">
                    {subj.name}
                    <button
                      onClick={() => assignSubject(selectedStudent, subj.id)}
                      className="bg-blue-500 text-white px-2 rounded"
                    >
                      Hozzárendelés
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="font-medium mt-3">Tanuló tantárgyai:</h3>
              <ul className="list-disc ml-6">
                {(assignments[selectedStudent] || [])
                  .map((id) => subjects.find((s) => s.id === id))
                  .filter(Boolean)
                  .map((s) => (
                    <li key={s!.id}>{s!.name}</li>
                  ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* - Admin statisztika - */}
      {view === "admin" && (
        <div className="bg-white shadow p-4 rounded max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Admin kimutatás</h2>
          {Object.keys(stats).length === 0 ? (
            <p>Nincs adat.</p>
          ) : (
            Object.entries(stats).map(([grade, data]) => (
              <div key={grade} className="mb-4 border-b pb-2">
                <h3 className="font-bold">{grade}. évfolyam</h3>
                <p>Közismereti tárgyak: {data.Közismereti.count} db, összesen {data.Közismereti.hours} óra</p>
                <p>Szakmai tárgyak: {data.Szakmai.count} db, összesen {data.Szakmai.hours} óra</p>
                <p className="font-semibold">
                  Összesen: {data.Közismereti.hours + data.Szakmai.hours} óra / évfolyam
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;
