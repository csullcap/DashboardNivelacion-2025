"use client";

import * as React from "react";
import { Tooltip as RechartsTooltip, type TooltipProps } from "recharts";

import { cn } from "../lib/utils";

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Set chart colors as CSS variables
  const style = Object.entries(config).reduce((acc, [key, value]) => {
    acc[`--color-${key}`] = value.color;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className={cn("h-[350px] w-full", className)} style={style} {...props}>
      {children}
    </div>
  );
}

interface ChartTooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: number, name: string) => React.ReactNode;
  labelFormatter?: (label: string) => React.ReactNode;
  hideLabel?: boolean;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  hideLabel = false,
  className,
  ...props
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={cn("rounded-lg border bg-background p-2 shadow-sm", className)}
      {...props}
    >
      {!hideLabel && (
        <div className="mb-1 text-sm font-medium">
          {labelFormatter ? labelFormatter(label as string) : label}
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        {payload.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <div className="flex items-center gap-1">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <div className="font-medium">
              {formatter
                ? formatter(item.value, item.name)
                : item.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartTooltip({ content, ...props }: TooltipProps<any, any>) {
  return (
    <RechartsTooltip
      content={content || <ChartTooltipContent />}
      {...props}
      cursor={{ fill: "var(--muted)" }}
    />
  );
}
