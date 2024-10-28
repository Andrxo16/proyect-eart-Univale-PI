import Header from "../../../../components/Header/Header";
import "./management.css";

import { Canvas } from "@react-three/fiber"; // Importa el componente Canvas que sirve como contenedor para renderizar el contenido 3D
import { OrbitControls, useGLTF } from "@react-three/drei"; // Importa OrbitControls para permitir el control del modelo con el ratón y useGLTF para cargar modelos GLTF

const Management = () => {
    return (
        <>
            <Header />

            <div class="title-text">
                Manejo inadecuado de residuos
            </div>


            <div className="home-erosion">
                <h1 className="tituloPrincipal">El manejo de residuos se refiere a la recolección, transporte, procesamiento y disposición de los desechos generados por actividades humanas. Cuando no se maneja adecuadamente, puede generar graves problemas ambientales, como contaminación del suelo, agua y aire, contribuyendo al cambio climático y afectando la salud humana.</h1>
            </div>




        </>
    );
};

export default Management;