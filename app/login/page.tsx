'use client'

import { signIn } from 'next-auth/react'
import { Mail } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f5f7] font-['Montserrat',sans-serif]">
      <div className={`relative w-full max-w-[768px] min-h-[480px] bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] overflow-hidden transition-all duration-600 ${isSignUp ? 'right-panel-active' : ''}`}>
        
        {/* Sign In Container */}
        <div className={`absolute top-0 h-full w-1/2 left-0 transition-all duration-600 ease-in-out z-[2] ${isSignUp ? 'translate-x-full' : ''}`}>
          <div className="bg-white flex items-center justify-center flex-col px-12 h-full text-center">
            <h1 className="font-bold text-3xl mb-5">Bem-vindo!</h1>
            <p className="text-sm font-light leading-5 tracking-wide my-5">
              Entre com sua conta Google para acessar suas cartas abertas
            </p>
            <div className="my-5">
              <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="border border-[#ddd] rounded-full inline-flex justify-center items-center m-1 h-10 w-10 hover:border-[#FF4B2B] transition-colors"
                aria-label="Entrar com Google"
              >
                <Mail className="w-5 h-5 text-[#FF4B2B]" />
              </button>
            </div>
            <span className="text-xs mb-4">Use sua conta Google</span>
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="rounded-[20px] border border-[#FF4B2B] bg-[#FF4B2B] text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-75 hover:scale-95 active:scale-90"
            >
              Entrar com Google
            </button>
          </div>
        </div>

        {/* Sign Up Container */}
        <div className={`absolute top-0 h-full w-1/2 left-0 transition-all duration-600 ease-in-out opacity-0 z-[1] ${isSignUp ? 'translate-x-full opacity-100 z-[5] animate-show' : ''}`}>
          <div className="bg-white flex items-center justify-center flex-col px-12 h-full text-center">
            <h1 className="font-bold text-3xl mb-5">Crie sua Conta</h1>
            <p className="text-sm font-light leading-5 tracking-wide my-5">
              Use sua conta Google para começar a criar suas cartas abertas
            </p>
            <div className="my-5">
              <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="border border-[#ddd] rounded-full inline-flex justify-center items-center m-1 h-10 w-10 hover:border-[#FF4B2B] transition-colors"
                aria-label="Cadastrar com Google"
              >
                <Mail className="w-5 h-5 text-[#FF4B2B]" />
              </button>
            </div>
            <span className="text-xs mb-4">Use sua conta Google</span>
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="rounded-[20px] border border-[#FF4B2B] bg-[#FF4B2B] text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-75 hover:scale-95 active:scale-90"
            >
              Cadastrar com Google
            </button>
          </div>
        </div>

        {/* Overlay Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-[100] ${isSignUp ? '-translate-x-full' : ''}`}>
          <div className={`bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] relative left-[-100%] h-full w-[200%] transition-transform duration-600 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>
            
            {/* Overlay Left */}
            <div className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-600 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}`}>
              <h1 className="font-bold text-white text-3xl mb-5">Bem-vindo de Volta!</h1>
              <p className="text-sm font-light leading-5 tracking-wide text-white my-5">
                Para continuar conectado, faça login com sua conta Google
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="rounded-[20px] border border-white bg-transparent text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-75 hover:scale-95 active:scale-90"
              >
                Entrar
              </button>
            </div>

            {/* Overlay Right */}
            <div className={`absolute right-0 flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-600 ease-in-out ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
              <h1 className="font-bold text-white text-3xl mb-5">Olá, Amigo!</h1>
              <p className="text-sm font-light leading-5 tracking-wide text-white my-5">
                Crie sua conta e comece a compartilhar suas cartas abertas com o mundo
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="rounded-[20px] border border-white bg-transparent text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-75 hover:scale-95 active:scale-90"
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
