"use client";

import { Card, Flex, Box, Heading, Text, Slider, Code } from "@radix-ui/themes";
import { getSimplifiedExpression } from "../lib/utils";

export default function PrismControlPanel({
  sideNumber,
  radius,
  volume,
  onSidesChange,
}: {
  sideNumber: number[];
  radius: number[];
  volume: number;
  onSidesChange: (value: number[]) => void;
}) {
  const expression = getSimplifiedExpression(sideNumber[0])
   

  const maxRadius = Math.sqrt(
    1500 / (sideNumber[0] * Math.sin((2 * Math.PI) / sideNumber[0]))
  );

  return (
    <Card
      size="3"
      style={{
        height: "100%",
        borderRadius: 0,
        borderTop: "none",
        borderBottom: "none",
        borderRight: "none",
      }}
    >
      <Flex direction="column" gap="5">
        <Box>
          <Heading size="5" mb="1">
            Configuracion del prisma
          </Heading>
          <Text size="2" color="gray">
            Explora como el numero de lados afecta a la geometria, altura y 
            volumen del prisma
          </Text>
        </Box>

        <Box>
          <Flex justify="between" align="center" mb="3">
            <Text size="2" weight="medium" color="gray">
              Numero de Lados
            </Text>
            <Text
              size="2"
              weight="bold"
              style={{
                padding: "4px 12px",
                borderRadius: "8px",
                backgroundColor: "var(--accent-a3)",
                color: "var(--accent-11)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {sideNumber[0] >= 64 ? "∞" : `${sideNumber[0]} lados`}
            </Text>
          </Flex>

          <Box py="2">
            <Slider
              value={sideNumber}
              onValueChange={onSidesChange}
              min={3}
              max={64}
              step={1}
            />
          </Box>

          <Flex justify="between">
            <Text size="1" color="gray">
              3
            </Text>
            <Text size="1" color="gray">
              64
            </Text>
          </Flex>
        </Box>

        <Box>
          <Heading size="3" mb="3">
            Informacion
          </Heading>
          <Flex direction="column" gap="3">
            <InfoCard label="Radio" value={`${radius[0].toFixed(2)} cm`} />
            <InfoCard
              label="Radio Maximo"
              value={`${maxRadius.toFixed(2)} cm`}
            />
            <InfoCard label="Volumen" value={`${volume.toFixed(2)} cm³`} />
          </Flex>
        </Box>

        <Box>
          <Heading size="3" mb="3">
            Funcion de Volumen
          </Heading>
          <Card
            variant="surface"
            style={{
              padding: "16px",
              backgroundColor: "var(--gray-a2)",
            }}
          >
            <Code size="2" style={{ wordBreak: "break-word" }}>
              {expression}
            </Code>
          </Card>
          <Text size="2" color="gray" mt="3" as="p">
            La funcion cambia dinamicamente dependiendo de el numero de Lados
            del prisma, entre mas alto sea el valor mas se aproxima al cilindro.
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <Card variant="surface" style={{ backgroundColor: "var(--gray-a2)" }}>
      <Flex direction="column" gap="1" p="1">
        <Text size="2" color="gray">
          {label}
        </Text>
        <Text size="5" weight="bold" style={{ fontVariantNumeric: "tabular-nums" }}>
          {value}
        </Text>
      </Flex>
    </Card>
  );
}
