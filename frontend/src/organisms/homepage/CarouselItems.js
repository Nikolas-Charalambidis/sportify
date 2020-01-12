import React from "react";
import Carousel from "react-bootstrap/Carousel";
import background_1 from "../../assets/images/background_1.jpg";
import background_2 from "../../assets/images/background_2.jpg";
import background_3 from "../../assets/images/background_3.jpg";
import {NavLink as Link} from "react-router-dom";

export function CarouselItems() {
    return (
        <Carousel indicators={false}>
            <Carousel.Item>
                <img className="d-block w-100" src={background_3} alt="AllStar Team"/>
                <Carousel.Caption>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div>
                                    <h2 className="d-none d-sm-inline-block">Detailní správa vlastního profilu</h2>
                                    <p className="d-none d-sm-inline-block">Úprava profilu, soutěží, týmů a tvorba interaktivního zápasu</p>
                                    <br/>
                                    <Link className="d-none d-sm-inline-block btn" to="/register">Registrovat se</Link>
                                    <br/>
                                    <Link className="d-none d-sm-inline-block btn" to="/login">Přihlásit se</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img className="d-block w-100" src={background_1} alt="Hockey"/>
                <Carousel.Caption>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div>
                                    <h2 className="d-none d-sm-inline-block">Všechny soutěže na jednom místě</h2>
                                    <p className="d-none d-sm-inline-block">Statistiky, přehled hráčů a další detaily o soutěžích</p>
                                    <br/>
                                    <Link className="d-none d-sm-inline-block btn" to="/competitions">Soutěže</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img className="d-block w-100" src={background_2} alt="Hockey ball"/>
                <Carousel.Caption>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div>
                                    <h2 className="d-none d-sm-inline-block">Různorodé druhy sportovních disciplín</h2>
                                    <p className="d-none d-sm-inline-block">Hokej, hokejbal, florbal a další již brzy</p>
                                    <br/>
                                    <Link className="d-none d-sm-inline-block btn" to="/register">Registrovat se</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}