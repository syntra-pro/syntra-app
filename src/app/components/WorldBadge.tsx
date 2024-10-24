import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import React, { useState } from "react";

import { sha256 } from "js-sha256";

const WorldIDVerifier: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [uniqueIdentifier, setUniqueIdentifier] = useState<string | null>(null);

  const handleVerify = async (result: ISuccessResult) => {
    // Aquí normalmente enviarías el resultado a tu backend para verificación
    console.log("Proof received:", result);

    // Simulamos una verificación exitosa
    setIsVerified(true);

    // Creamos un identificador único basado en la prueba
    const identifier = sha256(JSON.stringify(result));
    setUniqueIdentifier(identifier);
  };

  const getHashedDocumentId = (documentContent: string) => {
    if (!uniqueIdentifier) return null;
    return sha256(uniqueIdentifier + documentContent);
  };

  return (
    <div>
      {!isVerified ? (
        <IDKitWidget
          app_id="app_staging_af1206b236eb4ffa4eea32d8db479cee"
          action="anonimizer"
          onSuccess={handleVerify}
        >
          {({ open }) => (
            <button
              className="bg-black text-white px-2 py-1 text-md shadow-lg m-2 rounded-md"
              onClick={open}
            >
              Verify with World ID
            </button>
          )}
        </IDKitWidget>
      ) : (
        <div>
          <span style={{ color: "green", marginRight: "10px" }}>
            ✓ Verified
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="icon">
              <path
                id="Logo _New"
                d="M30.1586 12.8626C29.4931 11.2897 28.5419 9.88012 27.3302 8.66827C26.1185 7.45643 24.7059 6.50516 23.1364 5.83959C21.5072 5.1489 19.7807 4.80042 17.9976 4.80042C16.2178 4.80042 14.4881 5.1489 12.8589 5.83959C11.2862 6.50516 9.87674 7.45643 8.66504 8.66827C7.45334 9.88012 6.50218 11.2929 5.83669 12.8626C5.14922 14.4889 4.80078 16.2188 4.80078 17.9988C4.80078 19.7789 5.14922 21.5088 5.83983 23.1382C6.50532 24.7111 7.45648 26.1207 8.66818 27.3326C9.87988 28.5444 11.2925 29.4957 12.862 30.1612C14.4912 30.8488 16.2178 31.2004 18.0008 31.2004C19.7807 31.2004 21.5103 30.8519 23.1395 30.1612C24.7122 29.4957 26.1217 28.5444 27.3334 27.3326C28.5451 26.1207 29.4962 24.7079 30.1617 23.1382C30.8492 21.5088 31.2008 19.7821 31.2008 17.9988C31.1976 16.2188 30.8461 14.4889 30.1586 12.8626ZM13.6154 16.7587C14.1648 14.649 16.0859 13.0887 18.3681 13.0887H27.5312C28.1213 14.2283 28.498 15.4684 28.6455 16.7587H13.6154ZM28.6455 19.2389C28.498 20.5293 28.1182 21.7694 27.5312 22.909H18.3681C16.0891 22.909 14.1679 21.3487 13.6154 19.2389H28.6455ZM10.4198 10.4201C12.4445 8.39514 15.1348 7.28061 17.9976 7.28061C20.8605 7.28061 23.5507 8.39514 25.5755 10.4201C25.6383 10.4829 25.6979 10.5457 25.7575 10.6085H18.3681C16.3936 10.6085 14.5383 11.3777 13.1414 12.7747C12.0427 13.8736 11.3333 15.2581 11.079 16.7619H7.35289C7.62599 14.3665 8.69015 12.15 10.4198 10.4201ZM17.9976 28.7202C15.1348 28.7202 12.4445 27.6057 10.4198 25.5807C8.69015 23.8509 7.62599 21.6344 7.35289 19.2421H11.079C11.3302 20.7459 12.0427 22.1304 13.1414 23.2292C14.5383 24.6263 16.3936 25.3955 18.3681 25.3955H25.7607C25.701 25.4583 25.6383 25.5211 25.5786 25.5839C23.5539 27.6026 20.8605 28.7202 17.9976 28.7202Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
      )}

      {uniqueIdentifier && (
        <div>
          <p>Identificador único: {uniqueIdentifier}</p>
          <p>
            Usa este identificador para hashear tus documentos antes de subirlos
            a IPFS.
          </p>
          <button
            onClick={() => {
              const docContent = prompt(
                "Ingresa el contenido del documento para hashear:"
              );
              if (docContent) {
                const hashedId = getHashedDocumentId(docContent);
                alert(`ID hasheado del documento: ${hashedId}`);
              }
            }}
          >
            Hashear Documento de Prueba
          </button>
        </div>
      )}
    </div>
  );
};

export default WorldIDVerifier;
