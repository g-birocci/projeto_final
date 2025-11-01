"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export default function DoarEcoModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 25 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white w-[90%] max-w-xs rounded-2xl shadow-lg p-5 text-center text-[#1E2D2F]"
          >
            {/* botão fechar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* logo centralizada */}
            <div className="flex justify-center mt-2 mb-4">
              <Image
                src="/img/EcoDoa.svg"
                alt="Logo EcoDoa"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            {/* título e texto */}
            <h2 className="text-lg font-bold text-[var(--ecodoa-primary)] mb-2">
             Quero ajudar o EcoDoa!
            </h2>

            <p className="text-[#1E2D2F]/80 mb-4 text-sm leading-relaxed">
              As tuas contribuições ajudam-nos a manter o projeto ativo e a
              fortalecer a rede de solidariedade e sustentabilidade.
            </p>

            {/* dados de doação */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-left mb-4">
              <p className="font-semibold text-[var(--ecodoa-primary)] text-sm">IBAN:</p>
              <p className="text-xs text-[#1E2D2F]/80 select-all">
                PT50 0018 0003 1234 5678 9017 5
              </p>
              <p className="mt-2 font-semibold text-[var(--ecodoa-primary)] text-sm">MBWay:</p>
              <p className="text-xs text-[#1E2D2F]/80 select-all">+351 912 345 678</p>
            </div>

            {/* botão fechar */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[var(--ecodoa-primary)] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[var(--ecodoa-accent)] transition"
            >
              Fechar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
