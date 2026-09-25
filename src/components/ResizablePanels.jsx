import React, { useState, useCallback, useRef, useEffect } from 'react';

const MIN_WIDTH = 180; // px minimum per panel

export default function ResizablePanels({ children }) {
  const containerRef = useRef(null);
  const [sizes, setSizes] = useState([33.33, 33.33, 33.34]); // percentages
  const dragging = useRef(null);
  const [activeDivider, setActiveDivider] = useState(null);

  const onMouseDown = useCallback((e, dividerIndex) => {
    e.preventDefault();
    dragging.current = {
      dividerIndex,
      startX: e.clientX,
      startSizes: [...sizes],
    };
    setActiveDivider(dividerIndex);
    document.body.classList.add('is-resizing');
  }, [sizes]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current || !containerRef.current) return;
      const { dividerIndex, startX, startSizes } = dragging.current;
      const containerWidth = containerRef.current.offsetWidth;
      const deltaX = e.clientX - startX;
      const deltaPct = (deltaX / containerWidth) * 100;

      const newSizes = [...startSizes];
      const left = dividerIndex;
      const right = dividerIndex + 1;
      newSizes[left] = startSizes[left] + deltaPct;
      newSizes[right] = startSizes[right] - deltaPct;

      // Enforce minimum panel widths
      const minPct = (MIN_WIDTH / containerWidth) * 100;
      if (newSizes[left] < minPct || newSizes[right] < minPct) return;

      setSizes(newSizes);
    };

    const onMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = null;
      setActiveDivider(null);
      document.body.classList.remove('is-resizing');
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const panelArray = React.Children.toArray(children);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flex: 1,
        height: '100%',
        overflow: 'hidden',
        padding: '12px',
      }}
    >
      {panelArray.map((child, i) => (
        <React.Fragment key={i}>
          {/* Panel */}
          <div
            style={{
              width: `${sizes[i]}%`,
              minWidth: `${MIN_WIDTH}px`,
              height: '100%',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {child}
          </div>

          {/* Divider handle between panels */}
          {i < panelArray.length - 1 && (
            <div
              onMouseDown={(e) => onMouseDown(e, i)}
              style={{
                width: '12px',
                height: '100%',
                flexShrink: 0,
                cursor: 'col-resize',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                position: 'relative',
              }}
            >
              {/* Visual bar */}
              <div
                style={{
                  width: '3px',
                  height: '100%',
                  background: activeDivider === i
                    ? 'rgba(99,102,241,0.7)'
                    : 'rgba(255,255,255,0.07)',
                  borderRadius: '3px',
                  transition: 'background 0.15s ease',
                  pointerEvents: 'none', // let parent div handle all mouse events
                }}
              />
              {/* Grip pill indicator */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  pointerEvents: 'none',
                }}
              >
                {[0, 1, 2, 3, 4].map(d => (
                  <div
                    key={d}
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: activeDivider === i
                        ? 'rgba(165,180,252,0.9)'
                        : 'rgba(255,255,255,0.2)',
                      transition: 'background 0.15s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
