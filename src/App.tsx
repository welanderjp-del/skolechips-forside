// Skolechips Portal - Updated for GitHub Sync
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X,
  Mail,
  ShieldAlert,
  Volume2,
  VolumeX
} from "lucide-react";
import AppCard from "./components/AppCard";
// External images for reliable hosting
const skolechipsLogo = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774287929/skolechips-logo_d5yfrl.png";
const rytmeboksPreview = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774287926/Sk%C3%A6rmbillede_2026-03-23_kl._16.09.07_n2ejkt.png";
const chipstimerPreview = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774287926/Sk%C3%A6rmbillede_2026-03-23_kl._16.06.59_bszrge.png";
const gruppepachinkoPreview = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774287935/Sk%C3%A6rmbillede_2026-03-23_kl._16.06.31_utxx5n.png";
const laeserollerPreview = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774287939/Sk%C3%A6rmbillede_2026-03-23_kl._16.06.18_kneq6u.png";
const klassebingoPreview = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774303560/Sk%C3%A6rmbillede_2026-03-23_kl._23.05.36_kloqtk.png";
const initiativLogo = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774698820/f03e22e2-f452-4470-8af5-32440138e2eb_mtcus0.png";

// D&D Mode Assets
const dndLogo = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774713694/eb383981-f797-4935-9d0e-dd2c98a98b4f_uum9oe.png";
const dndBackground = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774710107/450851ca-1e24-46b7-bf8c-005062cd67bd_ctgtzj.png";
const dndSong = "https://res.cloudinary.com/dtw8jfk0k/video/upload/v1774707181/Na%CC%8Ar_Terningerne_Falder_xf7uht.mp3";
const windLoop = "https://assets.mixkit.co/active_storage/sfx/444/444-preview.mp3";
const initiativTrackerPreview = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774707531/Sk%C3%A6rmbillede_2026-03-28_kl._15.18.34_kkardy.png";

export default function App() {
  const [showContact, setShowContact] = useState(false);
  const [isDnDMode, setIsDnDMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dndConfirmState, setDndConfirmState] = useState<'idle' | 'confirm'>('idle');
  const songRef = useRef<HTMLAudioElement | null>(null);
  const windRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isDnDMode) {
      // Main song
      if (!songRef.current) {
        songRef.current = new Audio(dndSong);
        songRef.current.loop = false; // Play only once
      }
      
      // Wind loop (Crowd)
      if (!windRef.current) {
        windRef.current = new Audio(windLoop);
        windRef.current.loop = true;
      }

      const checkTime = () => {
        if (songRef.current && windRef.current) {
          const timeLeft = songRef.current.duration - songRef.current.currentTime;
          if (timeLeft <= 5 && windRef.current.paused) {
            windRef.current.play().catch(e => console.error("Wind loop failed:", e));
          }
        }
      };

      songRef.current.addEventListener('timeupdate', checkTime);
      songRef.current.play().catch(e => console.error("Song play failed:", e));

      return () => {
        if (songRef.current) {
          songRef.current.removeEventListener('timeupdate', checkTime);
        }
      };
    } else {
      if (songRef.current) {
        songRef.current.pause();
        songRef.current.currentTime = 0;
      }
      if (windRef.current) {
        windRef.current.pause();
        windRef.current.currentTime = 0;
      }
    }
  }, [isDnDMode]);

  // Separate effect for volume to prevent song restart
  useEffect(() => {
    if (songRef.current) {
      songRef.current.volume = isMuted ? 0 : 0.6;
    }
    if (windRef.current) {
      windRef.current.volume = isMuted ? 0 : 0.1;
    }
  }, [isMuted, isDnDMode]);

  const normalApps = [
    {
      title: "Læseroller",
      description: "Digital understøttelse af sjove og anderledes læseroller.",
      image: laeserollerPreview,
      url: "https://laeseroller.skolechips.dk/",
    },
    {
      title: "Rytmeboks",
      description: "Nem notation til musikundervisningen.",
      image: rytmeboksPreview,
      url: "https://rytmeboks.skolechips.dk/",
    },
    {
      title: "Gruppepachinko",
      description: "Lad pachinko-kuglerne bestemme dine tilfældige grupper.",
      image: gruppepachinkoPreview,
      url: "https://gruppepachinko.skolechips.dk/",
    },
    {
      title: "Chipstimer",
      description: "Et visuelt og legende stopur.",
      image: chipstimerPreview,
      url: "https://chipstimer.skolechips.dk/",
    },
    {
      title: "Klassebingo",
      description: "Print plader og spil bingo fælles i klassen.",
      image: klassebingoPreview,
      url: "https://klassebingo.skolechips.dk/",
    }
  ];

  const dndApps = [
    {
      title: "Initiativ-tracker",
      description: "Hold styr på turen i dine D&D kampe.",
      image: initiativTrackerPreview,
      url: "https://initiativ.skolechips.dk/",
    }
  ];

  const apps = isDnDMode ? dndApps : normalApps;

  const handleDnDClick = () => {
    if (isDnDMode) {
      // Immediate return to normal
      setIsDnDMode(false);
    } else if (dndConfirmState === 'idle') {
      setDndConfirmState('confirm');
      // Reset after 3 seconds if not clicked again
      setTimeout(() => setDndConfirmState('idle'), 3000);
    } else {
      startTransition(() => {
        setIsDnDMode(true);
        setDndConfirmState('idle');
      });
    }
  };

  const startTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800); // Fade back in
    }, 1200); // Stay dark for a bit
  };

  return (
    <div className={`min-h-screen transition-colors duration-[2000ms] font-sans selection:bg-orange-100 relative overflow-x-hidden flex flex-col ${isDnDMode ? 'bg-black text-white' : 'bg-[#fcfcfc] text-gray-900'}`}>
      
      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-black"
          />
        )}
      </AnimatePresence>

      {/* D&D Background */}
      {isDnDMode && (
        <>
          <div 
            className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50 transition-opacity duration-[2000ms]"
            style={{ backgroundImage: `url(${dndBackground})` }}
          />
          {/* Layered Flicker/Torch Effects */}
          <div className="fixed inset-0 z-10 pointer-events-none">
            {/* Base warm glow - more visible */}
            <div className="absolute inset-0 bg-orange-500/10 fire-glow-base" />
            
            {/* Localized torch lights - increased intensity */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,120,0,0.3)_0%,transparent_60%)] flicker-1" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,100,0,0.25)_0%,transparent_55%)] flicker-2" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(255,140,0,0.2)_0%,transparent_50%)] flicker-3" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(255,80,0,0.15)_0%,transparent_45%)] flicker-1" />
            
            {/* Darker vignettes to contain the light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_10%,rgba(0,0,0,0.5)_100%)]" />
          </div>
        </>
      )}

      {/* Hero Section */}
      <header className={`relative z-20 transition-all duration-1000 flex flex-col items-center text-center ${isDnDMode ? 'pt-4 pb-12 px-6' : 'pt-8 pb-8 px-6'}`}>
        <div className={`max-w-4xl mx-auto w-full flex flex-col items-center`}>
          <motion.div
            key={isDnDMode ? 'dnd' : 'normal'}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={`w-full ${isDnDMode ? 'max-w-[180px]' : 'max-w-xl'}`}
          >
            {/* Det uploade logo fra Skolechips / D&D Logo */}
            <img 
              src={isDnDMode ? dndLogo : skolechipsLogo} 
              alt={isDnDMode ? "D&D Logo" : "Skolechips Logo"} 
              className={`w-full h-auto ${isDnDMode ? '' : 'rounded-3xl'}`}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </header>

      {/* Apps Grid */}
      <main className={`max-w-4xl mx-auto px-6 relative z-20 w-full ${isDnDMode ? 'flex-1 flex flex-col justify-start pb-12' : 'pb-32'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
          {apps.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex justify-center"
            >
              <AppCard {...app} />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Less anonymous Contact Link in corner */}
      <footer className="fixed bottom-8 right-8 z-40 flex items-center gap-3">
        {isDnDMode && (
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all shadow-sm"
            title={isMuted ? "Slå lyd til" : "Slå lyd fra"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
        <button 
          onClick={handleDnDClick}
          className={`h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-500 overflow-hidden group border ${
            isDnDMode 
              ? 'bg-red-900/20 border-red-900/50 hover:bg-red-900/40 w-auto px-4 gap-2' 
              : dndConfirmState === 'confirm'
                ? 'bg-red-600 border-red-700 text-white w-auto px-4 gap-2 dnd-glow'
                : 'bg-white border-gray-100 hover:border-gray-200 w-10'
          }`}
        >
          <img 
            src={initiativLogo} 
            alt="Initiativ Logo" 
            className={`w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300 ${dndConfirmState === 'confirm' ? 'brightness-0 invert' : ''}`}
            referrerPolicy="no-referrer"
          />
          {isDnDMode && <span className="text-xs font-bold text-red-100 whitespace-nowrap">Tilbage til skolechips</span>}
          {dndConfirmState === 'confirm' && <span className="text-xs font-bold whitespace-nowrap">Er du klar?</span>}
        </button>
        <button 
          onClick={() => setShowContact(!showContact)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
            showContact 
              ? 'bg-gray-900 text-white border-gray-900' 
              : isDnDMode
                ? 'bg-white/10 text-white/60 border-white/10 hover:border-white/20 hover:text-white shadow-sm'
                : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200 hover:text-gray-600 shadow-sm'
          }`}
        >
          <Mail className="w-4 h-4" />
          Kontakt
        </button>
      </footer>

      {/* Confirmation Modal removed as per request */}

      {/* Contact Card positioned near button */}
      <AnimatePresence>
        {showContact && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10, x: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10, x: 10 }}
            className="fixed bottom-24 right-8 z-50 w-full max-w-[280px]"
          >
            <div className="bg-white text-gray-900 border border-gray-100 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative">
              <button 
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 p-2 text-gray-200 hover:text-gray-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="text-xl font-black mb-1 tracking-tight">Sebastian Welander</h3>
                <p className="text-gray-400 font-medium text-xs select-all">welander.se@gmail.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
