// Obtener todos los clientes existentes
export async function obtenerClientes() {
    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    const resultado = await respuesta.json();

    return resultado;
}

// Obtener la información de un cliente
export async function obtenerCliente(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const resultado = await respuesta.json();

    return resultado;
}

// Agregar un nuevo cliente
export async function agregarCliente(datos) {
    try {
        const respuesta = fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await (respuesta.json());

    } catch (error) {
        console.log(error);
    }
}

// Actualizar información del cliente
export async function actualizarCliente(id, datos) {
    try {
        const respuesta = fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await (respuesta.json());

    } catch (error) {
        console.log(error);
    }
}

// Eliminar un cliente
export async function eliminarCliente(id) {
    try {
        const respuesta = fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE'
        });

        await (respuesta.json());

    } catch (error) {
        console.log(error);
    }
}