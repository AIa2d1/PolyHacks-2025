import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, Trash2 } from "lucide-react";

interface HistoryProduct {
  name: string;
  brand: string;
  scannedAt: string;
  barcode: string;
}

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = React.useState<HistoryProduct[]>(() => {
    const saved = localStorage.getItem("scanHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const clearHistory = () => {
    localStorage.removeItem("scanHistory");
    setHistory([]);
  };

  const viewProduct = (barcode: string) => {
    navigate(`/product/${barcode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-primary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            {history.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={clearHistory}
                className="bg-red-500 hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Effacer l'historique
              </Button>
            )}
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-neutral-900">
              Historique des scans
            </h1>
            <p className="text-lg text-neutral-600">
              Retrouvez tous les produits que vous avez scannés
            </p>
          </div>

          {history.length === 0 ? (
            <Card className="p-6 text-center text-neutral-600">
              <Clock className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
              <p>Aucun produit scanné pour le moment</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <Card
                  key={index}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => viewProduct(item.barcode)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-neutral-600">{item.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-500">
                        {new Date(item.scannedAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
