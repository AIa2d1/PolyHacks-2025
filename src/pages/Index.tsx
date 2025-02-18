import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Scanner from "@/components/Scanner";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

// ... keep existing code (mockProductData)

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBarcodeScan = (barcode: string) => {
    // Rechercher le produit dans la base de données simulée
    const product = mockProductData[barcode];
    
    if (product) {
      // Ajouter le produit à l'historique
      const historyItem = {
        name: product.name,
        brand: product.brand,
        barcode: barcode,
        scannedAt: new Date().toISOString()
      };

      const existingHistory = localStorage.getItem("scanHistory");
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      localStorage.setItem("scanHistory", JSON.stringify([historyItem, ...history]));

      // Si le produit est trouvé, naviguer vers la page de détails
      navigate("/product", { 
        state: { 
          product: product 
        }
      });
    } else {
      // Si le produit n'est pas trouvé, afficher une notification
      toast({
        title: "Produit non trouvé",
        description: `Code-barres: ${barcode}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-primary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => navigate("/history")}
              className="text-primary border-primary hover:bg-primary/10"
            >
              <History className="w-4 h-4 mr-2" />
              Historique
            </Button>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-neutral-900">
              Scanner de Produits
            </h1>
            <p className="text-lg text-neutral-600">
              Scannez le code-barres d'un produit pour découvrir ses informations
            </p>
          </div>

          <Scanner onScan={handleBarcodeScan} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
