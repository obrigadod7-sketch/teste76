import React, { useState } from 'react';
import { Copy, Check, Building2, Key, Landmark } from 'lucide-react';
import { Button } from './ui/button';

const PIX_INFO = {
  qrImage: '/assets/qr-pix.png',
  empresa: '51.965.652 ERI JONHSON DE SOUSA CARVALHO',
  chave: '3ef11200-bebf-4d88-930c-48e84b11cfc4',
  instituicao: 'NU PAGAMENTOS - IP',
};

const PixCard = ({ amount, compact = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_INFO.chave);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = PIX_INFO.chave;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3" data-testid="pix-card">
      <div className="flex flex-col items-center">
        <div className={`bg-white p-2 rounded-lg border border-gray-200 ${compact ? 'w-44 h-44' : 'w-56 h-56'}`}>
          <img
            src={PIX_INFO.qrImage}
            alt="QR Code Pix"
            className="w-full h-full object-contain"
            data-testid="pix-qr-image"
          />
        </div>
        {amount !== undefined && (
          <p className="mt-2 text-sm text-gray-600">
            Valor: <span className="font-semibold text-gray-900">R$ {Number(amount).toFixed(2)}</span>
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1 text-center">Escaneie o QR Code com o app do seu banco</p>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2">
          <Building2 className="w-3.5 h-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-gray-500">Empresa</p>
            <p className="font-medium text-gray-900 break-words">{PIX_INFO.empresa}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Key className="w-3.5 h-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-gray-500">Chave Pix</p>
            <p className="font-mono text-gray-900 break-all">{PIX_INFO.chave}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Landmark className="w-3.5 h-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-gray-500">Instituição</p>
            <p className="font-medium text-gray-900">{PIX_INFO.instituicao}</p>
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleCopy}
        variant={copied ? 'default' : 'outline'}
        className={`w-full h-9 text-xs ${copied ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
        data-testid="copy-pix-key-btn"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 mr-1.5" /> Chave copiada!
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 mr-1.5" /> Copiar chave Pix
          </>
        )}
      </Button>
    </div>
  );
};

export default PixCard;
