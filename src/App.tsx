/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'motion/react';
import { MapPin, Calendar, Clock, CheckCircle2, ChevronDown, Home, Sparkles, User, Users, MessageSquare, Music, Music2, Volume2, VolumeX } from 'lucide-react';

// --- COMPONENTS ---

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser. User must interact first."));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.pixabay.com/audio/2022/03/15/audio_226744093c.mp3" // Calm acoustic instrumental
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="p-4 bg-[#1A2F1A] text-white rounded-full shadow-2xl border border-[#C5A059]/30 flex items-center justify-center group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#C5A059]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isPlaying ? (
          <Volume2 size={20} className="animate-pulse" />
        ) : (
          <VolumeX size={20} className="opacity-50" />
        )}
        
        {/* Floating Note Animations when playing */}
        <AnimatePresence>
          {isPlaying && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ opacity: [0, 1, 0], y: -40, x: -10 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="absolute -top-4 left-0 text-[#C5A059]"
              >
                <Music size={12} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ opacity: [0, 1, 0], y: -30, x: 10 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-6 right-0 text-[#C5A059]"
              >
                <Music2 size={10} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.button>
      
      {/* Tooltip */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#FDF6EC] px-3 py-1 rounded-sm paper-shadow border border-[#E6E6D4] whitespace-nowrap pointer-events-none"
      >
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#8B8B7A]">
          {isPlaying ? 'Mute Music' : 'Play Calm Vibe'}
        </span>
      </motion.div>
    </div>
  );
};

const Pelita = ({ className, delay = 0, intensity = 1 }: { className?: string; delay?: number; intensity?: number }) => (
  <motion.div 
    className={`relative ${className} animate-bob`}
    style={{ animationDelay: `${delay}s` }}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
  >
    {/* Stick */}
    <div className="w-3 h-16 bg-[#2D1B0F] rounded-t-full mx-auto shadow-md" />
    
    {/* Outer Glow */}
    <div 
      className="absolute -top-4 left-1/2 w-12 h-12 bg-[#FFD700] rounded-full blur-xl animate-glow-pulse" 
      style={{ 
        animationDelay: `${delay + 0.5}s`,
        opacity: 0.4 * intensity 
      }}
    />
    
    {/* Flame Layers */}
    <div 
      className="absolute -top-3 left-1/2 w-5 h-5 bg-[#FFD700] rounded-full blur-sm animate-flicker animate-sway" 
      style={{ animationDelay: `${delay + 0.2}s` }}
    />
    <div 
      className="absolute -top-2 left-1/2 w-3 h-3 bg-[#FFA500] rounded-full animate-flicker animate-sway" 
      style={{ animationDelay: `${delay + 0.3}s` }}
    />
  </motion.div>
);

const Fireflies = ({ count = 15 }: { count?: number }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.4, 0.8, 0.4, 0],
          x: [
            Math.random() * 100 - 50, 
            Math.random() * 100 - 50, 
            Math.random() * 100 - 50
          ],
          y: [
            Math.random() * 100 - 50, 
            Math.random() * 100 - 50, 
            Math.random() * 100 - 50
          ]
        }}
        transition={{ 
          duration: 10 + Math.random() * 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: Math.random() * 5 
        }}
        className="absolute w-1 h-1 bg-[#FFD700] rounded-full blur-[1px] animate-float"
        style={{ 
          left: `${Math.random() * 100}%`, 
          top: `${Math.random() * 100}%` 
        }}
      />
    ))}
  </div>
);

const GuestWall = () => {
  const [notes, setNotes] = useState([
    { id: 1, name: 'Zainal', message: 'Selamat Hari Raya! Semoga ceria selalu di samping keluarga tercinta.', rotate: -3, x: 0, y: 0, color: '#FFF9E5' },
    { id: 2, name: 'Saisyah', message: 'Maaf Zahir & Batin. Rindu nak makan ketupat dan rendang Mak!', rotate: 4, x: 85, y: -2, color: '#FDF6EC' },
    { id: 3, name: 'Ahmad', message: 'Teratak Arshad & Suraya sentiasa di hati. Jumpa nanti kawan-kawan!', rotate: -2, x: 45, y: 35, color: '#FFF4E0' },
    { id: 4, name: 'Fatimah', message: 'Semoga Syawal kali ini membawa seribu rahmat buat kita semua.', rotate: 2, x: -2, y: 65, color: '#FFF9E5' },
    { id: 5, name: 'Hafiz', message: 'Tak sabar nak beraya di Teratak Arshad & Suraya! See you guys soon!', rotate: -4, x: 90, y: 60, color: '#FDF6EC' },
    { id: 6, name: 'Aminah', message: 'Raya kali ini pasti lebih bermakna. Maaf Zahir Batin!', rotate: 3, x: 12, y: 15, color: '#FFF4E0' },
    { id: 7, name: 'Kamal', message: 'Selamat Hari Raya Aidilfitri kepada semua!', rotate: -1, x: 65, y: 75, color: '#FFF9E5' },
    { id: 8, name: 'Siti', message: 'Meriahnya raya tahun ni! Jumpa di Teratak Arshad & Suraya!', rotate: 5, x: 30, y: 2, color: '#FDF6EC' },
    { id: 9, name: 'Johari', message: 'Semoga ikatan kekeluargaan kita semakin erat.', rotate: -3, x: 72, y: 22, color: '#FFF4E0' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ name: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.name && newNote.message) {
      const colors = ['#FFF9E5', '#FDF6EC', '#FFF4E0'];
      const note = {
        id: Date.now(),
        ...newNote,
        rotate: Math.random() * 10 - 5,
        x: Math.random() * 85 + 2,
        y: Math.random() * 85 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setNotes([...notes, note]);
      setNewNote({ name: '', message: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="relative w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16"
    >
      <div className="text-center space-y-1 mb-4 relative z-10">
        <h2 className="text-3xl lg:text-4xl font-serif italic text-[#FDF6EC]">Ucapan & Doa</h2>
        <p className="text-[8px] text-[#C5A059] uppercase tracking-[0.4em] font-mono">Dinding Ingatan</p>
        <div className="w-12 h-[1px] bg-[#C5A059] mx-auto" />
      </div>

      <div className="relative w-full max-w-[1900px] h-[40vh] min-h-[300px] bg-[#FDF6EC]/40 rounded-sm border border-[#E6E6D4]/60 overflow-hidden paper-shadow group">
        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#1A2F1A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Scattered Notes */}
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [0, -8, 0],
                rotate: note.rotate 
              }}
              transition={{ 
                opacity: { duration: 0.6 },
                scale: { duration: 0.6 },
                y: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }
              }}
              className="absolute p-5 md:p-7 w-44 md:w-56 lg:w-72 paper-shadow border-l-4 border-[#C5A059]/40 cursor-default hover:z-50 transition-all duration-500 hover:scale-105"
              style={{ 
                left: `${note.x}%`, 
                top: `${note.y}%`,
                backgroundColor: note.color,
                transform: `rotate(${note.rotate}deg)`
              }}
            >
              <div className="absolute top-3 right-3 w-3 h-3 bg-[#C5A059]/30 rounded-full shadow-inner" />
              <p className="text-sm md:text-base font-serif italic text-[#1A2F1A] leading-relaxed mb-5">
                "{note.message}"
              </p>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8B8B7A] border-t border-[#E6E6D4] pt-3 flex justify-between items-center">
                <span>— {note.name}</span>
                <Sparkles size={10} className="text-[#C5A059]/50" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Floating Fireflies in Wall */}
        <Fireflies count={10} />
      </div>

      <div className="mt-4 relative z-10">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1A2F1A] text-white py-2.5 px-6 rounded-sm text-[8px] font-mono uppercase tracking-[0.4em] hover:bg-[#2D3F2D] hover:shadow-2xl transition-all active:scale-95 flex items-center gap-2 group"
        >
          <Sparkles size={10} className="group-hover:rotate-12 transition-transform text-[#C5A059]" />
          Tinggalkan Ucapan
        </button>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#0A1A0A]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#FDF6EC] p-8 lg:p-12 paper-shadow glow-edge rounded-sm"
            >
              <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
              <div className="relative z-10 space-y-8">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-serif italic text-[#1A2F1A]">Tinggalkan Ucapan</h3>
                  <div className="w-12 h-[1px] bg-[#C5A059] mx-auto" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-[#8B8B7A]">Nama / Name</label>
                    <input 
                      type="text" 
                      required
                      value={newNote.name}
                      onChange={(e) => setNewNote({...newNote, name: e.target.value})}
                      placeholder="Nama anda"
                      className="w-full bg-transparent border-b border-[#E6E6D4] py-2 focus:outline-none focus:border-[#C5A059] transition-colors font-serif italic text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-[#8B8B7A]">Ucapan / Message</label>
                    <textarea 
                      required
                      value={newNote.message}
                      onChange={(e) => setNewNote({...newNote, message: e.target.value})}
                      placeholder="Tulis ucapan anda di sini..."
                      rows={4}
                      className="w-full bg-transparent border-b border-[#E6E6D4] py-2 focus:outline-none focus:border-[#C5A059] transition-colors font-serif italic text-lg resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-[#1A2F1A] text-white py-4 px-8 rounded-sm text-[10px] font-mono uppercase tracking-[0.3em] hover:bg-[#2D3F2D] transition-all"
                  >
                    Sematkan Ucapan
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    time: '12:00 PM',
    message: '',
    status: 'Hadir'
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamic background color based on scroll
  const bgColor = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.3, 0.45, 0.6, 0.8, 1], 
    ["#0A1A0A", "#1A2F1A", "#1A2F1A", "#5A5A40", "#5A5A40", "#3D2B1F", "#FDF6EC"]
  );

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) {
      setIsRSVPed(true);
      // Smooth scroll to success message
      setTimeout(() => {
        const successEl = document.getElementById('rsvp-success');
        successEl?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor: bgColor }}
      className="relative min-h-screen text-[#1A1A1A] font-sans selection:bg-[#E6E6D4] overflow-x-hidden transition-colors duration-700"
    >
      {/* GLOBAL OVERLAYS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-10" />
        
        {/* Global Fireflies */}
        <Fireflies count={15} />
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-8 z-10 overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
        <Fireflies count={25} />
        
        {/* Warm Window Light Effect */}
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-window-light blur-3xl pointer-events-none"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center space-y-8 relative z-10"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-[10px] font-mono uppercase text-[#C5A059] block"
          >
            Syawal 1447H / 2026
          </motion.span>
          
          <h1 className="text-6xl lg:text-9xl font-serif font-light leading-tight text-[#FDF6EC] text-glow-gold">
            Teratak <br />
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="italic font-normal text-[#C5A059]"
            >
              Arshad dan Suraya.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 2, delay: 1.2 }}
            className="text-lg text-[#FDF6EC]/80 max-w-md mx-auto leading-relaxed italic font-serif"
          >
            "Sejauh mana pun kaki melangkah, <br />
            pulangnya tetap ke teratak yang satu."
          </motion.p>
          
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="pt-16 flex flex-col items-center gap-3 text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A059]"
          >
            <span>Mendekati Teratak</span>
            <ChevronDown size={14} className="opacity-50" />
          </motion.div>
        </motion.div>

        {/* Pelitas in Hero */}
        <div className="absolute bottom-10 left-0 w-full flex justify-around px-12 pointer-events-none">
          <Pelita className="scale-75" delay={0.2} intensity={1.2} />
          <Pelita className="scale-90 -mb-4 hidden md:block" delay={0.5} intensity={1.5} />
          <Pelita className="scale-75" delay={0.8} intensity={1.2} />
        </div>
      </section>

      {/* THE JOURNEY (GUEST WALL) */}
      <section className="relative z-10 py-8 lg:py-12">
        <GuestWall />
      </section>

      {/* INVITATION DETAILS */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 lg:px-24 py-32 z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto w-full"
        >
          <div className="bg-[#FDF6EC] paper-shadow glow-edge rounded-sm p-8 lg:p-20 relative overflow-hidden border border-[#E6E6D4]/50">
            {/* Subtle Paper Texture Overlay */}
            <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-5xl lg:text-7xl font-serif italic text-[#1A2F1A] leading-tight">
                    Teratak <br />Arshad & Suraya
                  </h2>
                  <div className="w-20 h-[1px] bg-[#C5A059]" />
                </div>
                
                <p className="text-lg text-[#5A5A40] leading-relaxed font-serif italic">
                  Dengan penuh kesyukuran, kami menjemput Tuan/Puan ke majlis rumah terbuka kami. Kehadiran anda akan menyerikan lagi suasana Syawal kami yang penuh bermakna.
                </p>
                
                <div className="space-y-8 pt-6">
                  {[
                    { icon: Calendar, label: "Tarikh / Date", value: "Sabtu, 11 April 2026" },
                    { icon: Clock, label: "Masa / Time", value: "2:30 PM — 9:00 PM" },
                    { icon: MapPin, label: "Lokasi / Location", value: "Teratak Arshad & Suraya", sub: "Lot Rumah 2172, Jalan Jaya, Kampung Parit Mahang, Ijok, Selangor" }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="flex items-start gap-6"
                    >
                      <div className="p-4 bg-[#FDF6EC] shadow-inner rounded-full text-[#C5A059] border border-[#E6E6D4]/50">
                        <item.icon size={22} strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8B8B7A]">{item.label}</div>
                        <div className="text-2xl font-serif italic text-[#1A2F1A] leading-tight">{item.value}</div>
                        {item.sub && <div className="text-sm text-[#5A5A40] font-sans opacity-70 leading-relaxed">{item.sub}</div>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="relative aspect-[4/5] rounded-t-full overflow-hidden border-[12px] border-white shadow-2xl group">
                <iframe 
                  id="js_video_iframe"
                  src="https://jumpshare.com/embed/gOchWR27F28nkeVkH4hR" 
                  frameBorder="0" 
                  allowFullScreen 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                  style={{ border: 0 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FDF6EC]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* MAP SECTION */}
      <section className="relative py-20 px-8 lg:px-24 z-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-5xl mx-auto w-full bg-[#FDF6EC] p-4 paper-shadow rounded-sm border border-[#E6E6D4]/50"
        >
          <div className="aspect-video w-full bg-[#E6E6D4] rounded-sm overflow-hidden relative grayscale-[0.2] contrast-[0.9] border border-[#E6E6D4]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3070.4211955152205!2d101.36608299999999!3d3.2883419999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zM8KwMTcnMTguMCJOIDEwMcKwMjEnNTcuOSJF!5e1!3m2!1sen!2smy!4v1774362354619!5m2!1sen!2smy" 
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 px-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B8B7A]">Navigasi ke Teratak Arshad & Suraya</span>
            <div className="flex gap-4">
              <button className="text-[10px] font-bold underline uppercase tracking-widest hover:text-[#C5A059] transition-colors">Google Maps</button>
              <button className="text-[10px] font-bold underline uppercase tracking-widest hover:text-[#C5A059] transition-colors">Waze</button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* RSVP SECTION (THE GUESTBOOK) */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 lg:px-24 py-32 z-20 overflow-hidden">
        {/* Background Wood Texture for RSVP */}
        <div className="absolute inset-0 bg-wood opacity-20 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto w-full bg-[#FDF6EC] p-8 lg:p-20 paper-shadow glow-edge relative border border-[#E6E6D4]/50"
        >
          <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
          
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[#C5A059]/30 -mr-1 -mt-1" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-[#C5A059]/30 -ml-1 -mt-1" />
          
          {/* Warmth Glow when Attending */}
          <AnimatePresence>
            {formData.status === 'Hadir' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#FFD700]/5 pointer-events-none z-0"
              />
            )}
          </AnimatePresence>

          <div className="text-center space-y-4 mb-16 relative z-10">
            <h2 className="text-4xl font-serif italic text-[#1A2F1A]">Buku Tamu</h2>
            <p className="text-[10px] text-[#8B8B7A] uppercase tracking-[0.4em] font-mono">Khabarkan Kehadiran</p>
            <div className="w-16 h-[1px] bg-[#C5A059] mx-auto" />
          </div>

          {!isRSVPed ? (
            <form onSubmit={handleRSVP} className="space-y-10 relative z-10">
              <div className="flex justify-center gap-8 mb-12">
                {['Hadir', 'Tidak Hadir'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({...formData, status: s})}
                    className={`px-8 py-3 text-[10px] font-mono uppercase tracking-widest transition-all border ${
                      formData.status === s 
                        ? 'bg-[#1A2F1A] text-white border-[#1A2F1A] shadow-lg' 
                        : 'bg-transparent text-[#8B8B7A] border-[#E6E6D4] hover:border-[#C5A059]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-3 group">
                  <label className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-[#8B8B7A] group-focus-within:text-[#C5A059] transition-colors">
                    <User size={12} /> Nama / Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Nama penuh anda"
                    className="w-full bg-transparent border-b border-[#E6E6D4] py-3 focus:outline-none focus:border-[#C5A059] transition-all font-serif italic text-xl placeholder:opacity-30"
                  />
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-[#8B8B7A]">
                    <Users size={12} /> Bilangan Tetamu / Guests
                  </label>
                  <select 
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    className="w-full bg-transparent border-b border-[#E6E6D4] py-3 focus:outline-none focus:border-[#C5A059] font-serif italic text-xl appearance-none cursor-pointer"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n} className="bg-[#FDF6EC]">{n} {n === 1 ? 'Orang' : 'Orang'}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-[#8B8B7A]">
                  <Clock size={12} /> Masa Anggaran / Estimated Time
                </label>
                <select 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-transparent border-b border-[#E6E6D4] py-3 focus:outline-none focus:border-[#C5A059] font-serif italic text-xl appearance-none cursor-pointer"
                >
                  {['2:30 PM', '3:30 PM', '4:30 PM', '5:30 PM', '6:30 PM', '7:30 PM', '8:30 PM'].map(t => <option key={t} value={t} className="bg-[#FDF6EC]">{t}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-[#8B8B7A]">
                  <MessageSquare size={12} /> Ucapan / Message (Optional)
                </label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Titipkan ucapan buat tuan rumah..."
                  rows={4}
                  className="w-full bg-transparent border-b border-[#E6E6D4] py-3 focus:outline-none focus:border-[#C5A059] transition-all font-serif italic text-xl resize-none placeholder:opacity-30"
                />
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-[#1A2F1A] text-white py-6 px-10 rounded-sm text-[10px] font-mono uppercase tracking-[0.4em] hover:bg-[#2D3F2D] hover:shadow-[0_10px_30px_rgba(255,215,0,0.2)] transition-all active:scale-[0.98] flex items-center justify-center gap-4 group"
                >
                  <Sparkles size={16} className="group-hover:rotate-12 transition-transform text-[#C5A059]" />
                  Hantar Kehadiran
                </button>
              </div>
            </form>
          ) : (
            <motion.div 
              id="rsvp-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10 py-12 relative z-10"
            >
              {/* Extra Success Pelitas */}
              <div className="absolute -top-10 -left-10 hidden lg:block">
                <Pelita className="scale-50" delay={0.1} intensity={2} />
              </div>
              <div className="absolute -top-10 -right-10 hidden lg:block">
                <Pelita className="scale-50" delay={0.3} intensity={2} />
              </div>

              <div className="flex justify-center relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.3 }}
                  className="p-6 bg-[#FDF6EC] rounded-full shadow-inner border border-[#C5A059]/20 text-[#C5A059] relative z-20"
                >
                  <CheckCircle2 size={60} strokeWidth={1} />
                </motion.div>
                {/* Success Glow */}
                <div className="absolute inset-0 bg-[#FFD700]/20 blur-3xl rounded-full scale-150 animate-glow-pulse" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-4xl font-serif italic text-[#1A2F1A]">Terima Kasih, {formData.name}.</h3>
                <p className="text-lg text-[#5A5A40] leading-relaxed font-serif italic max-w-md mx-auto">
                  "Terima kasih. Teratak ini menanti kehadiranmu."
                </p>
                <p className="text-xs text-[#8B8B7A] font-mono uppercase tracking-widest pt-4">
                  {formData.guests} Orang • {formData.time}
                </p>
              </div>

              <div className="pt-10 flex flex-col items-center gap-4">
                <div className="flex gap-4">
                  <button className="p-3 bg-white paper-shadow rounded-full text-[#1A2F1A] hover:text-[#C5A059] transition-colors"><Users size={18} /></button>
                  <button className="p-3 bg-white paper-shadow rounded-full text-[#1A2F1A] hover:text-[#C5A059] transition-colors"><Calendar size={18} /></button>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#8B8B7A] opacity-60">Jumpa nanti di teratak kami!</span>
              </div>
              
              {/* Extra Fireflies for Success */}
              <Fireflies count={30} />
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative py-20 px-8 z-20 text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#8B8B7A]">Hubungi Kami</div>
          <div className="flex flex-col items-center gap-6">
            <div className="space-y-2">
              <p className="text-sm font-mono uppercase tracking-widest text-[#8B8B7A]">WhatsApp Najwa</p>
              <p className="text-xl font-serif italic text-[#1A2F1A]">+60 17-288 7123</p>
            </div>
            <a 
              href="https://wa.me/60172887123" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1A2F1A] text-white py-4 px-10 rounded-sm text-[10px] font-mono uppercase tracking-[0.3em] hover:bg-[#2D3F2D] hover:shadow-[0_10px_30px_rgba(26,47,26,0.3)] transition-all flex items-center gap-3 group"
            >
              <MessageSquare size={14} className="group-hover:scale-110 transition-transform" />
              Hubungi Sekarang
            </a>
          </div>
        </motion.div>
      </section>

      {/* MUSIC PLAYER */}
      <MusicPlayer />

      {/* FOOTER */}
      <footer className="relative z-20 px-8 lg:px-24 py-24 text-center space-y-6">
        <div className="w-24 h-[1px] bg-[#C5A059]/30 mx-auto" />
        <div className="text-3xl lg:text-5xl font-serif italic text-[#1A2F1A]">Selamat Hari Raya Aidilfitri</div>
        <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#8B8B7A]">Maaf Zahir & Batin</div>
        <div className="pt-12 text-[8px] font-mono uppercase tracking-[0.3em] text-[#8B8B7A] opacity-40">
          © 2026 Teratak Arshad dan Suraya • Diilhamkan dari Nostalgia
        </div>
      </footer>

    </motion.div>
  );
}
