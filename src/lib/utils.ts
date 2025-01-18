import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRef, useCallback, useEffect } from 'react';
import blockies from 'ethereum-blockies';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address: string | undefined): string {
  if (!address || typeof address === 'undefined') {
    return 'error';
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatNumberShort(input: string): string {
  const num = parseFloat(input);

  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  } else {
    return num.toString();
  }
}

export function formatNumber(num: number | bigint): string {
  // Convert to BigInt if not already
  const bigNum = typeof num === 'bigint' ? num : BigInt(num);

  const oneThousand = BigInt(1_000);
  const oneMillion = BigInt(1_000_000);
  const oneBillion = BigInt(1_000_000_000);
  const oneTrillion = BigInt(1_000_000_000_000);
  const oneQuadrillion = BigInt(1_000_000_000_000_000);
  const oneQuintillion = BigInt(1_000_000_000_000_000_000);
  console.log('ACA ', bigNum, new Date());
  if (bigNum >= oneQuintillion) {
    return (bigNum / oneQuintillion).toString() + 'P'; // Quintillions
  } else if (bigNum >= oneQuadrillion) {
    return (bigNum / oneQuadrillion).toString() + 'Q'; // Quadrillions
  } else if (bigNum >= oneTrillion) {
    return (bigNum / oneTrillion).toString() + 'T'; // Trillions
  } else if (bigNum >= oneBillion) {
    return (bigNum / oneBillion).toString() + 'B'; // Billions
  } else if (bigNum >= oneMillion) {
    return (bigNum / oneMillion).toString() + 'M'; // Millions
  } else if (bigNum >= oneThousand) {
    return (bigNum / oneThousand).toString() + 'K'; // Thousands
  } else {
    return bigNum.toString();
  }
}

export const formatCurrency = (
  value: number,
  locale: string,
  currency: string,
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
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
  delay: number,
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
    [callback, delay],
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
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timeZone,
    hour12: true,
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export async function upsertDocument(
  pathName: string,
  content: string | null,
  title: string | null,
  link: string | null,
  priority: string,
  project: string,
  tags: string[],
  collabs: string[],
) {
  try {
    if (!content) throw new Error('Content is required for update operation');
    await fetch(`/api/storage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pathName,
        content,
        title,
        link,
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

export const removeDocument = async (pathName: string) => {
  try {
    const response = await fetch('/api/storage', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pathName }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error deleting document');
    }

    return true;
  } catch (err) {
    console.error('Error:', err);
  }
};

export const toLocalShortDateTime = (timestamp: number) =>
  new Date(timestamp)
    .toLocaleString(undefined, {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', '');

export async function createDocument( // zero id
  pathName: string,
  content: string | null,
  title: string | null,
  link: string | null,
  priority: string,
  project: string,
  tags: string[],
  collabs: string[],
) {
  try {
    if (!content) throw new Error('Content is required for update operation');
    await fetch(`/api/storage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isNew: true,
        pathName,
        content,
        title,
        link,
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
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch document');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error reading:`, error);
  }
}

export async function readSettings() {
  try {
    // const p = `/api/settings?documentId=${pathName}`;
    const p = `/api/settings`;
    const response = await fetch(p, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch document');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error reading:`, error);
  }
}

export async function fetchAllDocuments(pathName: string) {
  try {
    const folderName = pathName;
    const response = await fetch(`/api/storage?folder=${folderName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }

    const data = await response.json();
    return data.documents;
  } catch (error) {
    console.error(`Error fetching documents from folder ${pathName}:`, error);
    return [];
  }
}

export const preprocessMarkdown = (content: string): string => {
  const codeBlockRegex = /```[\s\S]*?```/g;
  const codeBlocks: string[] = [];

  let processedContent = content.replace(codeBlockRegex, match => {
    codeBlocks.push(match); //.replace(/\r\n/g, ' ');
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  processedContent = processedContent.replace(
    /(#+\s[^\n]+)(?!\n\n)/g,
    '$1\n\n',
  );
  processedContent = processedContent.replace(
    /(\*\*[^\*]+\*\*)(?!\n\n)/g,
    '$1\n\n',
  );
  processedContent = processedContent.replace(/(_[^\_]+_)(?!\n\n)/g, '$1\n\n'); // Para cursivas
  processedContent = processedContent.replace(
    /(\*\s[^\n]+)(?!\n\n)/g,
    '$1\n\n',
  );
  processedContent = processedContent.replace(/(?<!\n)\n(?!\n)/g, '\n\n');

  processedContent = processedContent.replace(
    /__CODE_BLOCK_(\d+)__/g,
    (_, index) => codeBlocks[parseInt(index)],
  );

  return processedContent;
};

export function escapeMD(text: string) {
  const escapedText = text.replace(/[\\`*_{}\[\]()#+\-.!]/g, '\\$&');
  const formattedText = escapedText;

  return formattedText;
}

export function getTimeAgo(targetEpoch: number): string {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = targetEpoch - currentTime;

  if (timeDifference <= 0) {
    const timePassed = Math.abs(timeDifference);
    const daysPassed = Math.floor(timePassed / (60 * 60 * 24));
    const hoursPassed = Math.floor((timePassed % (60 * 60 * 24)) / (60 * 60));

    let result = '';

    if (daysPassed > 0) {
      result += `${daysPassed} day${daysPassed !== 1 ? 's' : ''} ago`;
    } else if (hoursPassed > 0) {
      result += `${hoursPassed} hour${hoursPassed !== 1 ? 's' : ''} ago`;
    }
    return result || 'just now';
  }

  return '';
}

export function getTimeUntil(targetEpoch: number): string {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = targetEpoch - currentTime;
  if (timeDifference <= 0) {
    return 'Ended';
  }

  const daysRemaining = Math.floor(timeDifference / (60 * 60 * 24));
  const hoursRemaining = Math.floor(
    (timeDifference % (60 * 60 * 24)) / (60 * 60),
  );

  let result = 'Finalizes in ';
  if (daysRemaining > 0) {
    result += `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} `;
  }
  if (hoursRemaining > 0 || daysRemaining === 0) {
    result += `${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} `;
  }

  return result.trim();
}

export function parseIPFS(urlIPFS: string) {
  if (!urlIPFS || urlIPFS.includes('http')) return urlIPFS;

  const ipfs = urlIPFS.split('//')[1];
  const ipfsWithProtocol = `https://ipfs.io/ipfs/${ipfs}`;
  return ipfsWithProtocol;
}

export function escapeMDSymbols(text: string): string {
  return text.replace(/<([^>]+)>/g, (match, url) => {
    try {
      const urlObj = new URL(url);
      return `[${urlObj.href}](${urlObj.href})`;
    } catch {
      return match;
    }
  });
}

export async function setBlockie(canvasRef: any, text: string) {
  const cleanedText = text.trim().toLowerCase();
  const blockie = blockies.create({
    seed: cleanedText,
    color: '#006300',
    bgcolor: '#ffffff',
    size: 8,
    scale: 4,
  });
  const context = canvasRef.current.getContext('2d');
  if (context) {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // cleans
    context.drawImage(blockie, 0, 0, 26, 26);
  }
}

export const resizeImage = async (
  file: File,
  maxWidth: number,
  maxHeight: number,
): Promise<File | null> => {
  return new Promise<File | null>((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return resolve(null);

    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      const aspectRatio = img.width / img.height;

      if (img.width > maxWidth || img.height > maxHeight) {
        // Determine the new dimensions while preserving aspect ratio
        if (aspectRatio > 1) {
          // Landscape

          canvas.width = maxWidth;
          canvas.height = maxWidth / aspectRatio;
        } else {
          // Portrait
          canvas.width = maxHeight * aspectRatio;
          canvas.height = maxHeight;
        }
      } else {
        // Use original dimensions if within limits
        canvas.width = img.width;
        canvas.height = img.height;
      }

      // Draw the image to the canvas and convert to blob
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        blob => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
            });
            resolve(resizedFile);
          } else {
            resolve(null);
          }
        },
        file.type,
        1, // Quality: 1   max quality
      );
    };

    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};
