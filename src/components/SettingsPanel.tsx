import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  IcoController, IcoTrophy, IcoPalette, IcoChat, IcoInfo, IcoHeart,
  IcoScan, IcoEdit, IcoPlus, IcoDiscord,
} from './Icons';

interface SettingsPanelProps {
  onClose: () => void;
  time: string;
  battery: number;
}

type Section = 'Platforms' | 'Achievements' | 'Appearance' | 'Feedback' | 'About' | 'Donate';

const sections: { id: Section; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'Platforms',    label: 'Platforms',    icon: IcoController },
  { id: 'Achievements', label: 'Achievements', icon: IcoTrophy },
  { id: 'Appearance',   label: 'Appearance',   icon: IcoPalette },
  { id: 'Feedback',     label: 'Feedback',     icon: IcoChat },
  { id: 'About',        label: 'About',        icon: IcoInfo },
  { id: 'Donate',       label: 'Donate',       icon: IcoHeart },
];

interface Toggle { id: string; label: string; on: boolean; }

const initialToggles: Toggle[] = [
  { id: 'fmt',  label: 'Use 24-Hour Format',         on: true  },
  { id: 'sec',  label: 'Display Seconds',            on: false },
  { id: 'anim', label: 'Realistic Insert Animation', on: true  },
];

const tap = { whileTap: { scale: 0.95, y: 1 }, transition: { type: 'spring' as const, stiffness: 400, damping: 20 } };

export function SettingsPanel({ onClose, time, battery }: SettingsPanelProps) {
  const [section, setSection] = useState<Section>('Platforms');
  const [toggles, setToggles] = useState(initialToggles);

  const toggle = (id: string) =>
    setToggles((cur) => cur.map((t) => (t.id === id ? { ...t, on: !t.on } : t)));

  return (
    <motion.div
      className="settings-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="settings-stage"
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        {/* Top bar */}
        <div className="settings-top">
          <div className="chip chip--time">{time}</div>
          <div className="platform-pill"><span className="platform-pill__text">Settings</span></div>
          <div className="chip chip--battery">
            <span>{battery}%</span>
            <span className="chip__wifi" />
          </div>
        </div>

        {/* Sidebar nav */}
        <nav className="settings-nav" aria-label="Settings navigation">
          {sections.map((s, i) => {
            const Icon = s.icon;
            const isActive = section === s.id;
            const isDonate = s.id === 'Donate';
            return (
              <motion.button
                key={s.id}
                className={`nav-item ${isActive ? 'is-active' : ''} ${isDonate ? 'nav-item--donate' : ''}`}
                onClick={() => setSection(s.id)}
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.06 * i + 0.1, type: 'spring', stiffness: 300, damping: 24 }}
                whileHover={{ x: isActive ? 0 : 4 }}
                whileTap={{ scale: 0.97 }}
              >
                {isActive && (
                  <motion.span layoutId="navActive" className="nav-item__bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="nav-icon"><Icon className="ico" /></span>
                <span className="nav-item__label">{s.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Right panel content */}
        <div className="settings-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              className="settings-panel__inner"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 0.7, 0.3, 1] }}
            >
              {section === 'Platforms' && <PlatformsPanel />}
              {section === 'Appearance' && <AppearancePanel toggles={toggles} onToggle={toggle} />}
              {section === 'Achievements' && <Placeholder icon={<IcoTrophy className="ico" />} title="Achievements" subtitle="No achievements yet — go play something!" />}
              {section === 'Feedback' && <Placeholder icon={<IcoChat className="ico" />} title="Feedback" subtitle="Tell us what you think of the launcher." />}
              {section === 'About' && <AboutPanel />}
              {section === 'Donate' && <DonatePanel />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="settings-foot">
          <motion.button className="foot-btn foot-btn--close" onClick={onClose} {...tap} whileHover={{ y: -2 }}>
            <span className="face-btn">B</span>
            <span>Close</span>
          </motion.button>
          <motion.button className="foot-btn foot-btn--disc" {...tap} whileHover={{ y: -2 }}>
            <span className="foot-ico"><IcoDiscord className="ico" /></span>
            <span>Discord</span>
          </motion.button>
          <motion.button className="foot-btn foot-btn--add" {...tap} whileHover={{ y: -2 }}>
            <span className="foot-ico"><IcoPlus className="ico" /></span>
            <span>Add Platform</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PanelHeader({ icon, title, paths, actions }: {
  icon: React.ReactNode; title: string; paths?: string[]; actions?: React.ReactNode;
}) {
  return (
    <div className="panel-header">
      <div className="panel-title">
        <div className="panel-title__top">
          <span className="panel-title__ico">{icon}</span>
          <span>{title}</span>
        </div>
        {paths && (
          <div className="panel-title__paths">
            {paths.map((p) => <span key={p}>{p}</span>)}
          </div>
        )}
      </div>
      {actions && <div className="panel-actions">{actions}</div>}
    </div>
  );
}

function PlatformsPanel() {
  return (
    <PanelHeader
      icon={<IcoController className="ico" />}
      title="PSP - PlayStation Portable"
      paths={['~/.config/openemu/psp', 'org.ppsspp.ppsspp']}
      actions={
        <>
          <motion.button className="btn btn--blue" {...tap} whileHover={{ y: -2 }}>
            <span className="btn__ico"><IcoScan className="ico" /></span>
            <span>Scan</span>
          </motion.button>
          <motion.button className="btn btn--yellow" {...tap} whileHover={{ y: -2 }}>
            <span className="btn__ico"><IcoEdit className="ico" /></span>
            <span>Edit</span>
          </motion.button>
        </>
      }
    />
  );
}

function AppearancePanel({ toggles, onToggle }: { toggles: Toggle[]; onToggle: (id: string) => void }) {
  return (
    <>
      <PanelHeader icon={<IcoPalette className="ico" />} title="Appearance" />
      <div className="toggle-list">
        {toggles.map((t, i) => (
          <motion.button
            key={t.id}
            className="toggle-row"
            onClick={() => onToggle(t.id)}
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.05 * i, type: 'spring', stiffness: 320, damping: 26 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span>{t.label}</span>
            <motion.span
              className={`toggle-pill ${t.on ? 'is-on' : 'is-off'}`}
              animate={{ scale: [1, 1.12, 1] }}
              key={String(t.on)}
              transition={{ duration: 0.28 }}
            >
              {t.on ? 'On' : 'Off'}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </>
  );
}

function AboutPanel() {
  return (
    <>
      <PanelHeader icon={<IcoInfo className="ico" />} title="About" />
      <div className="panel-copy">
        <p>Retro Launcher v2.0</p>
        <p>A nostalgic frontend for emulated platforms,</p>
        <p>built with love for cartridge collectors.</p>
      </div>
    </>
  );
}

function DonatePanel() {
  return (
    <>
      <PanelHeader icon={<IcoHeart className="ico" />} title="Donate" />
      <div className="panel-copy">
        <p>Support development &amp; keep the cartridges spinning!</p>
      </div>
    </>
  );
}

function Placeholder({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <>
      <PanelHeader icon={icon} title={title} />
      <div className="panel-copy"><p>{subtitle}</p></div>
    </>
  );
}
