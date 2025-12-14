'use client';

import { useState, useCallback } from 'react';

async function fetchNasaMedia() {
  const NASA_API_URL = 'https://images-api.nasa.gov/search';
  const query = 'unusual planets';
  const mediaType = 'image,video';
  const url = `${NASA_API_URL}?q=${encodeURIComponent(query)}&media_type=${mediaType}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const items = data.collection.items.map(item => {
      const data = item.data[0];
      const link = item.links ? item.links.find(l => l.rel === 'preview' || l.rel === 'image' || l.rel === 'video') : null;
      
      return {
        nasa_id: data.nasa_id,
        title: data.title,
        description: data.description,
        media_type: data.media_type,
        preview_url: link ? link.href : null,
        nasa_link: `https://images.nasa.gov/details-${data.nasa_id}`,
      };
    }).filter(item => item.preview_url);
    
    return items;

  } catch (error) {
    console.error("Erro ao buscar mídia da NASA:", error);
    return [];
  }
}

function MediaModal({ mediaItem, onClose }) {
  if (!mediaItem) return null;

  return (
    <div className="nasa-modal-overlay" onClick={onClose}>
      <div className="nasa-modal-content" onClick={e => e.stopPropagation()}>
        <button className="nasa-modal-close-btn" onClick={onClose}>×</button>
        
        <h3 className="nasa-modal-title">{mediaItem.title}</h3>
        
        {mediaItem.preview_url && (
          <div className="nasa-modal-media-container">
            {mediaItem.media_type === 'video' && <span className="video-tag">VÍDEO</span>}
            <img 
              src={mediaItem.preview_url} 
              alt={mediaItem.title} 
            />
          </div>
        )}

        <p className="nasa-modal-description">{mediaItem.description}</p>
        
        <a 
          href={mediaItem.nasa_link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nasa-modal-link"
        >
          Ver na NASA Image and Video Library →
        </a>
      </div>
    </div>
  );
}

export default function NasaMediaSection() {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null); 

  const toggleExpand = useCallback(async () => {
    if (!isExpanded && media.length === 0) {
      setIsLoading(true);
      const data = await fetchNasaMedia();
      setMedia(data);
      setIsLoading(false);
    }
    setIsExpanded(prev => !prev);
  }, [isExpanded, media.length]);

  const handleCardClick = (item) => {
    setSelectedMedia(item);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };


  {/*abrir modal*/}

  return (
    <section className="nasa-media-section">
      <div className="nasa-header" onClick={toggleExpand}>
        <h2>
          <span className="text1">MÍDIA</span>
          <span className="text2">NASA</span>
        </h2>
        <span className="expand-icon" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          {isLoading ? 'Carregando...' : '▼'}
        </span>
      </div>

      {isExpanded && (
        <div className="nasa-content-grid">
          {media.length > 0 ? (
            media.slice(0, 6).map((item) => (
              <div 
                key={item.nasa_id} 
                className="nasa-media-card"
                onClick={() => handleCardClick(item)} 
              >
                {item.preview_url && (
                  <div className="image-box">
                    {item.media_type === 'video' && <span className="video-tag">VÍDEO</span>}
                    <img 
                      src={item.preview_url} 
                      alt={item.title} 
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="title">{item.title}</h3>
                <p className="desc">
                  {item.description.substring(0, 80)}...
                </p>
              </div>
            ))
          ) : (
            !isLoading && <p>Nenhuma mídia encontrada ou erro ao carregar.</p>
          )}
        </div>
      )}

      {/*renderização*/}
      <MediaModal mediaItem={selectedMedia} onClose={handleCloseModal} />
    </section>
  );
}