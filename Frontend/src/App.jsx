import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [piatti, setPiatti] = useState([])
  const [prenotazioni, setPrenotazioni] = useState([])
  const [view, setView] = useState('menu') 
  
  // AGGIUNTO IL CAMPO 'IMMAGINE' NELLO STATO
  const [formPiatto, setFormPiatto] = useState({ 
    nome: '', 
    descrizione: '', 
    prezzo: '', 
    categoria: 'Primi',
    immagine: '' // <-- Nuovo campo per la foto
  })
  
  const [formPrenota, setFormPrenota] = useState({ cliente: '', data: '', ora: '', persone: 2 })
  const categorie = ['Antipasti', 'Primi', 'Secondi', 'Dolci', 'Bevande'];

  useEffect(() => {
    caricaDati()
  }, [])

  const caricaDati = async () => {
    try {
      const resPiatti = await axios.get('http://localhost:8080/api/piatti')
      setPiatti(resPiatti.data)
      const resPrenota = await axios.get('http://localhost:8080/api/prenotazioni')
      setPrenotazioni(resPrenota.data)
    } catch (err) { console.error("Errore caricamento:", err) }
  }

  const aggiungiPiatto = async (e) => {
    e.preventDefault()
    try {
      // Se l'immagine è vuota, mettiamo una foto di default
      const piattoDaInviare = {
        ...formPiatto,
        immagine: formPiatto.immagine || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500'
      }
      await axios.post('http://localhost:8080/api/piatti', piattoDaInviare)
      setFormPiatto({ nome: '', descrizione: '', prezzo: '', categoria: 'Primi', immagine: '' })
      caricaDati()
      alert("Piatto aggiunto con foto!");
    } catch (err) { alert("Errore nel salvataggio") }
  }

  const eliminaPiatto = async (id) => {
    if (window.confirm("Eliminare definitivamente questo piatto?")) {
      try {
        await axios.delete(`http://localhost:8080/api/piatti/${id}`)
        caricaDati()
      } catch (err) { alert("Errore eliminazione") }
    }
  }

  const prenotaTavolo = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8080/api/prenotazioni', {
        ...formPrenota,
        persone: parseInt(formPrenota.persone)
      })
      alert("Prenotazione registrata!");
      setFormPrenota({ cliente: '', data: '', ora: '', persone: 2 })
      caricaDati()
    } catch (err) { alert("Errore prenotazione") }
  }

  const eliminaPrenotazione = async (id) => {
    if (window.confirm("Rimuovere prenotazione?")) {
      try {
        await axios.delete(`http://localhost:8080/api/prenotazioni/${id}`)
        caricaDati()
      } catch (err) { alert("Errore cancellazione") }
    }
  }

  return (
    <div className="min-h-screen bg-orange-50/30 font-sans text-gray-900">
      
      {/* NAVBAR */}
      <nav className="bg-[#1e1b18] text-white shadow-2xl p-3 sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 border-b border-orange-200/10">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setView('menu')}>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-400 p-0.5 bg-white">
            <img src="/assets/images/logo.png" alt="Logo" className="w-full h-full object-contain" onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1046/1046747.png'} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-serif font-bold text-orange-400 leading-none">Nonna Bri</h1>
            <span className="text-[10px] text-orange-200/60 uppercase tracking-widest mt-1">Sapori di Casa</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('menu')} className={`px-4 py-2 rounded-xl font-bold text-[11px] uppercase transition-all border ${view === 'menu' ? 'bg-orange-500 border-orange-500 text-white' : 'border-white/10 text-white/60 hover:text-white'}`}>Sito</button>
          <button onClick={() => setView('dashboard')} className={`px-4 py-2 rounded-xl font-bold text-[11px] uppercase transition-all border ${view === 'dashboard' ? 'bg-white border-white text-stone-900' : 'border-white/10 text-white/60 hover:text-white'}`}>Admin</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-10">
        
        {view === 'menu' ? (
          <div className="animate-in fade-in duration-1000">
            {/* HERO SECTION */}
            <section className="relative mb-24 min-h-[550px] rounded-[3rem] overflow-hidden shadow-2xl flex items-center border-4 border-white">
              <img src="/assets/images/hero-bg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
              <div className="relative z-10 p-8 md:p-16 w-full flex flex-col lg:flex-row items-center gap-16 text-white">
                <div className="flex-1">
                  <h2 className="text-6xl font-serif font-bold mb-6 text-orange-50">L'amore in <span className="text-orange-400 italic">ogni piatto.</span></h2>
                  <p className="text-stone-300 text-xl font-light">Ogni ricetta ha una storia da raccontare.</p>
                </div>
                <form onSubmit={prenotaTavolo} className="flex-1 w-full max-w-md bg-black/30 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 grid grid-cols-2 gap-4">
                  <input className="col-span-2 p-4 rounded-xl bg-white text-gray-900" placeholder="Nome" value={formPrenota.cliente} onChange={e => setFormPrenota({...formPrenota, cliente: e.target.value})} required />
                  <input type="date" className="p-4 rounded-xl bg-white text-gray-900" value={formPrenota.data} onChange={e => setFormPrenota({...formPrenota, data: e.target.value})} required />
                  <input type="time" className="p-4 rounded-xl bg-white text-gray-900" value={formPrenota.ora} onChange={e => setFormPrenota({...formPrenota, ora: e.target.value})} required />
                  <input type="number" className="col-span-2 p-4 rounded-xl bg-white text-gray-900" placeholder="Persone" value={formPrenota.persone} onChange={e => setFormPrenota({...formPrenota, persone: e.target.value})} required />
                  <button className="col-span-2 bg-orange-500 text-white font-black p-4 rounded-xl hover:bg-orange-400 uppercase tracking-widest shadow-xl">Riserva Tavolo</button>
                </form>
              </div>
            </section>

            {/* LISTA PIATTI DINAMICA CON FOTO CARICATA */}
            {categorie.map(cat => (
              <div key={cat} className="mb-24">
                <div className="flex items-center gap-4 mb-10">
                    <h3 className="text-4xl font-serif font-bold text-stone-800 uppercase tracking-tight">{cat}</h3>
                    <div className="h-px flex-1 bg-orange-200"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {piatti.filter(p => p.categoria === cat).map(p => (
                    <div key={p.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-orange-100/50">
                      <div className="h-60 bg-stone-200 overflow-hidden relative">
                         {/* USA L'URL DELLA FOTO SALVATA NEL DATABASE */}
                         <img 
                           src={p.immagine || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600'} 
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                           alt={p.nome}
                         />
                         <span className="absolute bottom-4 right-4 bg-orange-500 px-4 py-1.5 rounded-full font-bold text-white shadow-lg text-sm">€{p.prezzo}</span>
                      </div>
                      <div className="p-8">
                        <h4 className="text-2xl font-bold mb-2 text-stone-800 group-hover:text-orange-600 transition-colors">{p.nome}</h4>
                        <p className="text-stone-500 text-sm leading-relaxed italic font-light">{p.descrizione}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* DASHBOARD ADMIN */
          <div className="space-y-12 animate-in fade-in duration-500">
            {/* REGISTRO PRENOTAZIONI (Omesso per brevità, rimane uguale) */}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* FORM NUOVO PIATTO CON CAMPO FOTO */}
              <div className="bg-[#1e1b18] p-10 rounded-[3rem] text-white shadow-2xl border border-orange-400/20">
                <h3 className="text-2xl font-serif font-bold mb-8 italic text-orange-400">Aggiungi al Menù</h3>
                <form onSubmit={aggiungiPiatto} className="space-y-4">
                  <input className="w-full p-4 rounded-2xl bg-white/5 outline-none border border-white/10" placeholder="Nome Piatto" value={formPiatto.nome} onChange={e => setFormPiatto({...formPiatto, nome: e.target.value})} required />
                  
                  <select className="w-full p-4 rounded-2xl bg-stone-800 border border-white/10 text-white" value={formPiatto.categoria} onChange={e => setFormPiatto({...formPiatto, categoria: e.target.value})}>
                    {categorie.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>

                  {/* NUOVO CAMPO IMMAGINE */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-orange-400 font-bold ml-2">Link Foto (URL)</label>
                    <input 
                      className="w-full p-4 rounded-2xl bg-white/5 outline-none border border-white/10 focus:border-orange-400" 
                      placeholder="Esempio: https://foto.it/pasta.jpg" 
                      value={formPiatto.immagine} 
                      onChange={e => setFormPiatto({...formPiatto, immagine: e.target.value})} 
                    />
                  </div>

                  <input type="number" step="0.01" className="w-full p-4 rounded-2xl bg-white/5 outline-none border border-white/10" placeholder="Prezzo (€)" value={formPiatto.prezzo} onChange={e => setFormPiatto({...formPiatto, prezzo: e.target.value})} required />
                  <textarea className="w-full p-4 rounded-2xl bg-white/5 outline-none border border-white/10" placeholder="Descrizione" value={formPiatto.descrizione} onChange={e => setFormPiatto({...formPiatto, descrizione: e.target.value})} />
                  
                  <button className="w-full bg-orange-500 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-400 transition-all">Salva Piatto</button>
                </form>
              </div>

              {/* LISTA PIATTI (Rimane uguale) */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-200">
                <h3 className="text-2xl font-serif font-bold mb-8 text-stone-800">Gestione Piatti</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                   {piatti.map(p => (
                     <div key={p.id} className="flex justify-between items-center p-4 bg-orange-50/50 rounded-2xl border border-orange-100 group">
                        <div className="flex items-center gap-3">
                          <img src={p.immagine} className="w-10 h-10 rounded-lg object-cover" alt="" />
                          <div>
                            <p className="font-bold text-stone-800">{p.nome}</p>
                            <p className="text-[10px] text-orange-600 font-black">{p.categoria}</p>
                          </div>
                        </div>
                        <button onClick={() => eliminaPiatto(p.id)} className="bg-white text-red-500 p-3 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white border border-red-100">
                           🗑️
                        </button>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App