export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full p-6 text-center text-sm text-[#D6D58E] border-t border-[#9FC131]/30 backdrop-blur-sm bg-[#005C53]/90">
      <p className="mb-2 text-[#DBF227] font-medium tracking-wide">
        © {new Date().getFullYear()} - EcoDoa </p>
    </footer>
  );
}

