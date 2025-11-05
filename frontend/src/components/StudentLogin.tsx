import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Mark {
  value: number;
  description: string | null;
}

interface Enrollment {
  id: number;
  subject: string;
  marks: Mark[];
}

interface Student {
  id: number;
  nev: string;
  username: string;
  password: string;
  enrollments: Enrollment[];
}

interface SubjectAverage {
  subject: string;
  average: number | null;
}

const SubjectAverages = () => {
  const [averages, setAverages] = useState<SubjectAverage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/subject-averages/");
        if (!res.ok) throw new Error("Failed to fetch averages");
        const data = await res.json();
        setAverages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAverages();
  }, []);

  if (loading) return <p>Loading subject averages...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 p-3 rounded-lg shadow">
      {averages.length === 0 ? (
        <p>No subjects found.</p>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b text-left p-2 font-medium">Subject</th>
              <th className="border-b text-left p-2 font-medium">Average</th>
            </tr>
          </thead>
          <tbody>
            {averages.map((item, i) => (
              <tr key={i}>
                <td className="border-b p-2">{item.subject}</td>
                <td className="border-b p-2">
                  {item.average !== null ? item.average.toFixed(2) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

interface SubjectAverage {
  student: string;
  average: number | null;
}

const StudentAverages = () => {
  const [averages, setAverages] = useState<SubjectAverage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/student-averages/");
        if (!res.ok) throw new Error("Failed to fetch averages");
        const data = await res.json();
        setAverages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAverages();
  }, []);

  if (loading) return <p>Loading student averages...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 p-3 rounded-lg shadow">
      {averages.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b text-left p-2 font-medium">Student</th>
              <th className="border-b text-left p-2 font-medium">Average</th>
            </tr>
          </thead>
          <tbody>
            {averages.map((item, i) => (
              <tr key={i}>
                <td className="border-b p-2">{item.student}</td>
                <td className="border-b p-2">
                  {item.average !== null ? item.average.toFixed(2) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const StudentLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [admin, setAdmin] = useState(false);

  // 🧠 Move per-enrollment input state here:
  const [markInputs, setMarkInputs] = useState<
    Record<number, { value: string; description: string }>
  >({});

  useEffect(() => {
    const stored = localStorage.getItem("student");
    if (stored) {
      setStudent(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (student) {
      localStorage.setItem("student", JSON.stringify(student));
    } else {
      localStorage.removeItem("student");
    }
  }, [student]);

  const handleLogin = async () => {
    setError("");
    setStudent(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      const studentWithRawPwd = { ...data, password };

      setStudent(studentWithRawPwd);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  const handleLogout = () => {
    setStudent(null);
  };

  const handleAddMark = async (enrollmentId: number) => {
    const input = markInputs[enrollmentId];
    if (!input?.value) {
      alert("Enter a mark value");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/add-mark/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollment: enrollmentId,
          value: parseInt(input.value),
          description: input.description || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to add mark");

      // Refresh student data
      const updatedRes = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: student?.username,
          password: student?.password,
        }),
      });

      const updatedStudent = await updatedRes.json();
      setStudent({
        ...updatedStudent,
        password: student?.password,
      });

      // Clear input
      setMarkInputs((prev) => ({
        ...prev,
        [enrollmentId]: { value: "", description: "" },
      }));
    } catch (err) {
      console.error(err);
      alert("Error adding mark");
    }
  };

  const handleAdmin = () => {
    setAdmin(!admin);
  };

  return (
    <div>
      {!student && (
        <div className="my-auto mx-auto flex flex-col p-2 max-w-sm gap-x-4 outline-2 rounded-xl outline-black-500 ">
          <Label className="py-2">Username</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label className="py-2">Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="mt-2" onClick={handleLogin}>
            Login
          </Button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {student && !admin && (
        <div className="mt-4 p-2 rounded">
          <p className="font-semibold">Welcome, {student.nev}!</p>

          {(() => {
            const lowAverageCount = student.enrollments.reduce(
              (count, enroll) => {
                const numericValues = enroll.marks
                  .map((m) => Number(m.value))
                  .filter((v) => !isNaN(v));
                if (numericValues.length === 0) return count;
                const avg =
                  numericValues.reduce((a, b) => a + b, 0) /
                  numericValues.length;
                return avg <= 1.75 ? count + 1 : count;
              },
              0
            );
            const atRisk = lowAverageCount >= 3;

            return (
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={atRisk}
                  readOnly
                  className="w-4 h-4 accent-red-500"
                />
                <label className="font-medium">
                  Student is{" "}
                  <span className={atRisk ? "text-red-600" : "text-green-600"}>
                    {atRisk ? "AT RISK" : "not at risk"}
                  </span>{" "}
                  ({lowAverageCount} subjects below 1.75)
                </label>
              </div>
            );
          })()}

          <div className="mt-2">
            <h3 className="font-semibold">Subjects & Marks:</h3>

            {student.enrollments.map((enroll) => {
              const marks = enroll.marks || [];
              const numericValues = marks
                .map((mark) => Number(mark.value))
                .filter((v) => !isNaN(v));
              const average =
                numericValues.length > 0
                  ? numericValues.reduce((sum, val) => sum + val, 0) /
                    numericValues.length
                  : null;

              const input = markInputs[enroll.id] || {
                value: "",
                description: "",
              };

              return (
                <div key={enroll.id} className="my-4 p-2 border rounded">
                  <p
                    className={`${
                      average !== null && average <= 2
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  >
                    <strong>{enroll.subject}</strong>:{" "}
                    {average !== null ? average.toFixed(2) : "No marks yet"}
                  </p>

                  {marks.map((mark, i) => (
                    <p key={i} className="text-sm text-gray-600">
                      {mark.value} — {mark.description || "No description"}
                    </p>
                  ))}

                  <div className="flex flex-col mt-2">
                    <Input
                      type="number"
                      placeholder="Mark (1–5)"
                      value={input.value}
                      onChange={(e) =>
                        setMarkInputs((prev) => ({
                          ...prev,
                          [enroll.id]: { ...input, value: e.target.value },
                        }))
                      }
                      className="mb-1"
                    />
                    <Input
                      type="text"
                      placeholder="Description"
                      value={input.description}
                      onChange={(e) =>
                        setMarkInputs((prev) => ({
                          ...prev,
                          [enroll.id]: {
                            ...input,
                            description: e.target.value,
                          },
                        }))
                      }
                      className="mb-1"
                    />
                    <Button
                      className="bg-blue-500 text-white"
                      onClick={() => handleAddMark(enroll.id)}
                    >
                      Add Mark
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <Button className="mt-2 bg-blue-500 text-white" onClick={handleAdmin}>
            Admin Site
          </Button>
          <Button className="mt-2 bg-red-500 text-white" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      )}
      {student && admin && (
        <div className="mt-4 p-2 rounded">
          <h2 className="text-xl font-semibold mb-2">Subject Averages</h2>
          <SubjectAverages />
          <br />
          <StudentAverages />
          <Button className="mt-2 bg-blue-500 text-white" onClick={handleAdmin}>
            Student Site
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentLogin;
