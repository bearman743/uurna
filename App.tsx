
import React, { useState, useRef } from 'react';
import { MemorialData, WoodType, UrnSize, URN_DIMENSIONS, Side, Language } from './types';
import { UrnPreview } from './components/UrnPreview';
import { TextGenerator } from './components/TextGenerator';
import { Upload, ShieldCheck, Sparkles, Trees, Rotate3d, Box, Ruler, Globe, RefreshCcw, Mail, Loader2 } from 'lucide-react';
import { translations } from './translations';

const Header: React.FC<{ language: Language; setLanguage: (lang: Language) => void }> = ({ language, setLanguage }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-stone-100 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-wood-600 rounded-lg flex items-center justify-center text-white">
            <Trees size={18} fill="currentColor" className="text-white" />
          </div>
          <span className="font-serif text-xl font-bold text-wood-900 tracking-tight">RainBowPine</span>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-wood-600 p-2 rounded-md hover:bg-stone-50 transition-colors focus:outline-none"
          >
            <Globe size={16} />
            <span className="uppercase">{language}</span>
          </button>
          
          {isLangMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)}></div>
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-xl border border-stone-100 overflow-hidden z-50 animate-fade-in">
                 {(['fi', 'en', 'sv'] as Language[]).map((lang) => (
                   <button 
                    key={lang}
                    onClick={() => { setLanguage(lang); setIsLangMenuOpen(false); }} 
                    className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-stone-50 ${language === lang ? 'font-bold text-wood-700 bg-stone-50' : 'text-stone-600'}`}
                   >
                     {lang === 'fi' ? 'Suomi' : lang === 'sv' ? 'Svenska' : 'English'} {language === lang && '✓'}
                   </button>
                 ))}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fi');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[language];
  const [activeSide, setActiveSide] = useState<Side>('front');

  const sideToNumber: Record<Side, number> = {
    front: 1,
    right: 2,
    back: 3,
    left: 4
  };

  const initialData: MemorialData = {
    petName: '',
    birthDate: '',
    passingDate: '',
    woodType: WoodType.BIRCH,
    size: UrnSize.MEDIUM,
    sides: {
      front: { photoUrl: null, text: '' },
      back: { photoUrl: null, text: '' },
      left: { photoUrl: null, text: '' },
      right: { photoUrl: null, text: '' },
    }
  };

  const [data, setData] = useState<MemorialData>(initialData);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      updateSideData('photoUrl', url);
    }
  };

  const updateSideData = (field: 'photoUrl' | 'text', value: string | null) => {
    setData(prev => ({
      ...prev,
      sides: { ...prev.sides, [activeSide]: { ...prev.sides[activeSide], [field]: value } }
    }));
  };

  const handleReset = () => {
    if (window.confirm(t.customizer.resetConfirm)) {
      setData(initialData);
      setActiveSide('front');
    }
  };

  const handleAddToCart = () => {
    setIsProcessing(true);
    const tt = t.customizer.emailBody;
    const subject = `${t.customizer.emailSubject}${data.petName || 'Pet Memorial'}`;
    
    let body = `${tt.intro}${tt.details}\n${tt.size}${t.sizes[data.size]}\n${tt.petName}${data.petName}\n${tt.years}${data.birthDate} - ${data.passingDate}\n\n${tt.sides}\n`;
    
    const sidesOrder: Side[] = ['front', 'right', 'back', 'left'];
    
    sidesOrder.forEach(side => {
      const sideNum = sideToNumber[side];
      const sideLabel = t.sides[side];
      const sideText = side === 'front' ? (data.sides[side].text || '(No additional text)') : 'N/A';
      
      body += `SLOT ${sideNum} [${sideLabel}]:\n`;
      body += `Text: ${sideText}\n`;
      body += `Photo: ${data.sides[side].photoUrl ? '--- ATTACH PHOTO ' + sideNum + ' HERE ---' : 'None'}\n\n`;
    });
    
    body += `\n${tt.photoNote}\n`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rainbowpine444@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setIsProcessing(false);
    alert(t.customizer.addedAlert);
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      <Header language={language} setLanguage={setLanguage} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-wood-900">{t.customizer.title}</h1>
            <p className="text-stone-500 mt-2">{t.customizer.subtitle}</p>
          </div>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border border-stone-200 text-stone-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-lg text-sm font-medium transition-all"
          >
            <RefreshCcw size={16} />
            {t.customizer.reset}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1 sticky top-24">
            <UrnPreview data={data} activeSide={activeSide} onRotate={(side) => setActiveSide(side)} language={language} />
          </div>

          <div className="order-1 lg:order-2 space-y-6 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-stone-100">
            <section className="flex items-center justify-between pb-4 border-b border-stone-100">
               <span className="font-serif font-bold text-wood-900">{t.customizer.woodLabel}</span>
               <span className="bg-wood-50 text-wood-800 px-3 py-1 rounded-full text-sm font-semibold border border-wood-200">{t.customizer.woodValue}</span>
            </section>

            <section className="space-y-4 pb-6 border-b border-stone-100">
               <h3 className="font-serif text-lg font-bold text-wood-900 flex items-center gap-2"><Ruler size={20} className="text-wood-600" /> {t.customizer.sizeLabel}</h3>
               <div className="grid grid-cols-3 gap-3">
                 {Object.values(UrnSize).map((size) => (
                   <button key={size} onClick={() => setData(prev => ({...prev, size}))} className={`relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${data.size === size ? 'border-wood-600 bg-wood-50 text-wood-900' : 'border-stone-100 bg-white text-stone-500 hover:border-wood-200'}`}>
                     <span className="font-bold text-sm">{t.sizes[size]}</span>
                   </button>
                 ))}
               </div>
               <div className="bg-stone-50 p-3 rounded text-xs text-stone-600 flex items-center gap-2"><Box size={14} />{URN_DIMENSIONS[data.size]}</div>
            </section>

            <section className="space-y-4 pb-6 border-b border-stone-100">
               <h3 className="font-serif text-lg font-bold text-wood-900">{t.customizer.petInfoTitle}</h3>
               <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">{t.customizer.nameLabel}</label>
                  <input type="text" value={data.petName} onChange={(e) => setData(prev => ({ ...prev, petName: e.target.value }))} className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-wood-500 outline-none" maxLength={20} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">{t.customizer.birthLabel}</label>
                    <input type="text" value={data.birthDate} onChange={(e) => setData(prev => ({ ...prev, birthDate: e.target.value }))} className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-wood-500 outline-none" maxLength={10} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">{t.customizer.passLabel}</label>
                    <input type="text" value={data.passingDate} onChange={(e) => setData(prev => ({ ...prev, passingDate: e.target.value }))} className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-wood-500 outline-none" maxLength={10} />
                  </div>
                </div>
            </section>

            <section>
               <h3 className="font-serif text-lg font-bold text-wood-900 mb-4 flex items-center gap-2"><Rotate3d size={20} className="text-wood-600" /> {t.customizer.sidesTitle}</h3>
               <div className="flex gap-2 mb-6 p-1 bg-stone-100 rounded-lg overflow-x-auto">
                  {(['front', 'right', 'back', 'left'] as Side[]).map(side => (
                    <button key={side} onClick={() => setActiveSide(side)} className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all capitalize ${activeSide === side ? 'bg-white text-wood-900 shadow-sm border border-stone-200' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200'}`}>
                      <span className="opacity-40 mr-1">{sideToNumber[side]}.</span> {t.sides[side]}
                    </button>
                  ))}
               </div>

               <div className="space-y-6">
                 <div>
                    <h4 className="font-semibold text-wood-800 mb-2 capitalize">{sideToNumber[activeSide]}. {t.sides[activeSide]} - {t.customizer.photoTitle}</h4>
                    <div className="border-2 border-dashed border-stone-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-wood-500 hover:bg-wood-50 transition-colors bg-stone-50/50" onClick={() => fileInputRef.current?.click()}>
                      <input key={activeSide} type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                      {data.sides[activeSide].photoUrl ? (
                        <div className="flex items-center gap-4 w-full px-2">
                          <div className="w-16 h-16 rounded-md overflow-hidden bg-wood-50 border border-stone-200 relative">
                             <img src={data.sides[activeSide].photoUrl!} alt="Preview" className="w-full h-full object-cover laser-engraved" />
                             <div className="absolute top-0 left-0 bg-wood-800 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-br-md">{sideToNumber[activeSide]}</div>
                          </div>
                          <div className="flex-1"><span className="text-wood-700 font-medium text-sm block">{t.customizer.photoAdded}</span></div>
                          <button onClick={(e) => { e.stopPropagation(); updateSideData('photoUrl', null); }} className="text-red-400 text-xs hover:text-red-600 underline">{t.customizer.remove}</button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-2"><Upload size={20} className="text-stone-400 mb-1" /><span className="text-stone-600 font-medium text-sm">{t.customizer.upload}</span></div>
                      )}
                    </div>
                 </div>

                 {activeSide === 'front' && (
                   <div className="animate-fade-in">
                      <h4 className="font-semibold text-wood-800 mb-2 capitalize">{sideToNumber[activeSide]}. {t.sides[activeSide]} - {t.customizer.textTitle}</h4>
                      <textarea 
                        value={data.sides[activeSide].text} 
                        onChange={(e) => updateSideData('text', e.target.value)} 
                        placeholder={t.customizer.textPlaceholder} 
                        className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-wood-500 outline-none h-24 resize-none text-sm" 
                        maxLength={150} 
                      />
                      <TextGenerator 
                        petName={data.petName} 
                        onTextGenerated={(text) => updateSideData('text', text)} 
                        language={language} 
                      />
                   </div>
                 )}
               </div>
            </section>

            <div className="pt-6 border-t border-stone-100 mt-8">
               <button 
                onClick={handleAddToCart} 
                disabled={isProcessing}
                className="w-full bg-wood-800 text-white py-4 rounded-lg font-bold text-lg hover:bg-wood-900 transition-all flex justify-center items-center gap-2 shadow-lg hover:shadow-xl disabled:bg-stone-300"
               >
                 {isProcessing ? <Loader2 className="animate-spin" /> : <><Mail size={20} /> {t.customizer.addToCart}</>}
               </button>
               <p className="text-center text-xs text-stone-400 mt-4 flex items-center justify-center gap-1"><ShieldCheck size={12} /> {t.customizer.secure}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
