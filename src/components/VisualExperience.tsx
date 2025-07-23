import React, { useState, useEffect } from 'react';
import { getLivePreviewStatus, isLivePreviewEnabled } from '../sdk/utils';

interface LivePreviewStatusProps {
  isEnabled?: boolean;
}

const LivePreviewStatus: React.FC<LivePreviewStatusProps> = ({ isEnabled = true }) => {
  const [status, setStatus] = useState(getLivePreviewStatus());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    // Update status every 5 seconds
    const interval = setInterval(() => {
      setStatus(getLivePreviewStatus());
    }, 5000);

    // Check if Live Preview is active
    setIsVisible(isLivePreviewEnabled() || status.isInitialized);

    return () => clearInterval(interval);
  }, [isEnabled, status.isInitialized]);

  // Only show in development or when Live Preview is active
  if (!isVisible && process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="live-preview-status">
      <div className="live-preview-header">
        <h3>🔍 Live Preview Status</h3>
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="toggle-button"
        >
          {isVisible ? '−' : '+'}
        </button>
      </div>
      
      {isVisible && (
        <div className="live-preview-content">
          <div className="status-grid">
            <div className="status-item">
              <span className="label">SDK Initialized:</span>
              <span className={`status ${status.isInitialized ? 'success' : 'error'}`}>
                {status.isInitialized ? '✅' : '❌'}
              </span>
            </div>
            
            <div className="status-item">
              <span className="label">In Preview Mode:</span>
              <span className={`status ${status.isInIframe ? 'success' : 'warning'}`}>
                {status.isInIframe ? '✅' : '⚠️'}
              </span>
            </div>
            
            <div className="status-item">
              <span className="label">Live Preview Param:</span>
              <span className={`status ${status.hasLivePreviewParam ? 'success' : 'warning'}`}>
                {status.hasLivePreviewParam ? '✅' : '⚠️'}
              </span>
            </div>
            
            <div className="status-item">
              <span className="label">Preview Token Set:</span>
              <span className={`status ${status.hasPreviewToken ? 'success' : 'error'}`}>
                {status.hasPreviewToken ? '✅' : '❌'}
              </span>
            </div>
            
            <div className="status-item">
              <span className="label">Content Type UID:</span>
              <span className={`status ${status.hasContentTypeParam ? 'success' : 'info'}`}>
                {status.hasContentTypeParam ? '✅' : 'ℹ️'}
              </span>
            </div>
            
            <div className="status-item">
              <span className="label">Entry UID:</span>
              <span className={`status ${status.hasEntryParam ? 'success' : 'info'}`}>
                {status.hasEntryParam ? '✅' : 'ℹ️'}
              </span>
            </div>
          </div>
          
          <div className="debug-info">
            <h4>Debug Information</h4>
            <div className="debug-item">
              <strong>Current URL:</strong>
              <code>{status.currentURL}</code>
            </div>
            <div className="debug-item">
              <strong>SDK Status:</strong>
              <code>
                {status.isInitialized ? 'Active' : 'Not Initialized'}
              </code>
            </div>
          </div>

          <div className="instructions">
            <h4>🔧 Troubleshooting</h4>
            <ul>
              {!status.isInitialized && (
                <li>SDK not initialized - check console for errors</li>
              )}
              {!status.hasPreviewToken && (
                <li>Preview token missing - set REACT_APP_CONTENTSTACK_PREVIEW_TOKEN</li>
              )}
              {!status.isInIframe && (
                <li>Not in preview mode - open from Contentstack Live Preview</li>
              )}
              {!status.hasLivePreviewParam && status.isInIframe && (
                <li>Missing live_preview URL parameter</li>
              )}
            </ul>
          </div>
        </div>
      )}
      
      <style>{`
        .live-preview-status {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 350px;
          background: white;
          border: 2px solid #2563eb;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 10000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .live-preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #2563eb;
          color: white;
          border-radius: 6px 6px 0 0;
        }

        .live-preview-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .toggle-button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toggle-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .live-preview-content {
          padding: 16px;
        }

        .status-grid {
          display: grid;
          gap: 8px;
          margin-bottom: 16px;
        }

        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #f8fafc;
          border-radius: 4px;
          border-left: 3px solid #e2e8f0;
        }

        .label {
          font-weight: 500;
          color: #374151;
        }

        .status.success {
          color: #059669;
        }

        .status.error {
          color: #dc2626;
        }

        .status.warning {
          color: #d97706;
        }

        .status.info {
          color: #2563eb;
        }

        .debug-info {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .debug-info h4 {
          margin: 0 0 12px 0;
          color: #374151;
          font-size: 14px;
        }

        .debug-item {
          margin-bottom: 8px;
        }

        .debug-item code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 12px;
          word-break: break-all;
          display: block;
          margin-top: 4px;
        }

        .instructions {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .instructions h4 {
          margin: 0 0 12px 0;
          color: #374151;
          font-size: 14px;
        }

        .instructions ul {
          margin: 0;
          padding-left: 20px;
          color: #6b7280;
          font-size: 13px;
        }

        .instructions li {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
};

export default LivePreviewStatus; 