"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, HeartHandshake } from "lucide-react";

export default function DoarEcoDoaModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Container do modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white text-[#1E2D2F] rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
          >
            {/* Botão de fechar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Ícone e título */}
            <div className="flex justify-center mb-5">
              <div className="bg-green-100 p-4 rounded-full">
                <HeartHandshake className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              Obrigado por querer apoiar o EcoDoa 🌱
            </h2>

            <p className="text-[#1E2D2F]/80 mb-6 leading-relaxed">
              As tuas contribuições ajudam-nos a manter o site ativo,  
              melhorar recursos e continuar a promover solidariedade e sustentabilidade.
            </p>

            {/* IBAN fictício / área de doação */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-left mb-6">
              <p className="font-semibold text-green-700">💳 IBAN:</p>
              <p className="text-sm text-[#1E2D2F]/80 select-all">
                PT50 0018 0003 1234 5678 9017 5
              </p>
              <p className="mt-3 font-semibold text-green-700">📱 MBWay:</p>
              <p className="text-sm text-[#1E2D2F]/80 select-all">+351 912 345 678</p>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Fechar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
