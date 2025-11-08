"use client";
import { useState, useEffect } from "react";
import QRCode from "qrcode";

export default function Checkout() {
  const [pixCode] = useState(
    "00020101021126360014br.gov.bcb.pix0114+55859929907695204000053039865802BR5915GABRIEL MENESES6008PALMACIA62070503***630441C3"
  );

  const [qrImage, setQrImage] = useState("");
  const [packageName, setPackageName] = useState("");

  useEffect(() => {
    QRCode.toDataURL(pixCode).then(setQrImage).catch(console.error);
  }, [pixCode]);

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    alert("Código PIX copiado!");
  };

  return (
    <div className="px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Finalizar Pagamento</h1>

      <label className="block font-medium mb-1">Nome do Pacote</label>
      <input
        type="text"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
        placeholder="Ex: Rio de Janeiro — 5 dias"
        className="w-full border rounded p-3 mb-6"
      />

      <div className="border rounded-lg p-6 mb-8 bg-white shadow">
        <h2 className="text-xl font-semibold mb-3">Pagamento via PIX</h2>

        {qrImage && (
          <img
            src={qrImage}
            alt="QR Code PIX"
            className="w-56 mx-auto mb-4 shadow rounded"
          />
        )}

        <button
          onClick={copyPixCode}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded my-2"
        >
          Copiar Código PIX
        </button>

        <textarea
          readOnly
          value={pixCode}
          className="w-full bg-gray-100 p-3 rounded text-sm mt-2"
          rows={4}
        />

        <a
          href={`https://wa.me/5585992990769?text=${encodeURIComponent(
            `Olá! Já realizei o pagamento via PIX.%0A%0APacote: ${packageName || "Não informado"}%0A%0APor favor, confirme a emissão do voucher.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3 rounded mt-4 font-medium shadow"
        >
          Enviar Comprovante pelo WhatsApp
        </a>
      </div>
    </div>
  );
}
