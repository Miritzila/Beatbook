import React from "react";
import "../../styles/landingPage.css"

export const LandingPage = () => {

	return (
		<div className="container-fluid text-center">
			<div className="row">
				<div className="p-0">
					<a to="/home">
						<video
							autoPlay
							muted
							loop
							className="w-100">
							<source src="https://res.cloudinary.com/daxbjkj1j/video/upload/v1725544582/zttfkj7uwaf2lkb5e26p.mp4" type="video/mp4" />
						</video>
						<img className="image-landing" src="https://res.cloudinary.com/daxbjkj1j/image/upload/v1724684398/ax5jxsybd5zg8vfeoxp6.png" alt="superposición" />
					</a>
				</div>
				<div className="justify-content-center my-5">
					<h1>Beatbook te permite crear una comunidad fácilmente</h1>
				</div>
				<div className="col-md-4 d-flex justify-content-center align-items-center">
					<div className="card-l">
						<img src="https://images.pexels.com/photos/4353618/pexels-photo-4353618.jpeg?auto=compress&cs=tinysrgb&w=800" className="card-img-l" alt="Comunidad" />
						<div className="card-body">
							<h4 className="card-title ">Llega a personas nuevas</h4>
							<p className="card-text">Conecta con personas de tu zona que sientan pasión por la música.</p>
						</div>
					</div>
				</div>
				<div className="col-md-4 d-flex justify-content-center align-items-center">
					<div className="card-l">
						<img src="https://images.pexels.com/photos/2883051/pexels-photo-2883051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-l" alt="Eventos" />
						<div className="card-body">
							<h4 className="card-title">Una aplicación para organizar</h4>
							<p className="card-text"> Gestiona la asistencia y actualiza tus eventos.</p>
						</div>
					</div>
				</div>
				<div className="col-md-4 d-flex justify-content-center align-items-center">
					<div className="card-l">
						<img src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=800" className="card-img-l" alt="Crecimiento" />
						<div className="card-body">
							<h4>Crecimiento continuo</h4>
							<p>Continuaremos impulsando la visibilidad de tu grupo en nuestra red, fomentando su crecimiento.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};