
import React, { useState } from 'react';
import { generateMemorialText } from '../services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface TextGeneratorProps {
  petName: string;
  onTextGenerated: (text: string) => void;
  language: Language;
}

export const TextGenerator: React.FC<TextGeneratorProps> = ({ petName, onTextGenerated, language }) => {
  const [petType, setPetType] = useState('Dog');
  const [traits, setTraits] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const t = translations[language];

  const handleGenerate = async () => {
    if (!traits) return;
    setLoading(true);
    const text = await generateMemorialText(petName || (language === 'fi' ? "lemmikkini" : "my pet"), petType, traits, language);
    onTextGenerated(text);
    setLoading(false);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm text-wood-600 hover:text-wood-800 transition-colors font-medium mt-2"
      >
        <Sparkles size={16} />
        {t.ai.trigger}
      </button>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-wood-200 mt-2 shadow-sm animate-fade-in">
      <h4 className="font-serif text-wood-800 mb-3 text-sm font-bold flex items-center gap-2">
        <Sparkles size={16} className="text-amber-500" />
        {t.ai.title}
      </h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
            {t.ai.imRemembering}
          </label>
          <select 
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            className="w-full p-2 border border-stone-200 rounded text-sm focus:ring-2 focus:ring-wood-400 outline-none"
          >
            <option value="Dog">{t.ai.dog}</option>
            <option value="Cat">{t.ai.cat}</option>
            <option value="Rabbit">{t.ai.rabbit}</option>
            <option value="Bird">{t.ai.bird}</option>
            <option value="Friend">{t.ai.friend}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
            {t.ai.traitsLabel}
          </label>
          <input 
            type="text" 
            value={traits}
            onChange={(e) => setTraits(e.target.value)}
            placeholder={t.ai.traitsPlace}
            className="w-full p-2 border border-stone-200 rounded text-sm focus:ring-2 focus:ring-wood-400 outline-none"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={handleGenerate}
            disabled={loading || !traits}
            className="flex-1 bg-wood-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-wood-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {t.ai.generate}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-3 py-2 text-stone-500 hover:text-stone-700 text-sm font-medium"
          >
            {t.ai.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};
