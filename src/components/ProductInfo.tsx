import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, Recycle, Timer } from "lucide-react";

interface Product {
  id: string;
  name: string;
  carbonFootprint: number;
  conservation: string;
  packaging: string;
  recyclable: boolean;
}

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const getCarbonFootprintColor = (value: number) => {
    if (value <= 2) return "bg-eco-low";
    if (value <= 4) return "bg-eco-medium";
    return "bg-eco-high";
  };

  return (
    <Card className="p-6 space-y-6 animate-fadeIn backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-gray-200 dark:border-gray-800">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">Code: {product.id}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-eco-low" />
            <span className="text-sm font-medium">Empreinte carbone</span>
          </div>
          <Progress
            value={product.carbonFootprint * 20}
            className={`h-2 ${getCarbonFootprintColor(product.carbonFootprint)}`}
          />
          <p className="text-xs text-muted-foreground text-right">
            {product.carbonFootprint} kg CO2e
          </p>
        </div>

        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
          <Timer className="w-5 h-5" />
          <div>
            <p className="text-sm font-medium">Conservation</p>
            <p className="text-xs text-muted-foreground">{product.conservation}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
          <Recycle className="w-5 h-5" />
          <div>
            <p className="text-sm font-medium">Emballage</p>
            <p className="text-xs text-muted-foreground">
              {product.packaging}
              {product.recyclable && " • Recyclable"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
