import React, { useEffect, useState } from 'react';
import { MapPin, Loader2, AlertCircle, Navigation } from 'lucide-react';
import { Button } from './ui/button';

/**
 * LocationMap
 *  - Asks the browser for the user's geolocation
 *  - Reverse-geocodes the coordinates with OpenStreetMap Nominatim (no API key)
 *  - Embeds an OpenStreetMap iframe centered on the user's coords
 *  - Calls onAddress(string) once a human-readable address is known
 */
const LocationMap = ({ onAddress, compact = false }) => {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | ok | denied | error
  const [errorMsg, setErrorMsg] = useState('');

  const requestLocation = () => {
    if (!('geolocation' in navigator)) {
      setStatus('error');
      setErrorMsg('Seu navegador não suporta geolocalização.');
      return;
    }
    setStatus('loading');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=pt-BR`,
            { headers: { 'Accept': 'application/json' } }
          );
          if (r.ok) {
            const data = await r.json();
            const a = data.address || {};
            const parts = [
              a.road,
              a.suburb || a.neighbourhood,
              a.city || a.town || a.village || a.municipality,
              a.state,
            ].filter(Boolean);
            const display = parts.join(', ') || data.display_name || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
            setAddress(display);
            if (onAddress) onAddress(display);
          } else {
            const fallback = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
            setAddress(fallback);
            if (onAddress) onAddress(fallback);
          }
        } catch (e) {
          const fallback = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
          setAddress(fallback);
          if (onAddress) onAddress(fallback);
        }
        setStatus('ok');
      },
      (err) => {
        if (err.code === 1) {
          setStatus('denied');
          setErrorMsg('Permissão de localização negada. Você pode permitir nas configurações do navegador.');
        } else {
          setStatus('error');
          setErrorMsg(err.message || 'Não foi possível obter sua localização.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  useEffect(() => {
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapHeight = compact ? 'h-40' : 'h-56';

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white" data-testid="location-map">
      <div className="px-3 py-2 flex items-center justify-between bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-700">
          <MapPin className="w-3.5 h-3.5 text-green-600" />
          <span className="font-medium">Sua localização</span>
        </div>
        <button
          onClick={requestLocation}
          className="text-[11px] text-green-600 hover:text-green-700 inline-flex items-center gap-1"
          data-testid="locate-me-btn"
          type="button"
        >
          <Navigation className="w-3 h-3" /> Atualizar
        </button>
      </div>

      {status === 'loading' && (
        <div className={`${mapHeight} flex flex-col items-center justify-center text-gray-500 text-xs gap-2`}>
          <Loader2 className="w-5 h-5 animate-spin" />
          Obtendo sua localização...
        </div>
      )}

      {(status === 'denied' || status === 'error') && (
        <div className={`${mapHeight} flex flex-col items-center justify-center text-center text-xs text-gray-600 gap-2 px-4`}>
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <p>{errorMsg}</p>
          <Button size="sm" variant="outline" onClick={requestLocation} className="text-xs h-7" type="button">
            Tentar novamente
          </Button>
        </div>
      )}

      {status === 'ok' && coords && (
        <>
          <iframe
            title="Mapa da minha localização"
            data-testid="location-iframe"
            className={`w-full ${mapHeight}`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.005}%2C${coords.lat - 0.003}%2C${coords.lng + 0.005}%2C${coords.lat + 0.003}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {address && (
            <div className="px-3 py-2 text-xs text-gray-700 bg-white border-t border-gray-100" data-testid="location-address">
              {address}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationMap;
