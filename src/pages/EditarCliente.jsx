import { useNavigate, Form, useLoaderData, redirect, useActionData } from "react-router-dom";
import Formulario from '../components/Formulario';
import Error from '../components/Error';
import { obtenerCliente, actualizarCliente } from "../data/clientes";

export async function loader({ params }) {
    const cliente = await obtenerCliente(params.clienteId);

    // Si está vacío el resultado
    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'El cliente no existe'
        });
    }

    return cliente;
}

export async function action({ request, params }) {
    const formData = await request.formData();

    const datos = Object.fromEntries(formData);

    const email = formData.get('email');
    let regexEmail = new RegExp("^[[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$");

    // Validación
    const errores = [];
    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }

    if (email !== '' && !regexEmail.test(email)) {
        errores.push('El email no es válido');
    }

    // Retornar datos si hay errores
    if (Object.keys(errores).length) {
        return errores;
    }

    // Actualizar el cliente
    await actualizarCliente(params.clienteId, datos);

    return redirect('/');
}

const EditarCliente = () => {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();

    return (
        <>
            <h1 className="font-black text-4xl text-blue-800">Editar Cliente</h1>
            <p className="mt-3">Modifica los datos del cliente</p>

            <div className="flex justify-end my-5">
                <button
                    className="bg-blue-700 hover:bg-blue-800 rounded-sm text-white px-3 py-1 font-bold uppercase"
                    onClick={() => navigate('/')}
                >Volver</button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-8">
                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

                <Form
                    method="POST"
                    noValidate
                >
                    <Formulario
                        cliente={cliente}
                    />

                    <input
                        type="submit"
                        className="mt-5 w-full cursor-pointer bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                        value="Guardar Cambios"
                    />
                </Form>
            </div>
        </>
    )
}

export default EditarCliente;