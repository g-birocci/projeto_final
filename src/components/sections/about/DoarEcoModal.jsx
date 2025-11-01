"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, HeartHandshake } from "lucide-react";

export default function DoarEcoDoaModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* ===== Container do modal ===== */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white text-[#1E2D2F] rounded-t-3xl shadow-2xl w-full max-w-md mx-auto p-4 sm:p-6"
          >
            {/* ===== Botão de fechar ===== */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* ===== Ícone e título ===== */}
            <div className="flex justify-center mt-4 mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <HeartHandshake className="w-8 h-8 text-[var(--ecodoa-primary)]" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[var(--ecodoa-primary)] mb-2">
              Obrigado por querer apoiar o EcoDoa!
            </h2>

            <p className="text-[#1E2D2F]/80 mb-4 leading-relaxed text-sm sm:text-base">
              As tuas contribuições ajudam-nos a manter o site ativo, melhorar recursos e
              continuar a promover solidariedade e sustentabilidade.
            </p>

            {/* ===== IBAN e MBWay ===== */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-left mb-4 text-sm sm:text-base">
              <p className="font-semibold text-[var(--ecodoa-primary)]">IBAN:</p>
              <p className="text-[#1E2D2F]/80 select-all">
                PT50 0018 0003 1234 5678 9017 5
              </p>
              <p className="mt-3 font-semibold text-[var(--ecodoa-primary)]">MBWay:</p>
              <p className="text-[#1E2D2F]/80 select-all">+351 912 345 678</p>
            </div>

            {/* ===== Botão Fechar ===== */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[var(--ecodoa-primary)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--ecodoa-secondary)] transition"
            >
              Fechar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
