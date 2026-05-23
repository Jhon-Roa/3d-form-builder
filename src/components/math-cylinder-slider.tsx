"use client";

import { useEffect } from "react";
import { Card, Slider, Text, Flex, Box } from "@radix-ui/themes";
import { evaluate } from "mathjs";

interface MathCylinderSliderProps {
    radius: number[];
    onRadiusChange: (radius: number[]) => void;
}

function MathCylinderSlider({radius, onRadiusChange}: MathCylinderSliderProps) {

    const expr = "750*r - pi*r^3"

    useEffect(() => {
        catchValue()
    }, [radius])

    const catchValue = () => {
        const volume = evaluate(expr, {
            r: radius[0]
        })

        console.log(volume)
    }

    const min = 0;
    const max = 15.45;
    const step = 0.01;

    return (
        <Card size="3" className="w-full">
            <Flex direction="column" gap="4">
                <Flex justify="between" align="center">
                    <Text size="2" weight="medium" color="gray">
                        Radio del cilindro
                    </Text>
                    <Box className="bg-primary/10 px-3 py-1.5 rounded-lg">
                        <Text size="5" weight="bold" className="text-primary tabular-nums">
                            {radius[0].toFixed(2)}
                        </Text>
                    </Box>
                </Flex>

                <Box className="py-2">
                    <Slider
                        value={radius}
                        onValueChange={onRadiusChange}
                        min={min}
                        max={max}
                        step={step}
                        size="3"
                    />
                </Box>

                <Flex justify="between">
                    <Text size="1" color="gray">
                        {min}
                    </Text>
                    <Text size="1" color="gray">
                        {max}
                    </Text>
                </Flex>
            </Flex>
        </Card>
    );
}

export default MathCylinderSlider;
