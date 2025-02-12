import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf } from "lucide-react";

const mockHistory = [
  {
    id: "123456789",
    name: "Produit Bio Example",
    date: new Date().toLocaleDateString(),
    carbonFootprint: 2.5,
  },
  {
    id: "987654321",
    name: "Autre Produit Example",
    date: new Date(Date.now() - 86400000).toLocaleDateString(),
    carbonFootprint: 4.2,
  },
];

export const ScanHistory = () => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-semibold mb-4">Historique des scans</h2>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {mockHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg bg-muted/50 space-y-2 animate-fadeIn"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{item.name}</h3>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="w-4 h-4" />
                <span>{item.carbonFootprint} kg CO2e</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
