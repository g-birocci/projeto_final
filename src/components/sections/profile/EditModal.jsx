"use client";
import { motion } from "framer-motion";

export default function EditModal({ form, onChange, error, onSave, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6"
      >
        <h2 className="text-lg font-semibold text-[var(--ecodoa-primary)] mb-4">
          Editar Perfil
        </h2>

        <FormField label="Nome">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-lg border border-[var(--ecodoa-soft)] outline-none focus:border-[var(--ecodoa-accent)]"
          />
        </FormField>

        <FormField label="E-mail">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-lg border border-[var(--ecodoa-soft)] outline-none focus:border-[var(--ecodoa-accent)]"
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </FormField>

        <FormField label="Cidade">
          <input
            name="city"
            value={form.city}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-lg border border-[var(--ecodoa-soft)] outline-none focus:border-[var(--ecodoa-accent)]"
          />
        </FormField>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onCancel}
            className="text-sm text-gray-600 hover:text-[var(--ecodoa-primary)]"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-sm bg-[var(--ecodoa-accent)] text-white rounded-lg hover:opacity-90"
          >
            Guardar
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium text-[var(--ecodoa-primary)] mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
