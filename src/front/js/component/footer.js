import React from "react";

export const Footer = () => {
	return (
		<footer className="estilofooter">
			<div className="container">
				<div className="row">
					<div className="col align-items-center d-flex justify-content-center">
						<a href="/"><img src="https://res.cloudinary.com/daxbjkj1j/image/upload/v1724684398/ax5jxsybd5zg8vfeoxp6.png" alt="logo_beatbook" className="logo" /></a>
					</div>
					<div className="col">
						<ul className="sinPuntos">
							<h4>Beatbook</h4>
							<li><a href="/paginafalsa">Quiénes somos</a></li>
							<li><a href="/paginafalsa">Cómo funciona</a></li>
							<li><a href="/paginafalsa">Blog</a></li>
							<li><a href="/paginafalsa">Empleo</a></li>
						</ul>
					</div>
					<div className="col">
						<ul className="sinPuntos">
							<h4>Soporte</h4>
							<li><a href="/paginafalsa">Centro de ayuda</a></li>
							<li><a href="/paginafalsa">Reglas de publicación</a></li>
							<li><a href="/paginafalsa">Consejos de Seguridad</a></li>
						</ul>
					</div>
					<div className="col">
						<ul className="sinPuntos">
							<h4>Legal</h4>
							<li><a href="/paginafalsa">Política de privacidad</a></li>
							<li><a href="/paginafalsa">Condiciones de uso</a></li>
							<li><a href="/paginafalsa">Política de cookies</a></li>
						</ul>
					</div>
					<div className="col align-items-center d-flex justify-content-center">
						<div className="container text-center">
							<div className="row">
								<div className="col">
									<a href="https://www.facebook.com/">
									<i class="fa-brands fa-facebook fa-2xl"></i>
									</a>
								</div>
								<div className="col">
									<a href="https://www.twitter.com/">
									<i class="fa-brands fa-twitter fa-2xl"></i>
									</a>
								</div>
								<div className="col">
									<a href="https://www.instagram.com/">
									<i class="fa-brands fa-instagram fa-2xl"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row d-flex align-items-center justify-content-center">
					<div className="col">
						<h4>Creado por:</h4>
						<p>
							Miriam Asencio
							<a href="https://www.linkedin.com/in/miriam-asencio/" target="_blank" rel="noopener noreferrer">
								<i className="fa-brands fa-linkedin px-2"></i>
							</a>
							<a href="https://github.com/Miritzila" target="_blank" rel="noopener noreferrer">
								<i className="fa-brands fa-github"></i>
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};
