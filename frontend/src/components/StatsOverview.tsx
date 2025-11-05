import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StatsProps {
  stats: {
    kollegistak: number;
    debreceniek: number;
    bejarosok: number;
  };
}

export default function StatsOverview({ stats }: StatsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader><CardTitle>Kollégisták</CardTitle></CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.kollegistak}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Debreceniek</CardTitle></CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.debreceniek}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Bejárósok</CardTitle></CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.bejarosok}</p>
        </CardContent>
      </Card>
    </div>
  );
}
