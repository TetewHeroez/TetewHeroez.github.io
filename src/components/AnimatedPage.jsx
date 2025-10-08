// src/components/AnimatedPage.jsx
import { motion } from "framer-motion";

// Definisikan varian animasi
const animations = {
  initial: { opacity: 0, x: -50 }, // Mulai dari transparan dan sedikit ke kiri
  animate: { opacity: 1, x: 0 }, // Animasikan menjadi terlihat dan di posisi normal
  exit: { opacity: 0, x: 50 }, // Animasikan keluar menjadi transparan dan sedikit ke kanan
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }} // Atur durasi dan efek transisi
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
