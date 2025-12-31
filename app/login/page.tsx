'use client'

import { signIn } from 'next-auth/react'
import { Mail } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-['Montserrat',sans-serif] relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400 rounded-full filter blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className={`relative w-full max-w-[768px] min-h-[480px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] overflow-hidden transition-all duration-600 ${isSignUp ? 'right-panel-active' : ''}`}>
        
        {/* Sign In Container */}
        <div className={`absolute top-0 h-full w-1/2 left-0 transition-all duration-600 ease-in-out z-[2] ${isSignUp ? 'translate-x-full' : ''}`}>
          <div className="bg-white/90 backdrop-blur-sm flex items-center justify-center flex-col px-12 h-full text-center">
            <h1 className="font-bold text-3xl mb-5 text-gray-900">Bem-vindo!</h1>
            <p className="text-sm font-light leading-5 tracking-wide my-5 text-gray-700">
              Entre com sua conta Google para acessar suas cartas abertas
            </p>
            <div className="my-5">
              <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="border-2 border-yellow-500 rounded-full inline-flex justify-center items-center m-1 h-12 w-12 hover:bg-yellow-500/10 transition-all"
                aria-label="Entrar com Google"
              >
                <Mail className="w-6 h-6 text-yellow-600" />
              </button>
            </div>
            <span className="text-xs mb-4 text-gray-600">Use sua conta Google</span>
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 text-xs font-bold py-3 px-11 tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:scale-105 active:scale-95"
            >
              Entrar com Google
            </button>
          </div>
        </div>

        {/* Sign Up Container */}
        <div className={`absolute top-0 h-full w-1/2 left-0 transition-all duration-600 ease-in-out opacity-0 z-[1] ${isSignUp ? 'translate-x-full opacity-100 z-[5] animate-show' : ''}`}>
          <div className="bg-white/90 backdrop-blur-sm flex items-center justify-center flex-col px-12 h-full text-center">
            <h1 className="font-bold text-3xl mb-5 text-gray-900">Crie sua Conta</h1>
            <p className="text-sm font-light leading-5 tracking-wide my-5 text-gray-700">
              Use sua conta Google para começar a criar suas cartas abertas
            </p>
            <div className="my-5">
              <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="border-2 border-yellow-500 rounded-full inline-flex justify-center items-center m-1 h-12 w-12 hover:bg-yellow-500/10 transition-all"
                aria-label="Cadastrar com Google"
              >
                <Mail className="w-6 h-6 text-yellow-600" />
              </button>
            </div>
            <span className="text-xs mb-4 text-gray-600">Use sua conta Google</span>
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 text-xs font-bold py-3 px-11 tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:scale-105 active:scale-95"
            >
              Cadastrar com Google
            </button>
          </div>
        </div>

        {/* Overlay Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-[100] ${isSignUp ? '-translate-x-full' : ''}`}>
          <div className={`bg-gradient-to-br from-gray-800 via-gray-900 to-black relative left-[-100%] h-full w-[200%] transition-transform duration-600 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>
            
            {/* Brilho amarelo animado */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/20 rounded-full filter blur-[80px] animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-400/20 rounded-full filter blur-[80px] animate-pulse delay-500"></div>
            </div>

            {/* Overlay Left */}
            <div className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-600 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}`}>
              <h1 className="font-bold text-white text-3xl mb-5">Bem-vindo de Volta!</h1>
              <p className="text-sm font-light leading-5 tracking-wide text-gray-300 my-5">
                Para continuar conectado, faça login com sua conta Google
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="rounded-full border-2 border-yellow-500 bg-transparent text-yellow-400 text-xs font-bold py-3 px-11 tracking-wider uppercase transition-all duration-300 hover:bg-yellow-500 hover:text-gray-900 hover:scale-105 active:scale-95"
              >
                Entrar
              </button>
            </div>

            {/* Overlay Right */}
            <div className={`absolute right-0 flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-600 ease-in-out ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
              <h1 className="font-bold text-white text-3xl mb-5">Olá, Amigo!</h1>
              <p className="text-sm font-light leading-5 tracking-wide text-gray-300 my-5">
                Crie sua conta e comece a compartilhar suas cartas abertas com o mundo
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="rounded-full border-2 border-yellow-500 bg-transparent text-yellow-400 text-xs font-bold py-3 px-11 tracking-wider uppercase transition-all duration-300 hover:bg-yellow-500 hover:text-gray-900 hover:scale-105 active:scale-95"
              >
                Cadastrar
              </button>
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
        
        @keyframes show {
          0%, 49.99% {
            opacity: 0;
            z-index: 1;
          }
          50%, 100% {
            opacity: 1;
            z-index: 5;
          }
        }
        
        .animate-show {
          animation: show 0.6s;
        }
      `}</style>
    </div>
  )
}
