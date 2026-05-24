import { useState } from "react";
import MathPrismSlider from "../components/math-prism-slider";
import PrismScene from "../components/prism-scene";
import PrismControlPanel from "../components/prism-control-panel";
import { Card } from "@radix-ui/themes";

export default function PrismPage() {
    const [radius, setRadius] = useState<number[]>([8.2]);
    const [sideNumber, setSideNumber] = useState<number[]>([3]);
    const [volume, setVolume] = useState<number>(0)

    return (
        <div className="max-w-7xl mx-auto min-h-full h-[calc(100vh-3.5rem)] flex flex-col gap-6 ">
            <div>
                <h2 className="text-xl font-semibold text-foreground">
                    {sideNumber[0] !== 64
                        ? `prisma de ${sideNumber[0]} lados`
                        : "cilindro"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Ajusta los parametros para visualizar la forma
                </p>
            </div>
            <div className="flex-1 md:grid md:grid-cols-[1fr_25%] gap-6">
                <div className="flex flex-col gap-2">

                    {/* <div className="">
                        
                    </div> */}

                    <Card className="flex-1 min-h-[400px] rounded-xl bg-black overflow-hidden relative">
                        <PrismScene sideNumber={sideNumber[0]} radius={radius[0]} />
                    </Card>

                    <MathPrismSlider
                        radius={radius}
                        sideNumber={sideNumber}
                        onVolumeChange={setVolume}
                        onRadiusChange={setRadius}
                    />
                </div>
                <div className="pt-2 md:pt-0">
                    <PrismControlPanel sideNumber={sideNumber} radius={radius} volume={volume} onVolumeChange={setVolume} onSidesChange={setSideNumber} />
                </div>
            </div>

        </div>
    );
}
