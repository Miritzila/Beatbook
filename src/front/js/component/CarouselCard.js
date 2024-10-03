import React, { useRef, useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../../styles/carouselCard.css';

export const CarouselCard = ({ items, itemType }) => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const firstCardRef = useRef(null);
  const navigate = useNavigate();

  //  Función para cuando se presiona el ratón
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setStartScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.classList.add('dragging');
  };

  // Función para cuando se mueve el ratón
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const movementX = e.pageX - startX;
    carouselRef.current.scrollLeft = startScrollLeft - movementX;
  };

  // Función para cuando el ratón se suelta
  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current.classList.remove('dragging');
  };

  // Función para redirigir a la página de detalles del ítem
  const handleLearnMore = (id) => {
    navigate(`/${itemType}/${id}`);
  };

  return (
    <div className="wrapper">
      <ul
        className="carouselCard"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={carouselRef}
      >
        {items.map((item, index) => (
          <li className="card-c" key={index} ref={index === 0 ? firstCardRef : null}>
            <div className="img">
              <img src={item.profile_picture} alt={item.name} draggable="false" className="img" />
            </div>
            <div className="content">
              <div className="title d-flex justify-content-center align-items-center">
              <h4 className="name">{item.name}</h4>
              </div>
              <p className="description">{item.description}</p>
            </div>
            <div className="footer">
              <button className="button" onClick={() => handleLearnMore(item.id)}>Saber más</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
