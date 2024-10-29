import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";

export default function ModalProductos() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState("md");

    const sizes = ["5xl"];

    const handleOpen = (size) => {
        setSize(size);
        onOpen();
    };

    const fetchData = async (endpoint) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/productos/${endpoint}`);
            Swal.fire({
                title: 'Datos de Productos',
                text: JSON.stringify(response.data, null, 2),
                icon: 'info',
                confirmButtonText: 'Cerrar',
                width: '80%', 
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            Swal.fire({
                title: 'Error',
                text: "Error fetching data: " + error.message,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                    <Button
                        key={size}
                        onPress={() => handleOpen(size)}
                        className="bg-blue-600 text-white font-bold "
                    >
                        Consultar productos
                    </Button>
                ))}
            </div>
            <Modal size={size} isOpen={isOpen} onClose={onClose} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Consultar Productos</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        onPress={() => fetchData("mas-vendido")}
                                        className="bg-blue-600 text-white"
                                    >
                                        Producto más vendido
                                    </Button>
                                    <Button
                                        onPress={() => fetchData("proveedores-ordenados")}
                                        className="bg-blue-600 text-white"
                                    >
                                        Proveedores ordenados
                                    </Button>
                                    <Button
                                        onPress={() => fetchData("ganancias")}
                                        className="bg-blue-600 text-white"
                                    >
                                        Producto que más ganancias generó
                                    </Button>
                                    <Button
                                        onPress={() => fetchData("ganancias-categoria")}
                                        className="bg-blue-600 text-white"
                                    >
                                        Ganancias por categoría
                                    </Button>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
