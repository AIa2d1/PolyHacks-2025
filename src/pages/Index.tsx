import { useState, useEffect } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductInfo } from "@/components/ProductInfo";
import { ScanHistory } from "@/components/ScanHistory";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, History, Ban } from "lucide-react";

interface Product {
  id: string;
  name: string;
  carbonFootprint: number;
  conservation: string;
  packaging: string;
  recyclable: boolean;
}

const mockProduct: Product = {
  id: "123456789",
  name: "Produit Bio Example",
  carbonFootprint: 2.5,
  conservation: "2 semaines",
  packaging: "Carton recyclé",
  recyclable: true,
};

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, []);

  const startScan = async () => {
    try {
      const granted = await BarcodeScanner.checkPermission({ force: true });
      if (!granted) {
        toast({
          title: "Permission refusée",
          description: "L'accès à la caméra est nécessaire pour scanner les codes-barres.",
          variant: "destructive",
        });
        return;
      }

      await BarcodeScanner.hideBackground();
      document.querySelector("body")?.classList.add("scanner-active");
      setIsScanning(true);
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        // Dans une vraie application, nous ferions un appel API ici
        setScannedProduct(mockProduct);
        document.querySelector("body")?.classList.remove("scanner-active");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du scan.",
        variant: "destructive",
      });
    }
  };

  const stopScan = async () => {
    await BarcodeScanner.showBackground();
    await BarcodeScanner.stopScan();
    document.querySelector("body")?.classList.remove("scanner-active");
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Tabs defaultValue="scan" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="scan" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Scanner
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="space-y-4">
          {!isScanning ? (
            <Card className="p-6 backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-gray-200 dark:border-gray-800">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold">Scanner un produit</h2>
                <p className="text-muted-foreground">
                  Placez le code-barres du produit devant la caméra
                </p>
                <Button
                  onClick={startScan}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Commencer le scan
                </Button>
              </div>
            </Card>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <Button
                variant="destructive"
                onClick={stopScan}
                className="absolute bottom-8"
              >
                <Ban className="w-4 h-4 mr-2" />
                Arrêter le scan
              </Button>
            </div>
          )}

          {scannedProduct && <ProductInfo product={scannedProduct} />}
        </TabsContent>

        <TabsContent value="history">
          <ScanHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
