import React from "react";
import { motion } from "framer-motion";

function Motion({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 2, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

export default Motion;
