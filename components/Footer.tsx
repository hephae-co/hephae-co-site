import React from 'react';
import { Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="footer" className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Navigation Links */}
          <div className="flex items-center space-x-6 text-sm">
            <nav className="flex items-center space-x-6">
              <a
                href="/"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  if (window.location.pathname === '/' && window.scrollY === 0) e.preventDefault();
                }}
              >
                <span className="material-icons text-lg">home</span>
                <span>Home</span>
              </a>

              <span className="text-muted-foreground">|</span>

              <a
                href="/toolkit/hephae"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="material-icons text-lg">apps</span>
                <span>Hephae Apps</span>
              </a>

              <span className="text-muted-foreground">|</span>

              <a
                href="/schedule"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="material-icons text-lg">contact_mail</span>
                <span>Contact</span>
              </a>
            </nav>

            <span className="text-muted-foreground hidden sm:inline">|</span>

            <a
              href="https://github.com/hephae-co/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={18} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-400">
            © 2025 hephae.co. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};