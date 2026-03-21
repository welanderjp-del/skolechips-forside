import { motion } from "motion/react";

interface AppCardProps {
  title: string;
  description: string;
  image?: string;
  url: string;
}

export default function AppCard({ title, description, image, url }: AppCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_12px_30px_rgb(0,0,0,0.05)] group max-w-[300px] w-full"
    >
      <div className="relative">
        {image ? (
          <div className="aspect-[4/3] overflow-hidden bg-gray-50">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center">
            <span className="text-gray-300 text-xs font-medium italic">Intet billede</span>
          </div>
        )}
        
        {/* Title in a box closer to the image */}
        <div className="absolute -bottom-4 left-6">
          <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm">
            <h3 className="text-lg font-black text-gray-900 tracking-tight">{title}</h3>
          </div>
        </div>
      </div>
      
      <div className="pt-8 pb-8 px-6">
        <p className="text-gray-400 text-sm leading-relaxed font-medium">{description}</p>
      </div>
    </motion.a>
  );
}
