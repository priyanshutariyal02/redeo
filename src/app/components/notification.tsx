"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    id: number;
  } | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    const id = Date.now();
    setNotification({ message, type, id });
    setTimeout(() => {
      setNotification((current) => (current?.id === id ? null : current));
    }, 4000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const getNotificationStyles = (type: NotificationType) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50 border-green-200",
          icon: "text-green-600",
          text: "text-green-800",
          iconComponent: CheckCircle,
        };
      case "error":
        return {
          bg: "bg-red-50 border-red-200",
          icon: "text-red-600",
          text: "text-red-800",
          iconComponent: XCircle,
        };
      case "warning":
        return {
          bg: "bg-yellow-50 border-yellow-200",
          icon: "text-yellow-600",
          text: "text-yellow-800",
          iconComponent: AlertTriangle,
        };
      case "info":
        return {
          bg: "bg-blue-50 border-blue-200",
          icon: "text-blue-600",
          text: "text-blue-800",
          iconComponent: Info,
        };
      default:
        return {
          bg: "bg-blue-50 border-blue-200",
          icon: "text-blue-600",
          text: "text-blue-800",
          iconComponent: Info,
        };
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-right-2 duration-300">
          <div className={`max-w-sm w-full bg-white rounded-lg shadow-lg border ${getNotificationStyles(notification.type).bg} backdrop-blur-sm`}>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 ${getNotificationStyles(notification.type).icon}`}>
                  {(() => {
                    const IconComponent = getNotificationStyles(notification.type).iconComponent;
                    return <IconComponent className="w-5 h-5" />;
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${getNotificationStyles(notification.type).text}`}>
                    {notification.message}
                  </p>
                </div>
                <button
                  onClick={closeNotification}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-1 bg-gray-200 rounded-b-xl overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ease-linear ${
                  getNotificationStyles(notification.type).icon.replace('text-', 'bg-')
                }`}
                style={{
                  animation: 'shrink 4s linear forwards',
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}