import React, { useState, useEffect } from 'react';
import { 
  timelineUtils, 
  visualBuilderUtils, 
  audiencePreviewUtils, 
  devicePreviewUtils 
} from '../sdk/utils';

interface VisualExperienceProps {
  isEnabled?: boolean;
}

const VisualExperience: React.FC<VisualExperienceProps> = ({ isEnabled = true }) => {
  const [currentDevice, setCurrentDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [timelineDate, setTimelineDate] = useState<Date>(new Date());
  const [editMode, setEditMode] = useState<'inspector' | 'inline' | 'all'>('all');
  const [isTimelineEnabled, setIsTimelineEnabled] = useState(false);
  const [isVisualBuilderEnabled, setIsVisualBuilderEnabled] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    // Initialize Visual Experience features
    const initializeVisualExperience = () => {
      // Check for available features
      const hasTimeline = (window as any).__CONTENTSTACK_TIMELINE_ENABLED__;
      const hasVisualBuilder = (window as any).__CONTENTSTACK_VISUAL_BUILDER_ENABLED__;
      const hasAudiencePreview = (window as any).__CONTENTSTACK_AUDIENCE_PREVIEW_ENABLED__;

      console.log('Visual Experience Features:', {
        timeline: hasTimeline,
        visualBuilder: hasVisualBuilder,
        audiencePreview: hasAudiencePreview
      });

      // Set up event listeners for device changes
      const handleDeviceChange = (event: CustomEvent) => {
        setCurrentDevice(event.detail.device);
      };

      window.addEventListener('contentstack:device-change', handleDeviceChange as EventListener);

      return () => {
        window.removeEventListener('contentstack:device-change', handleDeviceChange as EventListener);
      };
    };

    initializeVisualExperience();
  }, [isEnabled]);

  const handleDeviceChange = (device: 'mobile' | 'tablet' | 'desktop') => {
    setCurrentDevice(device);
    devicePreviewUtils.setDevice(device);
  };

  const handleTimelineToggle = (enabled: boolean) => {
    setIsTimelineEnabled(enabled);
    timelineUtils.toggleTimeline(enabled);
  };

  const handleVisualBuilderToggle = (enabled: boolean) => {
    setIsVisualBuilderEnabled(enabled);
    visualBuilderUtils.toggleVisualBuilder(enabled);
  };

  const handleEditModeChange = (mode: 'inspector' | 'inline' | 'all') => {
    setEditMode(mode);
    visualBuilderUtils.setEditMode(mode);
  };

  const handleTimelineDate = (date: Date) => {
    setTimelineDate(date);
    timelineUtils.setTimelineDate(date);
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="visual-experience-panel">
      <div className="visual-experience-header">
        <h3>🎨 Visual Experience</h3>
        <p>Complete Live Preview, Timeline & Visual Builder</p>
      </div>

      {/* Device Preview Controls */}
      <div className="device-preview-controls">
        <h4>📱 Device Preview</h4>
        <div className="device-buttons">
          {(['mobile', 'tablet', 'desktop'] as const).map((device) => (
            <button
              key={device}
              className={`device-btn ${currentDevice === device ? 'active' : ''}`}
              onClick={() => handleDeviceChange(device)}
            >
              {device === 'mobile' ? '📱' : device === 'tablet' ? '📱' : '🖥️'} {device}
            </button>
          ))}
        </div>
        <button 
          className="orientation-btn"
          onClick={() => devicePreviewUtils.toggleOrientation()}
        >
          🔄 Toggle Orientation
        </button>
      </div>

      {/* Timeline Controls */}
      <div className="timeline-controls">
        <h4>⏰ Timeline Preview</h4>
        <div className="timeline-toggle">
          <label>
            <input
              type="checkbox"
              checked={isTimelineEnabled}
              onChange={(e) => handleTimelineToggle(e.target.checked)}
            />
            Enable Timeline Mode
          </label>
        </div>
        {isTimelineEnabled && (
          <div className="timeline-date-picker">
            <label>
              Preview Date:
              <input
                type="datetime-local"
                value={timelineDate.toISOString().slice(0, 16)}
                onChange={(e) => handleTimelineDate(new Date(e.target.value))}
              />
            </label>
          </div>
        )}
      </div>

      {/* Visual Builder Controls */}
      <div className="visual-builder-controls">
        <h4>🔧 Visual Builder</h4>
        <div className="visual-builder-toggle">
          <label>
            <input
              type="checkbox"
              checked={isVisualBuilderEnabled}
              onChange={(e) => handleVisualBuilderToggle(e.target.checked)}
            />
            Enable Visual Builder
          </label>
        </div>
        
        <div className="edit-mode-selector">
          <h5>Edit Mode:</h5>
          {(['inspector', 'inline', 'all'] as const).map((mode) => (
            <label key={mode}>
              <input
                type="radio"
                name="editMode"
                value={mode}
                checked={editMode === mode}
                onChange={() => handleEditModeChange(mode)}
              />
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </label>
          ))}
        </div>

        {isVisualBuilderEnabled && (
          <div className="visual-builder-actions">
            <button onClick={() => visualBuilderUtils.enableDragDrop(true)}>
              🖱️ Enable Drag & Drop
            </button>
          </div>
        )}
      </div>

      {/* Audience Preview Controls */}
      <div className="audience-preview-controls">
        <h4>👥 Audience Preview</h4>
        <div className="audience-selector">
          <select 
            onChange={(e) => audiencePreviewUtils.setAudience(e.target.value)}
            defaultValue=""
          >
            <option value="">Select Audience</option>
            <option value="mobile-users">Mobile Users</option>
            <option value="desktop-users">Desktop Users</option>
            <option value="premium-customers">Premium Customers</option>
            <option value="new-visitors">New Visitors</option>
          </select>
        </div>
        <button 
          onClick={() => audiencePreviewUtils.enablePersonalization(true)}
          className="personalization-btn"
        >
          🎯 Enable Personalization
        </button>
      </div>

      {/* Feature Status */}
      <div className="feature-status">
        <h4>📊 Feature Status</h4>
        <div className="status-indicators">
          <div className={`status-item ${(window as any).__CONTENTSTACK_LIVE_PREVIEW_INITIALIZED__ ? 'enabled' : 'disabled'}`}>
            ✅ Live Preview: {(window as any).__CONTENTSTACK_LIVE_PREVIEW_INITIALIZED__ ? 'Active' : 'Inactive'}
          </div>
          <div className={`status-item ${(window as any).__CONTENTSTACK_TIMELINE_ENABLED__ ? 'enabled' : 'disabled'}`}>
            ⏰ Timeline: {(window as any).__CONTENTSTACK_TIMELINE_ENABLED__ ? 'Available' : 'Unavailable'}
          </div>
          <div className={`status-item ${(window as any).__CONTENTSTACK_VISUAL_BUILDER_ENABLED__ ? 'enabled' : 'disabled'}`}>
            🔧 Visual Builder: {(window as any).__CONTENTSTACK_VISUAL_BUILDER_ENABLED__ ? 'Available' : 'Unavailable'}
          </div>
          <div className={`status-item ${(window as any).__CONTENTSTACK_AUDIENCE_PREVIEW_ENABLED__ ? 'enabled' : 'disabled'}`}>
            👥 Audience Preview: {(window as any).__CONTENTSTACK_AUDIENCE_PREVIEW_ENABLED__ ? 'Available' : 'Unavailable'}
          </div>
        </div>
      </div>

      <style>{`
        .visual-experience-panel {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 320px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-height: 80vh;
          overflow-y: auto;
        }

        .visual-experience-header {
          margin-bottom: 16px;
          border-bottom: 1px solid #eee;
          padding-bottom: 12px;
        }

        .visual-experience-header h3 {
          margin: 0 0 4px 0;
          color: #333;
          font-size: 16px;
        }

        .visual-experience-header p {
          margin: 0;
          color: #666;
          font-size: 12px;
        }

        .device-preview-controls,
        .timeline-controls,
        .visual-builder-controls,
        .audience-preview-controls,
        .feature-status {
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f0f0f0;
        }

        .device-preview-controls h4,
        .timeline-controls h4,
        .visual-builder-controls h4,
        .audience-preview-controls h4,
        .feature-status h4 {
          margin: 0 0 8px 0;
          font-size: 14px;
          color: #555;
        }

        .device-buttons {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }

        .device-btn,
        .orientation-btn,
        .personalization-btn,
        .visual-builder-actions button {
          padding: 6px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s;
        }

        .device-btn.active,
        .device-btn:hover,
        .orientation-btn:hover,
        .personalization-btn:hover,
        .visual-builder-actions button:hover {
          background: #f0f7ff;
          border-color: #007acc;
        }

        .timeline-toggle,
        .visual-builder-toggle {
          margin-bottom: 8px;
        }

        .timeline-date-picker label,
        .edit-mode-selector label {
          display: block;
          margin: 4px 0;
          font-size: 12px;
        }

        .timeline-date-picker input,
        .audience-selector select {
          width: 100%;
          padding: 4px 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 12px;
        }

        .edit-mode-selector {
          margin: 8px 0;
        }

        .edit-mode-selector h5 {
          margin: 0 0 4px 0;
          font-size: 12px;
          color: #666;
        }

        .status-indicators {
          font-size: 11px;
        }

        .status-item {
          padding: 4px 0;
        }

        .status-item.enabled {
          color: #0c7c0c;
        }

        .status-item.disabled {
          color: #999;
        }

        .visual-builder-actions {
          margin-top: 8px;
        }

        .audience-selector {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
};

export default VisualExperience; 