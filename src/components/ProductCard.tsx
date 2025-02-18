import React from "react";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Leaf, Clock, List, Recycle, Package, Truck, Award, Users, Beaker, Zap, TreePine } from "lucide-react";

interface ProductInfo {
  name: string;
  brand: string;
  carbonFootprint: string;
  conservation: string;
  ingredients: string[];
  energyConsumption?: string;
  naturalResources?: string;
  recyclability?: string;
  wasteManagement?: string;
  packaging?: string;
  origin?: string;
  certification?: string[];
  ethicalProduction?: string;
  greenChemistry?: string;
}

const calculateGrade = (product: ProductInfo): { grade: string; color: string } => {
  // Système de points pour chaque critère
  let points = 0;
  let totalCriteria = 0;

  // Empreinte carbone (basé sur la valeur en kg CO2e)
  const carbonValue = parseFloat(product.carbonFootprint);
  if (carbonValue <= 0.3) points += 5;
  else if (carbonValue <= 0.5) points += 4;
  else if (carbonValue <= 0.7) points += 3;
  else if (carbonValue <= 0.9) points += 2;
  else points += 1;
  totalCriteria++;

  // Recyclabilité
  if (product.recyclability?.includes("100%")) points += 5;
  else if (product.recyclability?.includes("recyclable")) points += 3;
  else points += 1;
  totalCriteria++;

  // Emballage
  if (product.packaging?.includes("verre")) points += 5;
  else if (product.packaging?.includes("recyclable")) points += 3;
  else points += 1;
  totalCriteria++;

  // Certifications
  if (product.certification) {
    points += Math.min(product.certification.length * 2, 5);
    totalCriteria++;
  }

  // Ressources naturelles
  if (product.naturalResources?.includes("Impact faible")) points += 5;
  else if (product.naturalResources?.includes("Impact modéré")) points += 3;
  else points += 1;
  totalCriteria++;

  // Calcul de la note moyenne
  const average = points / totalCriteria;

  // Attribution de la note et de la couleur
  if (average >= 4.5) return { grade: "A", color: "#8B5CF6" }; // Vivid Purple
  if (average >= 3.5) return { grade: "B", color: "#9b87f5" }; // Primary Purple
  if (average >= 2.5) return { grade: "C", color: "#FEF7CD" }; // Soft Yellow
  if (average >= 1.5) return { grade: "D", color: "#FEC6A1" }; // Soft Orange
  if (average >= 0.5) return { grade: "E", color: "#ea384c" }; // Red
  return { grade: "F", color: "#333" }; // Dark Gray
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { grade, color } = calculateGrade(product);

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-neutral-200 rounded-xl animate-fade-in">
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-sm font-medium text-primary-600">
              {product.brand}
            </span>
            <h2 className="text-2xl font-semibold text-neutral-900">
              {product.name}
            </h2>
          </div>
          <div 
            className="flex items-center justify-center w-12 h-12 rounded-full"
            style={{ 
              backgroundColor: color,
              color: color === "#FEF7CD" ? "#666" : "white",
              fontWeight: "bold",
              fontSize: "1.5rem"
            }}
          >
            {grade}
          </div>
        </div>

        {/* ... keep existing code (rest of the product card UI) */}
      </div>
    </Card>
  );
};

export default ProductCard;
