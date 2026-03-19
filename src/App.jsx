import { useState, useRef, useEffect } from 'react'
import './App.css'

// Boot sequence messages
const bootSequence = [
  { text: '[SYSTEM] Initializing kernel...', delay: 100 },
  { text: '[OK] Kernel loaded', delay: 200 },
  { text: '[SYSTEM] Loading AI modules...', delay: 150 },
  { text: '[OK] TensorFlow initialized', delay: 100 },
  { text: '[OK] PyTorch initialized', delay: 100 },
  { text: '[OK] LangChain loaded', delay: 100 },
  { text: '[SYSTEM] Establishing neural connections...', delay: 200 },
  { text: '[OK] OpenAI API connected', delay: 150 },
  { text: '[OK] Gemini 2.0 online', delay: 150 },
  { text: '[SYSTEM] Loading user profile...', delay: 200 },
  { text: '', delay: 100 },
  { text: '  █████╗ ██╗  ██╗██╗      █████╗ ██╗   ██╗██╗   ██╗ █████╗ ', delay: 50 },
  { text: ' ██╔══██╗██║ ██╔╝██║     ██╔══██╗██║   ██║╚██╗ ██╔╝██╔══██╗', delay: 50 },
  { text: ' ███████║█████╔╝ ██║     ███████║██║   ██║ ╚████╔╝ ███████║', delay: 50 },
  { text: ' ██╔══██║██╔═██╗ ██║     ██╔══██║╚██╗ ██╔╝  ╚██╔╝  ██╔══██║', delay: 50 },
  { text: ' ██║  ██║██║  ██╗███████╗██║  ██║ ╚████╔╝    ██║   ██║  ██║', delay: 50 },
  { text: ' ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝  ╚═══╝     ╚═╝   ╚═╝  ╚═╝', delay: 50 },
  { text: '', delay: 100 },
  { text: '[OK] User: Aklavya Mishra', delay: 100 },
  { text: '[OK] Role: Generative AI Senior Developer', delay: 100 },
  { text: '[OK] Location: Bangalore, India', delay: 100 },
  { text: '[OK] Experience: 8+ years', delay: 100 },
  { text: '', delay: 100 },
  { text: '[SYSTEM] All systems operational.', delay: 200 },
  { text: '[READY] Terminal ready. Type "help" for commands.', delay: 100 },
]

function App() {
  // States: 'loading' -> 'booting' -> 'ready'
  const [phase, setPhase] = useState('loading')
  const [bootLines, setBootLines] = useState([])
  const [history, setHistory] = useState([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef(null)
  const bootIndexRef = useRef(0)

  // Loading screen effect (3 seconds)
  useEffect(() => {
    if (phase !== 'loading') return
    
    const timer = setTimeout(() => {
      setPhase('booting')
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [phase])

  // Boot sequence effect
  useEffect(() => {
    if (phase !== 'booting') return
    
    let timeoutId
    
    const runBoot = () => {
      if (bootIndexRef.current < bootSequence.length) {
        const item = bootSequence[bootIndexRef.current]
        setBootLines(prev => [...prev, item.text])
        bootIndexRef.current++
        timeoutId = setTimeout(runBoot, item.delay)
      } else {
        // Boot complete - transition to ready
        timeoutId = setTimeout(() => {
          setPhase('ready')
        }, 500)
      }
    }
    
    timeoutId = setTimeout(runBoot, 300)
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [phase])

  // Focus terminal when ready
  useEffect(() => {
    if (phase !== 'ready') return
    
    // Focus the terminal body directly
    const focus = () => {
      if (terminalRef.current) {
        terminalRef.current.focus()
      }
    }
    
    // Multiple focus attempts
    focus()
    const timers = [
      setTimeout(focus, 50),
      setTimeout(focus, 150),
      setTimeout(focus, 300),
    ]
    
    return () => {
      timers.forEach(t => clearTimeout(t))
    }
  }, [phase])

  // Scroll to bottom
  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [history, bootLines, phase])

  const commands = {
    help: () => ({
      type: 'output',
      content: `
Available Commands:
-------------------
  help          Show this help message
  about         Learn about me
  skills        View my technical skills  
  experience    View my work experience
  projects      See my projects
  contact       Get my contact information
  neofetch      Display system info (try it!)
  clear         Clear the terminal
  whoami        Who am I?
  date          Show current date
  echo [text]   Echo back text
  ls            List files
  cat [file]    Read a file
  pwd           Print working directory
  
Pro tip: Use up/down arrows to navigate command history`
    }),

    about: () => ({
      type: 'output',
      content: `
+-------------------------------------------------------------+
|                        ABOUT ME                             |
+-------------------------------------------------------------+

  Name:       Aklavya Mishra
  Role:       Generative AI Senior Developer & AI Researcher
  Location:   Bangalore, India

  Summary:
  ---------
  Dynamic professional with 8+ years in IT industry including
  3+ years of GenAI development and 3 years leading teams for
  innovative solutions.

  Industries: Telecom | Gaming | Medical | Finance

  Currently working at Concentrix Pvt. Ltd. in the Innovation
  Pod, building agentic systems with sub-second latency.

  Type 'skills' to see my technical expertise.`
    }),

    skills: () => ({
      type: 'output',
      content: `
+-------------------------------------------------------------+
|                      TECHNICAL SKILLS                       |
+-------------------------------------------------------------+

  [*] ADVANCED
      |-- Machine Learning
      |-- Python
      |-- Gemini (1.5 & 2.0)
      |-- OpenAI / GPT
      |-- Hugging Face
      |-- LangChain
      +-- LangGraph

  [+] INTERMEDIATE
      |-- Deep Learning
      |-- TensorFlow / PyTorch
      |-- AWS / GCP
      |-- Prompt Engineering
      +-- FastAPI

  [~] EXPANDING
      |-- Azure
      |-- Rust / Go
      |-- React
      +-- Docker / Kubernetes

  STT Experience: Vosk | Whisper | Assembly AI | Deep Gram`
    }),

    experience: () => ({
      type: 'output',
      content: `
+-------------------------------------------------------------+
|                     WORK EXPERIENCE                         |
+-------------------------------------------------------------+

  >> CONCENTRIX PVT. LTD.                    [04/2025 - Present]
     Generative AI Senior Developer & AI Researcher
     |-- Migrated Gemini 1.5 -> 2.0 Flash Lite
     |-- Building agentic systems (sub-second latency)
     +-- Innovation Pod: STT models research

  >> SONATA SOFTWARE                         [07/2024 - 03/2025]
     Generative AI Senior Developer
     |-- Advanced AI model development
     |-- Scalable architecture design
     +-- AWS team collaboration

  >> INDIUM SOFTWARE                         [06/2020 - 07/2024]
     Generative AI Developer
     |-- Built chatbots: GPT, BERT, Hugging Face
     |-- Led AI solutions across industries
     +-- BLEU & F1 score evaluation

  >> HCL                                     [12/2018 - 06/2020]
     Functional Test Engineer
     +-- Multi-platform testing (PC, PS, Xbox, Nintendo)

  >> AMAZON                                  [08/2017 - 08/2018]
     Customer Support Associate`
    }),

    projects: () => ({
      type: 'output',
      content: `
+-------------------------------------------------------------+
|                        PROJECTS                             |
+-------------------------------------------------------------+

  [01] AGENTIC AI SYSTEMS                         @ Concentrix
       ----------------------------------------------------------
       Building next-gen agentic systems with sub-second
       latency using Gemini 2.0, LangGraph, and advanced
       STT technologies.
       
       Stack: Gemini 2.0 | Vosk | Whisper | LangGraph

  [02] MULTI-DOMAIN CHATBOTS                  @ Indium Software
       ----------------------------------------------------------
       Intelligent chatbots for Gaming, Finance, and Medical
       industries with GPT, BERT, and Hugging Face.
       
       Stack: GPT | BERT | Hugging Face | OpenAI

  [03] ENTERPRISE AI SOLUTIONS                @ Sonata Software
       ----------------------------------------------------------
       Scalable AI architectures with AWS integration and
       FastAPI backends.
       
       Stack: Python | AWS | TensorFlow | FastAPI`
    }),

    contact: () => ({
      type: 'output',
      content: `
+-------------------------------------------------------------+
|                        CONTACT                              |
+-------------------------------------------------------------+

  Location:    Bangalore, India
  Email:       [Available on request]
  LinkedIn:    /in/aklavya-mishra
  GitHub:      /aklavya-mishra

  +------------------------------------------+
  |  [*] Status: Open to opportunities       |
  +------------------------------------------+

  Feel free to reach out for:
  - AI/ML consulting
  - GenAI development projects
  - Team leadership roles
  - Technical collaborations`
    }),

    neofetch: () => ({
      type: 'output',
      content: `
    █████╗ ██╗  ██╗██╗      █████╗ ██╗   ██╗██╗   ██╗ █████╗ 
   ██╔══██╗██║ ██╔╝██║     ██╔══██╗██║   ██║╚██╗ ██╔╝██╔══██╗
   ███████║█████╔╝ ██║     ███████║██║   ██║ ╚████╔╝ ███████║
   ██╔══██║██╔═██╗ ██║     ██╔══██║╚██╗ ██╔╝  ╚██╔╝  ██╔══██║
   ██║  ██║██║  ██╗███████╗██║  ██║ ╚████╔╝    ██║   ██║  ██║
   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝  ╚═══╝     ╚═╝   ╚═╝  ╚═╝
   
   aklavya@portfolio
   ------------------
   OS:        GenAI Developer
   Host:      Concentrix Pvt. Ltd.
   Kernel:    8+ Years Experience
   Uptime:    3+ years in GenAI
   Shell:     Python/LangChain
   Terminal:  AI Researcher
   CPU:       ML @ 100%
   GPU:       Deep Learning
   Memory:    Gemini | OpenAI | LangChain
   
   Skills:    Python, ML, GenAI, LangChain
              LangGraph, TensorFlow, PyTorch
              AWS, GCP, FastAPI
   
   [*] Available for hire`
    }),

    whoami: () => ({
      type: 'output',
      content: 'aklavya_mishra // Generative AI Senior Developer & AI Researcher'
    }),

    date: () => ({
      type: 'output',
      content: new Date().toString()
    }),

    clear: () => {
      setBootLines([])
      setHistory([])
      return null
    },

    echo: (args) => ({
      type: 'output',
      content: args.join(' ') || ''
    }),

    ls: () => ({
      type: 'output',
      content: 'about.txt  skills.txt  experience.txt  projects.txt  contact.txt'
    }),

    cat: (args) => {
      const file = args[0]?.replace('.txt', '')
      if (file && commands[file]) {
        return commands[file]()
      }
      return {
        type: 'error',
        content: `cat: ${args[0] || 'no file specified'}: No such file`
      }
    },

    sudo: () => ({
      type: 'output',
      content: '[sudo] Nice try! But you are already viewing the best portfolio ;)'
    }),

    exit: () => ({
      type: 'output',
      content: 'Why would you want to leave? Type "help" for more commands!'
    }),

    pwd: () => ({
      type: 'output',
      content: '/home/aklavya/portfolio'
    }),

    man: (args) => ({
      type: 'output',
      content: args[0] 
        ? `Manual page for "${args[0]}" - Just kidding! Type "help" instead.`
        : 'What manual page do you want? Try "help" instead.'
    }),
  }

  const processCommand = (input) => {
    const trimmed = input.trim()
    if (!trimmed) return

    setHistory(prev => [...prev, { type: 'command', content: trimmed }])
    setCommandHistory(prev => [...prev, trimmed])
    setHistoryIndex(-1)

    const [cmd, ...args] = trimmed.toLowerCase().split(' ')

    if (commands[cmd]) {
      const result = commands[cmd](args)
      if (result) {
        setHistory(prev => [...prev, result])
      }
    } else {
      setHistory(prev => [...prev, {
        type: 'error',
        content: `Command not found: ${cmd}. Type 'help' for available commands.`
      }])
    }
  }

  const handleKeyDown = (e) => {
    // Ignore if modifier keys (except shift for capitals)
    if (e.ctrlKey || e.altKey || e.metaKey) return
    
    if (e.key === 'Enter') {
      e.preventDefault()
      processCommand(currentInput)
      setCurrentInput('')
    } else if (e.key === 'Backspace') {
      e.preventDefault()
      setCurrentInput(prev => prev.slice(0, -1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      } else {
        setHistoryIndex(-1)
        setCurrentInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(currentInput.toLowerCase()))
      if (matches.length === 1) {
        setCurrentInput(matches[0])
      }
    } else if (e.key.length === 1) {
      // Single character - add to input
      e.preventDefault()
      setCurrentInput(prev => prev + e.key)
    }
  }

  const focusTerminal = () => {
    if (terminalRef.current) {
      terminalRef.current.focus()
    }
  }

  // Loading screen
  if (phase === 'loading') {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading</div>
          <div className="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </div>
        </div>
      </div>
    )
  }

  // Terminal (boot + interactive)
  return (
    <div className="terminal-app" onClick={focusTerminal}>
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="btn close"></span>
            <span className="btn minimize"></span>
            <span className="btn maximize"></span>
          </div>
          <div className="terminal-title">
            {phase === 'booting' ? 'system@boot: initializing' : 'aklavya@portfolio: ~'}
          </div>
          <div className="terminal-spacer"></div>
        </div>
        
        <div 
          className="terminal-body" 
          ref={terminalRef}
          tabIndex={0}
          onKeyDown={phase === 'ready' ? handleKeyDown : undefined}
        >
          {/* Boot sequence lines */}
          {bootLines.map((line, index) => (
            <div 
              key={`boot-${index}`} 
              className={`boot-line ${
                line.startsWith('[OK]') ? 'success' : 
                line.startsWith('[SYSTEM]') ? 'system' : 
                line.startsWith('[READY]') ? 'ready' : 'ascii'
              }`}
            >
              {line}
            </div>
          ))}
          
          {/* Boot cursor (during boot phase) */}
          {phase === 'booting' && (
            <span className="boot-cursor">█</span>
          )}
          
          {/* Divider after boot (when ready) */}
          {phase === 'ready' && bootLines.length > 0 && (
            <div className="terminal-divider">
              ─────────────────────────────────────────────────────────
            </div>
          )}
          
          {/* Command history */}
          {phase === 'ready' && history.map((item, index) => (
            <div key={`cmd-${index}`} className={`terminal-line ${item.type}`}>
              {item.type === 'command' && (
                <span className="prompt">aklavya@portfolio:~$ </span>
              )}
              <span className="content">{item.content}</span>
            </div>
          ))}
          
          {/* Input line (when ready) */}
          {phase === 'ready' && (
            <div className="terminal-input-line">
              <span className="prompt">aklavya@portfolio:~$ </span>
              <span className="input-text">{currentInput}</span>
              <span className="input-cursor"></span>
            </div>
          )}
        </div>
      </div>

      {/* Quick commands (always visible) */}
      <div className="quick-commands">
        <span className="qc-label">Quick commands:</span>
        {['help', 'about', 'skills', 'experience', 'projects', 'contact', 'neofetch'].map(cmd => (
          <button 
            key={cmd} 
            className="qc-btn"
            tabIndex={-1}
            disabled={phase !== 'ready'}
            onClick={(e) => {
              e.stopPropagation()
              processCommand(cmd)
              requestAnimationFrame(() => terminalRef.current?.focus())
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
