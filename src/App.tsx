// Skolechips Portal - Updated for GitHub Sync
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X,
  Mail
} from "lucide-react";
import AppCard from "./components/AppCard";
// External images for reliable hosting
const skolechipsLogo = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774287929/skolechips-logo_d5yfrl.png";
const rytmeboksPreview = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774287926/Sk%C3%A6rmbillede_2026-03-23_kl._16.09.07_n2ejkt.png";
const bouncyTimerPreview = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774287926/Sk%C3%A6rmbillede_2026-03-23_kl._16.06.59_bszrge.png";
const gruppepachinkoPreview = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774287935/Sk%C3%A6rmbillede_2026-03-23_kl._16.06.31_utxx5n.png";
const laeserollerPreview = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774287939/Sk%C3%A6rmbillede_2026-03-23_kl._16.06.18_kneq6u.png";
const klassebingoPreview = "https://res.cloudinary.com/dtw8jfk0k/image/upload/v1774303560/Sk%C3%A6rmbillede_2026-03-23_kl._23.05.36_kloqtk.png";

export default function App() {
  const [showContact, setShowContact] = useState(false);

  const apps = [
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
      title: "Bouncy Timer",
      description: "Et visuelt og legende stopur.",
      image: bouncyTimerPreview,
      url: "https://bouncytimer.skolechips.dk/",
    },
    {
      title: "Klassebingo",
      description: "Print plader og spil bingo fælles i klassen.",
      image: klassebingoPreview,
      url: "https://klassebingo.skolechips.dk/",
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 font-sans selection:bg-orange-100">
      {/* Hero Section */}
      <header className="pt-8 pb-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl"
          >
            {/* Det uploade logo fra Skolechips */}
            <img 
              src={skolechipsLogo} 
              alt="Skolechips Logo" 
              className="w-full h-auto rounded-3xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </header>

      {/* Apps Grid */}
      <main className="max-w-4xl mx-auto px-6 pb-32">
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
      <footer className="fixed bottom-8 right-8 z-40">
        <button 
          onClick={() => setShowContact(!showContact)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
            showContact 
              ? 'bg-gray-900 text-white border-gray-900' 
              : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200 hover:text-gray-600 shadow-sm'
          }`}
        >
          <Mail className="w-4 h-4" />
          Kontakt
        </button>
      </footer>

      {/* Contact Card positioned near button */}
      <AnimatePresence>
        {showContact && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10, x: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10, x: 10 }}
            className="fixed bottom-24 right-8 z-50 w-full max-w-[280px]"
          >
            <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative">
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
