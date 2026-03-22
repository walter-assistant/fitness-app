'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase, loadUserData, saveUserData, saveAllUserData, DATA_KEYS } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const scriptLoaded = useRef(false);

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setDataLoaded(false);
        scriptLoaded.current = false;
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load data from Supabase when session is available
  useEffect(() => {
    if (!session) return;
    const init = async () => {
      await loadUserData(session.user.id);
      // Set up the Supabase save function for the app JS
      (window as any).__supabaseSave = (key: string, value: unknown) => {
        saveUserData(session.user.id, key, value);
      };
      (window as any).__supabaseUserId = session.user.id;
      setDataLoaded(true);
    };
    init();
  }, [session]);

  // Load the fitness app script after HTML is rendered and data is loaded
  useEffect(() => {
    if (!dataLoaded || scriptLoaded.current) return;
    scriptLoaded.current = true;

    // Remove any existing script
    const existing = document.getElementById('fitness-app-script');
    if (existing) existing.remove();

    // Load the script
    const script = document.createElement('script');
    script.id = 'fitness-app-script';
    script.src = '/fitness-app.js';
    script.async = false;
    document.body.appendChild(script);

    return () => {
      // Cleanup timers etc
    };
  }, [dataLoaded]);

  if (loading) return <LoadingScreen />;
  if (!session) return <LoginPage />;
  if (!dataLoaded) return <LoadingScreen message="Data laden..." />;

  return <FitnessAppShell userEmail={session.user.email || ''} />;
}

// ============= LOGIN =============
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setMessage(''); setSubmitting(true);
    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Check je email voor de bevestigingslink! (Of log direct in als email confirmatie uit staat)');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'Er ging iets mis');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.logo}>
        <div style={{ fontSize: '3rem', marginBottom: 8 }}>🔥</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>4 Weken Vetverbranding</h1>
        <p style={{ opacity: 0.85, fontSize: '0.85rem' }}>Jouw persoonlijke fitness coach</p>
      </div>
      <div style={loginStyles.card}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, textAlign: 'center', marginBottom: 20, color: '#212121' }}>
          {isRegister ? '📝 Account aanmaken' : '🔐 Inloggen'}
        </h2>
        <form onSubmit={handleSubmit}>
          <label style={loginStyles.label}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jouw@email.nl" required style={loginStyles.input} />
          <label style={{ ...loginStyles.label, marginTop: 12 }}>Wachtwoord</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} style={{ ...loginStyles.input, marginBottom: 16 }} />
          {error && <div style={loginStyles.error}>⚠️ {error}</div>}
          {message && <div style={loginStyles.success}>✅ {message}</div>}
          <button type="submit" disabled={submitting} style={{ ...loginStyles.button, background: submitting ? '#ccc' : '#ff6f00', cursor: submitting ? 'not-allowed' : 'pointer' }}>
            {submitting ? '⏳ Even geduld...' : (isRegister ? '📝 Registreren' : '🔐 Inloggen')}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button onClick={() => { setIsRegister(!isRegister); setError(''); setMessage(''); }} style={loginStyles.toggleBtn}>
            {isRegister ? '← Terug naar inloggen' : 'Nog geen account? Registreer hier'}
          </button>
        </div>
      </div>
    </div>
  );
}

const loginStyles: Record<string, React.CSSProperties> = {
  container: { minHeight: '100vh', background: 'linear-gradient(135deg, #212121 0%, #424242 40%, #ff6f00 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'system-ui, -apple-system, sans-serif' },
  logo: { textAlign: 'center', marginBottom: 32, color: '#fff' },
  card: { background: '#fff', borderRadius: 20, padding: 24, width: '100%', maxWidth: 400, boxShadow: '0 10px 40px rgba(0,0,0,0.3)' },
  label: { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#757575', marginBottom: 4 },
  input: { width: '100%', padding: 12, border: '2px solid #e0e0e0', borderRadius: 14, fontSize: '0.9rem', marginBottom: 12, boxSizing: 'border-box' as const, fontFamily: 'inherit' },
  button: { width: '100%', padding: 14, color: '#fff', border: 'none', borderRadius: 14, fontSize: '0.95rem', fontWeight: 700, fontFamily: 'inherit' },
  error: { background: '#ffebee', color: '#c62828', padding: 10, borderRadius: 10, fontSize: '0.85rem', marginBottom: 12, textAlign: 'center' as const },
  success: { background: '#e8f5e9', color: '#2e7d32', padding: 10, borderRadius: 10, fontSize: '0.85rem', marginBottom: 12, textAlign: 'center' as const },
  toggleBtn: { background: 'none', border: 'none', color: '#ff6f00', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' },
};

// ============= LOADING =============
function LoadingScreen({ message = 'Laden...' }: { message?: string }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #212121 0%, #424242 40%, #ff6f00 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔥</div>
      <div style={{ fontSize: '1rem', fontWeight: 600 }}>{message}</div>
    </div>
  );
}

// ============= APP SHELL =============
function FitnessAppShell({ userEmail }: { userEmail: string }) {
  const handleLogout = async () => {
    const userId = (window as any).__supabaseUserId;
    if (userId) await saveAllUserData(userId);
    await supabase.auth.signOut();
    DATA_KEYS.forEach(key => localStorage.removeItem('sb_' + key));
    window.location.reload();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FITNESS_CSS }} />
      
      <div className="header">
        <div className="header-logo">🔥</div>
        <div style={{ flex: 1 }}>
          <h1>4 Weken Vetverbranding</h1>
          <div className="subtitle" id="headerSubtitle">Dag 1 van 28 • Jouw persoonlijke coach</div>
        </div>
        <button onClick={handleLogout} title={`Uitloggen (${userEmail})`}
          style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1rem' }}>
          🚪
        </button>
      </div>

      <div className="main" id="mainContent">
        <div className="tab-content active" id="tab-dashboard"><div id="dashboardContent"></div></div>
        <div className="tab-content" id="tab-voeding"><div id="voedingContent"></div></div>
        <div className="tab-content" id="tab-workouts"><div id="workoutsContent"></div></div>
        <div className="tab-content" id="tab-activiteit"><div id="activiteitContent"></div></div>
        <div className="tab-content" id="tab-profiel"><div id="profielContent"></div></div>
        <div className="tab-content" id="tab-habits"><div id="habitsContent"></div></div>
      </div>

      <nav className="tab-bar">
        <button className="tab-btn active" data-tab="dashboard"><span className="tab-icon">📊</span>Dashboard</button>
        <button className="tab-btn" data-tab="voeding"><span className="tab-icon">🍽️</span>Voeding</button>
        <button className="tab-btn" data-tab="workouts"><span className="tab-icon">💪</span>Workouts</button>
        <button className="tab-btn" data-tab="activiteit"><span className="tab-icon">👣</span>Activiteit</button>
        <button className="tab-btn" data-tab="habits"><span className="tab-icon">✅</span>Habits</button>
        <button className="tab-btn" data-tab="profiel"><span className="tab-icon">⚙️</span>Profiel</button>
      </nav>

      {/* All modals from original app */}
      <div dangerouslySetInnerHTML={{ __html: MODALS_HTML }} />
    </>
  );
}

// ============= MODALS HTML =============
const MODALS_HTML = `
<div class="modal-overlay" id="modalMeal">
  <div class="modal">
    <div class="modal-header">
      <h2 id="modalMealTitle">Maaltijd toevoegen</h2>
      <button class="modal-close" onclick="closeModal('modalMeal')">✕</button>
    </div>
    <div id="modalMealBody"></div>
  </div>
</div>
<div class="modal-overlay" id="modalSuggestions">
  <div class="modal">
    <div class="modal-header">
      <h2 id="modalSuggestionsTitle">Suggesties</h2>
      <button class="modal-close" onclick="closeModal('modalSuggestions')">✕</button>
    </div>
    <div id="modalSuggestionsBody"></div>
  </div>
</div>
<div class="modal-overlay" id="modalExercise">
  <div class="modal">
    <div class="modal-header">
      <h2 id="modalExerciseTitle">Oefening</h2>
      <button class="modal-close" onclick="closeModal('modalExercise')">✕</button>
    </div>
    <div id="modalExerciseBody"></div>
  </div>
</div>
<div class="modal-overlay" id="modalActivity">
  <div class="modal">
    <div class="modal-header">
      <h2>Activiteit toevoegen</h2>
      <button class="modal-close" onclick="closeModal('modalActivity')">✕</button>
    </div>
    <div id="modalActivityBody"></div>
  </div>
</div>
<div class="modal-overlay" id="modalTimer">
  <div class="modal">
    <div class="modal-header">
      <h2>⏱️ Timer</h2>
      <button class="modal-close" onclick="stopTimer();closeModal('modalTimer')">✕</button>
    </div>
    <div id="modalTimerBody" style="text-align:center;padding:20px 0">
      <div class="timer-display" id="timerDisplay">00:00</div>
      <div id="timerExName" style="font-size:.9rem;color:var(--text-light);margin-bottom:16px"></div>
      <div class="timer-controls">
        <button class="btn btn-primary" id="timerStartBtn" onclick="toggleTimer()">▶️ Start</button>
        <button class="btn btn-secondary" onclick="resetTimer()">🔄 Reset</button>
      </div>
    </div>
  </div>
</div>
<div class="modal-overlay" id="modalGymLog">
  <div class="modal">
    <div class="modal-header">
      <h2 id="modalGymLogTitle">Sportschool log</h2>
      <button class="modal-close" onclick="closeModal('modalGymLog')">✕</button>
    </div>
    <div id="modalGymLogBody"></div>
  </div>
</div>
<div class="modal-overlay" id="modalAddGymExercise">
  <div class="modal">
    <div class="modal-header">
      <h2>Eigen oefening toevoegen</h2>
      <button class="modal-close" onclick="closeModal('modalAddGymExercise')">✕</button>
    </div>
    <label>Naam oefening</label>
    <input type="text" id="newGymExName" placeholder="bijv. Cable fly">
    <div style="margin-top:16px">
      <button class="btn btn-primary btn-block" onclick="addCustomGymExercise()">💾 Opslaan</button>
    </div>
  </div>
</div>
<div class="modal-overlay" id="modalAddHabit">
  <div class="modal">
    <div class="modal-header">
      <h2>✅ Habit toevoegen</h2>
      <button class="modal-close" onclick="closeModal('modalAddHabit')">✕</button>
    </div>
    <label>Emoji</label>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 8px" id="habitEmojiPicker">
      <span class="chip active" onclick="selectHabitEmoji(this,'💪')">💪</span>
      <span class="chip" onclick="selectHabitEmoji(this,'🏃')">🏃</span>
      <span class="chip" onclick="selectHabitEmoji(this,'📚')">📚</span>
      <span class="chip" onclick="selectHabitEmoji(this,'🧘')">🧘</span>
      <span class="chip" onclick="selectHabitEmoji(this,'💊')">💊</span>
      <span class="chip" onclick="selectHabitEmoji(this,'🎯')">🎯</span>
      <span class="chip" onclick="selectHabitEmoji(this,'🌿')">🌿</span>
      <span class="chip" onclick="selectHabitEmoji(this,'☀️')">☀️</span>
      <span class="chip" onclick="selectHabitEmoji(this,'🧠')">🧠</span>
      <span class="chip" onclick="selectHabitEmoji(this,'❤️')">❤️</span>
    </div>
    <label>Naam</label>
    <input type="text" id="newHabitName" placeholder="bijv. 30 min lezen">
    <label>Frequentie</label>
    <select id="newHabitFreq">
      <option value="dagelijks">Dagelijks</option>
      <option value="weekdagen">Weekdagen (ma-vr)</option>
      <option value="3x_per_week">3x per week (ma/wo/vr)</option>
    </select>
    <div style="margin-top:16px">
      <button class="btn btn-primary btn-block" onclick="saveNewHabit()">💾 Opslaan</button>
    </div>
  </div>
</div>
<div class="modal-overlay" id="modalFysio">
  <div class="modal">
    <div class="modal-header">
      <h2>🏥 Fysio oefening toevoegen</h2>
      <button class="modal-close" onclick="closeModal('modalFysio')">✕</button>
    </div>
    <div id="modalFysioBody"></div>
  </div>
</div>
<div class="modal-overlay" id="modalCustomExercise">
  <div class="modal">
    <div class="modal-header">
      <h2>Eigen oefening toevoegen</h2>
      <button class="modal-close" onclick="closeModal('modalCustomExercise')">✕</button>
    </div>
    <label>Naam</label>
    <input type="text" id="customExName" placeholder="bijv. Ab wheel rollout">
    <label>Sets</label>
    <input type="number" id="customExSets" value="3" min="1">
    <label>Reps of Tijd</label>
    <input type="text" id="customExReps" placeholder="bijv. 12 reps of 30 sec">
    <label>Rustpauze (sec)</label>
    <input type="number" id="customExRust" value="30" min="0">
    <label>Beschrijving</label>
    <textarea id="customExDesc" style="min-height:60px" placeholder="Optioneel"></textarea>
    <div style="margin-top:16px">
      <button class="btn btn-primary btn-block" onclick="saveCustomExercise()">💾 Opslaan</button>
    </div>
  </div>
</div>
`;

// ============= CSS =============
const FITNESS_CSS = `
*{margin:0;padding:0;box-sizing:border-box}
:root{--accent:#ff6f00;--accent-dark:#e65100;--accent-light:#ffb74d;--bg:#f5f5f5;--dark:#212121;--card:#fff;--text:#212121;--text-light:#757575;--border:#e0e0e0;--shadow:0 2px 8px rgba(0,0,0,.12);--radius:14px;--green:#43a047;--red:#e53935}
html,body{height:100%;font-family:system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);overflow:hidden}
.header{background:linear-gradient(135deg,var(--dark) 0%,#424242 40%,var(--accent) 100%);color:#fff;padding:14px 16px;display:flex;align-items:center;gap:12px;position:relative;z-index:100}
.header-logo{width:44px;height:44px;background:rgba(255,255,255,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem}
.header h1{font-size:1.15rem;font-weight:800;letter-spacing:.3px}
.header .subtitle{font-size:.7rem;opacity:.85;margin-top:2px}
.tab-bar{display:flex;background:#fff;border-top:1px solid var(--border);position:fixed;bottom:0;left:0;right:0;z-index:200;padding-bottom:env(safe-area-inset-bottom)}
.tab-btn{flex:1;min-width:0;padding:8px 2px 6px;border:none;background:none;font-size:.6rem;font-weight:600;color:var(--text-light);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;transition:.2s;position:relative}
.tab-btn .tab-icon{font-size:1.3rem}
.tab-btn.active{color:var(--accent)}
.tab-btn.active::after{content:'';position:absolute;top:0;left:20%;right:20%;height:3px;background:var(--accent);border-radius:0 0 3px 3px}
.main{height:calc(100vh - 62px);overflow-y:auto;-webkit-overflow-scrolling:touch;padding-bottom:70px}
.tab-content{display:none;padding:16px}
.tab-content.active{display:block}
.card{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);padding:16px;margin-bottom:12px}
.card h3{font-size:.95rem;margin-bottom:8px;color:var(--dark)}
.card-accent{border-left:4px solid var(--accent)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:12px 20px;border:none;border-radius:var(--radius);font-size:.9rem;font-weight:600;cursor:pointer;transition:.2s;min-height:48px;-webkit-tap-highlight-color:transparent}
.btn:active{transform:scale(.97)}
.btn-primary{background:var(--accent);color:#fff}
.btn-primary:hover{background:var(--accent-dark)}
.btn-secondary{background:#fff3e0;color:var(--accent)}
.btn-danger{background:#ffebee;color:#c62828}
.btn-small{padding:8px 14px;font-size:.8rem;min-height:38px}
.btn-block{width:100%;justify-content:center}
.btn-icon{width:48px;height:48px;padding:0;border-radius:50%}
.btn-green{background:#e8f5e9;color:#2e7d32}
input,select,textarea{width:100%;padding:12px;border:2px solid var(--border);border-radius:var(--radius);font-size:.9rem;font-family:inherit;transition:.2s;background:#fff;-webkit-appearance:none}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--accent)}
label{display:block;font-size:.8rem;font-weight:600;color:var(--text-light);margin-bottom:4px;margin-top:12px}
label:first-child{margin-top:0}
.progress-bar{width:100%;height:10px;background:#eee;border-radius:5px;overflow:hidden;margin:6px 0}
.progress-fill{height:100%;border-radius:5px;transition:width .5s ease}
.progress-fill.orange{background:linear-gradient(90deg,var(--accent),var(--accent-light))}
.progress-fill.green{background:linear-gradient(90deg,#43a047,#66bb6a)}
.progress-fill.blue{background:linear-gradient(90deg,#1e88e5,#42a5f5)}
.progress-fill.red{background:linear-gradient(90deg,#e53935,#ef5350)}
.progress-fill.purple{background:linear-gradient(90deg,#7b1fa2,#ab47bc)}
.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0}
.stat-box{background:var(--card);border-radius:var(--radius);padding:14px;text-align:center;box-shadow:var(--shadow)}
.stat-box .stat-icon{font-size:1.5rem;margin-bottom:4px}
.stat-box .stat-value{font-size:1.4rem;font-weight:800;color:var(--dark)}
.stat-box .stat-label{font-size:.7rem;color:var(--text-light);margin-top:2px}
.stat-box.accent{border:2px solid var(--accent)}
.stat-box.green{border:2px solid var(--green)}
.meal-card{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);padding:14px;margin-bottom:8px;border-left:4px solid var(--accent-light)}
.meal-card .meal-type{font-size:.7rem;font-weight:700;text-transform:uppercase;color:var(--accent);margin-bottom:4px}
.meal-card .meal-name{font-weight:700;font-size:.9rem;margin-bottom:4px}
.meal-card .meal-macros{display:flex;gap:10px;font-size:.75rem;color:var(--text-light);flex-wrap:wrap}
.ex-card{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);padding:14px;margin-bottom:10px;border-left:4px solid var(--accent);transition:.2s}
.ex-card:active{transform:scale(.98)}
.ex-card .ex-name{font-weight:700;font-size:.9rem;margin-bottom:4px}
.ex-card .ex-meta{font-size:.75rem;color:var(--text-light);display:flex;gap:10px;flex-wrap:wrap}
.ex-card .ex-desc{font-size:.8rem;color:#555;margin-top:6px;line-height:1.4}
.water-glasses{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
.water-glass{width:36px;height:36px;border-radius:50%;border:2px solid #42a5f5;display:flex;align-items:center;justify-content:center;font-size:1rem;cursor:pointer;transition:.2s}
.water-glass.filled{background:#42a5f5;border-color:#1e88e5}
.water-glass:active{transform:scale(.9)}
.timer-display{font-size:3rem;font-weight:800;text-align:center;font-variant-numeric:tabular-nums;color:var(--dark);margin:16px 0}
.timer-controls{display:flex;gap:10px;justify-content:center}
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;align-items:flex-end;justify-content:center}
.modal-overlay.open{display:flex}
.modal{background:#fff;border-radius:20px 20px 0 0;width:100%;max-width:600px;max-height:85vh;overflow-y:auto;padding:20px;animation:slideUp .3s ease}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.modal-header h2{font-size:1.1rem}
.modal-close{width:36px;height:36px;border:none;background:#eee;border-radius:50%;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center}
.chip-bar{display:flex;gap:8px;overflow-x:auto;padding:4px 0;-webkit-overflow-scrolling:touch}
.chip{padding:8px 16px;border-radius:20px;border:2px solid var(--border);background:#fff;font-size:.8rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:.2s}
.chip.active{background:var(--accent);color:#fff;border-color:var(--accent)}
.date-nav{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 16px;background:#fff;border-radius:var(--radius);box-shadow:var(--shadow);margin-bottom:12px}
.date-nav .dn-btn{width:40px;height:40px;border:none;background:#f5f5f5;border-radius:50%;font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s;-webkit-tap-highlight-color:transparent}
.date-nav .dn-btn:active{transform:scale(.9);background:#e0e0e0}
.date-nav .dn-btn:disabled{opacity:.3;cursor:default}
.date-nav .dn-btn:disabled:active{transform:none;background:#f5f5f5}
.date-nav .dn-date{font-weight:700;font-size:.95rem;min-width:140px;text-align:center;cursor:pointer;padding:8px 12px;border-radius:10px;transition:.2s;position:relative}
.date-nav .dn-date:active{background:#f5f5f5}
.date-nav .dn-date input[type="date"]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;-webkit-appearance:none}
.date-nav .dn-today{font-size:.7rem;display:block;color:var(--accent);font-weight:600;margin-top:1px}
.date-nav .dn-past{color:var(--text-light)}
.toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 24px;border-radius:var(--radius);font-size:.85rem;z-index:2000;animation:fadeInUp .3s ease;pointer-events:none}
@keyframes fadeInUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.quote-card{background:linear-gradient(135deg,var(--dark),#424242);color:#fff;border-radius:var(--radius);padding:20px;margin-bottom:12px;text-align:center;position:relative}
.quote-card .quote-text{font-size:.95rem;font-style:italic;line-height:1.5;margin-bottom:8px}
.quote-card .quote-day{font-size:.7rem;opacity:.7}
.badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.7rem;font-weight:700}
.badge-easy{background:#e8f5e9;color:#2e7d32}
.badge-medium{background:#fff3e0;color:#e65100}
.badge-hard{background:#ffebee;color:#c62828}
.badge-compound{background:#e3f2fd;color:#1565c0}
.badge-hiit{background:#fce4ec;color:#c62828}
.badge-core{background:#f3e5f5;color:#7b1fa2}
.suggestion-item{padding:12px;border-bottom:1px solid var(--border);cursor:pointer;transition:.2s}
.suggestion-item:active{background:#fff3e0}
.suggestion-item:last-child{border-bottom:none}
.suggestion-item .si-name{font-weight:700;font-size:.85rem}
.suggestion-item .si-macros{font-size:.75rem;color:var(--text-light);margin-top:2px}
.activity-item{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:12px}
.activity-item .ai-icon{font-size:1.5rem}
.activity-item .ai-info{flex:1}
.activity-item .ai-name{font-weight:700;font-size:.85rem}
.activity-item .ai-meta{font-size:.75rem;color:var(--text-light)}
.activity-item .ai-kcal{font-weight:700;color:var(--accent);font-size:.9rem}
.chart-container{position:relative;width:100%;background:#fff;border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;padding:8px}
.chart-container canvas{width:100%;display:block}
.empty-state{text-align:center;padding:30px 20px;color:var(--text-light)}
.empty-state .empty-icon{font-size:2.5rem;margin-bottom:8px}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-thumb{background:#ccc;border-radius:4px}
.day-indicator{display:flex;gap:3px;margin:8px 0}
.day-dot{width:8px;height:8px;border-radius:50%;background:#e0e0e0}
.day-dot.done{background:var(--accent)}
.day-dot.today{background:var(--accent);box-shadow:0 0 0 3px rgba(255,111,0,.3)}
.week-tabs{display:flex;gap:6px;margin-bottom:12px}
.week-tab{flex:1;padding:10px 4px;border-radius:var(--radius);border:2px solid var(--border);text-align:center;cursor:pointer;font-size:.75rem;font-weight:700;transition:.2s}
.week-tab.active{border-color:var(--accent);background:var(--accent);color:#fff}
.week-tab .wt-label{font-size:.65rem;font-weight:400;opacity:.8}
.workout-done{position:relative}
.workout-done::after{content:'\\2705 Voltooid';position:absolute;top:8px;right:8px;font-size:.7rem;background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:8px;font-weight:700}
.if-clock{position:relative;width:180px;height:180px;margin:16px auto}
.if-clock svg{width:100%;height:100%;transform:rotate(-90deg)}
.if-clock-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}
.if-clock-status{font-size:1.1rem;font-weight:800}
.if-clock-time{font-size:.75rem;color:var(--text-light);margin-top:2px}
.if-bar{height:24px;border-radius:12px;overflow:hidden;display:flex;margin:8px 0;position:relative}
.if-bar-segment{height:100%;transition:width .3s}
.if-bar-fast{background:linear-gradient(90deg,#ef5350,#e53935)}
.if-bar-eat{background:linear-gradient(90deg,#66bb6a,#43a047)}
.if-bar-marker{position:absolute;top:-4px;bottom:-4px;width:3px;background:var(--dark);border-radius:2px;z-index:2}
.if-status-text{font-size:1rem;font-weight:700;text-align:center;margin:12px 0}
.collapsible-header{display:flex;justify-content:space-between;align-items:center;cursor:pointer;padding:4px 0}
.collapsible-header h3{margin:0}
.collapsible-body{max-height:0;overflow:hidden;transition:max-height .3s ease}
.collapsible-body.open{max-height:2000px}
.collapsible-arrow{transition:transform .3s;font-size:1rem}
.collapsible-arrow.open{transform:rotate(180deg)}
.day-type-badge{display:inline-block;padding:3px 10px;border-radius:10px;font-size:.7rem;font-weight:700;margin-left:6px}
.day-type-compound{background:#e3f2fd;color:#1565c0}
.day-type-hiit{background:#fce4ec;color:#c62828}
.day-type-upper{background:#e8f5e9;color:#2e7d32}
.day-type-lower{background:#f3e5f5;color:#7b1fa2}
.day-type-rest{background:#f5f5f5;color:#757575}
.day-type-circuit{background:#fff3e0;color:#e65100}
.gym-exercise-card{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);padding:14px;margin-bottom:10px;border-left:4px solid #7b1fa2}
.gym-exercise-card .gym-ex-name{font-weight:700;font-size:.95rem;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.gym-exercise-card .gym-history{font-size:.75rem;color:var(--text-light);margin-top:8px}
.gym-history-row{display:flex;gap:8px;align-items:center;padding:3px 0;border-bottom:1px solid #f0f0f0}
.gym-history-row:last-child{border-bottom:none}
.gym-pr-badge{background:#ffd600;color:#333;padding:1px 6px;border-radius:8px;font-size:.6rem;font-weight:700}
.gym-up-arrow{color:#43a047;font-weight:700}
.gym-input-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:6px}
.gym-input-row input{padding:8px;font-size:.8rem}
.gym-input-full{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px}
.gym-input-full input{padding:8px;font-size:.8rem}
.gym-sub-tabs{display:flex;gap:6px;margin-bottom:12px}
.gym-sub-tab{flex:1;padding:10px 4px;border-radius:var(--radius);border:2px solid var(--border);text-align:center;cursor:pointer;font-size:.8rem;font-weight:700;transition:.2s}
.gym-sub-tab.active{border-color:#7b1fa2;background:#7b1fa2;color:#fff}
.stretch-item{display:flex;align-items:center;gap:10px;padding:10px;border-bottom:1px solid var(--border)}
.stretch-item:last-child{border-bottom:none}
.stretch-item .stretch-name{font-weight:600;font-size:.85rem;flex:1}
.stretch-item .stretch-dur{font-size:.8rem;color:var(--accent);font-weight:600}
.peri-banner{background:linear-gradient(135deg,#e1bee7,#f3e5f5);border-left:4px solid #7b1fa2;border-radius:var(--radius);padding:14px 16px;margin-bottom:12px;font-size:.85rem;color:#4a148c;font-weight:600}
.peri-banner .peri-icon{font-size:1.2rem;margin-right:6px}
.peri-tips{background:#f3e5f5;border-radius:var(--radius);padding:12px;margin-top:12px}
.peri-tips li{font-size:.8rem;color:#4a148c;margin-bottom:6px;line-height:1.4}
.peri-tips li:last-child{margin-bottom:0}
.injury-section{margin-top:12px}
.injury-item{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)}
.injury-item:last-child{border-bottom:none}
.injury-item input[type="checkbox"]{width:20px;height:20px;accent-color:var(--accent);flex-shrink:0}
.injury-item select{width:auto;padding:6px 8px;font-size:.75rem;min-width:80px}
.injury-item label{font-size:.85rem;margin:0;flex:1;font-weight:500}
.injury-warning{background:#ffebee;border:1px solid #ef9a9a;border-radius:8px;padding:6px 10px;font-size:.75rem;color:#c62828;margin-top:4px}
.ex-card.injured{opacity:.7;border-left-color:#e53935!important}
.ex-card.injured .ex-name{text-decoration:line-through;color:#e53935}
.fysio-card{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);padding:14px;margin-bottom:10px;border-left:4px solid #00897b}
.fysio-check{width:24px;height:24px;accent-color:#00897b}
.fysio-streak{background:linear-gradient(135deg,#00897b,#26a69a);color:#fff;border-radius:var(--radius);padding:14px;text-align:center;margin-bottom:12px}
.fysio-streak .streak-num{font-size:2rem;font-weight:800}
.fysio-streak .streak-label{font-size:.8rem;opacity:.9}
.fysio-calendar{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:8px}
.fysio-cal-day{text-align:center;padding:6px 2px;border-radius:6px;font-size:.65rem}
.fysio-cal-day.done{background:#e0f2f1;color:#00695c}
.fysio-cal-day.done::after{content:'\\2705';display:block;font-size:.7rem}
.fysio-cal-day.missed{background:#fafafa;color:#bbb}
.fysio-cal-day.today{border:2px solid #00897b;font-weight:700}
.fysio-cal-header{text-align:center;font-size:.6rem;font-weight:700;color:var(--text-light);padding:4px 0}
.habit-item{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);padding:14px;margin-bottom:8px;border-left:4px solid var(--accent);transition:.2s}
.habit-item.checked{border-left-color:#43a047;background:#f9fdf9}
.habit-item .habit-row{display:flex;align-items:center;gap:10px}
.habit-item .habit-check{width:28px;height:28px;accent-color:#43a047;flex-shrink:0;cursor:pointer}
.habit-item .habit-name{font-weight:700;font-size:.9rem;flex:1}
.habit-item .habit-streak{font-size:.75rem;color:var(--accent);font-weight:600}
.habit-item .habit-best{font-size:.65rem;color:var(--text-light)}
.habit-item .habit-freq{font-size:.65rem;color:var(--text-light);margin-top:2px}
.habit-score-bar{height:20px;border-radius:10px;overflow:hidden;background:#eee;margin:8px 0;position:relative}
.habit-score-bar .habit-score-fill{height:100%;border-radius:10px;transition:width .5s ease}
.habit-score-bar .habit-score-text{position:absolute;top:0;left:0;right:0;text-align:center;font-size:.7rem;font-weight:700;line-height:20px;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.3)}
.habit-week-grid{display:grid;grid-template-columns:auto repeat(7,1fr);gap:2px;font-size:.7rem;margin:8px 0}
.habit-week-grid .hw-header{text-align:center;font-weight:700;color:var(--text-light);padding:4px 2px}
.habit-week-grid .hw-label{padding:4px 6px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100px;font-size:.65rem}
.habit-week-grid .hw-cell{text-align:center;padding:4px 2px;border-radius:4px;font-size:.75rem}
.habit-week-grid .hw-cell.done{background:#e8f5e9;color:#2e7d32}
.habit-week-grid .hw-cell.missed{background:#ffebee;color:#c62828}
.habit-week-grid .hw-cell.future{background:#f5f5f5;color:#bbb}
.habit-week-grid .hw-cell.today-cell{border:2px solid var(--accent)}
.habit-week-grid .hw-total{text-align:center;padding:4px 2px;font-weight:700;font-size:.7rem;color:var(--accent)}
.habit-achievement{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:20px;padding:30px;text-align:center;z-index:3000;box-shadow:0 10px 40px rgba(0,0,0,.3);animation:achievePop .5s ease}
.habit-achievement-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:2999;animation:fadeIn .3s}
@keyframes achievePop{from{transform:translate(-50%,-50%) scale(.5);opacity:0}to{transform:translate(-50%,-50%) scale(1);opacity:1}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.habit-achievement .achieve-emoji{font-size:3rem;margin-bottom:8px}
.habit-achievement .achieve-title{font-size:1.1rem;font-weight:800;margin-bottom:4px}
.habit-achievement .achieve-desc{font-size:.85rem;color:var(--text-light)}
.habit-dashboard-widget{display:flex;align-items:center;gap:10px;padding:10px;background:#fff3e0;border-radius:10px;margin-top:8px}
.habit-dashboard-widget .hdw-score{font-size:1.1rem;font-weight:800;color:var(--accent)}
.habit-dashboard-widget .hdw-bar{flex:1;height:8px;background:#eee;border-radius:4px;overflow:hidden}
.habit-dashboard-widget .hdw-bar-fill{height:100%;border-radius:4px;transition:width .5s}
@media(min-width:768px){.main{max-width:600px;margin:0 auto}}
`;
