import { useState } from "react";
import { FaBell } from "react-icons/fa";

export default function Notificacoes({ lista }) {
  const [aberto, setAberto] = useState(false);
  const naoLidas = lista.filter((n) => !n.lida);

  return (
    <div className="relative"> {/* Removido absolute positioning, agora é um componente normal */}
      <button
        onClick={() => setAberto(!aberto)}
        className="relative p-2 rounded-full "
      >
        <FaBell className="h-6 w-6 text-ecodoa-light-oliv" />
        {naoLidas.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {naoLidas.length}
          </span>
        )}
      </button>

      {aberto && (
        <div className="absolute right-0 mt-2 w-80 bg-ecodoa-soft border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {lista.length === 0 ? (
              <li className="p-4 text-sm text-gray-500">Sem notificações</li>
            ) : (
              lista.map((n, i) => (
                <li key={i} className="p-4 hover:bg-gray-50">
                  <p className="text-sm font-medium text-ecodoa-primary">{n.titulo}</p>
                  <p className="text-xs text-muted-foreground">{n.descricao}</p>
                  <span className="text-xs text-ecodoa-olive">{n.hora}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
