import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { IcoArrowLeft, IcoFolder } from './Icons';

interface CustomizePanelProps {
  onClose: () => void;
}

export function CustomizePanel({ onClose }: CustomizePanelProps) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [zoom, setZoom] = useState(1.13);

  return (
    <div className="cust-overlay">
      <motion.button
        className="cust-overlay__scrim"
        aria-label="Close customize"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.aside
        className="cust-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
      >
        <div className="cust-head"><span>Customize</span></div>

        <motion.div
          className="cust-nums"
          initial="hide"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}
        >
          {[1, 1, 1].map((n, i) => (
            <motion.div
              key={i}
              className="cust-num"
              variants={{ hide: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
            >
              {n}
            </motion.div>
          ))}
        </motion.div>

        <Slider label="Cover X Offset" value={x}    setValue={setX}    min={-2}  max={2} step={0.01} delay={0.18} />
        <Slider label="Cover Y Offset" value={y}    setValue={setY}    min={-2}  max={2} step={0.01} delay={0.24} />
        <Slider label="Cover Zoom"     value={zoom} setValue={setZoom} min={0.5} max={2} step={0.01} delay={0.3} />

        <motion.button
          className="cust-set"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.36, type: 'spring', stiffness: 300, damping: 24 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97, y: 1 }}
        >
          <IcoFolder className="ico" />
          <span>Set Custom</span>
        </motion.button>
      </motion.aside>
    </div>
  );
}

function Slider({
  label, value, setValue, min, max, step, delay,
}: {
  label: string; value: number; setValue: (n: number) => void;
  min: number; max: number; step: number; delay: number;
}) {
  return (
    <motion.div
      className="cust-field"
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 26 }}
    >
      <label>{label}</label>
      <div className="cust-row">
        <motion.button
          className="cust-arrow"
          onClick={() => setValue(Math.max(min, +(value - step * 10).toFixed(2)))}
          whileTap={{ scale: 0.9, y: 2 }}
          aria-label={`Decrease ${label}`}
        >
          <IcoArrowLeft className="ico" />
        </motion.button>
        <div className="cust-track" style={{ '--p': `${((value - min) / (max - min)) * 100}%` } as CSSProperties}>
          <div className="cust-track__fill" style={{ width: `${((value - min) / (max - min)) * 100}%` }} />
          <input
            type="range" min={min} max={max} step={step} value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            aria-label={label}
          />
          <span className="cust-track__value">{value.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
}
