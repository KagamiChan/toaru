import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Generator } from "./generator";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <Generator />
        </CardContent>
      </Card>
    </main>
  );
}
