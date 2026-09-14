import type { APIRoute } from "astro";
import { db, Registrations, NOW } from 'astro:db';

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const fullName = formData.get('fullName')?.toString();
    const email = formData.get('email')?.toString();
    const phone = formData.get('phone')?.toString();
    const registrationDate = NOW;

    // Validación básica
    if (!fullName || !email || !phone) {
        return new Response(JSON.stringify({
            message: "Todos los campos son obligatorios."
        }), {
            status: 400, // Bad Request
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Validación simple de email
    if (!email.includes('@')) {
        return new Response(JSON.stringify({
            message: "El email proporcionado no es válido."
        }), {
            status: 400, // Bad Request
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    try {
        await db.insert(Registrations).values([
            { fullName, email, phone, registrationDate }
        ]);

        return new Response(JSON.stringify({
            message: "Gracias por registrarte. Te haremos saber cuando lancemos nuestra página web."
        }), {
            status: 201, // Created
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error al insertar en la base de datos:", error);
        return new Response(JSON.stringify({
            message: "Hubo un error al procesar tu registro. Por favor, intenta nuevamente."
        }), {
            status: 500, // Internal Server Error
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};