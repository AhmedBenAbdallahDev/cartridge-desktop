import { motion } from 'framer-motion';

export function LaunchFlash({ name }: { name: string }) {
  return (
    <motion.div
      className="launch-flash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="launch-flash__ring"
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: 6, opacity: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
      <motion.div
        className="launch-flash__copy"
        initial={{ y: 24, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22, delay: 0.1 }}
      >
        <div className="launch-flash__label">NOW LOADING</div>
        <div className="launch-flash__name">{name}</div>
        <div className="launch-flash__bar"><span /></div>
      </motion.div>
    </motion.div>
  );
}
