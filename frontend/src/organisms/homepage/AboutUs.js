import React from "react";
import Container from "react-bootstrap/Container";

export function AboutUs() {
    return (
        <section id="about-us" className="white">
            <Container className="mt-5 mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="center gap fade-down section-heading no-display animated fadeInDown appear">
                            <h2 className="main-title">Něco málo o nás</h2>
                            <hr/>
                            <p className="text-center">Tato aplikace vznikla v rámci předmětu 4IT445 Agilní vývoj webových aplikací.</p>

                            <p>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor,
                                nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh
                                vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio
                                tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class
                                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris
                                in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque
                                elit. Sed ut imperdiet nisi.</p>

                            <p>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor,
                                nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh
                                vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio
                                tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class
                                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris
                                in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque
                                elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed
                                fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}