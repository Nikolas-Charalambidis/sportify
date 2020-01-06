import React from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

export function Services() {
    return (
        <Container className="mt-5">
            <section id="services" className="white">
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="center gap fade-down section-heading no-display animated fadeInDown appear">
                            <h2 className="main-title">Proč <span className="yellowSpan">Sportify</span>?</h2>
                            <hr/>
                        </div>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-6 col-sm-6 mb-3">
                        <div className="service-block">
                            <div className="float-left bounce-in no-display animated bounceIn appear">
                                <FontAwesomeIcon icon={Icons.faTrophy} className="fa-md" />
                            </div>
                            <div className="media-body fade-up no-display animated fadeInUp appear">
                                <h3 className="media-heading">Soutěže</h3>
                                <p>Přehled všech uskutečněných a budoucích soutěží. Výsledky zápasů včetně bodování jednotlivých týmů.
                                    Statistiky jednotlivých hráčů hrajicích v této soutěži.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-6 mb-3">
                        <div className="service-block">
                            <div className="float-left bounce-in no-display animated bounceIn appear">
                                <FontAwesomeIcon icon={Icons.faUsers} className="fa-md" />
                            </div>
                            <div className="media-body fade-up no-display animated fadeInUp appear">
                                <h3 className="media-heading">Týmy</h3>
                                <p>Všechny zaregistrovaný týmy na jednom místě. Soupiska hráčů a statistik. Účast v jednotlivých
                                soutěžích.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-6 mb-3">
                        <div className="service-block">
                            <div className="float-left bounce-in no-display animated bounceIn appear">
                                <FontAwesomeIcon icon={Icons.faHockeyPuck} className="fa-md" />
                            </div>
                            <div className="media-body fade-up no-display animated fadeInUp appear">
                                <h3 className="media-heading">Sporty</h3>
                                <p>Různorodé sporty, ve kterých si může vybrat každý. Prozatím je možné hrát hokej, florbal a hokejbal.
                                V blízké době přibudou další sporty.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-6 mb-3">
                        <div className="service-block">
                            <div className="float-left bounce-in no-display animated bounceIn appear">
                                <FontAwesomeIcon icon={Icons.faSignal} className="fa-md" />
                            </div>
                            <div className="media-body fade-up no-display animated fadeInUp appear">
                                <h3 className="media-heading">Statistiky</h3>
                                <p>Statistiky historických soutěží, jednotlivců a týmu. Možnost filtrace a řazení dle určitých kategorií.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-6 mb-3">
                        <div className="service-block">
                            <div className="float-left bounce-in no-display animated bounceIn appear">
                                <FontAwesomeIcon icon={Icons.faGlobeEurope} className="fa-md" />
                            </div>
                            <div className="media-body fade-up no-display animated fadeInUp appear">
                                <h3 className="media-heading">Zápasy</h3>
                                <p>Možnost uspořádat zápas, které je možné zaznamenávat pomocí <strong>interaktivního zápisu</strong>.
                                Zároveň je možné zpětné přidání.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-6 mb-3">
                        <div className="service-block">
                            <div className="float-left bounce-in no-display animated bounceIn appear">
                                <FontAwesomeIcon icon={Icons.faUserAlt} className="fa-md" />
                            </div>
                            <div className="media-body fade-up no-display animated fadeInUp appear">
                                <h3 className="media-heading">Profil</h3>
                                <p>Rozšířená úprava vlastního profilu, možnost zobrazit všechny týmy nebo soutěže, kterých se účastním.
                                Změna avatara, jméno apod.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}