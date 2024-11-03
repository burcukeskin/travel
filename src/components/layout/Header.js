"use client";
import { useState, useEffect } from "react";
import {
  login,
  register,
  logout,
  isAuthenticated as checkAuth,
} from "@/services/api";
import Modal from "@/components/shared/Modal";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function Header({ onAddClick }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, []);

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      setIsAuthenticated(true);
      setIsLoginModalOpen(false); // Bu satır düzeltildi
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      // Kayıt başarılı olduğunda otomatik login yap
      await login({ email: userData.email, password: userData.password });
      setIsAuthenticated(true);
      setIsRegisterModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  return (
    <header className="h-16 bg-sidebar-bg shadow-custom sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          ✈️ Travel Notebook
        </h1>
        <nav className="flex gap-3">
          {isAuthenticated ? (
            <>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-background-secondary transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
              <button
                onClick={onAddClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Location
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-border hover:bg-background-secondary transition-colors"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-4 py-2 rounded-lg border border-border hover:bg-background-secondary transition-colors"
              >
                Giriş Yap
              </button>
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
              >
                Kayıt Ol
              </button>
            </>
          )}
        </nav>
      </div>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Giriş Yap"
      >
        <LoginForm
          onSubmit={handleLogin}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="Kayıt Ol"
      >
        <RegisterForm
          onSubmit={handleRegister}
          onClose={() => setIsRegisterModalOpen(false)}
        />
      </Modal>
    </header>
  );
}
