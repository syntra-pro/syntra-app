import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { parseUnits, formatUnits } from "viem";
import { useRef, useCallback, useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address: string | undefined): string {
  if (!address || typeof address === "undefined") {
    return "error";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatNumber(num: number | bigint): string {
  // Convert to BigInt if not already
  const bigNum = typeof num === "bigint" ? num : BigInt(num);

  const oneThousand = BigInt(1_000);
  const oneMillion = BigInt(1_000_000);
  const oneBillion = BigInt(1_000_000_000);
  const oneTrillion = BigInt(1_000_000_000_000);
  const oneQuadrillion = BigInt(1_000_000_000_000_000);
  const oneQuintillion = BigInt(1_000_000_000_000_000_000);
  console.log("ACA ", bigNum, new Date());
  if (bigNum >= oneQuintillion) {
    return (bigNum / oneQuintillion).toString() + "P"; // Quintillions
  } else if (bigNum >= oneQuadrillion) {
    return (bigNum / oneQuadrillion).toString() + "Q"; // Quadrillions
  } else if (bigNum >= oneTrillion) {
    return (bigNum / oneTrillion).toString() + "T"; // Trillions
  } else if (bigNum >= oneBillion) {
    return (bigNum / oneBillion).toString() + "B"; // Billions
  } else if (bigNum >= oneMillion) {
    return (bigNum / oneMillion).toString() + "M"; // Millions
  } else if (bigNum >= oneThousand) {
    return (bigNum / oneThousand).toString() + "K"; // Thousands
  } else {
    return bigNum.toString();
  }
}

export const formatCurrency = (
  value: number,
  locale: string,
  currency: string
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  }).format(value);
};

export function calculateMC(data: any) {
  const { totalSupply, reserveToken, currentTokenPrice } = data;

  const marketCap = (totalSupply - reserveToken) * currentTokenPrice;

  return marketCap;
}

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}

export function localTime(dateTime: string, timeZone: string): string {
  const date = new Date(dateTime);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timeZone,
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export async function upsertDocument(
  operation: "update" | "fetch",
  content: string | null,
  pathName: string
) {
  try {
    if (operation === "update") {
      if (!content) throw new Error("Content is required for update operation");
      await fetch(`/api/storage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, pathName }),
      });
    } else if (operation === "fetch") {
      const response = await fetch(
        `/api/storage?folder=${pathName.split("/")[1]}&documentId=${
          pathName.split("/")[2]
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch document");
      const data = await response.json();
      const { content } = data;
      return content;
    } else {
      throw new Error("Invalid operation");
    }
  } catch (error) {
    console.error(`Error during ${operation} operation:`, error);
  }
}
