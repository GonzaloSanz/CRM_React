import { Form, useNavigate, redirect } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export async function action({ params }) {
    await Swal.fire({
        title: '¿Deseas eliminar este cliente?',
        text: "No podrás revertir los cambios",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'

    }).then(async (result) => {
        if (result.isConfirmed) {
            await eliminarCliente(params.clienteId);

            Swal.fire({
                icon: 'success',
                title: '¡Cliente eliminado con éxito!',
                showConfirmButton: false,
                timer: 2500
            });
        }
    });

    return redirect('/');
}

const Cliente = ({ cliente }) => {
    const navigate = useNavigate();

    const { id, nombre, telefono, email, empresa } = cliente;
    return (
        <tr className="border-b items-center">
            <td className="p-6 space-y-2">
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p>{empresa}</p>
            </td>
            <td className="p-6 space-y-2">
                <p className="text-gray-600"><span className="text-gray-800 font-bold">Email: </span>{email}</p>
                <p className="text-gray-600"><span className="text-gray-800 font-bold">Teléfono: </span>{telefono}</p>
            </td>

            <td className="p-6">
                <div className="flex gap-6 justify-center">
                    <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 uppercase font-bold text-sm"
                        onClick={() => navigate(`/clientes/${id}/editar`)}
                    >Editar</button>

                    <Form
                        method="POST"
                        action={`/clientes/${id}/eliminar`}
                    >
                        <button
                            type="submit"
                            className="text-red-600 hover:text-red-700 uppercase font-bold text-sm"
                        >Eliminar</button>
                    </Form>
                </div>
            </td>
        </tr>
    )
}

export default Cliente;