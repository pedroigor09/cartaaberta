'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Session } from 'next-auth'

interface SidebarProps {
  session: Session
}

export function Sidebar({ session }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        :root {
          --bg--primary: hsl(203, 7%, 92%);
          --bg--active: hsla(203, 86%, 93%, 0.7);
          --bg--hover: hsl(200, 7%, 84%);
          --bg--focus: hsl(203, 100%, 100%);
          --gray--primary: hsl(200, 10%, 50%);
          --gray--secondary: hsl(200, 14%, 30%);
          --dark--primary: hsl(203, 13%, 14%);
          --dark--secondary: hsl(203, 4%, 29%);
          --accent--primary: hsl(206, 90%, 56%);
          --accent--secondary: hsl(206, 79%, 58%);
          --expanded: 16.875rem;
          --collapsed: 3.25rem;
          --svg: 1.125rem;
          --item: 2.25rem;
          --brad-outer: 0.75rem;
          --frame-space: 0.5rem;
          --brad-inner: calc(var(--brad-outer) - var(--frame-space));
        }

        .vertical-sidebar {
          display: flex;
          inline-size: ${isExpanded ? 'var(--expanded)' : 'var(--collapsed)'};
          transition: inline-size 300ms ease-out;
          min-height: 100vh;
          position: sticky;
          top: 0;
        }

        .sidebar-nav {
          background: var(--bg--primary);
          display: flex;
          flex-flow: column;
          width: 100%;
          min-height: 100vh;
          border-radius: var(--brad-outer);
          padding: var(--frame-space);
          box-shadow: 0 3px 5px rgba(18, 51, 51, 0.2), 0 5px 17px rgba(0, 0, 0, 0.2);
        }

        .sidebar__toggle-container {
          block-size: var(--item);
          display: flex;
          justify-content: end;
        }

        .nav__toggle {
          block-size: 100%;
          background: none;
          border: none;
          transition: all 233ms ease-in;
          border-radius: var(--brad-inner);
          outline: 2px solid transparent;
          outline-offset: -2px;
          overflow: hidden;
          cursor: pointer;
        }

        .toggle--icons {
          block-size: inherit;
          aspect-ratio: 1;
          display: inline-grid;
          place-content: center;
          grid-template-areas: 'svg';
        }

        .toggle-svg-icon {
          grid-area: svg;
          fill: var(--gray--primary);
          transition: fill 233ms ease-in, opacity 200ms;
        }

        .toggle--open {
          opacity: ${isExpanded ? '0' : '1'};
        }

        .toggle--close {
          opacity: ${isExpanded ? '1' : '0'};
        }

        .nav__toggle:hover {
          outline: 2px solid var(--accent--primary);
        }

        .nav__toggle:hover .toggle-svg-icon {
          fill: var(--dark--primary);
        }

        .user-figure {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.375rem;
          margin: 0.25rem 0;
        }

        .user-avatar {
          margin-inline: auto;
          display: block;
          min-inline-size: 2.25rem;
          max-inline-size: 2.5rem;
          aspect-ratio: 1;
          block-size: 100%;
          object-fit: cover;
          border-radius: 50%;
          transition: max-inline-size 200ms linear;
        }

        ${isExpanded && `
          .user-avatar {
            max-inline-size: 4rem;
          }
        `}

        .user-caption {
          text-align: center;
          opacity: ${isExpanded ? '1' : '0'};
          transition: opacity 300ms ease-in ${isExpanded ? '200ms' : '0ms'};
          overflow: hidden;
          max-height: ${isExpanded ? '100px' : '0'};
          transition: opacity 200ms ease-in ${isExpanded ? '200ms' : '0ms'}, max-height 300ms ease-out;
        }

        .user-id {
          font-size: 1.0625rem;
          font-weight: 500;
          margin-block-end: 0.25rem;
          color: var(--gray--secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-role {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray--primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar__wrapper {
          display: flex;
          flex-flow: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .sidebar__list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-flow: column;
          gap: 0.125rem;
        }

        .sidebar__item {
          block-size: var(--item);
          border-radius: var(--brad-inner);
        }

        .item--heading {
          display: flex;
          align-items: end;
          opacity: ${isExpanded ? '1' : '0'};
          transition: opacity 200ms ease-in ${isExpanded ? '200ms' : '0ms'};
        }

        .sidebar__item--heading {
          margin-block-end: 0.4rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.35px;
          font-weight: 500;
          color: var(--gray--primary);
          transition: color 200ms ease-in;
        }

        .sidebar__link {
          display: flex;
          text-decoration: none;
          block-size: 100%;
          align-items: center;
          gap: 0.5rem;
          outline: 2px solid transparent;
          border-radius: inherit;
          transition: all 200ms ease-out;
          position: relative;
        }

        .icon {
          aspect-ratio: 1;
          block-size: 100%;
          display: inline-grid;
          place-content: center;
        }

        .icon svg {
          inline-size: var(--svg);
          block-size: var(--svg);
          fill: var(--gray--primary);
          transition: fill 200ms;
        }

        .text {
          pointer-events: none;
          color: var(--gray--secondary);
          font-size: 0.875em;
          font-weight: 500;
          transition: color 266ms ease-out;
          white-space: nowrap;
          overflow: hidden;
          opacity: ${isExpanded ? '1' : '0'};
          max-width: ${isExpanded ? '200px' : '0'};
          transition: opacity 200ms ease-in ${isExpanded ? '200ms' : '0ms'}, max-width 300ms ease-out;
        }

        .sidebar__link:hover {
          background: var(--bg--hover);
        }

        .sidebar__link:hover .icon svg {
          fill: var(--accent--primary);
        }

        .sidebar__link:hover .text {
          color: var(--dark--primary);
        }

        .sidebar__link:focus {
          outline: 2px solid var(--accent--secondary);
          outline-offset: -2px;
          background: var(--bg--focus);
        }

        .sidebar__link:active {
          background-color: var(--bg--active);
        }

        ${!isExpanded && `
          .sidebar__link[data-tooltip]::before {
            content: attr(data-tooltip);
            position: fixed;
            translate: calc(var(--item) * 1.5) calc(var(--item) * 0.125);
            border-radius: var(--brad-inner);
            padding: 0.5rem 0.75rem;
            color: #ddd;
            background-color: hsl(198 16 30);
            box-shadow: 0 6px 12px -6px rgba(0,0,0,0.2);
            opacity: 0;
            pointer-events: none;
            scale: 0;
            z-index: 999;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 350ms ease-out;
          }

          .sidebar__link:hover[data-tooltip]::before {
            opacity: 1;
            scale: 1;
          }
        `}
      `}</style>

      <aside className="vertical-sidebar">
        <nav className="sidebar-nav">
          <header>
            <div className="sidebar__toggle-container">
              <button
                className="nav__toggle"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label="Toggle sidebar"
              >
                <span className="toggle--icons">
                  <svg width="24" height="24" viewBox="0 0 24 24" className="toggle-svg-icon toggle--open">
                    <path d="M3 5a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2zM2 12a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1M2 18a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1" />
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" className="toggle-svg-icon toggle--close">
                    <path d="M18.707 6.707a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12z" />
                  </svg>
                </span>
              </button>
            </div>
            <figure className="user-figure">
              <img 
                className="user-avatar" 
                src={session.user?.image || '/default-avatar.png'} 
                alt={session.user?.name || 'User'} 
              />
              <figcaption className="user-caption">
                <p className="user-id">{session.user?.name}</p>
                <p className="user-role">Escritor</p>
              </figcaption>
            </figure>
          </header>

          <section className="sidebar__wrapper">
            <ul className="sidebar__list">
              <li className="sidebar__item item--heading">
                <h2 className="sidebar__item--heading">Menu</h2>
              </li>
              <li className="sidebar__item">
                <Link href="/" className="sidebar__link" data-tooltip="Início">
                  <span className="icon">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                    </svg>
                  </span>
                  <span className="text">Início</span>
                </Link>
              </li>
              <li className="sidebar__item">
                <Link href="/create" className="sidebar__link" data-tooltip="Criar Carta">
                  <span className="icon">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                    </svg>
                  </span>
                  <span className="text">Criar Carta</span>
                </Link>
              </li>
              <li className="sidebar__item">
                <Link href="/history" className="sidebar__link" data-tooltip="Histórico">
                  <span className="icon">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                      <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                      <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                  </span>
                  <span className="text">Histórico</span>
                </Link>
              </li>
            </ul>

            <ul className="sidebar__list">
              <li className="sidebar__item item--heading">
                <h2 className="sidebar__item--heading">Conta</h2>
              </li>
              <li className="sidebar__item">
                <button 
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="sidebar__link w-full" 
                  data-tooltip="Sair"
                >
                  <span className="icon">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg>
                  </span>
                  <span className="text">Sair</span>
                </button>
              </li>
            </ul>
          </section>
        </nav>
      </aside>
    </>
  )
}
