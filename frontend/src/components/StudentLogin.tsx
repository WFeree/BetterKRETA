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
  full_name: string;
  username: string;
  password: string;
  enrollments: Enrollment[];
}

const StudentLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [admin, setAdmin] = useState(false);

  // 🧠 Move per-enrollment input state here:
  const [markInputs, setMarkInputs] = useState<Record<number, { value: string; description: string }>>({});

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

      setStudent(data as Student);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
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
      setStudent(updatedStudent);

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
    setAdmin(!admin)
  }

  return (
    <div>
      {!student && (
        <div className="my-auto mx-auto flex flex-col p-2 max-w-sm gap-x-4 outline-2 rounded-xl outline-black-500 ">
          <Label className="py-2">Username</Label>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Label className="py-2">Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className="mt-2" onClick={handleLogin}>Login</Button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {student && !admin && (
        <div className="mt-4 p-2 rounded">
          <p className="font-semibold">Welcome, {student.full_name}!</p>

          {(() => {
            const lowAverageCount = student.enrollments.reduce((count, enroll) => {
              const numericValues = enroll.marks.map((m) => Number(m.value)).filter((v) => !isNaN(v));
              if (numericValues.length === 0) return count;
              const avg = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
              return avg <= 1.75 ? count + 1 : count;
            }, 0);
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
              const numericValues = marks.map((mark) => Number(mark.value)).filter((v) => !isNaN(v));
              const average =
                numericValues.length > 0
                  ? numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length
                  : null;

              const input = markInputs[enroll.id] || { value: "", description: "" };

              return (

                <div key={enroll.id} className="my-4 p-2 border rounded">
                  <p className={`${average !== null && average <= 2 ? "text-red-500" : "text-black"}`}>
                    <strong>{enroll.subject}</strong>: {average !== null ? average.toFixed(2) : "No marks yet"}
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
                          [enroll.id]: { ...input, description: e.target.value },
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
          <Button className="mt-2 bg-blue-500 text-white" onClick={handleAdmin}>Admin Site</Button>
          <Button className="mt-2 bg-red-500 text-white" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      )}
      {student && admin && (
        <div className="mt-4 p-2 rounded">
          
          <Button className="mt-2 bg-blue-500 text-white" onClick={handleAdmin}>Student Site</Button>
        </div>
      )}
    </div>
  );
};

export default StudentLogin;
