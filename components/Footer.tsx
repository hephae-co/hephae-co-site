import React from 'react';

export const Footer = () => {
  return (
    <footer id="footer" className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Navigation Links */}
          <nav className="flex items-center justify-center space-x-6 text-sm">
            <a
              href="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
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

          {/* Copyright */}
          <div className="text-center text-sm text-gray-400">
            © 2025 hephae.co. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};