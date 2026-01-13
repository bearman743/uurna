
import React from 'react';
import { MemorialData, WOOD_COLORS, WOOD_TEXT_COLORS, Side, UrnSize, Language } from '../types';
import { Camera, RotateCw, RotateCcw } from 'lucide-react';
import { translations } from '../translations';

interface UrnPreviewProps {
  data: MemorialData;
  activeSide: Side;
  onRotate: (side: Side) => void;
  language: Language;
}

export const UrnPreview: React.FC<UrnPreviewProps> = ({ data, activeSide, onRotate, language }) => {
  const baseColor = WOOD_COLORS[data.woodType];
  const textColor = WOOD_TEXT_COLORS[data.woodType];
  const t = translations[language];

  const sidesOrder: Side[] = ['front', 'right', 'back', 'left'];
  const sideToNumber: Record<Side, number> = { front: 1, right: 2, back: 3, left: 4 };
  
  const handleRotate = (direction: 'prev' | 'next') => {
    const currentIndex = sidesOrder.indexOf(activeSide);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % 4;
    } else {
      newIndex = (currentIndex - 1 + 4) % 4;
    }
    onRotate(sidesOrder[newIndex]);
  };

  const getRotation = () => {
    switch (activeSide) {
      case 'front': return 0;
      case 'right': return -90;
      case 'back': return -180;
      case 'left': return 90;
    }
  };

  const scaleClass = {
    [UrnSize.SMALL]: 'scale-90',
    [UrnSize.MEDIUM]: 'scale-100',
    [UrnSize.LARGE]: 'scale-110'
  }[data.size];

  const renderFaceContent = (side: Side) => {
    const content = data.sides[side];
    const isFront = side === 'front';
    const sideNum = sideToNumber[side];

    return (
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center ${textColor}`}>
        {/* Face Number Badge */}
        <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-wood-800/20 flex items-center justify-center text-[10px] font-bold border border-wood-800/10">
          {sideNum}
        </div>

        {/* Photo Area */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-black/5 rounded-2xl flex items-center justify-center overflow-hidden border border-black/5 mb-4 shrink-0">
          {content.photoUrl ? (
            <img 
              src={content.photoUrl} 
              alt={`${side} view`} 
              className="w-full h-full object-cover laser-engraved"
            />
          ) : (
            <div className="text-black/10 flex flex-col items-center p-2">
              <Camera size={32} />
              <span className="text-[10px] mt-1 font-bold uppercase text-center">{t.preview.addPhoto}</span>
            </div>
          )}
        </div>

        {/* Text Area */}
        <div className="flex flex-col items-center justify-start w-full h-32 overflow-hidden">
          {isFront && (
            <>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide engraved-text leading-tight mb-1">
                {data.petName || (language === 'fi' ? "Lemmikin Nimi" : language === 'sv' ? "Namn" : "Pet Name")}
              </h3>
              {(data.birthDate || data.passingDate) && (
                <p className="text-[10px] sm:text-xs font-medium opacity-80 uppercase tracking-widest mb-2 engraved-text">
                  {data.birthDate} {data.birthDate && data.passingDate ? '–' : ''} {data.passingDate}
                </p>
              )}
              
              {content.text && (
                <p className="font-serif italic text-xs sm:text-sm leading-tight opacity-90 engraved-text max-w-full whitespace-pre-wrap">
                  {content.text}
                </p>
              )}
            </>
          )}
           
           {!isFront && !content.photoUrl && (
             <p className="text-[10px] opacity-40 italic mt-4">{t.preview.noText}</p>
           )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-stone-100 rounded-xl shadow-inner border border-stone-200 min-h-[500px]">
      
      <div className="relative w-[300px] h-[400px] flex items-center justify-center perspective-1000">
        
        <div 
          className={`relative w-[280px] h-[340px] transition-transform duration-700 ease-in-out ${scaleClass}`}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: `rotateY(${getRotation()}deg)` 
          }}
        >
          {/* FRONT */}
          <div 
            className={`absolute inset-0 ${baseColor} wood-texture shadow-xl border border-black/5 backface-hidden`}
            style={{ transform: 'translateZ(140px)' }}
          >
             <div className="absolute top-0 w-full h-2 bg-white/10" />
             {renderFaceContent('front')}
          </div>

          {/* RIGHT */}
          <div 
            className={`absolute inset-0 ${baseColor} wood-texture shadow-xl border border-black/5 backface-hidden`}
            style={{ transform: 'rotateY(90deg) translateZ(140px)' }}
          >
             <div className="absolute top-0 w-full h-2 bg-white/10" />
             {renderFaceContent('right')}
          </div>

          {/* BACK */}
          <div 
            className={`absolute inset-0 ${baseColor} wood-texture shadow-xl border border-black/5 backface-hidden`}
            style={{ transform: 'rotateY(180deg) translateZ(140px)' }}
          >
             <div className="absolute top-0 w-full h-2 bg-white/10" />
             {renderFaceContent('back')}
          </div>

          {/* LEFT */}
          <div 
            className={`absolute inset-0 ${baseColor} wood-texture shadow-xl border border-black/5 backface-hidden`}
            style={{ transform: 'rotateY(-90deg) translateZ(140px)' }}
          >
             <div className="absolute top-0 w-full h-2 bg-white/10" />
             {renderFaceContent('left')}
          </div>

          <div 
             className={`absolute w-[280px] h-[280px] ${baseColor} wood-texture border border-black/5`}
             style={{ transform: 'rotateX(90deg) translateZ(140px)' }}
          >
             <div className="w-full h-full flex items-center justify-center opacity-30">
                <div className="w-40 h-40 border border-black/20 rounded-full"></div>
             </div>
          </div>
          
           <div 
             className={`absolute w-[280px] h-[280px] bg-black/80`}
             style={{ transform: 'rotateX(-90deg) translateZ(200px)', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}
          ></div>

        </div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button 
          onClick={() => handleRotate('prev')}
          className="p-3 rounded-full bg-white shadow hover:bg-wood-50 text-wood-800 transition-colors flex items-center gap-2 font-medium text-sm"
        >
          <RotateCcw size={20} /> <span className="hidden sm:inline">{t.preview.turnLeft}</span>
        </button>
        <div className="text-xs font-bold uppercase tracking-wider text-stone-400 w-24 text-center">
          <span className="text-wood-600 mr-1">{sideToNumber[activeSide]}.</span> {t.sides[activeSide]}
        </div>
        <button 
          onClick={() => handleRotate('next')}
          className="p-3 rounded-full bg-white shadow hover:bg-wood-50 text-wood-800 transition-colors flex items-center gap-2 font-medium text-sm"
        >
          <span className="hidden sm:inline">{t.preview.turnRight}</span> <RotateCw size={20} />
        </button>
      </div>

      <p className="mt-4 text-stone-400 text-xs italic">
        *{t.preview.note} ({t.sizes[data.size]})
      </p>
    </div>
  );
};
