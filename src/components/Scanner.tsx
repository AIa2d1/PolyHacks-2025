import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Camera, XCircle } from "lucide-react";

interface ScannerProps {
  onScan: (barcode: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const { toast } = useToast();

  const startScanning = async () => {
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("scanner");
      }

      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScan(decodedText);
        },
        (errorMessage) => {
          // Ignorer les erreurs non critiques
          if (!errorMessage.includes("No MultiFormat Readers")) {
            console.log(errorMessage);
          }
        }
      );
      setIsScanning(true);
    } catch (err) {
      console.error("Erreur lors du démarrage du scanner:", err);
      toast({
        title: "Erreur",
        description: "Impossible d'accéder à la caméra. Veuillez vérifier vos permissions.",
        variant: "destructive",
      });
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        setIsScanning(false);
      } catch (error) {
        console.error("Erreur lors de l'arrêt du scanner:", error);
      }
    }
  };

  // Nettoyer lors du démontage du composant
  useEffect(() => {
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop();
      }
    };
  }, [isScanning]);

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-neutral-200 rounded-xl">
      <div className="space-y-6">
        <div
          id="scanner"
          className={`w-full aspect-square rounded-lg overflow-hidden ${
            isScanning ? "opacity-100" : "opacity-0"
          }`}
        />
        
        <div className="flex justify-center gap-4">
          {!isScanning ? (
            <Button
              onClick={startScanning}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Camera className="mr-2 h-4 w-4" />
              Scanner un produit
            </Button>
          ) : (
            <Button
              onClick={stopScanning}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Arrêter le scan
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Scanner;
