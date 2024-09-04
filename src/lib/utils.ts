import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { parseUnits, formatUnits } from "viem";
import { useRef, useCallback, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

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
  pathName: string,
  content: string | null,
  title: string | null,
  priority: string,
  project: string,
  tags: string[],
  collabs: string[]
) {
  try {
    if (!content) throw new Error("Content is required for update operation");
    await fetch(`/api/storage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pathName,
        content,
        title,
        priority,
        project,
        tags,
        collabs,
      }),
    });
  } catch (error) {
    console.error(`Error during update operation:`, error);
  }
}

export const toLocalShortDateTime = (timestamp: number) =>
  new Date(timestamp)
    .toLocaleString(undefined, {
      day: "numeric",
      month: "numeric",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");

export async function createDocument( // zero id
  pathName: string,
  content: string | null,
  title: string | null,
  priority: string,
  project: string,
  tags: string[],
  collabs: string[]
) {
  try {
    if (!content) throw new Error("Content is required for update operation");
    await fetch(`/api/storage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isNew: true,
        pathName,
        content,
        title,
        priority,
        project,
        tags,
        collabs,
      }),
    });
  } catch (error) {
    console.error(`Error during update operation:`, error);
  }
}

export async function readDocument(pathName: string) {
  try {
    const p = `/api/storage?documentId=${pathName}`;
    const response = await fetch(p, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch document");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error reading:`, error);
  }
}

export async function fetchAllDocuments(pathName: string) {
  try {
    const folderName = pathName;
    console.log("bucando folderName", folderName);

    const response = await fetch(`/api/storage?folder=${folderName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch documents");

    const data = await response.json();
    return data.documents; // Asume que la respuesta tiene un campo 'documents' con la lista de documentos
  } catch (error) {
    console.error(`Error fetching documents from folder ${pathName}:`, error);
    return []; // Devuelve un array vacío en caso de error
  }
}
